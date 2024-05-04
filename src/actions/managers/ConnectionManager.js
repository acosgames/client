import { btUser } from "../buckets";

const websocketClient = null;


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
        let buffer = ACOSEncoder.encode(action);
        ws.send(buffer);
        return buffer.byteLength;
    }
    catch (e) {
        console.error(e);
        return false;
    }

    return true;
}

var latencyStart = 0;
var latency = 0;

async function sendPing(ws) {
    latencyStart = new Date().getTime();
    let action = { type: 'ping', payload: latencyStart }

    let byteLen = await wsSend(action);
    console.log("[Outgoing] Ping:", '[' + byteLen + ' bytes]', action);
}

function onPong(message) {
    let serverOffset = message.payload.offset;
    let serverTime = message.payload.serverTime;
    let currentTime = new Date().getTime();
    latency = currentTime - latencyStart;
    let offsetTime = serverTime - currentTime;
    // let halfLatency = Math.ceil(latency / 2);
    // let realTime = currentTime + offsetTime + halfLatency;
    console.log('Latency Start: ', latencyStart);
    console.log('Latency: ', latency);
    console.log('Offset Time: ', offsetTime);
    console.log('Server Offset: ', serverOffset);
    console.log('Server Time: ', serverTime);
    console.log('Client Time: ', currentTime);
    // console.log('Real Time: ', realTime);
    fs.set('latency', latency);
    fs.set('serverOffset', serverOffset);
    fs.set('offsetTime', offsetTime);
    fs.set('playerCount', message.playerCount || 0);
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

    ws.close();

    fs.set('ws', null);
    console.log("Disconnected from server.");
}
export async function reconnect(skipQueues) {
    let ws = fs.get('ws');
    if (ws && ws.isReady) {
        return ws;
    }


    let duplicatetabs = fs.get('duplicatetabs');
    if (duplicatetabs) {
        fs.set('chatToggle', false);
        return null;
    }
    // let queues = fs.get('queues') || localStorage.getItem('queues') || [];
    // let rooms = fs.get('rooms');
    // if (queues.length == 0 && !isNew && (!rooms || Object.keys(rooms).length == 0))
    //     return disconnect();


    try {
        // if (reconnectTimeout)
        //     clearTimeout(reconnectTimeout);
        // reconnectTimeout = setTimeout(async () => { 
        ws = await wsConnect();
        // }, 500);

        if (!skipQueues && isUserLoggedIn())
            wsRejoinQueues();
    }
    catch (e) {
        console.error(e);
        return null;
    }

    return ws;
}


export async function validateLogin() {

    let user = await getUser();

    if (!user && !isUserLoggedIn()) {

        login();


        // let history = fs.get('history');
        // history.push('/login');
        // console.log("CONNECT #3")
        return false;
        // await sleep(1000);
    }
    return true;
}

export function wsConnect(url, onMessage, onOpen, onError) {
    return new Promise(async (rs, rj) => {

        let ws = fs.get('ws');
        let user = btUser.get() || { token: 'LURKER' };
        fs.set('wsConnected', false);

        console.log("CONNECT #1", ws, user)
        // if (!user) {
        //     //let ws = await reconnect();
        //     rs(ws);
        //     return;
        // }
        //if connecting or open, don't try to connect
        if (ws && ws.readyState <= 1) {
            //let ws = await reconnect();
            console.log("CONNECT #2")
            rs(ws);
            return;
        }

        // let cookies = parseCookies();
        url = config.https.ws;
        websocketClient = new W3CWebSocket(url || 'ws://127.0.0.1:9002', user.token, 'http://localhost:3000', {});
        websocketClient.binaryType = 'arraybuffer'
        websocketClient.isReady = false;

        websocketClient.onopen = onOpen || defaultOnOpen;
        websocketClient.onclose = defaultOnClose;
        websocketClient.onerror = onError || defaultOnError;
        websocketClient.onmessage = onMessage || wsIncomingMessage;

        fs.set('ws', websocketClient);
    });
}

const defaultOnOpen = (evt) => {
    console.log(evt);
    console.log('WebSocket Client Connected');
    console.log("CONNECT #4")


    if (websocketClient.readyState == websocketClient.OPEN) {
        websocketClient.isReady = true;
        sendPing(websocketClient);
    }


    fs.set('duplicatetabs', false);
    fs.set('wsConnected', true);
    // wsRejoinRooms();

    var currentdate = new Date();
    var datetime = "WS Opened: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds() + "." + currentdate.getMilliseconds();
    console.log(datetime);

    return websocketClient;
}

const defaultOnClose = async (evt) => {
    console.log("CONNECT #5")
    console.log(evt);
    websocketClient.isReady = false;
    // fs.set('gamestate', {});
    fs.set('wsConnected', false);
    var currentdate = new Date();
    var datetime = "WS Closed: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds() + "." + currentdate.getMilliseconds();
    console.log(datetime);

    await reconnect();

    return evt;
}

const defaultOnError = async (error, data) => {
    console.log("CONNECT #6")
    console.error(error);


    fs.set('wsConnected', false);
    var currentdate = new Date();
    var datetime = "WS Errored: " + currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds() + "." + currentdate.getMilliseconds();
    console.log(datetime);
    await reconnect();

    return err;
}
