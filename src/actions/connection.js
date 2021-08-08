

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { encode, decode } from 'fsg-shared/util/encoder';
import fs from 'flatstore';

fs.set('iframe', null);
fs.set('ws', null);
fs.set('game', null);
fs.set('room_slug', null);

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
    let iframe = fs.get('iframe');
    if (iframe)
        iframe.contentWindow.postMessage(msg, '*');
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
        action.room_slug = room_slug;
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

export async function reconnect() {
    let ws = fs.get('ws');
    if (!ws || ws.isReady) {
        return;
    }

    await wsConnect();

}

export async function wsLeaveGame(room_slug) {

    let ws = fs.get('ws');
    if (!ws || !ws.isReady) {
        return;
    }

    await reconnect();

    let action = { type: 'leave', room_slug }
    let msg = encode(action);
    console.log("[Outgoing] Leaving: ", action);
    ws.send(msg)

    fs.set('room_slug', null);
}

export async function wsJoinBetaGame(game_slug, private_key) {
    let ws = fs.get('ws');
    let game = fs.get('game');
    if (!ws || !ws.isReady || game) {
        return;
    }

    await reconnect();

    let action = { type: 'join', payload: { beta: true, game_slug, private_key } }
    let msg = encode(action);
    console.log("[Outgoing] Joining Beta: ", action);
    ws.send(msg)
}


export async function wsJoinGame(game_slug, private_key) {
    let ws = fs.get('ws');
    let game = fs.get('game');
    if (!ws || !ws.isReady || game) {
        return;
    }

    await reconnect();

    let action = { type: 'join', payload: { game_slug, private_key } }
    let msg = encode(action);
    console.log("[Outgoing] Joining: ", action);
    ws.send(msg)
}

export async function wsConnect(url, onMessage, onOpen, onError) {

    let ws = fs.get('ws');
    let user = fs.get('user');
    if (ws) {
        return;
    }
    // let cookies = parseCookies();
    var client = new W3CWebSocket(url || 'ws://127.0.0.1:9002', user.apikey, 'http://localhost:3000', {});
    client.binaryType = 'arraybuffer'
    client.isReady = false;

    client.onopen = onOpen || ((err) => {
        console.log(err);
        console.log('WebSocket Client Connected');

        if (client.readyState == client.OPEN) {
            client.isReady = true;
            sendPing(client);
        }

    });

    client.onclose = (evt) => {
        console.log(evt);
        client.isReady = false;
    }
    client.onerror = onError || ((error, data) => {
        console.error(error, data);
    });

    client.onmessage = onMessage || wsIncomingMessage;

    fs.set('ws', client);

    return client;
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
    let buffer = await message.data;
    let msg = decode(buffer);
    if (!msg) {
        console.error("Error: Unable to decode buffer of size " + buffer.byteLength);
        return;
    }

    if (msg.type == 'pong') {
        onPong(msg);
        return;
    }

    if (msg.type == 'join') {
        console.log("[Incoming] Joined: ", msg);
        fs.set('room_slug', msg.room_slug);
    }

    else if (msg.type == 'kicked') {
        console.log("[Incoming] You were kicked from game!", msg);
    }
    else if (msg.type == 'finish') {
        console.log("[Incoming] Game completed!", msg);
        //return;
    }
    else if (msg.type != 'update') {
        console.log("[Incoming] Unknown type: ", msg);
        return;
    }
    console.log("[Incoming] Update: ", msg);

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