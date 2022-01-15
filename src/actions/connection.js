

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { encode, decode, defaultDict } from 'shared/util/encoder';
import { getUser, isUserLoggedIn } from './person';

import config from '../config'

import fs from 'flatstore';
import delta from '../util/delta';
// import { useHistory } from 'react-router-dom';
// import history from "./history";
fs.set('iframe', null);
fs.set('ws', null);
fs.set('game', null);
fs.set('gamestate', {});
fs.set('room_slug', null);
fs.set('games', {});

fs.set('queues', []);
fs.set('joinrooms', {})
fs.set('rooms', {});

// fs.set('offsetTime', 0);
fs.set('latency', 0);

var messageQueue = {};
var onResize = null;

var timerHandle = 0;

var forcedLatency = Math.round(RandRange(50, 200));
// console.log("FORCED LATENCY: ", forcedLatency);
function RandRange(min, max) {
    return Math.random() * (max - min) + min;
}

export function timerLoop(cb) {

    if (cb)
        cb();

    if (timerHandle) {
        clearTimeout(timerHandle);
        timerHandle = 0;
    }


    timerHandle = setTimeout(() => { timerLoop(cb) }, 100);

    let gamestate = fs.get('gamestate') || {};
    let timer = gamestate.timer;
    if (!timer) {
        clearTimeout(timerHandle);
        timerHandle = 0;
        return;

    }

    let deadline = timer.end;
    if (!deadline)
        return;

    let now = (new Date()).getTime();
    let elapsed = deadline - now;

    if (elapsed <= 0) {
        elapsed = 0;
    }

    fs.set('gameTimeleft', elapsed);

    let state = gamestate.state;
    let events = gamestate.events;
    if (events?.gameover || state?.gamestatus == 'gamestart') {
        clearTimeout(timerHandle);
        timerHandle = 0;
        return;
    }
}

export function attachToFrame() {
    window.addEventListener(
        'message',
        recvFrameMessage,
        false
    );
}

export function detachFromFrame() {
    window.removeEventListener('message', recvFrameMessage, false);
}

export function fastForwardMessages() {

    // let room_slug = msg.room_slug;
    let room_slug = fs.get('room_slug');
    let iframes = fs.get('iframes') || {}
    let iframe = iframes[room_slug];

    if (iframe) {

        let gamestate = fs.get('gamestate') || {};
        if (!(gamestate?.state)) {
            onResize();
            return false;
        }
        let mq = messageQueue[room_slug];
        if (mq && mq.length > 0) {
            console.log("Forwarding queued messages to iframe.");
            // for (var i = 0; i < mq.length; i++) {

            //     gamestate = delta.merge(gamestate, mq[i]);
            let last = mq[mq.length - 1];

            // }

            iframe.current.contentWindow.postMessage(last, '*');
            console.log(last);

            delete messageQueue[room_slug];
        }

        onResize();
    }
}

export function sendFrameMessage(msg) {

    let room_slug = msg.room_slug;
    let room = fs.get('rooms>' + room_slug);
    let iframes = fs.get('iframes') || {}
    let iframe = iframes[room_slug];

    // let iframeLoaded = fs.get('iframesLoaded>' + room_slug);
    if (!iframe) {
        if (!messageQueue[room_slug])
            messageQueue[room_slug] = [];

        messageQueue[room_slug].push(msg);
        // setTimeout(() => {
        //     sendFrameMessage(msg);
        // }, 20)
        return;
    }

    if (iframe) {


        //next frame
        // setTimeout(() => {
        iframe.current.contentWindow.postMessage(msg, '*');
        // }, 1000)

    }

}

export function sendLoadMessage(room_slug, game_slug, version, runCallback) {
    onResize = runCallback;
    let iframe = fs.get('iframes>' + room_slug);
    if (iframe)
        iframe.current.contentWindow.postMessage({ type: 'load', payload: { game_slug, version } }, '*');
}

export async function refreshGameState(room_slug) {
    let gamestate = fs.get('gamestate') || {};
    let user = await getUser();
    let iframe = fs.get('iframes>' + room_slug);
    // if (iframe) {
    let local = {};
    if (gamestate?.players) {
        local = gamestate.players[user.shortid];
        if (local)
            local.id = user.shortid;
    } else {
        local = { name: user.displayname, id: user.shortid };
    }

    let out = { local, room_slug, ...gamestate };


    // console.timeEnd('ActionLoop');
    sendFrameMessage(out);
    // }
}


export function recvFrameMessage(evt) {
    let action = evt.data;
    let origin = evt.origin;
    let source = evt.source;
    if (typeof action.payload === 'undefined' || !action.type) return;
    console.log('[iframe]: ', action);

    let room_slug = fs.get('room_slug');
    let gamestate = fs.get('gamestate');
    let iframesLoaded = fs.get('iframesLoaded') || {};

    if (action.type == 'ready') {
        // iframesLoaded[room_slug] = true;
        // fs.set('iframesLoaded', iframesLoaded);

        fastForwardMessages();
        refreshGameState(room_slug);

        let gamestatus = gamestate?.state?.gamestatus;
        if (!gamestatus || gamestatus != 'pregame') {
            return;
        }
    }
    // let msg = data.payload;
    // if (msg.indexOf("Hello") > -1) {
    //     this.send('connected', 'Welcome to 5SG!');
    // }

    // let ws = fs.get('ws');

    // if (ws) {
    // console.time('ActionLoop');

    action.room_slug = room_slug;
    if (gamestate && gamestate.timer)
        action.seq = gamestate.timer.seq || 0;
    else
        action.seq = 0;
    // if (action.payload && action.payload.cell) {
    //     action.payload.cell = 100;
    // }
    wsSend(action);
    console.log("[Outgoing] Action: ", action);
    // }
}

export async function wsSendFAKE(action) {

    latencyStart = new Date().getTime();

    setTimeout(() => {
        wsSend(action);
    }, forcedLatency);
}

export async function wsSend(action) {
    let ws = fs.get('ws');
    if (!ws || !action)
        return false;

    try {
        let buffer = encode(action);
        ws.send(buffer);
    }
    catch (e) {
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
    let ws = fs.get('ws');
    if (!ws)
        return;

    let rooms = fs.get('rooms');
    if (!rooms || Object.keys(rooms).length == 0)
        ws.close();

    fs.set('ws', null);
    console.log("Disconnected from server.");
}
export async function reconnect(isNew) {
    let ws = fs.get('ws');
    if (ws && ws.isReady) {
        return ws;
    }

    let queues = fs.get('queues') || [];
    let rooms = fs.get('rooms');
    if (queues.length == 0 && !isNew && (!rooms || Object.keys(rooms).length == 0))
        return disconnect();


    try {
        // if (reconnectTimeout)
        //     clearTimeout(reconnectTimeout);
        // reconnectTimeout = setTimeout(async () => { 
        ws = await wsConnect();
        // }, 500);
    }
    catch (e) {
        console.error(e);
        return null;
    }

    return ws;
}

export async function wsLeaveGame(game_slug, room_slug) {
    let ws = await reconnect();
    if (!ws || !ws.isReady) {
        return;
    }

    let action = { type: 'leave', room_slug }
    console.log("[Outgoing] Leaving: ", action);
    wsSend(action);

    let history = fs.get('history');
    fs.set('gamestate', {});
    fs.set('room_slug', null);

    await disconnect();

    history.push('/g/' + game_slug);
}

export async function wsLeaveQueue() {
    let ws = await reconnect();
    if (!ws || !ws.isReady) {
        return;
    }

    fs.set('queues', []);

    let action = { type: 'leavequeue' }

    wsSend(action);


    await disconnect();

    console.log("[Outgoing] Leave Queue ", action);
}



export async function wsJoinGame(mode, game_slug) {
    let ws = await reconnect(true);
    if (!ws || !ws.isReady) {
        return;
    }

    if (!game_slug) {
        console.error("Game [" + game_slug + "] is invalid.  Something went wrong.");
        return;
    }

    let queues = fs.get('queues');
    let payload = { mode, game_slug };
    if (!queues.find(q => (q.mode == mode && q.game_slug == game_slug))) {
        queues.push(payload)
        fs.set('queues', queues);
    }

    let action = { type: 'joingame', payload }

    wsSend(action);

    fs.set('joining', 'game');
    console.log("[Outgoing] Joining " + mode + ": ", action);
    // console.timeEnd('ActionLoop');
}

export async function wsJoinRoom(game_slug, room_slug, private_key) {
    let ws = await reconnect(true);
    if (!ws || !ws.isReady) {
        setTimeout(() => { wsJoinRoom(room_slug, private_key); }, 1000);
        return;
    }

    if (!room_slug) {
        console.error("Room [" + room_slug + "] is invalid.  Something went wrong.");
        return;
    }

    gtag('event', 'joinroom', { game_slug: game_slug });

    let joinrooms = fs.get('joinrooms');
    joinrooms[room_slug] = { private_key, game_slug }
    let action = { type: 'joinroom', payload: { game_slug, room_slug, private_key } }
    wsSend(action);
    fs.set('joining', 'game');
    console.log("[Outgoing] Joining room [" + room_slug + "]: ", game_slug, action);
    // console.timeEnd('ActionLoop');
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

    let action = { type: 'spectate', payload: { game_slug } }
    wsSend(action);

    fs.set('joining', 'game');
    console.log("[Outgoing] Spectating [" + game_slug + "]: ", action);
    // console.timeEnd('ActionLoop');
}

export async function wsJoinBetaGame(game) {
    gtag('event', 'join', { mode: 'experimental', game_slug: game.game_slug });
    wsJoinGame('experimental', game.game_slug);
}


export async function wsJoinRankedGame(game) {
    gtag('event', 'join', { mode: 'rank', game_slug: game.game_slug });
    wsJoinGame('rank', game.game_slug);
}

export async function wsJoinPublicGame(game) {
    wsJoinGame('public', game.game_slug);
}

export async function wsJoin(game_slug, room_slug) {
    wsJoinRoom(game_slug, room_slug);
}

export async function wsJoinPrivate(game_slug, room_slug, private_key) {
    wsJoinRoom(game_slug, room_slug, private_key);
}

export async function wsRejoinRoom(game_slug, room_slug, private_key) {
    gtag('event', 'joinroom', { mode: 'rank' });
    wsJoinRoom(game_slug, room_slug, private_key);
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function wsConnect(url, onMessage, onOpen, onError) {
    return new Promise(async (rs, rj) => {
        let ws = fs.get('ws');
        let user = fs.get('user');

        // if (!user) {
        //     //let ws = await reconnect();
        //     rs(ws);
        //     return;
        // }
        //if connecting or open, don't try to connect
        if (ws && ws.readyState <= 1) {
            //let ws = await reconnect();
            rs(ws);
            return;
        }

        if (!isUserLoggedIn()) {
            let history = fs.get('history');
            history.push('/login');
            return;
            // await sleep(1000);
            // user = fs.get('user');
        }



        // let cookies = parseCookies();
        url = config.https.ws;
        var client = new W3CWebSocket(url || 'ws://127.0.0.1:9002', user.token, 'http://localhost:3000', {});
        client.binaryType = 'arraybuffer'
        client.isReady = false;

        client.onopen = onOpen || ((err) => {
            console.log(err);
            console.log('WebSocket Client Connected');

            if (rs)
                rs(client);

            if (client.readyState == client.OPEN) {
                client.isReady = true;
                sendPing(client);
            }

            var currentdate = new Date();
            var datetime = "WS Opened: " + currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds() + "." + currentdate.getMilliseconds();
            console.log(datetime);

        });

        client.onclose = async (evt) => {
            console.log(evt);
            client.isReady = false;
            // fs.set('gamestate', {});

            var currentdate = new Date();
            var datetime = "WS Closed: " + currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds() + "." + currentdate.getMilliseconds();
            console.log(datetime);

            if (rj)
                rj(evt);
            await reconnect();
        }
        client.onerror = onError || (async (error, data) => {
            console.error(error);
            if (rj)
                rj(error);

            var currentdate = new Date();
            var datetime = "WS Errored: " + currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds() + "." + currentdate.getMilliseconds();
            console.log(datetime);
            await reconnect();
        });

        client.onmessage = onMessage || wsIncomingMessage;

        fs.set('ws', client);
    });
}

var latencyStart = 0;
var latency = 0;

function sendPing(ws) {
    latencyStart = new Date().getTime();
    let action = { type: 'ping', payload: latencyStart }

    console.log("[Outgoing] Ping: ", action);
    wsSend(action);
}

function onPong(message) {
    let serverOffset = message.payload.offset;
    let serverTime = message.payload.serverTime;
    let currentTime = new Date().getTime();
    latency = currentTime - latencyStart;
    // let offsetTime = serverTime - currentTime;
    // let halfLatency = Math.ceil(latency / 2);
    // let realTime = currentTime + offsetTime + halfLatency;
    console.log('Latency Start: ', latencyStart);
    console.log('Latency: ', latency);
    // console.log('Offset Time: ', offsetTime);
    console.log('Server Offset: ', serverOffset);
    console.log('Server Time: ', serverTime);
    console.log('Client Time: ', currentTime);
    // console.log('Real Time: ', realTime);
    fs.set('latency', latency + 15); //add 15 for the time between WSserver and gameserver
    // fs.set('offsetTime', offsetTime);
}

async function wsIncomingMessageFAKE(message) {

    setTimeout(() => {
        wsIncomingMessage(message);
    }, forcedLatency);

}
async function wsIncomingMessage(message) {
    let user = fs.get('user');
    let gamestate = fs.get('gamestate');
    let history = fs.get('history');

    let buffer = await message.data;
    let msg = decode(buffer);
    if (!msg) {
        console.error("Error: Unable to decode buffer of size " + buffer.byteLength);
        return;
    }

    let rooms = fs.get('rooms');
    let room_slug = msg.room_slug;
    let room = null;
    if (room_slug) {
        room = rooms[room_slug];
    }
    switch (msg.type) {
        case 'pong':
            onPong(msg);
            return;
        case 'ready':
            console.log("iframe is ready!");
            return;
        case 'notexist':
            let currentPath = window.location.href;
            let currentParts = currentPath.split('/g/');
            if (currentParts.length > 1) {
                let gamemode = currentParts[1].split('/');
                let game_slug = gamemode[0];

                history.push('/g/' + game_slug);
            }

            break;

        case 'inrooms':
            console.log("[Incoming] InRooms: ", JSON.parse(JSON.stringify(msg, null, 2)));
            if (msg.payload && Array.isArray(msg.payload) && msg.payload.length > 0) {
                let room = msg.payload[0];

                fs.set('room_slug', room.room_slug);
                if (!room) {
                    console.error("Game not found. Cannot join unknown game.");
                    return;
                }

                let joinrooms = fs.get('joinrooms');
                if (joinrooms[room.room_slug])
                    delete joinrooms[room.room_slug];
                fs.set('joinrooms', joinrooms);

                let rooms = fs.get('rooms');
                rooms[room.room_slug] = room;
                fs.set('rooms', rooms);

                fs.set('queues', []);

                if (window.location.href.indexOf(room.room_slug) > -1) {
                    if (room.payload)
                        fs.set('gamestate', room.payload || {});
                }


                let experimental = room.mode == 'experimental' ? '/experimental' : '';
                let urlPath = '/g/' + room.game_slug + experimental + '/' + room.room_slug;
                if (window.location.href.indexOf(urlPath) == -1)
                    history.push(urlPath);
                return;
            }
            break;
        case 'joined':
            console.log("[Incoming] Joined: ", JSON.parse(JSON.stringify(msg, null, 2)));
            fs.set('room_slug', msg.room_slug);
            // if (!room) {
            //     console.error("Game not found. Cannot join unknown game.");
            //     return;
            // }

            gtag('event', 'joined', { game_slug: msg.game_slug });
            let joinrooms = fs.get('joinrooms');
            delete joinrooms[msg.room_slug];
            fs.set('joinrooms', joinrooms);

            let rooms = fs.get('rooms');
            rooms[msg.room_slug] = msg;
            fs.set('rooms', rooms);

            fs.set('queues', []);
            fs.set('gamestate', msg.payload || {});
            gamestate = msg.payload || {};

            timerLoop();

            let experimental = msg.mode == 'experimental' ? '/experimental' : '';
            let urlPath = '/g/' + msg.game_slug + experimental + '/' + msg.room_slug;
            if (window.location.href.indexOf(urlPath) == -1)
                history.push(urlPath);
            break;
        case 'join':
            console.log("[Incoming] Player joined the game!", JSON.parse(JSON.stringify(msg, null, 2)));
            break;
        case 'kicked':
            console.log("[Incoming] You were kicked from game!", JSON.parse(JSON.stringify(msg, null, 2)));
            break;
        case 'gameover':
            console.log("[Incoming] Game Over!", JSON.parse(JSON.stringify(msg, null, 2)));
            break;
        case 'private':
            console.log("[Incoming] Private State: ", JSON.parse(JSON.stringify(msg, null, 2)));
            break;
        case 'update':
            console.log("[Incoming] Update: ", JSON.parse(JSON.stringify(msg, null, 2)));
            break;
        case 'error':
            console.log("[Incoming] Error: ", JSON.parse(JSON.stringify(msg, null, 2)));
            break;
        default:
            console.log("[Incoming] Unknown type: ", JSON.parse(JSON.stringify(msg, null, 2)));
            return;
    }

    if (msg.payload) {
        // console.log("[Previous State]: ", gamestate);
        if (msg.type == 'private') {
            let player = gamestate.players[user.shortid]
            player = delta.merge(player, msg.payload);

            let rooms = fs.get('rooms');
            let room = rooms[msg.room_slug];
            //UPDATE PLAYER STATS FOR THIS GAME
            if (room.mode == 1 && msg.payload._played) {
                let player_stats = fs.get('player_stats');
                let player_stat = player_stats[room.game_slug]
                if (player_stat) {
                    if (msg.payload._win)
                        player_stat.win = msg.payload._win;
                    if (msg.payload._loss)
                        player_stat.loss = msg.payload._loss;
                    if (msg.payload._tie)
                        player_stat.tie = msg.payload._tie;
                    if (msg.payload._played)
                        player_stat.played = msg.payload._played;
                    if (msg.payload.rating)
                        player_stat.rating = player.rating;
                    if (player.ratingTxt)
                        player_stat.ratingTxt = player.ratingTxt;

                }
                fs.set('player_stats', player_stats);
            }

            gamestate.players[user.shortid] = player;
            fs.set('gamestate', gamestate);
            return;
        }
        else {

            if (msg.payload?.timer?.end) {
                let latency = fs.get('latency') || 0;
                msg.payload.timer.end -= latency;
            }

            msg.payload = delta.merge(gamestate, msg.payload);

            fs.set('gamestate', msg.payload);
        }

    }

    if (msg.payload && msg.payload.players) {
        msg.local = msg.payload.players[user.shortid];
        if (msg.local)
            msg.local.id = user.shortid;
    } else {
        msg.local = { name: user.displayname, id: user.shortid };
    }

    let out = { local: msg.local, room_slug: msg.room_slug, ...msg.payload };


    // console.timeEnd('ActionLoop');
    sendFrameMessage(out);

    postIncomingMessage(msg)
}

async function postIncomingMessage(msg) {
    switch (msg.type) {
        case 'gameover':
            let rooms = fs.get('rooms');
            let room = rooms[msg.room_slug];
            let gamestate = fs.get('gamestate');
            let user = fs.get('user');

            if (room.mode == 1) {
                let player = msg.payload.players[user.shortid];

                let player_stats = fs.get('player_stats');
                let player_stat = player_stats[room.game_slug] || {};
                if (player_stat) {
                    if (player.rating)
                        player_stat.rating = player.rating;
                    if (player.ratingTxt)
                        player_stat.ratingTxt = player.ratingTxt;
                    player_stats[room.game_slug] = player_stat;
                }
                fs.set('player_stats', player_stats);
            }


            // fs.set('gamestate', {});

            break;
        case 'error':
            fs.set('gamestate', {});
            break;
        case 'kicked':
            fs.set('gamestate', {});
            break;
        case 'join':

            break;
    }
}

