

var timerHandle = 0;
export function timerLoop(cb) {

    if (cb)
        cb();

    if (timerHandle) {
        clearTimeout(timerHandle);
        timerHandle = 0;
    }


    timerHandle = setTimeout(() => { timerLoop(cb) }, 30);

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

        let timer = gamestate.timer;
        if (!timer) {
            continue;
        }

        let deadline = timer.end;
        if (!deadline)
            continue;

        if (gamestate?.events?.gameover)
            continue;

        let now = (new Date()).getTime();
        let elapsed = deadline - now;

        if (elapsed <= 0) {
            elapsed = 0;
        }

        // fs.set('gameTimeleft', elapsed);

        fs.set('timeleft/' + gamepanel.id, elapsed);
        timeleftUpdated = (new Date()).getTime();
        // gamepanel.timeleft = elapsed;
        // updateGamePanel(gamepanel);

        let state = gamestate.state;
        let events = gamestate.events;
        let gameroom = gamestate.room;

        if (events?.gameover || gameroom?.status == 'gamestart') {
            // clearTimeout(timerHandle);
            // timerHandle = 0;
            // return;
        }

    }

    if (timeleftUpdated > 0)
        fs.set('timeleftUpdated', timeleftUpdated);

}