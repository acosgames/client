import { GET, POST } from './http';
import fs from 'flatstore';
import { findDevGames } from './devgame';
// import history from "./history";
import { getWithExpiry, setWithExpiry } from './cache';


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
    return null;
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

        return true;
    }
    catch (e) {
        console.error(e);
        return e.response.data;
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
        setWithExpiry('user', user, exp * 1000)
        fs.set('loggedIn', true);
        fs.set('user', user);
        fs.set('userid', user.id);

        if (user.isdev)
            await findDevGames(user.id)


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