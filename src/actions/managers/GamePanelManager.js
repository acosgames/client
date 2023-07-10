
export function findGamePanelByRoom(room_slug) {
    let gamepanels = getGamePanels();
    for (let i = 0; i < gamepanels.length; i++) {
        let gp = gamepanels[i];
        if (gp.room.room_slug == room_slug)
            return gp;
    }
    return null;
}

export function findGamePanelByIFrame(iframeRef) {
    let gamepanels = getGamePanels();
    for (let i = 0; i < gamepanels.length; i++) {
        let gp = gamepanels[i];
        if (gp?.iframe?.current == iframeRef)
            return gp;
    }
    return null;
}

export function updateGamePanel(gamepanel) {
    // console.log("Updating gamepanel/" + gamepanel.id);
    fs.set('gamepanel/' + gamepanel.id, gamepanel);

    if (gamepanel.isPrimary) {


        if (gamepanel.gamestate) {
            let gamestate = gamepanel.gamestate;

            fs.set('primary/state', gamestate.state);
            fs.set('primary/players', gamestate.players);
            fs.set('primary/teams', gamestate.teams);
            fs.set('primary/next', gamestate.next);
            fs.set('primary/roomstate', gamestate.room);
            fs.set('primary/events', gamestate.events);
            fs.set('primary/timer', gamestate.timer);
            fs.set('primary/action', gamestate.action);

            fs.set('primary/room', gamepanel.room);
        }
    }
}

export function getPrimaryGamePanel() {
    let id = fs.get('primaryGamePanel');
    if (id == null)
        return null;

    let gamepanel = fs.get('gamepanel/' + id);
    if (!gamepanel)
        return null;

    return gamepanel;
}
export function setPrimaryGamePanel(gamepanel) {
    let primaryId = fs.get('primaryGamePanel');
    let primary = getGamePanel(primaryId);

    if (primary) {
        primary.isPrimary = false;
        updateGamePanel(primary);
    }

    if (!gamepanel) {
        fs.set('primaryGamePanel', null);
        fs.set('chatMode', 'all');
    }
    else {



        fs.set('primaryGamePanel', gamepanel.id);

        fs.set('chatMode', gamepanel.room.room_slug);

        fs.set('chatUpdated', Date.now());
        //let primaryCanvasRef = fs.get('primaryCanvasRef');
        //gamepanel.canvasRef = null;
        gamepanel.isPrimary = true;

        let game_slug = gamepanel?.room?.game_slug;
        if (game_slug) {
            let game = fs.get('games>' + game_slug);
            if (game) {
                updateBrowserTitle(game.name);
            }
        }
        updateGamePanel(gamepanel);

        timerLoop();
    }


}

export function cleanupGamePanel(gamepanel) {
    gamepanel.available = true;
    updateGamePanel(gamepanel);
}


export function cleanupGamePanels() {
    let gamepanels = getGamePanels();
    for (let i = 0; i < gamepanels.length; i++) {
        let gp = gamepanels[i];
        if (gp.gamestate?.room?.status == 'gameover') {
            gp.available = true;
            updateGamePanel(gp);
            fs.set('gamepanels', gamepanels);
            return gp;
        }
    }
}

export function createGamePanel() {
    let gp = {};
    gp.id = -1;
    gp.available = false;
    gp.loaded = false;
    gp.ready = false;
    gp.forfeit = false;
    gp.canvasRef = null;
    gp.gamestate = null;
    gp.gameover = false;
    gp.iframe = null;
    gp.room = null;
    gp.active = true;
    return gp;
}

export function reserveGamePanel() {
    let gamepanels = getGamePanels();
    for (let i = 0; i < gamepanels.length; i++) {
        let gp = gamepanels[i];
        if (gp.available) {
            gp.available = false;

            gp.loaded = false;
            gp.forfeit = false;
            gp.ready = false;
            gp.gamestate = null;
            gp.gameover = false;
            gp.room = null;
            gp.active = true;

            updateGamePanel(gp);
            fs.set('gamepanels', gamepanels);
            return gp;
        }
    }

    let gp = createGamePanel();
    gp.id = gamepanels.length;
    gamepanels.push(gp);
    console.log("reserverGamePanel updating gamepanel/" + gp.id);
    fs.set('gamepanel/' + gp.id, gp);
    fs.set('gamepanels', gamepanels);
    return gp;
}


export async function maximizeGamePanel(gamepanel) {
    if (gamepanel.isPrimary)
        return;
    setPrimaryGamePanel(gamepanel);
    updateGamePanel(gamepanel);
}

export async function minimizeGamePanel() {
    let primaryGamePanel = getPrimaryGamePanel();
    if (primaryGamePanel) {

        if (primaryGamePanel.status == 'GAMEOVER') {
            fs.set('displayMode', 'none');
            clearRoom(primaryGamePanel.room.room_slug);
            // clearPrimaryGamePanel();
        }
        // primaryGamePanel.canvasRef = primaryGamePanel.draggableRef;

        setPrimaryGamePanel(null);
        // updateGamePanel(primaryGamePanel);
    }
}

export function clearPrimaryGamePanel() {
    setPrimaryGamePanel(null);
}
