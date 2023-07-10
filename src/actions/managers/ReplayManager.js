


export function replayPrevIndex(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    if (!gamepanel?.room)
        return;

    let jumpIndex = gamepanel.room.replayIndex - 1;

    //if we are currently in gameover state, jump back 2 times
    // if (gamepanel.room.replayIndex == gamepanel.gamestate.length - 1)
    //     jumpIndex -= 1;

    replayJumpToIndex(room_slug, jumpIndex);
}

export function replayTimerTriggerNext(room_slug, delay) {

    let gamepanel = findGamePanelByRoom(room_slug);
    if (!gamepanel?.room)
        return;

    if (gamepanel.room.replayTimerHandle) {
        clearTimeout(gamepanel.room.replayTimerHandle);
    }

    gamepanel.room.replayTimerHandle = setTimeout(() => {
        replayNextIndex(room_slug);
    }, delay)
}

export function replayNextIndex(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    let iframe = gamepanel.iframe;

    if (!iframe)
        return false;

    let history = gamepanel.room.history;// fs.get('gamestate') || {};
    if (!(history || history.length == 0)) {
        //    iframe.resize();
        return false;
    }

    let nextId = gamepanel.room.replayIndex + 1;
    if (nextId >= history.length)
        return false;

    let merged = gamepanel.gamestate;
    let copy = JSON.parse(JSON.stringify(history[nextId].payload));

    if (merged?.events) {
        merged.events = {};
    }
    delta.merge(merged, copy);

    merged.room_slug = history[0].room_slug;

    // merged = { room_slug: history[nextId].room_slug, ...merged };

    if (merged?.timer?.seconds) {

        if (history.length > nextId + 1) {
            let nextHistory = history[nextId + 1];
            let nextCopy = JSON.parse(JSON.stringify(nextHistory.payload));
            let nextMerged = JSON.parse(JSON.stringify(merged));
            delta.merge(nextMerged, nextCopy);


            let nextUpdated = nextMerged.room.updated;
            let currentUpdated = merged.room.updated;
            // let nextEnd = nextMerged.timer.end;
            // let nextSeconds = nextMerged.timer.seconds;
            // let nextStartTime = nextEnd - (nextSeconds * 1000);

            // let currentEnd = merged.timer.end;
            // let currentSeconds = merged.timer.seconds;
            // let currentStartTime = currentEnd - (currentSeconds * 1000);
            replayTimerTriggerNext(room_slug, nextUpdated - currentUpdated);
        }

        merged.timer.end = (merged.timer.seconds * 1000) + Date.now();
    }

    let players = merged?.players;
    merged.local = players[gamepanel.room.replayFollow];

    gamepanel.room.replayIndex = gamepanel.room.replayIndex + 1;
    //gamepanel.room.replayState = merged;
    gamepanel.gamestate = merged;
    updateGamePanel(gamepanel);
    updateRoomStatus(room_slug);

    if (iframe?.current?.contentWindow)
        iframe.current.contentWindow.postMessage(merged, '*');
}

export function replayJumpToIndex(room_slug, startIndex) {
    let gamepanel = findGamePanelByRoom(room_slug);
    let iframe = gamepanel.iframe;

    if (!iframe || !iframe.current || !iframe.current.contentWindow)
        return false;

    let history = gamepanel.room.history;// fs.get('gamestate') || {};
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

    for (let i = 0; i <= startIndex; i++) {
        let copy = JSON.parse(JSON.stringify(history[i].payload));

        if (merged?.events) {
            merged.events = {};
        }

        delta.merge(merged, copy);
    }

    merged.room_slug = history[0].room_slug;

    if (merged?.timer?.seconds) {

        if (history.length > startIndex + 1) {
            let nextHistory = history[startIndex + 1];
            let nextCopy = JSON.parse(JSON.stringify(nextHistory.payload));
            let nextMerged = JSON.parse(JSON.stringify(merged));
            delta.merge(nextMerged, nextCopy);

            let nextUpdated = nextMerged.room.updated;
            let currentUpdated = merged.room.updated;
            // let nextEnd = nextMerged.timer.end;
            // let nextSeconds = nextMerged.timer.seconds;
            // let nextStartTime = nextEnd - (nextSeconds * 1000);

            // let currentEnd = merged.timer.end;
            // let currentSeconds = merged.timer.seconds;
            // let currentStartTime = currentEnd - (currentSeconds * 1000);
            replayTimerTriggerNext(room_slug, nextUpdated - currentUpdated);
        }



        merged.timer.end = (merged.timer.seconds * 1000) + Date.now();
    }

    let players = merged?.players;
    if (!gamepanel.room.replayFollow) {
        let playerIds = Object.keys(players);
        let randomPlayerId = playerIds[Math.floor(Math.random() * playerIds.length)];

        merged.local = players[randomPlayerId];

        gamepanel.room.replayFollow = randomPlayerId;
    } else {
        merged.local = players[gamepanel.room.replayFollow];
    }


    gamepanel.room.replayIndex = startIndex;
    //gamepanel.room.replayState = merged;
    gamepanel.gamestate = merged;
    updateGamePanel(gamepanel);
    updateRoomStatus(room_slug);
    // iframe.current.contentWindow.postMessage({ type: 'load', payload: { game_slug: gamepanel.room.game_slug, version: gamepanel.room.version } }, '*');

    // iframe.current.contentWindow.location.reload()

    // iframe.current.contentWindow.postMessage({ events: { gameover: true } }, '*');

    iframe.current.contentWindow.postMessage(merged, '*');
}

export function replaySendGameStart(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    let iframe = gamepanel.iframe;

    if (!iframe)
        return false;

    let history = gamepanel.room.history;// fs.get('gamestate') || {};
    if (!(history || history.length == 0)) {
        //    iframe.resize();
        return false;
    }

    //find gamestart index
    let replayStartIndex = 0;
    for (let i = 0; i < history.length; i++) {
        let gamestate = history[i];
        if (gamestate?.payload?.room?.status == 'gamestart') {
            replayStartIndex = i;
            break;
        }
    }

    gamepanel.room.replayStarted = true;
    gamepanel.room.replayStartIndex = replayStartIndex;
    //gamepanel.gamestate = merged;
    //updateGamePanel(gamepanel);

    replayJumpToIndex(room_slug, replayStartIndex);
}



export function downloadReplay(game_slug) {

    return new Promise(async (rs, rj) => {

        try {
            let url = `${config.https.cdn}g/test-game-3/replays/7/rank/1661646594335.json`

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
        }
        catch (e) {
            rj(e);
        }
    })

}
