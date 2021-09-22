

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
    let game = fs.get('game');
    let game_slug = game.game_slug;
    let loaded = fs.get('iframe_' + game_slug);
    if (!loaded) {
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
        action.seq = gamestate.timer.seq;
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
    if (ws && ws.isReady) {
        return ws;
    }

    try {
        ws = await wsConnect();
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
    history.push('/game/' + game.game_slug);
}

export async function wsJoinBetaGame(game, private_key) {
    let ws = await reconnect();
    if (!ws || !ws.isReady || !game) {
        return;
    }

    if (!game || !game.game_slug) {
        console.error("Game is invalid.  Something went wrong.");
        return;
    }

    let action = { type: 'join', payload: { beta: true, game_slug: game.game_slug, private_key } }
    let msg = encode(action);
    fs.set('joining', 'game');
    console.log("[Outgoing] Joining Beta: ", action);
    console.timeEnd('ActionLoop');
    ws.send(msg)
}

export async function wsJoinRoom(room_slug, private_key) {
    let ws = await reconnect();
    if (!ws || !ws.isReady) {
        setTimeout(() => { wsJoinRoom(room_slug) }, 500);
        return;
    }

    if (!room_slug) {
        console.error("Room slug is invalid.  Something went wrong.");
        return;
    }

    let joining = fs.get('joining');
    if (joining == 'game') {
        fs.set('joining', null);
        return;
    }

    let storedRoomSlug = fs.get('room_slug');
    if (storedRoomSlug == room_slug)
        return;

    // let game = fs.get('game');
    let action = { type: 'join', payload: { room_slug, private_key } }
    let msg = encode(action);
    console.log("[Outgoing] Joining Room: ", action);
    ws.send(msg)
}


export async function wsJoinGame(game, private_key) {
    let ws = await reconnect();
    if (!ws || !ws.isReady) {
        return;
    }

    if (!game || !game.game_slug) {
        console.error("Game is invalid.  Something went wrong.");
        return;
    }

    // let game = fs.get('game');
    fs.set('joining', 'game');
    let action = { type: 'join', payload: { game_slug: game.game_slug, private_key } }
    let msg = encode(action);
    console.log("[Outgoing] Joining: ", action);
    ws.send(msg)
}

export function wsConnect(url, onMessage, onOpen, onError) {
    return new Promise((rs, rj) => {
        let ws = fs.get('ws');
        let user = fs.get('user');
        //if connecting or open, don't try to connect
        if (ws && ws.readyState <= 1) {
            rs(ws);
            return;
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
            fs.set('gamestate', {});

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

    if (msg.type == 'pong') {
        onPong(msg);
        return;
    }

    if (msg.type == 'joining') {
        //fs.set('room_slug', msg.room_slug);
        if (!game) {
            console.error("Game not found. Cannot join unknown game.");
            return;
        }
        //let history = useHistory();
        let beta = msg.beta ? '/beta' : '';
        let urlPath = '/game/' + game.game_slug + beta + '/' + msg.room_slug;
        if (window.location.href.indexOf(urlPath) == -1)
            history.push(urlPath);
        //history.push('/game/' + game.game_slug + '/' + msg.room_slug);
        return;
    }

    if (msg.type == 'joined') {
        console.log("[Incoming] Joined: ", msg);
        fs.set('room_slug', msg.room_slug);
        if (!game) {
            console.error("Game not found. Cannot join unknown game.");
            return;
        }

        let beta = msg.beta ? '/beta' : '';
        let urlPath = '/game/' + game.game_slug + beta + '/' + msg.room_slug;
        if (window.location.href.indexOf(urlPath) == -1)
            history.push(urlPath);

        // history.push('/game/' + game.game_slug + '/' + msg.room_slug);
    }
    else if (msg.type == 'join') {
        console.log("[Incoming] Player joined the game!", msg);
    }
    else if (msg.type == 'kicked') {
        console.log("[Incoming] You were kicked from game!", msg);
    }
    else if (msg.type == 'finish') {
        console.log("[Incoming] Game completed!", msg);
        //return;
    }
    else if (msg.type == 'private') {
        console.log("[Incoming] Private State: ", msg);
    }
    else if (msg.type != 'update') {
        console.log("[Incoming] Unknown type: ", msg);
        return;
    }
    else
        console.log("[Incoming] Update: ", msg);

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