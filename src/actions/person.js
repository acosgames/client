import { GET, POST } from './http';
import fs from 'flatstore';
import { findDevGames } from './devgame';
// import history from "./history";
import { getWithExpiry, setWithExpiry, removeWithExpiry } from './cache';
import { wsRejoinRoom, reconnect, disconnect } from './connection';
import { clearGameQueues } from './queue';
import { clearRooms, getRoomList, getRooms, setLastJoinType } from './room';


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


        fs.set('loggedIn', false);
        fs.set('user', {});
        fs.set('userid', 0);
        fs.set('player_stats', {});
        removeWithExpiry('user');

        clearRooms();
        clearGameQueues();
        setLastJoinType('');

        await disconnect();

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




    return user;
}

export async function getUserProfile() {
    try {

        // fs.set('userCheckedLogin', false);
        // let user = getWithExpiry('user');
        // if (!user) {
        let response = await GET('/api/v1/person');
        let user = response.data;

        if (user.ecode) {
            console.error('[ERROR] Login failed. Please login again.');
            fs.set('loggedIn', false);
            fs.set('user', {});
            return null;
        }
        // }

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
            return user;
        }

        try {
            let roomList = getRoomList();// localStorage.getItem('rooms') || {};
            if (roomList.length > 0) {
                reconnect();
            }
        }
        catch (e) {
            console.error(e);
        }

        // fs.set('userCheckedLogin', true);
        return user;
    }
    catch (e) {
        // fs.set('userCheckedLogin', true);
        fs.set('loggedIn', false);
        fs.set('user', {});
        fs.set('userid', 0);

        console.error('[Profile] Login failed. Please login again.');
        console.error(e);


        //if( e )
        //return e.response.data;
    }
    return null;
}


export async function requestCreateRoom() {

}