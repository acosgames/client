import { GET, POST } from './http';
import fs from 'flatstore';
import { findDevGames } from './devgame';
// import history from "./history";
import { getWithExpiry, setWithExpiry, removeWithExpiry } from './cache';
import { wsRejoinRoom } from './connection';


export async function createDisplayName(displayname) {

    try {
        let response = await POST('/api/v1/person/create/displayname', { displayname });
        let user = response.data;

        let existing = fs.get('user');
        Object.assign(existing, user);

        fs.set('user', existing);
        fs.set('userid', existing.id);

        console.log(existing);
        return existing;
    }
    catch (e) {
        console.error(e);
        return e.response.data;
    }
}

export async function createTempUser(displayname) {

    try {
        let response = await POST('/login/temp', { displayname });
        let user = response.data;

        console.log('Created Temp User: ', user);
        let exp = user.exp;
        let now = Math.round((new Date()).getTime() / 1000);
        let diff = exp - now;
        console.log("User expires in " + diff + " seconds.");
        setWithExpiry('user', user, 120)
        fs.set('loggedIn', true);
        fs.set('user', user);
        fs.set('userid', user.id);
        fs.set('profile', user);

        console.log(user);
        return user;
    }
    catch (e) {
        console.error(e);
        return e.response.data;
    }
}

export async function logout() {
    try {

        let response = await GET('/logout');
        let result = response.data;

        if (!result.status || result.status != 'success') {
            return false;
        }

        fs.set('rooms', []);
        fs.set('room', null);
        fs.set('loggedIn', false);
        fs.set('user', {});
        fs.set('userid', 0);
        fs.set('player_stats', {});
        fs.set('queues', []);
        fs.get('lastJoin', '');
        localStorage.removeItem('rooms');
        localStorage.removeItem('queues');
        removeWithExpiry('user');

        return true;
    }
    catch (e) {
        console.error(e);
        return e.response.data;
    }
}

export function isUserLoggedIn() {
    let loggedIn = fs.get('loggedIn');
    return loggedIn;
}

export async function getPlayer(displayname) {
    try {
        let response = await GET('/api/v1/person/' + displayname);
        let player = response.data;

        if (player.ecode) {
            console.error('Player not found: ', displayname);
            fs.set('profile', null);
            return null;
        }

        fs.set('profile', player);
    }
    catch (e) {

    }
}

export async function getUser() {
    let user = fs.get('user');
    if (!user) {
        user = await getUserProfile();
    }

    if (!user) {
        return false;
    }

    let rooms = localStorage.getItem('rooms') || {};
    let roomList = Object.keys(rooms);
    for (var rs of roomList) {
        let room = rooms[rs];
        await wsRejoinRoom(room.game_slug, room.room_slug);
    }

    return user;
}

export async function getUserProfile() {
    try {

        // fs.set('userCheckedLogin', false);
        let user = getWithExpiry('user');
        if (!user) {
            let response = await GET('/api/v1/person');
            user = response.data;

            if (user.ecode) {
                console.error('Login failed. Please login again.');
                fs.set('loggedIn', false);
                fs.set('user', {});
                return null;
            }
        }

        console.log('getUserProfile', user);
        let exp = user.exp;
        let now = Math.round((new Date()).getTime() / 1000);
        let diff = exp - now;
        console.log("User expires in " + diff + " seconds.");
        setWithExpiry('user', user, 120)
        fs.set('loggedIn', true);
        fs.set('user', user);
        fs.set('userid', user.id);
        fs.set('profile', user);

        // if (user.isdev)
        //     await findDevGames(user.id)


        if (!user.displayname || user.displayname.length == 0) {
            let history = fs.get('history');
            history.push('/player/create');
        }
        // fs.set('userCheckedLogin', true);
        return user;
    }
    catch (e) {
        // fs.set('userCheckedLogin', true);
        console.error('Login failed. Please login again.');
        fs.set('loggedIn', false);
        fs.set('user', {});

        console.error('getUserProfile', e);
        //if( e )
        //return e.response.data;
    }
    return null;
}


export async function requestCreateRoom() {

}