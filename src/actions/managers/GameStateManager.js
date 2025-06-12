async function wsIncomingMessage(message) {
    let user = fs.get("user");
    let history = fs.get("history");
    let buffer = await message.data;
    let msg = ACOSEncoder.decode(buffer);
    if (!msg) {
        console.error(
            "Error: Unable to decode buffer of size " + buffer.byteLength
        );
        return;
    }

    switch (msg.type) {
        case "chat":
            console.log("[ChatMessage]:", msg);
            addChatMessage(msg);
            return;
        case "pong":
            onPong(msg);
            return;
        case "addedQueue":
            console.log(
                "[Incoming] queue:",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            addGameQueue(msg.payload.queues);
            // fs.set('playerCount', msg.playerCount || 0);

            return;
        case "removedQueue":
            console.log(
                "[Incoming] queue:",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            await wsLeaveQueue();
            // fs.set('playerCount', msg.playerCount || 0);

            return;
        case "ready":
            console.log("iframe is ready!");
            return;
        case "noshow":
            console.log(
                "[Incoming] No SHOW!",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            break;
        case "notexist":
            let currentPath = window.location.href;
            let currentParts = currentPath.split("/g/");
            if (currentParts.length > 1) {
                let gamemode = currentParts[1].split("/");
                let game_slug = gamemode[0];

                history("/g/" + game_slug);
            }

            clearRoom(msg.room_slug);

            return;

        case "inrooms":
            console.log(
                "[Incoming] InRooms:",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            if (
                msg.payload &&
                Array.isArray(msg.payload) &&
                msg.payload.length > 0
            ) {
                fs.set("playerCount", msg.playerCount || 0);

                if (!msg.payload || msg.payload.length == 0) {
                    console.log("No rooms found.");
                    return;
                }

                addRooms(msg.payload);
                // for (const room of msg.payload) {
                //     await addRoom(room.gamestate);
                // }
                msg.payload = msg.payload[0].gamestate;
                msg.room_slug = msg.payload?.room?.room_slug;

                // fs.set('gameLoaded', false);
                setLastJoinType("");
                await clearGameQueues();

                timerLoop();

                //lets move into the first room on the list
                // let room = msg.payload[0];

                //redirect to the room url
                // let experimental = room.mode == 'experimental' ? '/experimental' : '';
                // let urlPath = '/g/' + room.game_slug + experimental + '/' + room.room_slug;
                // if (window.location.href.indexOf(urlPath) == -1)
                //     history.push(urlPath);
                return;
            }
            break;
        case "joined":
            console.log(
                "[Incoming] Joined:",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            // setCurrentRoom(msg.room.room_slug);

            gtag("event", "joined", { game_slug: msg.room.game_slug });

            addRoom(msg);

            clearGameQueues();
            // fs.set('gameLoaded', false);

            setLastJoinType("");

            timerLoop();

            // let experimental = msg.room.mode == 'experimental' ? '/experimental' : '';
            // let urlPath = '/g/' + msg.room.game_slug + experimental + '/' + msg.room.room_slug;
            // if (window.location.href.indexOf(urlPath) == -1)
            //     history.push(urlPath);
            break;
        case "join":
            console.log(
                "[Incoming] Player joined the game!",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            break;
        case "kicked":
            console.log(
                "[Incoming] You were kicked from game!",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            break;
        case "gameover":
            console.log(
                "[Incoming] Game Over!",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            break;
        case "private":
            console.log(
                "[Incoming] Private State:",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            break;
        case "update":
            console.log(
                "[Incoming] Update:",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            break;
        case "leave":
            console.log(
                "[Incoming] Player Left:",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            break;
        case "error":
            console.log(
                "[Incoming] ERROR::",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            break;
        case "duplicatetabs":
            console.log(
                "[Incoming] ERROR :: Duplicate Tabs:: ",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            fs.set("duplicatetabs", true);
            return;
        default:
            console.log(
                "[Incoming] Unknown type: ",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            return;
    }

    if (msg.payload) {
        let gamepanel = findGamePanelByRoom(
            msg.room_slug || msg.room.room_slug
        );
        let room = gamepanel?.room;
        let gamestate = JSON.parse(JSON.stringify(gamepanel?.gamestate));

        // console.log("[Previous State]: ", gamestate);
        if (msg.type == "private") {
            let player = gamestate.players[user.shortid];
            player = delta.merge(player, msg.payload);

            // getRoom(msg.room_slug);
            //UPDATE PLAYER STATS FOR THIS GAME
            if (room?.mode == "rank" && msg?.payload?._played) {
                let player_stat = fs.get("player_stats/" + room.game_slug);
                // let player_stat = player_stats[room.game_slug]
                if (player_stat) {
                    if (msg.payload._win) player_stat.win = msg.payload._win;
                    if (msg.payload._loss) player_stat.loss = msg.payload._loss;
                    if (msg.payload._tie) player_stat.tie = msg.payload._tie;
                    if (msg.payload._played)
                        player_stat.played = msg.payload._played;
                    // if (msg.payload.rating)
                    //     player_stat.rating = player.rating;
                    // if (player.ratingTxt)
                    //     player_stat.ratingTxt = player.ratingTxt;
                }
                fs.set("player_stats/" + room.game_slug, player_stat);
            }

            gamestate.players[user.shortid] = player;
            // gamestate.deltaPrivate = msg.payload;
            updateGamePanel(gamepanel);
            return;
        } else {
            if (msg.payload?.timer?.end) {
                let latency = fs.get("latency") || 0;
                let offsetTime = fs.get("offsetTime") || 0;
                let extra = 30; //for time between WS and gameserver
                msg.payload.timer.end += -offsetTime - latency / 2 - extra;
            }

            // let room = getRoom(msg.room_slug);
            // if (msg.payload && msg.payload.players) {
            //     let player = msg?.payload?.players[user.shortid]
            //     if (player) {
            //         let player_stats = fs.get('player_stats');
            //         let player_stat = player_stats[room.game_slug]
            //         if (player.rating)
            //             player_stat.rating = player.rating;

            //         if (player.ratingTxt)
            //             player_stat.ratingTxt = player.ratingTxt;

            //         fs.set('player_stats', player_stats);
            //     }
            // }

            gamestate.action = {};
            gamestate.events = {};

            let deltaState = JSON.parse(JSON.stringify(msg.payload));
            let mergedState = JSON.parse(JSON.stringify(msg.payload));
            mergedState = delta.merge(gamestate, mergedState);
            // msg.payload.delta = deltaState;

            mergedState.delta = deltaState;

            gamepanel.gamestate = mergedState;
            console.log("[FULL GAMESTATE]", mergedState);

            if (gamepanel.gamestate.players) {
                for (const shortid in gamepanel.gamestate.players) {
                    gamepanel.gamestate.players[shortid].shortid = shortid;
                }
            }

            updateGamePanel(gamepanel);

            msg.payload = mergedState;
        }
    }

    if (msg.payload && msg.payload.players) {
        msg.local = msg.payload.players[user.shortid];
        if (msg.local) msg.local.shortid = user.shortid;
    } else {
        msg.local = { displayname: user.displayname, shortid: user.shortid };
    }

    let out = { local: msg.local, ...msg.payload };

    // console.timeEnd('ActionLoop');
    sendFrameMessage(out);

    postIncomingMessage(msg);

    updateRoomStatus(msg.room_slug || msg.room.room_slug);
}

async function postIncomingMessage(msg) {
    // let rooms = fs.get('rooms');

    let gamepanel = findGamePanelByRoom(msg.room_slug || msg.room.room_slug);
    let room = gamepanel.room;
    // let gamestate = gamepanel.gamestate;

    switch (msg.type) {
        case "gameover":
            // let room = rooms[msg.room_slug];
            // let gamestate = fs.get('gamestate');
            let user = fs.get("user");
            // let games = fs.get('games');
            // let game = games[room.game_slug];

            if (room.mode == "rank") {
                let player = msg.payload.players[user.shortid];

                let player_stat = fs.get("player_stats/" + room.game_slug);
                // let player_stat = player_stats[room.game_slug] || {};
                if (player_stat) {
                    if (player.rating) player_stat.rating = player.rating;
                    //if (player.ratingTxt)
                    //    player_stat.ratingTxt = player.ratingTxt;
                    player_stats[room.game_slug] = player_stat;
                }
                fs.set("player_stats/" + room.game_slug, player_stat);

                // if (room?.maxplayers > 1)
                //     findGameLeaderboard(room.game_slug);

                // if (room?.lbscore || room?.maxplayers == 1) {
                //     findGameLeaderboardHighscore(room.game_slug);
                // }
            }
            // fs.set('gamestate', {});
            break;
        case "noshow":
            break;
        case "notexist":
            break;
        case "error":
            break;
        case "kicked":
            break;
        default:
            return;
    }

    setRoomActive(room.room_slug, false);
    //sendPauseMessage(room.room_slug);
    revertBrowserTitle();
    // clearRoom(msg.room_slug);
    // delete rooms[msg.room_slug];
    // fs.set('rooms', rooms);
    // disconnect()
}

export function processsRoomStatus(gamepanel) {
    // let rooms = fs.get('rooms');
    // let room = gamepanel.room;// rooms[room_slug];

    let gamestate = gamepanel.gamestate; // fs.get('gamestate');

    if (!gamestate || !gamestate.state | !gamestate.players) {
        return "NOTEXIST";
    }

    if (gamestate?.events?.gameover) {
        return "GAMEOVER";
    }
    if (gamestate?.events?.error) {
        return "ERROR";
    }

    if (gamestate?.events?.noshow) {
        return "NOSHOW";
    }

    if (gamepanel.forfeit) {
        return "FORFEIT";
    }
    // let iframeLoaded = fs.get('iframeLoaded');
    // if (!iframeLoaded) {
    //     return "LOADING";
    // }

    let gameLoaded = gamepanel.loaded; // fs.get('gameLoaded');
    if (!gameLoaded) return "LOADING";

    return "GAME";
}

export function isNextTeam(gamepanel, userid) {
    let gamestate = gamepanel?.gamestate;
    let local = gamestate?.local;

    if (!gamestate) return;

    userid = userid || local?.id;
    let nextid = gamestate?.room?.next;
    // let nextid = next?.id;
    let room = gamestate.room;

    if (room?.status == "pregame") return true;

    if (!next || !nextid) return false;

    if (!gamestate.state) return false;

    //check if we ven have teams
    let teams = gamestate?.teams;

    if (typeof nextid === "string") {
        //anyone can send actions
        if (nextid == "*") return true;

        //only specific user can send actions
        // if (nextid == userid)
        //     return false;

        //validate team has players
        if (!teams || !teams[nextid] || !teams[nextid].players) return false;

        //allow players on specified team to send actions
        if (
            Array.isArray(teams[nextid].players) &&
            teams[nextid].players.includes(userid)
        ) {
            return true;
        }
    } else if (Array.isArray(nextid)) {
        //multiple users can send actions if in the array
        // if (nextid.includes(userid))
        //     return false;

        //validate teams exist
        if (!teams) return false;

        //multiple teams can send actions if in the array
        for (var i = 0; i < nextid.length; i++) {
            let teamid = nextid[i];
            let team = teams[teamid];
            let teamplayers = team?.players;
            if (Array.isArray(teamplayers) && teamplayers.includes(userid)) {
                return true;
            }
        }
    }

    return false;
}

export function isUserNext(gamepanel, userid) {
    let gamestate = gamepanel?.gamestate;
    let user = fs.get("user");

    if (!gamestate || !user) return;

    userid = userid || user.shortid;
    let next = gamestate?.next;
    let nextid = next?.id;
    let room = gamestate.room;

    if (room?.status == "pregame") return true;

    if (!next || !nextid) return false;

    if (!gamestate.state) return false;

    //check if we ven have teams
    let teams = gamestate?.teams;

    if (typeof nextid === "string") {
        //anyone can send actions
        if (nextid == "*") return true;

        //only specific user can send actions
        if (nextid == userid) return true;

        //validate team has players
        if (!teams || !teams[nextid] || !teams[nextid].players) return false;

        //allow players on specified team to send actions
        if (
            Array.isArray(teams[nextid].players) &&
            teams[nextid].players.includes(userid)
        ) {
            return true;
        }
    } else if (Array.isArray(nextid)) {
        //multiple users can send actions if in the array
        if (nextid.includes(userid)) return true;

        //validate teams exist
        if (!teams) return false;

        //multiple teams can send actions if in the array
        for (var i = 0; i < nextid.length; i++) {
            let teamid = nextid[i];
            let team = teams[teamid];
            let teamplayers = team?.players;
            if (Array.isArray(teamplayers) && teamplayers.includes(userid)) {
                return true;
            }
        }
    }

    return false;
}
