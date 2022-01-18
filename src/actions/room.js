import fs from 'flatstore';

export function setRoomStatus(status) {
    fs.set('roomStatus', status);
}

export function clearRoom(room_slug) {
    let rooms = fs.get('rooms');
    if (!rooms[room_slug])
        return;
    delete rooms[room_slug];
    fs.set('rooms', rooms);
    localStorage.setItem('rooms', JSON.stringify(rooms));
}
export function getRoomStatus() {
    return fs.get('roomStatus');
}

export function updateRoomStatus(room_slug) {
    let status = processsRoomStatus(room_slug);
    console.log("ROOM STATUS = ", status);
    fs.set('roomStatus', status);
    return status;
}

export function processsRoomStatus(room_slug) {

    let rooms = fs.get('rooms');
    let room = rooms[room_slug];



    let gamestate = fs.get('gamestate');

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

    let iframeLoaded = fs.get('iframeLoaded');
    if (!iframeLoaded) {
        return "LOADING";
    }

    let gameLoaded = fs.get('gameLoaded');
    if (!gameLoaded)
        return "LOADING";



    return "GAME";

}