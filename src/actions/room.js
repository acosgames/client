import fs from 'flatstore';
import { getWithExpiry, removeWithExpiry, setWithExpiry } from './cache';

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
    fs.get('lastJoin');
}

export function setGameState(state) {
    fs.set('gamestate', state || {});
}

export function getGameState() {
    return fs.get('gamestate') || {};
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

    let rooms = {};

    for (var r of roomList) {
        rooms[r.room_slug] = r;
    }

    fs.set('rooms', rooms);
    setWithExpiry('rooms', JSON.stringify(rooms), 120);
}

export function addRoom(room) {
    let rooms = fs.get('rooms');

    //merge with any existing
    let existing = rooms[room.room_slug] || {};
    room = Object.assign({}, existing, room);

    rooms[room.room_slug] = room;
    fs.set('rooms', rooms);
    setWithExpiry('rooms', JSON.stringify(rooms), 120);
}

export function clearRooms() {
    fs.set('rooms', {});
    removeWithExpiry('rooms');
}

export function clearRoom(room_slug) {
    let rooms = fs.get('rooms');
    if (!rooms[room_slug])
        return;
    delete rooms[room_slug];
    fs.set('rooms', rooms);
    setWithExpiry('rooms', JSON.stringify(rooms), 120);
}

export function setRoomStatus(status) {
    fs.set('roomStatus', status);
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