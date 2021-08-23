import { GET, POST } from './http';
import fs from 'flatstore';
import { findDevGames } from './devgame';
import history from "./history";

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

        fs.set('user', null);
        fs.set('userid', 0);
        return true;
    }
    catch (e) {
        console.error(e);
        return e.response.data;
    }
}

export async function getUserProfile() {
    try {

        // fs.set('userCheckedLogin', false);

        let response = await GET('/api/v1/person');
        let user = response.data;

        // if (user.ecode) {
        //     fs.set('userCheckedLogin', true);
        //     return null;
        // }
        console.log(user);

        fs.set('user', user);
        fs.set('userid', user.id);
        if (user.isdev)
            await findDevGames(user.id)


        if (!user.displayname || user.displayname.length == 0) {
            history.push('/player/create');
        }
        // fs.set('userCheckedLogin', true);
        return user;
    }
    catch (e) {
        // fs.set('userCheckedLogin', true);
        console.error(e);
        return e.response.data;
    }
    return null;
}