import { w3cwebsocket as W3CWebSocket } from "websocket";
// import { encode, decode, defaultDict } from 'acos-json-encoder';
// const { encode, decode, defaultDict } = require('acos-json-encoder');
import ACOSEncoder from "acos-json-encoder"; // '../util/encoder';
import ACOSDictionary from "shared/model/acos-dictionary.json";
ACOSEncoder.createDefaultDict(ACOSDictionary);

// const encode = ACOSEncoder.encode;
// const decode = ACOSEncoder.decode;
import { getUser, isUserLoggedIn, login } from "./person";

import config from "../config";

import delta from "acos-json-delta";
import {
    addRoom,
    addRooms,
    clearRoom,
    findGamePanelByIFrame,
    findGamePanelByRoom,
    getGamePanels,
    setLastJoinType,
    setRoomActive,
    setRoomForfeited,
    updateGamePanel,
    updateRoomStatus,
} from "./room";
import { addGameQueue, clearGameQueues, getJoinQueues, onQueueStats } from "./queue";
// import { findGameLeaderboard, findGameLeaderboardHighscore } from "./game";
import { addChatMessage } from "./chat";
import { GET } from "./http";
import {
    btChatToggle,
    btDuplicateTabs,
    btExperience,
    btGame,
    btHistory,
    btJoinQueues,
    btLatency,
    btOffsetTime,
    btPlayerCount,
    btPlayerStats,
    btQueues,
    btRankingUpdate,
    btServerOffset,
    btShowLoadingBox,
    btTimeleft,
    btTimeleftUpdated,
    btUser,
    btWebsocket,
    btWebsocketConnected,
} from "./buckets";

var messageQueue = {};
var onResize = null;

var forcedLatency = Math.round(RandRange(50, 200));
// console.log("FORCED LATENCY: ", forcedLatency);
function RandRange(min, max) {
    return Math.random() * (max - min) + min;
}

var timerHandle = 0;
export function timerLoop(cb) {
    if (cb) cb();

    if (timerHandle) {
        clearTimeout(timerHandle);
        timerHandle = 0;
    }

    timerHandle = setTimeout(() => {
        timerLoop(cb);
    }, 30);

    let gamepanels = getGamePanels();

    //no panels, stop the timer
    if (gamepanels.length == 0) {
        clearTimeout(timerHandle);
        timerHandle = 0;
        return;
    }

    let timeleftUpdated = 0;

    for (let i = 0; i < gamepanels.length; i++) {
        let gamepanel = gamepanels[i];
        if (gamepanel.available || !gamepanel.gamestate || !gamepanel.loaded || !gamepanel.active)
            continue;

        let gamestate = gamepanel.gamestate || {};

        // let timer = gamestate.timer;
        // if (!timer) {
        //     continue;
        // }

        let deadline = gamestate?.room?.timeend;
        if (!deadline) continue;

        if (
            gamestate?.room?.events?.gameover ||
            gamestate?.room?.events?.gamecancelled ||
            gamestate?.room?.events?.gameerror
        )
            continue;

        let now = new Date().getTime();
        let elapsed = deadline - now;

        if (elapsed <= 0) {
            elapsed = 0;
        }

        btTimeleft.assign({ [gamepanel.id]: elapsed });
        timeleftUpdated = new Date().getTime();
    }

    if (timeleftUpdated > 0) btTimeleftUpdated.set(timeleftUpdated);
}

export function attachToFrame() {
    window.addEventListener("message", recvFrameMessage, false);
}

export function detachFromFrame() {
    window.removeEventListener("message", recvFrameMessage, false);
}

export function fastForwardMessages(room_slug) {
    // let room_slug = msg.room_slug;
    // let room_slug = getCurrentRoom();
    let gamepanel = findGamePanelByRoom(room_slug);
    let iframe = gamepanel.iframe;

    if (!iframe) return false;

    let gamestate = gamepanel.gamestate;
    if (!gamestate?.state) {
        //    iframe.resize();
        return false;
    }

    let mq = messageQueue[room_slug];
    if (mq && mq.length > 0) {
        console.log("Forwarding queued messages to iframe.");
        // for (var i = 0; i < mq.length; i++) {

        //     gamestate = delta.merge(gamestate, mq[i]);
        let last = mq[mq.length - 1];

        // }

        iframe.current.contentWindow.postMessage(last, "*");
        console.log(last);

        delete messageQueue[room_slug];
    }

    // iframe.resize();
}

export function sendFrameMessage(msg) {
    let room_slug = msg?.room?.room_slug;

    let gamepanel = findGamePanelByRoom(room_slug);
    if (!gamepanel) return;

    let iframe = gamepanel.iframe;

    if (!iframe?.current) {
        if (!messageQueue[room_slug]) messageQueue[room_slug] = [];

        messageQueue[room_slug].push(msg);
        return;
    } else {
        try {
            iframe.current.contentWindow.postMessage(msg, "*");
        } catch (e) {
            console.log("Error iframe not working: ", e, gamepanel);
        }
    }
}

export function sendPauseMessage(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    if (gamepanel && gamepanel.iframe?.current) {
        gamepanel.iframe.current.contentWindow.postMessage({ type: "pause" }, "*");
    }
}

export function sendUnpauseMessage(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    if (gamepanel && gamepanel.iframe?.current) {
        gamepanel.iframe.current.contentWindow.postMessage({ type: "unpause" }, "*");
    }
}

export function sendLoadMessage(room_slug) {
    // onResize = runCallback;

    let gamepanel = findGamePanelByRoom(room_slug);
    if (gamepanel && !gamepanel.isReplay && gamepanel.iframe?.current) {
        gamepanel.iframe.current.contentWindow.postMessage(
            {
                type: "load",
                payload: {
                    css: gamepanel.room.css,
                    game_slug: gamepanel.room.game_slug,
                    version: gamepanel.room.version,
                },
            },
            "*"
        );
    }
    // let iframe = getIFrame(room_slug);
    // if (iframe)
    //     iframe.element.current.contentWindow.postMessage({ type: 'load', payload: { game_slug, version } }, '*');
}

export async function refreshGameState(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);

    let gamestate = gamepanel.gamestate;
    let user = await getUser();
    let iframe = gamepanel.iframe;
    // if (iframe) {
    let local = {};
    if (gamestate?.players) {
        local = gamestate.players[user.shortid];
        if (local) local.shortid = user.shortid;
    } else {
        local = { displayname: user.displayname, shortid: user.shortid };
    }

    let out = { local, ...gamestate };

    // console.timeEnd('ActionLoop');
    sendFrameMessage(out);
    // }
}

export function getFrameByEvent(event) {
    return Array.from(document.getElementsByTagName("iframe")).filter((iframe) => {
        return iframe.contentWindow === event.source;
    })[0];
}

export function replayPrevIndex(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    if (!gamepanel?.room) return;

    let jumpIndex = gamepanel.room.replayIndex - 1;

    //if we are currently in gameover state, jump back 2 times
    // if (gamepanel.room.replayIndex == gamepanel.gamestate.length - 1)
    //     jumpIndex -= 1;

    replayJumpToIndex(room_slug, jumpIndex);
}

export function replayTimerTriggerNext(room_slug, delay) {
    let gamepanel = findGamePanelByRoom(room_slug);
    if (!gamepanel?.room) return;

    if (gamepanel.room.replayTimerHandle) {
        clearTimeout(gamepanel.room.replayTimerHandle);
    }

    gamepanel.room.replayTimerHandle = setTimeout(() => {
        replayNextIndex(room_slug);
    }, delay);
}

export function replayNextIndex(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    let iframe = gamepanel.iframe;

    if (!iframe) return false;

    let history = gamepanel.room.history;
    if (!(history || history.length == 0)) {
        //    iframe.resize();
        return false;
    }

    let nextId = gamepanel.room.replayIndex + 1;
    if (nextId >= history.length) return false;

    let merged = gamepanel.gamestate;
    let copy = JSON.parse(JSON.stringify(history[nextId].payload));

    if (merged?.room?.events) {
        merged.room.events = {};
    }
    delta.merge(merged, copy);

    merged.room_slug = history[0].room_slug;

    // merged = { room_slug: history[nextId].room_slug, ...merged };

    if (merged?.room?.timesec) {
        if (history.length > nextId + 1) {
            let nextHistory = history[nextId + 1];
            let nextCopy = JSON.parse(JSON.stringify(nextHistory.payload));
            let nextMerged = JSON.parse(JSON.stringify(merged));
            delta.merge(nextMerged, nextCopy);

            let nextUpdated = nextMerged.room.updated;
            let currentUpdated = merged.room.updated;

            if (gamepanel.room.updated != merged?.room?.updated) {
                let now = Date.now();
                // gamepanel.room.timerSequence = merged?.timer?.sequence || 0;
                gamepanel.room.starttime = merged?.room?.starttime || 0;
                gamepanel.room.endtime = now + merged?.room?.timesec * 1000;
            }

            replayTimerTriggerNext(room_slug, nextUpdated - currentUpdated);
        }
    }

    merged.room.timeend = gamepanel.room.endtime;

    let players = merged?.players;
    merged.local = players[gamepanel.room.replayFollow];

    gamepanel.room.replayIndex = gamepanel.room.replayIndex + 1;
    gamepanel.gamestate = structuredClone(merged);
    updateGamePanel(gamepanel);
    updateRoomStatus(room_slug);

    if (iframe?.current?.contentWindow) iframe.current.contentWindow.postMessage(merged, "*");
}

export function replayJumpToIndex(room_slug, startIndex) {
    let gamepanel = findGamePanelByRoom(room_slug);
    let iframe = gamepanel.iframe;

    if (!iframe || !iframe.current || !iframe.current.contentWindow) return false;

    let history = gamepanel.room.history;
    if (!(history || history.length == 0)) {
        //    iframe.resize();
        return false;
    }

    if (startIndex < gamepanel.room.replayStartIndex || startIndex >= history.length) {
        return false;
    }

    if (gamepanel.room.replayIndex == history.length - 1) {
    }

    let merged = {};
    // gamepanel.room.timerSequence = -1;
    // gamepanel.room.timeend = 0;
    for (let i = 1; i <= startIndex; i++) {
        //skip first one if it has room metadata
        if (history[i].payload.gameid) {
            continue;
        }

        let copy = JSON.parse(JSON.stringify(history[i].payload));
        if ("events" in merged) merged.room.events = {};
        if ("action" in merged) {
            merged.action = [];
        }

        delta.merge(merged, copy);

        if (gamepanel.room.updated != merged?.room?.updated) {
            // gamepanel.room.timerSequence = merged?.timer?.sequence || 0;
            gamepanel.room.endtime = Date.now() + (merged?.room?.timesec * 1000 || 0);
        }
    }

    merged.room_slug = history[0].room_slug;

    if (history.length > startIndex + 1) {
        let nextHistory = history[startIndex + 1];
        let nextCopy = JSON.parse(JSON.stringify(nextHistory.payload));
        let nextMerged = JSON.parse(JSON.stringify(merged));
        delta.merge(nextMerged, nextCopy);

        let nextUpdated = nextMerged.room.updated;
        let currentUpdated = merged.room.updated;

        if (gamepanel.room.updated != merged?.room?.updated) {
            let now = Date.now();
            // gamepanel.room.timerSequence = merged?.timer?.sequence || 0;
            gamepanel.room.starttime = merged?.room?.starttime || 0;
            gamepanel.room.endtime = now + merged?.room?.timesec * 1000;
        }

        replayTimerTriggerNext(room_slug, nextUpdated - currentUpdated);
    }

    merged.room.timeend = gamepanel.room.timeend;

    let players = merged?.players;
    if (!gamepanel.room.replayFollow) {
        let playerIds = Object.keys(players);
        let randomPlayerId = playerIds[Math.floor(Math.random() * playerIds.length)];

        merged.local = players[randomPlayerId];

        gamepanel.room.replayFollow = randomPlayerId;
    } else {
        merged.local = players[gamepanel.room.replayFollow];
    }

    for (let shortid in players) {
        let player = players[shortid];
        player.portrait = `${config.https.cdn}images/portraits/assorted-${
            player.portraitid || 1
        }-medium.webp`;
    }

    merged.room.timeend = gamepanel.room.endtime;

    gamepanel.room.replayIndex = startIndex;
    gamepanel.gamestate = structuredClone(merged);
    updateGamePanel(gamepanel);
    updateRoomStatus(room_slug);
    if (iframe?.current?.contentWindow) iframe.current.contentWindow.postMessage(merged, "*");
}

export function replaySendGameStart(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    let iframe = gamepanel.iframe;

    if (!iframe) return false;

    let history = gamepanel.room.history;
    if (!(history || history.length == 0)) {
        //    iframe.resize();
        return false;
    }

    //find gamestart index
    let replayStartIndex = 0;
    for (let i = 0; i < history.length; i++) {
        let gamestate = history[i];
        if (gamestate?.payload?.room?.status == "gamestart") {
            replayStartIndex = i;
            break;
        }
    }

    gamepanel.room.replayStarted = true;
    gamepanel.room.replayStartIndex = replayStartIndex;
    gamepanel.room.timeend = Date.now() + (gamepanel.room.timesec || 0);
    //gamepanel.gamestate = merged;
    //updateGamePanel(gamepanel);

    replayJumpToIndex(room_slug, replayStartIndex);
}

export async function recvFrameMessage(evt) {
    let action = evt.data;
    let origin = evt.origin;
    let source = evt.source;

    let iframe = getFrameByEvent(evt);

    if (!action.type) return;

    let gamepanel = findGamePanelByIFrame(iframe);
    if (!gamepanel) return;
    // console.log('[iframe]: ', action);

    let room_slug = gamepanel.room.room_slug;
    let gamestate = gamepanel.gamestate;

    if (!gamepanel || !gamepanel.active) return;

    if (action.type == "ready") {
        if (gamepanel.room.isReplay && !gamepanel.room.replayStarted) {
            // replaySendGameStart(room_slug);
        } else {
            fastForwardMessages(room_slug);
            refreshGameState(room_slug);

            let gamestatus = gamestate?.room?.status;
            if (gamestatus && gamestatus != "pregame") {
                return;
            }
        }
    }

    //game loaded
    if (action.type == "loaded") {
        setTimeout(() => {
            gamepanel.loaded = true;
            updateRoomStatus(room_slug);
            updateGamePanel(gamepanel);

            btShowLoadingBox.assign({ [gamepanel.id]: false });
            if (gamepanel.room.isReplay) {
                // setTimeout(() => {
                replaySendGameStart(room_slug);
                // }, 1000)
            }
        }, 300);
        return;
    }

    if (gamepanel.room.isReplay) return;

    // let msg = data.payload;
    // if (msg.indexOf("Hello") > -1) {
    //     this.send('connected', 'Welcome to 5SG!');
    // }

    // if (ws) {
    // console.time('ActionLoop');

    action.room_slug = room_slug;
    // if (gamestate && gamestate.timer)
    //     action.timeseq = gamestate.timer.sequence || 0;
    // else action.timeseq = 0;
    // if (action.payload && action.payload.cell) {
    //     action.payload.cell = 100;
    // }
    let byteLen = await wsSend(action);
    console.log("[Outgoing] Action:", "[" + byteLen + " bytes]", action);
    // }
}

export async function wsSendFAKE(action) {
    latencyStart = new Date().getTime();

    setTimeout(() => {
        wsSend(action);
    }, forcedLatency);
}

export async function wsSend(action) {
    let ws = btWebsocket.get();
    if (!ws || !action) return false;

    try {
        let buffer = ACOSEncoder.encode(action);
        ws.send(buffer);
        return buffer.byteLength;
    } catch (e) {
        console.error(e);
        return false;
    }

    return true;
}

// export async function parseCookies() {
//     let cookies = {};
//     document.cookie.split(';').forEach(v => {
//         let pair = v.split('=');
//         if (!pair || !pair[0])
//             return;

//         cookies[pair[0].trim()] = pair[1].trim();
//     })
//     return cookies;
// }

var reconnectTimeout = 0;

export async function disconnect() {
    let ws = btWebsocket.get();
    if (!ws) return;

    ws.close();

    btWebsocket.set(null);
    console.log("Disconnected from server.");
}
export async function reconnect(skipQueues) {
    let ws = btWebsocket.get();
    if (ws && ws.isReady) {
        return ws;
    }

    let duplicatetabs = btDuplicateTabs.get();
    if (duplicatetabs) {
        btChatToggle.set(false);
        return null;
    }

    // if (queues.length == 0 && !isNew && (!rooms || Object.keys(rooms).length == 0))
    //     return disconnect();

    try {
        // if (reconnectTimeout)
        //     clearTimeout(reconnectTimeout);
        // reconnectTimeout = setTimeout(async () => {
        ws = await wsConnect();
        // }, 500);

        if (!skipQueues && isUserLoggedIn()) wsRejoinQueues();
    } catch (e) {
        console.error(e);
        return null;
    }

    return ws;
}

export async function wsLeaveGame(room_slug) {
    let ws = btWebsocket.get();
    if (!ws || !ws.isReady) {
        setRoomActive(room_slug, false);
        return;
    }

    let action = { type: "leave", room_slug };
    let byteLen = await wsSend(action);
    console.log("[Outgoing] Leaving:", "[" + byteLen + " bytes]", action);

    setRoomActive(room_slug, false);
    revertBrowserTitle();
    sendPauseMessage(room_slug);
}

export async function wsLeaveQueue() {
    setLastJoinType("");
    await clearGameQueues();

    btJoinQueues.set(null);
    localStorage.removeItem("joinqueues");
    let action = { type: "leavequeue" };
    let byteLen = await wsSend(action);

    // await disconnect();

    console.log("[Outgoing] Leave Queue:", "[" + byteLen + " bytes]");
}

export async function wsRejoinQueues() {
    if (!(await validateLogin())) return;

    let joinqueues = getJoinQueues() || {};
    let user = btUser.get();

    let jqs = joinqueues.queues || [];
    if (jqs.length > 0 && user) wsJoinQueues(joinqueues.queues, joinqueues.owner);
}

export async function wsJoinQueues(queues, owner, attempt) {
    attempt = attempt || 1;

    let joinQueues = { queues, owner };
    btJoinQueues.set(joinQueues);
    localStorage.setItem("joinqueues", JSON.stringify(joinQueues));

    if (attempt > 10) return false;

    if (!(await validateLogin())) return false;

    if (!queues || queues.length == 0 || !queues[0].game_slug) {
        console.error("Queues is invalid.", queues);
        return false;
    }

    let currentQueues = btQueues.get() || [];
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

    btQueues.set(queues);

    return true;
}

export async function wsJoinGame(mode, game_slug) {
    if (!(await validateLogin())) return false;

    let ws = await reconnect(true);
    if (!ws || !ws.isReady) {
        return;
    }

    if (!game_slug) {
        console.error("Game [" + game_slug + "] is invalid.  Something went wrong.");
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

    console.log("[Outgoing] Joining " + mode + ":", "[" + byteLen + " bytes]", action);

    sendPing(ws);
}

export async function wsSpectateGame(game_slug) {
    let ws = await reconnect(true);
    if (!ws || !ws.isReady || !game) {
        return;
    }

    if (!game_slug) {
        console.error("Game [" + game_slug + "] is invalid.  Something went wrong.");
        return;
    }

    let action = { type: "spectate", payload: { game_slug } };
    let byteLen = await wsSend(action);

    console.log("[Outgoing] Spectating [" + game_slug + "]:", "[" + byteLen + " bytes]", action);
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

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function validateLogin() {
    let user = await getUser();

    if (!user && !isUserLoggedIn()) {
        login();

        return false;
    }
    return true;
}

export function wsConnect(url, onMessage, onOpen, onError) {
    return new Promise(async (rs, rj) => {
        let ws = btWebsocket.get();
        let user = btUser.get() || { token: "LURKER" };
        btWebsocketConnected.set(false);

        console.log("CONNECT #1", ws, user);
        // if (!user) {
        //     //let ws = await reconnect();
        //     rs(ws);
        //     return;
        // }
        //if connecting or open, don't try to connect
        if (ws && ws.readyState <= 1) {
            //let ws = await reconnect();
            console.log("CONNECT #2");
            rs(ws);
            return;
        }

        // let cookies = parseCookies();
        url = config.https.ws;
        var client = new W3CWebSocket(
            url || "ws://127.0.0.1:9002",
            user.token,
            "http://localhost:3000",
            {}
        );
        client.binaryType = "arraybuffer";
        client.isReady = false;

        client.onopen =
            onOpen ||
            ((err) => {
                console.log(err);
                console.log("WebSocket Client Connected");
                console.log("CONNECT #4");
                if (rs) rs(client);

                if (client.readyState == client.OPEN) {
                    client.isReady = true;
                    sendPing(client);
                }

                btDuplicateTabs.set(false);
                btWebsocketConnected.set(true);
                // wsRejoinRooms();

                var currentdate = new Date();
                var datetime =
                    "WS Opened: " +
                    currentdate.getDate() +
                    "/" +
                    (currentdate.getMonth() + 1) +
                    "/" +
                    currentdate.getFullYear() +
                    " @ " +
                    currentdate.getHours() +
                    ":" +
                    currentdate.getMinutes() +
                    ":" +
                    currentdate.getSeconds() +
                    "." +
                    currentdate.getMilliseconds();
                console.log(datetime);
            });

        client.onclose = async (evt) => {
            console.log("CONNECT #5");
            console.log(evt);
            client.isReady = false;
            btWebsocketConnected.set(false);
            var currentdate = new Date();
            var datetime =
                "WS Closed: " +
                currentdate.getDate() +
                "/" +
                (currentdate.getMonth() + 1) +
                "/" +
                currentdate.getFullYear() +
                " @ " +
                currentdate.getHours() +
                ":" +
                currentdate.getMinutes() +
                ":" +
                currentdate.getSeconds() +
                "." +
                currentdate.getMilliseconds();
            console.log(datetime);

            if (rj) rj(evt);
            // clearRooms();
            await reconnect();
        };
        client.onerror =
            onError ||
            (async (error, data) => {
                console.log("CONNECT #6");
                console.error(error);
                if (rj) rj(error);

                btWebsocketConnected.set(false);
                var currentdate = new Date();
                var datetime =
                    "WS Errored: " +
                    currentdate.getDate() +
                    "/" +
                    (currentdate.getMonth() + 1) +
                    "/" +
                    currentdate.getFullYear() +
                    " @ " +
                    currentdate.getHours() +
                    ":" +
                    currentdate.getMinutes() +
                    ":" +
                    currentdate.getSeconds() +
                    "." +
                    currentdate.getMilliseconds();
                console.log(datetime);
                await reconnect();
            });

        client.onmessage = onMessage || wsIncomingMessage;

        btWebsocket.set(client);
    });
}

var latencyStart = 0;
var latency = 0;

async function sendPing(ws) {
    latencyStart = new Date().getTime();
    let action = { type: "ping", payload: latencyStart };

    let byteLen = await wsSend(action);
    console.log("[Outgoing] Ping:", "[" + byteLen + " bytes]", action);
}

function onPong(message) {
    let serverOffset = message.payload.offset;
    let serverTime = message.payload.serverTime;
    let currentTime = new Date().getTime();
    latency = currentTime - latencyStart;
    let offsetTime = serverTime - currentTime;
    // let halfLatency = Math.ceil(latency / 2);
    // let realTime = currentTime + offsetTime + halfLatency;
    console.log("Latency Start: ", latencyStart);
    console.log("Latency: ", latency);
    console.log("Offset Time: ", offsetTime);
    console.log("Server Offset: ", serverOffset);
    console.log("Server Time: ", serverTime);
    console.log("Client Time: ", currentTime);
    // console.log('Real Time: ', realTime);

    btLatency.set(latency);
    btServerOffset.set(serverOffset);
    btOffsetTime.set(offsetTime);
    btPlayerCount.set(message.playerCount || 0);
}

async function wsIncomingMessageFAKE(message) {
    setTimeout(() => {
        wsIncomingMessage(message);
    }, forcedLatency);
}

export function downloadReplay(game_slug) {
    return new Promise(async (rs, rj) => {
        try {
            let url = `${config.https.cdn}g/test-game-3/replays/7/rank/1661646594335.json`;

            let response = await GET(url);
            let jsonStr = response.data;

            rs(jsonStr);

            // fetch(url)
            //     .then(response => {
            //         if (!response.ok) {
            //             console.error("Failed to download JSON replay");
            //         }
            //         return response.json();
            //     })
            //     .then(data => {
            //         rs(data);
            //     })
            //     .catch(err => {
            //         rj(err);
            //     })
        } catch (e) {
            rj(e);
        }
    });
}

export function updateBrowserTitle(title) {
    document.title = title;

    let oldFavicon = document.querySelector("link[rel=icon]");
    var link = document.createElement("link");
    link.id = "favicon";
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = "/play-favicon.ico";
    if (oldFavicon) {
        document.head.removeChild(oldFavicon);
    }
    document.head.appendChild(link);
}

export function revertBrowserTitle() {
    document.title = "ACOS Online";

    let oldFavicon = document.querySelector("link[rel=icon]");
    var link = document.createElement("link");
    link.id = "favicon";
    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = "/favicon.ico";
    if (oldFavicon) {
        document.head.removeChild(oldFavicon);
    }
    document.head.appendChild(link);
}

async function wsIncomingMessage(message) {
    let user = btUser.get();
    let history = btHistory.get();

    let buffer = await message.data;
    let msg = ACOSEncoder.decode(buffer);
    if (!msg) {
        console.error("Error: Unable to decode buffer of size " + buffer.byteLength);
        return;
    }

    switch (msg.type) {
        case "chat":
            console.log("[ChatMessage]:", msg);
            addChatMessage(msg);
            return;
        case "xp":
            console.log("[XP]:", msg);
            btExperience.set(msg.payload);
            let level = msg.payload.level + msg.payload.points / 1000;
            btUser.assign({ level });
            return;
        case "achievements":
            console.log("[Achievements]:", msg);

            let achievements = msg.payload;
            let game_slug = msg.game_slug;

            let game = btGame.get();
            if (game.game_slug == game_slug) {
                for (let a of game.achievements) {
                    if (a.achievement_slug in achievements) {
                        Object.assign(a, achievements[a.achievement_slug]);
                    }
                }
            }

            btGame.assign({ achievements: game.achievements });

            // btExperience.set(msg.payload);
            // let level = msg.payload.level + msg.payload.points / 1000;
            // btUser.assign({ level });
            return;
        case "rankings":
            console.log("[rankings]:", msg);
            btRankingUpdate.set(msg.payload);
        case "queueStats":
            console.log("[queueStats]:", "[" + buffer.byteLength + " bytes]", msg);
            onQueueStats(msg);
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

            return;
        case "removedQueue":
            console.log(
                "[Incoming] queue:",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            await wsLeaveQueue();

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
            if (msg.payload && Array.isArray(msg.payload) && msg.payload.length > 0) {
                if (!msg.payload || msg.payload.length == 0) {
                    console.log("No rooms found.");
                    return;
                }

                let multiplayerRoom = msg.payload.find((roomInfo) => roomInfo.room.maxplayers > 1);

                if (multiplayerRoom) {
                    addRooms([multiplayerRoom]);
                    msg.payload.forEach((roomInfo) => {
                        if (roomInfo == multiplayerRoom) return;
                        setRoomForfeited(roomInfo.room.room_slug);
                        wsLeaveGame(roomInfo.room.room_slug);
                    });

                    msg.payload = multiplayerRoom.gamestate;
                    msg.room_slug = multiplayerRoom.room?.room_slug;
                    clearGameQueues();
                } else {
                    addRooms(msg.payload);
                }

                setLastJoinType("");
                timerLoop();

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

            if (msg.room.maxplayers > 1) clearGameQueues();

            setLastJoinType("");

            // gamestate = msg.payload || {};

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
        case "gamecancelled":
            console.log(
                "[Incoming] Game Cancelled!",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            break;
        case "gameerror":
            console.log(
                "[Incoming] Game Error!",
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
            clearGameQueues();
            setLastJoinType("");
            break;
        case "duplicatetabs":
            console.log(
                "[Incoming] ERROR :: Duplicate Tabs:: ",
                "[" + buffer.byteLength + " bytes]",
                JSON.parse(JSON.stringify(msg, null, 2))
            );
            btDuplicateTabs.set(true);
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
        let gamepanel = findGamePanelByRoom(msg.room_slug || msg.room.room_slug);
        let room = gamepanel?.room;
        let gamestate = gamepanel?.gamestate; //JSON.parse(JSON.stringify(gamepanel?.gamestate));
        if (!gamestate) return;

        // console.log("[Previous State]: ", gamestate);
        if (msg.type == "private") {
            let player = gamestate.players[user.shortid];
            player = delta.merge(player, msg.payload);

            // getRoom(msg.room_slug);
            //UPDATE PLAYER STATS FOR THIS GAME
            if (room?.mode == "rank" && msg?.payload?._played) {
                let player_stat = btPlayerStats.get((bucket) => bucket[room.game_slug]);
                // let player_stat = player_stats[room.game_slug]
                if (player_stat) {
                    if (msg.payload._win) player_stat.win = msg.payload._win;
                    if (msg.payload._loss) player_stat.loss = msg.payload._loss;
                    if (msg.payload._tie) player_stat.tie = msg.payload._tie;
                    if (msg.payload._played) player_stat.played = msg.payload._played;
                    // if (msg.payload.rating)
                    //     player_stat.rating = player.rating;
                    // if (player.ratingTxt)
                    //     player_stat.ratingTxt = player.ratingTxt;
                }
                btPlayerStats.assign({ [room.game_slug]: player_stat });
            }

            gamestate.players[user.shortid] = player;
            // gamestate.deltaPrivate = msg.payload;
            updateGamePanel(gamepanel);
            return;
        } else {
            if (msg.payload?.room?.timeend) {
                let latency = btLatency.get() || 0;
                let offsetTime = btOffsetTime.get() || 0;
                let extra = 30; //for time between WS and gameserver
                msg.payload.room.timeend += -offsetTime - latency / 2 - extra;
            }

            gamestate.action = {};
            gamestate.room.events = {};

            let deltaState = JSON.parse(JSON.stringify(msg.payload));
            let mergedState = JSON.parse(JSON.stringify(msg.payload));
            mergedState = delta.merge(gamestate, mergedState);
            // msg.payload.delta = deltaState;

            mergedState.delta = deltaState;

            gamepanel.gamestate = structuredClone(mergedState);
            console.log("[FULL GAMESTATE]", mergedState);

            if (gamepanel.gamestate.players) {
                for (const id in gamepanel.gamestate.players) {
                    gamepanel.gamestate.players[id].id = id;
                    gamepanel.gamestate.players[
                        id
                    ].portrait = `https://assets.acos.games/images/portraits/assorted-${
                        gamepanel?.gamestate?.players[id]?.portraitid || 1
                    }-medium.webp`;
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
    let gamepanel = findGamePanelByRoom(msg.room_slug || msg.room.room_slug);
    let room = gamepanel.room;
    // let gamestate = gamepanel.gamestate;

    switch (msg.type) {
        case "gameover":
            let user = btUser.get();
            if (room.mode == "rank") {
                let player = msg.payload.players[user.shortid];

                let player_stat = btPlayerStats.get((bucket) => bucket[room.game_slug]);
                // let player_stat = player_stats[room.game_slug] || {};
                if (player_stat) {
                    if (player.rating) player_stat.rating = player.rating;
                    //if (player.ratingTxt)
                    //    player_stat.ratingTxt = player.ratingTxt;
                    // player_stats[room.game_slug] = player_stat;
                }
                btPlayerStats.assign({ [room.game_slug]: player_stat });

                // if (room?.maxplayers > 1)
                //     findGameLeaderboard(room.game_slug);

                // if (room?.lbscore || room?.maxplayers == 1) {
                //     findGameLeaderboardHighscore(room.game_slug);
                // }
            }
            break;
        case "gamecancelled":
            break;
        case "gameerror":
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
    // disconnect()
}
