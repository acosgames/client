let messageQueue = {};

export function attachToFrame() {
    window.addEventListener("message", recvFrameMessage, false);
}

export function detachFromFrame() {
    window.removeEventListener("message", recvFrameMessage, false);
}

export function setIFrameLoaded(room_slug, loaded) {
    let iframes = fs.get("iframes");
    if (!(room_slug in iframes)) {
        return false;
    }
    iframes[room_slug].loaded = loaded;
    fs.set("iframes>" + room_slug, { element: iframeRef, loaded: false });
    return true;
}

export function setIFrame(room_slug, iframeRef) {
    let iframes = fs.get("iframes");
    // iframes[room_slug] = ;
    fs.set("iframes>" + room_slug, { element: iframeRef, loaded: false });
}

export function getIFrame(room_slug) {
    let iframes = fs.get("iframes");
    let iframe = iframes[room_slug];
    return iframe;
}

export function fastForwardMessages(room_slug) {
    // let room_slug = msg.room_slug;
    // let room_slug = getCurrentRoom();
    let gamepanel = findGamePanelByRoom(room_slug);
    let iframe = gamepanel.iframe;

    if (!iframe) return false;

    let gamestate = gamepanel.gamestate; // fs.get('gamestate') || {};
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

export async function recvFrameMessage(evt) {
    let action = evt.data;
    let origin = evt.origin;
    let source = evt.source;

    let iframe = getFrameByEvent(evt);

    if (!action.type) return;

    let gamepanel = findGamePanelByIFrame(iframe);

    // console.log('[iframe]: ', action);

    let room_slug = gamepanel.room.room_slug; //getCurrentRoom();
    let gamestate = gamepanel.gamestate;
    // let iframesLoaded = gamepanel.loaded;// fs.get('iframesLoaded') || {};

    if (!gamepanel || !gamepanel.active) return;

    if (action.type == "ready") {
        // iframesLoaded[room_slug] = true;
        // fs.set('iframesLoaded', iframesLoaded);

        // gamepanel.loaded = true;
        // updateGamePanel(gamepanel);

        if (gamepanel.room.isReplay && !gamepanel.room.replayStarted) {
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

            fs.set("showLoadingBox/" + gamepanel.id, false);
            if (gamepanel.room.isReplay) {
                replaySendGameStart(room_slug);
            }
            // fs.set('loaded/' + gamepanel.id, true);
            // fs.set('gameLoaded', true);
        }, 300);
        return;
    }

    if (gamepanel.room.isReplay) return;

    // let msg = data.payload;
    // if (msg.indexOf("Hello") > -1) {
    //     this.send('connected', 'Welcome to 5SG!');
    // }

    // let ws = fs.get('ws');

    // if (ws) {
    // console.time('ActionLoop');

    action.room_slug = room_slug;
    // if (gamestate && gamestate.timer)
    // action.timeseq = gamestate.timer.sequence || 0;
    // else action.timeseq = 0;
    // if (action.payload && action.payload.cell) {
    //     action.payload.cell = 100;
    // }
    let byteLen = await wsSend(action);
    console.log("[Outgoing] Action:", "[" + byteLen + " bytes]", action);
    // }
}

export function sendFrameMessage(msg) {
    let room_slug = msg?.room?.room_slug;
    // let room = fs.get('rooms>' + room_slug);

    let gamepanel = findGamePanelByRoom(room_slug);
    if (!gamepanel) return;

    let iframe = gamepanel.iframe; // getIFrame(room_slug);
    // if (iframe)

    // let iframes = fs.get('iframes') || {}
    // let iframe = iframes[room_slug];

    // let iframeLoaded = fs.get('iframesLoaded>' + room_slug);
    if (!iframe?.current) {
        if (!messageQueue[room_slug]) messageQueue[room_slug] = [];

        messageQueue[room_slug].push(msg);
        // setTimeout(() => {
        //     sendFrameMessage(msg);
        // }, 20)
        return;
    } else {
        //next frame
        // setTimeout(() => {
        //console.log("SendFrameMessage: ", msg);
        try {
            iframe.current.contentWindow.postMessage(msg, "*");
        } catch (e) {
            console.log("Error iframe not working: ", e, gamepanel);
        }

        // }, 1000)
    }
}

export function sendPauseMessage(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    if (gamepanel && gamepanel.iframe?.current) {
        gamepanel.iframe.current.contentWindow.postMessage(
            { type: "pause" },
            "*"
        );
    }
}

export function sendUnpauseMessage(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    if (gamepanel && gamepanel.iframe?.current) {
        gamepanel.iframe.current.contentWindow.postMessage(
            { type: "unpause" },
            "*"
        );
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

    let gamestate = gamepanel.gamestate; // fs.get('gamestate') || {};
    let user = await getUser();
    let iframe = gamepanel.iframe; // fs.get('iframes>' + room_slug);
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
    return Array.from(document.getElementsByTagName("iframe")).filter(
        (iframe) => {
            return iframe.contentWindow === event.source;
        }
    )[0];
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
