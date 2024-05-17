import { btGames } from "../buckets";

export function setRoomForfeited(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    gamepanel.active = false;
    gamepanel.forfeit = true;

    updateRoomStatus(room_slug);
    updateGamePanel(gamepanel);
}

export function setRoomActive(room_slug, active) {
    let gamepanel = findGamePanelByRoom(room_slug);
    gamepanel.active = active;

    updateRoomStatus(room_slug);
    updateGamePanel(gamepanel);
}

export function getGames() {
    let games = btGames.get() || getWithExpiry("games") || {};
    return games;
}
export function getGame(game_slug) {
    let games = btGames.get() || getWithExpiry("games") || {};
    return games[game_slug];
}

export function getRoom(room_slug) {
    let rooms = fs.get("rooms") || getWithExpiry("rooms") || {};
    return rooms[room_slug];
}

export function getRooms() {
    let rooms = fs.get("rooms") || getWithExpiry("rooms") || {};
    return rooms;
}
export function getRoomList() {
    let rooms = getRooms();
    let roomList = [];
    for (var room_slug in rooms) {
        roomList.push(rooms[room_slug]);
    }
    return roomList;
}

export function addRooms(roomList) {
    if (!Array.isArray(roomList)) return;

    let rooms = getRooms();
    let user = fs.get("user");

    let foundFirst = false;
    for (var r of roomList) {
        rooms[r.room_slug] = r;

        let gamestate = r.gamestate;
        //remove from the rooms object, so we can keep it separate
        // if (r.gamestate)
        //     delete r.gamestate;
        let gamepanel = findGamePanelByRoom(r.room_slug || r.room.room_slug);
        if (!gamepanel) {
            gamepanel = reserveGamePanel();
            fs.set("showLoadingBox/" + gamepanel.id, true);
        }

        gamepanel.room = r;

        if (gamestate && gamestate.players) {
            gamestate.local = gamestate.players[user.shortid];
            if (gamestate.local) gamestate.local.id = user.shortid;

            for (const id in gamestate.players) {
                gamestate.players[id].id = id;
            }
        } else {
            gamestate.local = { name: user.displayname, id: user.shortid };
        }

        gamepanel.gamestate = gamestate;
        updateRoomStatus(r.room_slug);

        updateGamePanel(gamepanel);

        if (!foundFirst) {
            foundFirst = true;
            setPrimaryGamePanel(gamepanel);
        }
    }

    fs.set("rooms", rooms);
    setWithExpiry("rooms", JSON.stringify(rooms), 120);
}

export function addRoom(msg) {
    let gamepanel = findGamePanelByRoom(msg.room_slug || msg.room.room_slug);

    if (gamepanel) {
        return gamepanel;
    }

    let rooms = getRooms();

    //merge with any existing
    // let existing = rooms[msg.room.room_slug] || {};
    // room = Object.assign({}, existing, room);

    //reserve and update gamepanel
    gamepanel = reserveGamePanel();
    gamepanel.room = msg.room;
    if (msg.room.isReplay) {
        gamepanel.gamestate = msg.payload[0];
        gamepanel.room.history = msg.payload;
    } else {
        gamepanel.gamestate = msg.payload;
    }

    fs.set("showLoadingBox/" + gamepanel.id, true);
    updateGamePanel(gamepanel);

    if (!msg.room.isReplay) {
        //should we make it primary immediately? might need to change this
        setPrimaryGamePanel(gamepanel);
    }

    rooms[msg.room.room_slug] = msg.room;
    fs.set("rooms", rooms);
    setWithExpiry("rooms", JSON.stringify(rooms), 120);

    return gamepanel;
}

export function clearRooms() {
    fs.set("rooms", {});
    removeWithExpiry("rooms");
}

export function clearRoom(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    cleanupGamePanel(gamepanel);

    // let primaryGamePanel = getPrimaryGamePanel();
    // if (gamepanel == primaryGamePanel) {
    //     setPrimaryGamePanel(null);
    // }

    let rooms = fs.get("rooms");
    if (!rooms[room_slug]) return;
    delete rooms[room_slug];
    fs.set("rooms", rooms);
    setWithExpiry("rooms", JSON.stringify(rooms), 120);

    clearChatMessages(room_slug);
}

// export function setRoomStatus(status) {
//     fs.set('roomStatus', status);
// }
export function getRoomStatus(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);

    return fs.get("gamestatus/" + gamepanel.id) || "NOTEXIST";
    // return gamepanel?.status || 'NOTEXIST';
}

export function updateRoomStatus(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    let status = processsRoomStatus(gamepanel);
    gamepanel.status = status;

    fs.set("gamestatus/" + gamepanel.id, status);
    fs.set("gamestatusUpdated", new Date().getTime());
    // updateGamePanel(gamepanel);

    //console.log("ROOM STATUS = ", status);
    // fs.set('roomStatus', status);
    return status;
}

export async function wsLeaveGame(game_slug, room_slug) {
    let ws = fs.get("ws");
    if (!ws || !ws.isReady) {
        // setCurrentRoom(null);
        // history.goBack();
        setRoomActive(room_slug, false);
        //clearRoom(room_slug);
        return;
    }

    let action = { type: "leave", room_slug };

    let byteLen = await wsSend(action);
    console.log("[Outgoing] Leaving:", "[" + byteLen + " bytes]", action);

    setRoomActive(room_slug, false);
    revertBrowserTitle();

    sendPauseMessage(room_slug);
    // clearRoom(room_slug);
    // setCurrentRoom(null);

    // let history = fs.get('history');
    // history.goBack();
}

export async function wsLeaveQueue() {
    setLastJoinType("");
    await clearGameQueues();

    // let ws = await reconnect();
    // if (!ws || !ws.isReady) {
    //     return;
    // }

    fs.set("joinqueues", null);
    localStorage.removeItem("joinqueues");
    let action = { type: "leavequeue" };
    let byteLen = await wsSend(action);

    // await disconnect();

    console.log("[Outgoing] Leave Queue:", "[" + byteLen + " bytes]");
}

export async function wsRejoinQueues() {
    if (!(await validateLogin())) return;

    let joinqueues = getJoinQueues() || {};
    let user = fs.get("user");

    let jqs = joinqueues.queues || [];
    if (jqs.length > 0 && user)
        wsJoinQueues(joinqueues.queues, joinqueues.owner);
}

export async function wsJoinQueues(queues, owner, attempt) {
    attempt = attempt || 1;

    let joinQueues = { queues, owner };
    fs.set("joinqueues", joinQueues);
    localStorage.setItem("joinqueues", JSON.stringify(joinQueues));

    if (attempt > 10) return false;

    if (!(await validateLogin())) return false;

    if (!queues || queues.length == 0 || !queues[0].game_slug) {
        console.error("Queues is invalid.", queues);
        return false;
    }

    let currentQueues = fs.get("queues") || [];
    if (currentQueues.length > 0) {
        console.warn("Already in queue", currentQueues);
        // return false;
    }

    let ws = await reconnect(true);
    if (!ws || !ws.isReady) {
        setTimeout(() => {
            wsJoinQueues(queues, owner, attempt + 1);
        }, 500);
        return false;
    }

    gtag("event", "joinqueues", { queues, owner });

    let user = await getUser();
    let players = [{ shortid: user.shortid, displayname: user.displayname }];
    let payload = { queues, owner, players, captain: user.shortid };
    let action = { type: "joinqueues", payload };
    let byteLen = await wsSend(action);

    console.log("[Outgoing] Queing:", "[" + byteLen + " bytes]", action);

    fs.set("queues", queues);

    // if (owner)
    //     fs.set('successMessage', { description: `You joined ${owner}'s ${queues.length} queues.` })
    // else
    //     fs.set('successMessage', { description: `You joined ${queues.length} queues.` })

    // console.timeEnd('ActionLoop');
    return true;
}

export async function wsJoinGame(mode, game_slug) {
    if (!(await validateLogin())) return false;

    let ws = await reconnect(true);
    if (!ws || !ws.isReady) {
        return;
    }

    if (!game_slug) {
        console.error(
            "Game [" + game_slug + "] is invalid.  Something went wrong."
        );
        return;
    }

    let user = await getUser();

    let queues = [{ mode, game_slug }];
    let players = [{ shortid: user.shortid, displayname: user.displayname }];
    let action = {
        type: "joingame",
        payload: { captain: user.shortid, queues, players },
    };
    let byteLen = await wsSend(action);

    console.log(
        "[Outgoing] Joining " + mode + ":",
        "[" + byteLen + " bytes]",
        action
    );

    // let games = fs.get('games');
    // let game = games[game_slug];
    // let gameName = game?.name || game?.game_slug || '';

    sendPing(ws);
    // if (game.maxplayers > 1)
    //     fs.set('successMessage', { description: `You joined the "${gameName}" ${mode} mode.` })
    // console.timeEnd('ActionLoop');
}

// export async function wsJoinRoom(game_slug, room_slug, private_key) {
//     let ws = await reconnect(true);
//     if (!ws || !ws.isReady) {
//         console.log("RETRYING wSJoinRoom");
//         setTimeout(() => { wsJoinRoom(game_slug, room_slug, private_key); }, 1000);
//         return;
//     }

//     if (!room_slug) {
//         console.error("Room [" + room_slug + "] is invalid.  Something went wrong.");
//         return;
//     }

//     gtag('event', 'joinroom', { game_slug: game_slug });

//     let action = { type: 'joinroom', payload: { game_slug, room_slug, private_key } }
//     wsSend(action);

//     console.log("[Outgoing] Joining room [" + room_slug + "]: ", game_slug, action);
//     // console.timeEnd('ActionLoop');
// }

export async function wsSpectateGame(game_slug) {
    let ws = await reconnect(true);
    if (!ws || !ws.isReady || !game) {
        return;
    }

    if (!game_slug) {
        console.error(
            "Game [" + game_slug + "] is invalid.  Something went wrong."
        );
        return;
    }

    let action = { type: "spectate", payload: { game_slug } };
    let byteLen = await wsSend(action);

    console.log(
        "[Outgoing] Spectating [" + game_slug + "]:",
        "[" + byteLen + " bytes]",
        action
    );
    // console.timeEnd('ActionLoop');
}

export async function wsJoinBetaGame(game) {
    gtag("event", "join", { mode: "experimental", game_slug: game.game_slug });
    wsJoinGame("experimental", game.game_slug);
}

export async function wsJoinRankedGame(game) {
    gtag("event", "join", { mode: "rank", game_slug: game.game_slug });
    wsJoinGame("rank", game.game_slug);
}

export async function wsJoinPublicGame(game) {
    wsJoinGame("public", game.game_slug);
}

// export async function wsJoin(game_slug, room_slug) {
//     wsJoinRoom(game_slug, room_slug);
// }

// export async function wsJoinPrivate(game_slug, room_slug, private_key) {
//     wsJoinRoom(game_slug, room_slug, private_key);
// }

// export async function wsRejoinRoom(game_slug, room_slug, private_key) {
//     gtag('event', 'joinroom', { mode: 'rank' });
//     await wsJoinRoom(game_slug, room_slug, private_key);
// }

// export async function wsRejoinRooms() {
//     let rooms = fs.get('rooms') || localStorage.getItem('rooms') || {};
//     let roomList = Object.keys(rooms);
//     for (var rs of roomList) {
//         let room = rooms[rs];
//         await wsRejoinRoom(room.game_slug, room.room_slug);
//     }
// }

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
