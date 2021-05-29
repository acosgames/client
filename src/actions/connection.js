

import { w3cwebsocket as W3CWebSocket } from "websocket";
import { encode, decode } from 'fsg-shared/util/encoder';
import fs from 'flatstore';

fs.set('iframe', null);
fs.set('ws', null);
fs.set('game', null);


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

export function sendFrameMessage(action, payload) {
    let iframe = fs.get('iframe');
    if (iframe)
        iframe.contentWindow.postMessage({ action, payload }, '*');
}


export function recvFrameMessage(evt) {
    let action = evt.data;
    let origin = evt.origin;
    let source = evt.source;
    if (!action.payload || !action.type) return;
    console.log('Received from origin:' + origin, action);
    // let msg = data.payload;
    // if (msg.indexOf("Hello") > -1) {
    //     this.send('connected', 'Welcome to 5SG!');
    // }

    let ws = fs.get('ws');

    if (ws) {
        let buffer = encode(action);
        console.log("Sending Action: ", action);
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
export async function wsJoinGame(game_slug, private_key) {
    let ws = fs.get('ws');
    let game = fs.get('game');
    if (!ws || !ws.isReady || game) {
        return;
    }

    await reconnect();

    let action = { type: 'join', game_slug, payload: {private_key} }
    if (private_key)
        action.private_key = private_key;
    let msg = encode(action);
    console.log("Joining: ", action);
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
    client.isReady = false;

    client.onopen = onOpen || ((err) => {
        console.log(err);
        console.log('WebSocket Client Connected');

        if (client.readyState == client.OPEN) {
            client.isReady = true;
        }

    });

    client.onclose = (evt) => {
        console.log(evt);
        client.isReady = false;
    }
    client.onerror = onError || ((error) => {
        console.error(error);
    });

    client.onmessage = onMessage || wsIncomingMessage;

    fs.set('ws', client);

    return client;
}

async function wsIncomingMessage(message) {
    let user = fs.get('user');
    let ws = fs.get('ws');
    let buffer = await message.data.arrayBuffer();
    let msg = decode(buffer);
    console.log("Recevied Message: ", msg);

    let localPlayer = msg.players[user.userid];
    // if (localPlayer) note.textContent = 'Status: ingame';
    console.log('Game: ', msg);

    msg.local = Object.assign({}, user, localPlayer);
    sendFrameMessage(msg);
}