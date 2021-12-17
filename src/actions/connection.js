

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { encode, decode } from 'fsg-shared/util/encoder';
import fs from 'flatstore';
import delta from '../util/delta';
// import { useHistory } from 'react-router-dom';
// import history from "./history";
fs.set('iframe', null);
fs.set('ws', null);
fs.set('game', null);
fs.set('gamestate', {});
fs.set('room_slug', null);
fs.set('games', null);

fs.set('queues', []);
fs.set('joinrooms', {})
fs.set('rooms', {});

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

export function sendFrameMessage(msg) {
    let room_slug = msg.room_slug;
    let room = fs.get('rooms>' + room_slug);
    let iframe = fs.get('iframes>' + room_slug);

    let iframeLoaded = fs.get('iframesLoaded>' + room_slug);
    if (!iframeLoaded) {
        setTimeout(() => {
            sendFrameMessage(msg);
        }, 20)
        return;
    }
    if (iframe) {
        //next frame
        // setTimeout(() => {
        iframe.contentWindow.postMessage(msg, '*');
        // }, 1000)

    }

}


export function recvFrameMessage(evt) {
    let action = evt.data;
    let origin = evt.origin;
    let source = evt.source;
    if (!action.payload || !action.type) return;
    console.log('[iframe]: ', action);
    // let msg = data.payload;
    // if (msg.indexOf("Hello") > -1) {
    //     this.send('connected', 'Welcome to 5SG!');
    // }

    let ws = fs.get('ws');

    if (ws) {
        console.time('ActionLoop');
        let room_slug = fs.get('room_slug');
        let gamestate = fs.get('gamestate');
        action.room_slug = room_slug;
        if (gamestate && gamestate.timer)
            action.seq = gamestate.timer.seq || 0;
        else
            action.seq = 0;
        // if (action.payload && action.payload.cell) {
        //     action.payload.cell = 100;
        // }
        let buffer = encode(action);
        console.log("[Outgoing] Action: ", action);
        ws.send(buffer);
    }
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

    let rooms = fs.get('rooms');
    if (!isNew && (!rooms || Object.keys(rooms).length == 0))
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

export async function wsLeaveGame(room_slug) {
    let ws = await reconnect();
    if (!ws || !ws.isReady) {
        return;
    }

    let action = { type: 'leave', room_slug }
    let msg = encode(action);
    console.log("[Outgoing] Leaving: ", action);
    ws.send(msg)
    let history = fs.get('history');
    let game = fs.get('game');
    fs.set('gamestate', {});
    fs.set('room_slug', null);

    await disconnect();

    history.push('/g/' + game.game_slug);
}

export async function wsLeaveQueue() {
    let ws = await reconnect();
    if (!ws || !ws.isReady) {
        return;
    }

    fs.set('queues', []);

    let action = { type: 'leavequeue' }
    let msg = encode(action);
    ws.send(msg);


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
    let msg = encode(action);
    ws.send(msg);

    fs.set('joining', 'game');
    console.log("[Outgoing] Joining " + mode + ": ", action);
    console.timeEnd('ActionLoop');
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

    let joinrooms = fs.get('joinrooms');
    joinrooms[room_slug] = { private_key, game_slug }
    let action = { type: 'joinroom', payload: { game_slug, room_slug, private_key } }
    let msg = encode(action);
    ws.send(msg);

    fs.set('joining', 'game');
    console.log("[Outgoing] Joining room [" + room_slug + "]: ", game_slug, action);
    console.timeEnd('ActionLoop');
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
    let msg = encode(action);
    ws.send(msg);

    fs.set('joining', 'game');
    console.log("[Outgoing] Spectating [" + game_slug + "]: ", action);
    console.timeEnd('ActionLoop');
}

export async function wsJoinBetaGame(game) {
    wsJoinGame('beta', game.game_slug);
}


export async function wsJoinRankedGame(game) {
    wsJoinGame('ranked', game.game_slug);
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

        while (!user) {
            await sleep(1000);
            user = fs.get('user');
        }
        // let cookies = parseCookies();
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

        });

        client.onclose = async (evt) => {
            console.log(evt);
            client.isReady = false;
            // fs.set('gamestate', {});

            if (rj)
                rj(evt);
            await reconnect();
        }
        client.onerror = onError || (async (error, data) => {
            console.error(error);
            if (rj)
                rj(error);
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
    let msg = encode(action);
    console.log("[Outgoing] Ping: ", action);
    ws.send(msg);
}

function onPong(message) {
    let serverOffset = message.payload.offset;
    let serverTime = message.payload.serverTime;
    let currentTime = new Date().getTime();
    latency = currentTime - latencyStart;
    let offsetTime = currentTime - serverTime;
    let realTime = currentTime + offsetTime + Math.ceil(latency / 2);
    console.log('Latency Start: ', latencyStart);
    console.log('Latency: ', latency);
    console.log('Offset Time: ', offsetTime);
    console.log('Server Offset: ', serverOffset);
    console.log('Server Time: ', serverTime);
    console.log('Client Time: ', currentTime);
    console.log('Real Time: ', realTime);
    fs.set('latency', latency);
}

async function wsIncomingMessage(message) {
    let user = fs.get('user');
    let ws = fs.get('ws');
    let game = fs.get('game');
    let gamestate = fs.get('gamestate');
    let history = fs.get('history');

    let buffer = await message.data;
    let msg = decode(buffer);
    if (!msg) {
        console.error("Error: Unable to decode buffer of size " + buffer.byteLength);
        return;
    }

    switch (msg.type) {
        case 'pong':
            onPong(msg);
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
        case 'joined':
            console.log("[Incoming] Joined: ", msg);
            fs.set('room_slug', msg.room_slug);
            if (!game) {
                console.error("Game not found. Cannot join unknown game.");
                return;
            }

            let joinrooms = fs.get('joinrooms');
            delete joinrooms[msg.room_slug];
            fs.set('joinrooms', joinrooms);

            let rooms = fs.get('rooms');
            rooms[msg.room_slug] = msg;
            fs.set('rooms', rooms);

            fs.set('queues', []);

            let beta = msg.mode == 'beta' ? '/beta' : '';
            let urlPath = '/g/' + msg.game_slug + beta + '/' + msg.room_slug;
            if (window.location.href.indexOf(urlPath) == -1)
                history.push(urlPath);
            break;
        case 'join':
            console.log("[Incoming] Player joined the game!", msg);
            break;
        case 'kicked':
            console.log("[Incoming] You were kicked from game!", msg);
            break;
        case 'finish':
            console.log("[Incoming] Game completed!", msg);
            break;
        case 'private':
            console.log("[Incoming] Private State: ", msg);
            break;
        case 'update':
            console.log("[Incoming] Update: ", msg);
            break;
        case 'error':
            console.log("[Incoming] Error: ", msg);
            break;
        default:
            console.log("[Incoming] Unknown type: ", msg);
            return;
    }

    if (msg.payload) {
        console.log("[Previous State]: ", gamestate);
        if (msg.type == 'private') {
            let player = msg.payload.players[user.shortid]
            player = delta.merge(player, msg.payload);
            msg.payload.players[user.shortid] = player;
        }
        else {
            msg.payload = delta.merge(gamestate, msg.payload);
        }
        fs.set('gamestate', msg.payload);
    }

    if (msg.payload.players) {
        msg.local = msg.payload.players[user.shortid];
        msg.local.id = user.shortid;
    } else {
        msg.local = { name: user.displayname, id: user.shortid };
    }

    let out = { local: msg.local, room_slug: msg.room_slug, ...msg.payload };


    console.timeEnd('ActionLoop');
    sendFrameMessage(out);
}