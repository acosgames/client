import { GET, POST } from './http';
import fs from 'flatstore';
import { findDevGames } from './devgame';

export async function createDisplayName(displayname) {

    try {
        let response = await POST('/person/create/displayname', { displayname });
        let user = response.data;
        console.log(user);
        return user;
    }
    catch (e) {
        console.error(e);
        return e.response.data;
    }
    return null;
}

export async function getUser() {
    try {

        let response = await GET('/person');
        let user = response.data;
        console.log(user);
        fs.set('user', user);

        if (user.isdev)
            findDevGames(user.id)
        return user;
    }
    catch (e) {
        console.error(e);
        return e.response.data;
    }
    return null;
}