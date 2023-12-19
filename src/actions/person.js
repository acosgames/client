import { GET, POST } from './http';
import fs from 'flatstore';
import { findDevGames } from './devgame';
// import history from "./history";
import { getWithExpiry, setWithExpiry, removeWithExpiry } from './cache';
import { wsRejoinRoom, reconnect, disconnect, wsRejoinQueues, wsJoinQueues } from './connection';
import { addGameQueue, addJoinQueues, clearGameQueues, getJoinQueues } from './queue';
import { clearRooms, getLastJoinType, getRoomList, getRooms, setLastJoinType } from './room';
import { findGame, findGamePerson } from './game';




export async function createDisplayName({ displayname, portraitid, countrycode }) {

    try {
        let response = await POST('/api/v1/person/create/displayname', { displayname, portraitid, countrycode });
        let user = response.data;

        let existing = fs.get('user');
        Object.assign(existing, user);

        fs.set('user', existing);
        fs.set('userid', existing.id);

        disconnect();

        console.log(existing);
        return existing;
    }
    catch (e) {
        console.error(e);
        return e.response.data;
    }
}

export async function getCountry() {
    try {

        fs.set('loadingDefaultCountry', true);

        let response = await GET('/api/v1/country/');
        let data = response.data;

        if (!data || !data.countrycode) {
            fs.set('defaultCountry', 'US');
            fs.set('loadingDefaultCountry', false);
            return 'US';
        }

        fs.set('defaultCountry', data.countrycode);
        return data.countrycode;
    }
    catch (e) {
        fs.set('defaultCountry', 'US');
    }
    finally {
        fs.set('loadingDefaultCountry', false);
    }
    return 'US';
}

export async function createTempUser({ displayname, portraitid, countrycode }) {

    try {
        let response = await POST('/login/temp', { displayname, portraitid, countrycode });
        let user = response.data;

        console.log('Created Temp User: ', user);

        logoutTimer(user);


        fs.set('user', user);
        fs.set('userid', user.id);
        fs.set('profile', user);

        disconnect();

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

        setLoginMode();
        fs.set('user', null);
        fs.set('userid', 0);
        fs.set('player_stats', {});
        fs.set('displayname', '');
        localStorage.removeItem('displayname');
        fs.set('isCreateDisplayName', false);
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
    return !(!loggedIn || loggedIn == 'LURKER' || loggedIn == 'CHECKING');
}

export async function getPlayer(displayname) {
    try {

        fs.set('loadingProfile', true);

        let response = await GET('/api/v1/person/' + displayname);
        let player = response.data;

        if (player.ecode) {
            console.error('Player not found: ', displayname);
            fs.set('profile', null);
            fs.set('loadingProfile', false);
            return null;
        }

        fs.set('profile', player);
    }
    catch (e) {
        fs.set('profile', null);
    }
    finally {
        fs.set('loadingProfile', false);
    }
}

export async function loadUserGameData(game_slug) {
    try {
        fs.set('loadingGameInfo', true);
        let player_stat = fs.get('player_stats/' + game_slug);
        // let player_stat = player_stats[game_slug];

        let curgame = fs.get('game');
        let game = null;
        let user = fs.get('user');

        // let user = await getUser();



        if (user && user.shortid && !player_stat) {

            await findGamePerson(game_slug);
        }
        else if (!curgame || !curgame.name) {
            await findGame(game_slug)
        }
        else {
            game = fs.get('games>' + game_slug);
            if (game && game.longdesc && (!curgame || !curgame.longdesc)) {
                fs.set('game', game);
            }
        }
        fs.set('loadingGameInfo', false);
    }
    catch (e) {
        fs.set('loadingGameInfo', false);
    }
}

export async function getUser() {


    let user = fs.get('user');
    if (!user) {
        fs.set('loadingUser', true);
        user = await getUserProfile();
    }


    // reconnect(true, true);

    fs.set('loadingUser', false);

    if (!user) {
        return false;
    }




    return user;
}

export async function login() {

    let isLoginShowing = fs.get('isCreateDisplayName');
    if (isLoginShowing)
        return;

    let game = fs.get('game');
    if (game && window.location.pathname.indexOf("/g/") > -1) {
        let mode = getLastJoinType();
        addJoinQueues(game.game_slug, mode);
    }

    fs.set('loginFrom', 'game');
    fs.set('isCreateDisplayName', true);
    fs.set('portraitid', Math.floor(Math.random() * (2104 - 1 + 1) + 1));

}

export async function loginComplete() {
    fs.set('isCreateDisplayName', false);
    fs.set('justCreatedName', true);

    let joinqueues = getJoinQueues();

    let queues = joinqueues.queues || [];
    let isJoiningQueues = queues.length > 0;

    if (isJoiningQueues) {
        wsJoinQueues(joinqueues.queues, joinqueues.owner);
    }
}

export function setLoginMode(user) {
    let loginMode = 'LURKER';

    if (user) {
        if (user.email) {
            loginMode = 'USER';
        }
        else if (user.displayname)
            loginMode = 'TEMP';
    }

    fs.set('loggedIn', loginMode);
    return loginMode;

}

export async function getUserProfile() {
    try {

        // fs.set('userCheckedLogin', false);
        let user = fs.get('user');//getWithExpiry('user');
        if (!user || !user.displayname) {
            fs.set('checkingUserLogin', true);
            let response = await GET('/api/v1/person');
            user = response.data;
            console.log('getUserProfile from api', user);
        }
        if (user.ecode) {
            // fs.set('checkingUserLogin', false);
            console.error('[ERROR] Login failed. Please login again.', user.ecode);
            removeWithExpiry('user');
            return null;
        }

        //create local user session with expiration

        let previousLoggedIn = fs.get('loggedIn')


        logoutTimer(user);

        fs.set('user', user);
        fs.set('userid', user.id);
        fs.set('profile', user);

        setTimeout(() => {
            let newLoggedIn = setLoginMode(user);

            if (previousLoggedIn != newLoggedIn) {
                // disconnect();
                // reconnect();
            }

        }, 0)

        // if (user.isdev)
        //     await findDevGames(user.id)


        // if (!user.displayname || user.displayname.length == 0) {
        //     let history = fs.get('history');
        //     history('/player/create');
        //     return user;
        // }

        try {
            let roomList = getRoomList();// localStorage.getItem('rooms') || {};
            // if (roomList.length > 0) {
            // reconnect();
            // }
            wsRejoinQueues();
        }
        catch (e) {


            console.error(e);
        }

        fs.set('checkingUserLogin', false);

        // fs.set('userCheckedLogin', true);
        return user;
    }
    catch (e) {
        // fs.set('userCheckedLogin', true);
        setLoginMode();
        fs.set('user', null);
        fs.set('userid', 0);

        // console.error('[Profile] Login failed. Please login again.');
        fs.set('checkingUserLogin', false);
        if (e.response.data.ecode) {
            console.error('[ERROR] Login failed. Please login again.', e.response.data.ecode);
            return null;
        }

        console.error(e);


        //if( e )
        //return e.response.data;
    }
    return null;
}

function logoutTimer(user) {
    let exp = user.exp;
    let now = Math.round((new Date()).getTime() / 1000);
    let diff = exp - now;
    console.log("User expires in " + diff + " seconds.");
    setWithExpiry('user', user, diff)
    setLoginMode(user);

    let fiveMinuteWarningDelay = ((diff - 300) * 1000);
    let expireDelay = diff * 1000;

    //max delay for setTimeout is 24.8 days
    expireDelay = Math.min(2147483647, expireDelay);
    setTimeout(() => {

    }, fiveMinuteWarningDelay);

    console.log("Expire delay: ", expireDelay);
    setTimeout(() => {
        logout();
    }, expireDelay);
}


export async function requestCreateRoom() {

}