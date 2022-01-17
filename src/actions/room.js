import fs from 'flatstore';

export function setRoomStatus(status) {
    fs.set('roomStatus', status);
}


export function getRoomStatus(room_slug) {
    let status = processsRoomStatus(room_slug);
    fs.set('roomStatus', status);
    return status;
}

export function processsRoomStatus(room_slug) {

    let rooms = fs.get('rooms');
    let room = rooms[room_slug];

    if (!room) {
        return "NOTEXIST";
    }

    let gamestate = fs.get('gamestate');
    if (gamestate?.events?.gameover || gamestate?.events?.error || gamestate?.events?.noshow) {
        return "GAMEOVER";
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