import fs from 'flatstore';
import { getWithExpiry, removeWithExpiry, setWithExpiry } from './cache';
import { clearChatMessages } from './chat';
import { timerLoop, updateBrowserTitle } from './connection';


fs.set('gamepanels', []);


export function setCurrentRoom(room_slug) {
    fs.set('room_slug', room_slug);
}

export function getCurrentRoom() {
    return fs.get('room_slug') || null;
}

export function setLastJoinType(type) {
    fs.set('lastJoin', type);
}

export function getLastJoinType() {
    return fs.get('lastJoin');
}

export function setGameState(state) {
    fs.set('gamestate', state || {});
}

export function getGameState() {
    return fs.get('gamestate') || {};
}

export function getGamePanel(id) {
    return fs.get('gamepanel/' + id);
}

export function getGamePanels() {
    return fs.get('gamepanels') || [];
}

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


export function setRoomForfeited(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug)
    gamepanel.active = false;
    gamepanel.forfeit = true;

    updateRoomStatus(room_slug);
    updateGamePanel(gamepanel);
}

export function setRoomActive(room_slug, active) {
    let gamepanel = findGamePanelByRoom(room_slug)
    gamepanel.active = active;

    updateRoomStatus(room_slug);
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

export function setIFrameLoaded(room_slug, loaded) {
    let iframes = fs.get('iframes');
    if (!(room_slug in iframes)) {
        return false;
    }
    iframes[room_slug].loaded = loaded;
    fs.set('iframes>' + room_slug, { element: iframeRef, loaded: false });
    return true;
}

export function setIFrame(room_slug, iframeRef) {
    let iframes = fs.get('iframes');
    // iframes[room_slug] = ;
    fs.set('iframes>' + room_slug, { element: iframeRef, loaded: false });
}

export function getIFrame(room_slug) {
    let iframes = fs.get('iframes');
    let iframe = iframes[room_slug];
    return iframe;
}

export function getGames() {
    let games = fs.get('games') || getWithExpiry('games') || {};
    return games;
}
export function getGame(game_slug) {
    let games = fs.get('games') || getWithExpiry('games') || {};
    return games[game_slug];
}

export function getRoom(room_slug) {
    let rooms = fs.get('rooms') || getWithExpiry('rooms') || {};
    return rooms[room_slug];
}

export function getRooms() {
    let rooms = fs.get('rooms') || getWithExpiry('rooms') || {};
    return rooms;
}
export function getRoomList() {
    let rooms = getRooms();
    let roomList = [];
    for (var room_slug in rooms) {
        roomList.push(rooms[room_slug]);
    }
    return roomList;
}

export function addRooms(roomList) {

    if (!Array.isArray(roomList))
        return;

    let rooms = getRooms();
    let user = fs.get('user');

    let foundFirst = false;
    for (var r of roomList) {
        rooms[r.room_slug] = r;

        let gamestate = r.gamestate;
        //remove from the rooms object, so we can keep it separate
        // if (r.gamestate)
        //     delete r.gamestate;
        let gamepanel = findGamePanelByRoom(r.room_slug || r.room.room_slug)
        if (!gamepanel) {
            gamepanel = reserveGamePanel();
            fs.set('showLoadingBox/' + gamepanel.id, true);
        }

        gamepanel.room = r;



        if (gamestate && gamestate.players) {
            gamestate.local = gamestate.players[user.shortid];
            if (gamestate.local)
                gamestate.local.id = user.shortid;

            for (const id in gamestate.players) {
                gamestate.players[id].id = id;
            }

        } else {
            gamestate.local = { name: user.displayname, id: user.shortid };
        }

        gamepanel.gamestate = gamestate;
        updateRoomStatus(r.room_slug);

        updateGamePanel(gamepanel);


        if (!foundFirst) {
            foundFirst = true;
            setPrimaryGamePanel(gamepanel);
        }
    }

    fs.set('rooms', rooms);
    setWithExpiry('rooms', JSON.stringify(rooms), 120);
}


export function addRoom(msg) {

    let gamepanel = findGamePanelByRoom(msg.room_slug || msg.room.room_slug)

    if (gamepanel) {
        return gamepanel;
    }

    let rooms = getRooms();

    //merge with any existing
    // let existing = rooms[msg.room.room_slug] || {};
    // room = Object.assign({}, existing, room);



    //reserve and update gamepanel
    gamepanel = reserveGamePanel();
    gamepanel.room = msg.room;
    if (msg.room.isReplay) {
        gamepanel.gamestate = msg.payload[0];
        gamepanel.room.history = msg.payload;
    } else {
        gamepanel.gamestate = msg.payload;
    }

    fs.set('showLoadingBox/' + gamepanel.id, true);
    updateGamePanel(gamepanel);

    if (!msg.room.isReplay) {
        //should we make it primary immediately? might need to change this
        setPrimaryGamePanel(gamepanel);

    }


    rooms[msg.room.room_slug] = msg.room;
    fs.set('rooms', rooms);
    setWithExpiry('rooms', JSON.stringify(rooms), 120);


    return gamepanel;
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

export function clearRooms() {
    fs.set('rooms', {});
    removeWithExpiry('rooms');
}

export function clearRoom(room_slug) {

    let gamepanel = findGamePanelByRoom(room_slug);
    cleanupGamePanel(gamepanel);

    if (gamepanel.isPrimary) {
        setPrimaryGamePanel();
    }

    let rooms = fs.get('rooms');
    if (!rooms[room_slug])
        return;
    delete rooms[room_slug];
    fs.set('rooms', rooms);
    setWithExpiry('rooms', JSON.stringify(rooms), 120);

    clearChatMessages(room_slug);
}


// export function setRoomStatus(status) {
//     fs.set('roomStatus', status);
// }
export function getRoomStatus(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);

    return fs.get('gamestatus/' + gamepanel.id) || 'NOTEXIST';
    // return gamepanel?.status || 'NOTEXIST';
}

export function updateRoomStatus(room_slug) {
    let gamepanel = findGamePanelByRoom(room_slug);
    let status = processsRoomStatus(gamepanel);
    gamepanel.status = status;

    fs.set('gamestatus/' + gamepanel.id, status);
    fs.set('gamestatusUpdated', (new Date()).getTime());
    // updateGamePanel(gamepanel);

    //console.log("ROOM STATUS = ", status);
    // fs.set('roomStatus', status);
    return status;
}

export function processsRoomStatus(gamepanel) {

    // let rooms = fs.get('rooms');
    // let room = gamepanel.room;// rooms[room_slug];



    let gamestate = gamepanel.gamestate;// fs.get('gamestate');

    if (!gamestate || !gamestate.state | !gamestate.players) {
        return "NOTEXIST";
    }

    if (gamestate?.events?.gameover) {
        return "GAMEOVER";
    }
    if (gamestate?.events?.error) {
        return "ERROR";
    }

    if (gamestate?.events?.noshow) {
        return "NOSHOW";
    }

    if (gamepanel.forfeit) {
        return "FORFEIT";
    }
    // let iframeLoaded = fs.get('iframeLoaded');
    // if (!iframeLoaded) {
    //     return "LOADING";
    // }

    let gameLoaded = gamepanel.loaded;// fs.get('gameLoaded');
    if (!gameLoaded)
        return "LOADING";



    return "GAME";

}

export function isNextTeam(gamepanel, userid) {
    let gamestate = gamepanel?.gamestate;
    let local = gamestate?.local;

    if (!gamestate) return;

    userid = userid || local?.id;
    let next = gamestate?.next;
    let nextid = next?.id;
    let room = gamestate.room;

    if (room?.status == 'pregame')
        return true;

    if (!next || !nextid)
        return false;

    if (!gamestate.state)
        return false;

    //check if we ven have teams
    let teams = gamestate?.teams;


    if (typeof nextid === 'string') {
        //anyone can send actions
        if (nextid == '*')
            return true;

        //only specific user can send actions
        // if (nextid == userid)
        //     return false;

        //validate team has players
        if (!teams || !teams[nextid] || !teams[nextid].players)
            return false;

        //allow players on specified team to send actions
        if (Array.isArray(teams[nextid].players) && teams[nextid].players.includes(userid)) {
            return true;
        }
    }
    else if (Array.isArray(nextid)) {

        //multiple users can send actions if in the array
        // if (nextid.includes(userid))
        //     return false;

        //validate teams exist
        if (!teams)
            return false;

        //multiple teams can send actions if in the array
        for (var i = 0; i < nextid.length; i++) {
            let teamid = nextid[i];
            let team = teams[teamid];
            let teamplayers = team?.players;
            if (Array.isArray(teamplayers) && teamplayers.includes(userid)) {
                return true;
            }
        }
    }

    return false;
}

export function isUserNext(gamepanel, userid) {

    let gamestate = gamepanel?.gamestate;
    let user = fs.get('user');

    if (!gamestate || !user) return;

    userid = userid || user.shortid;
    let next = gamestate?.next;
    let nextid = next?.id;
    let room = gamestate.room;

    if (room?.status == 'pregame')
        return true;

    if (!next || !nextid)
        return false;

    if (!gamestate.state)
        return false;

    //check if we ven have teams
    let teams = gamestate?.teams;


    if (typeof nextid === 'string') {
        //anyone can send actions
        if (nextid == '*')
            return true;

        //only specific user can send actions
        if (nextid == userid)
            return true;

        //validate team has players
        if (!teams || !teams[nextid] || !teams[nextid].players)
            return false;

        //allow players on specified team to send actions
        if (Array.isArray(teams[nextid].players) && teams[nextid].players.includes(userid)) {
            return true;
        }
    }
    else if (Array.isArray(nextid)) {

        //multiple users can send actions if in the array
        if (nextid.includes(userid))
            return true;

        //validate teams exist
        if (!teams)
            return false;

        //multiple teams can send actions if in the array
        for (var i = 0; i < nextid.length; i++) {
            let teamid = nextid[i];
            let team = teams[teamid];
            let teamplayers = team?.players;
            if (Array.isArray(teamplayers) && teamplayers.includes(userid)) {
                return true;
            }
        }
    }

    return false;
}