import { POST, GET, POSTFORM } from './http';

import { validateSimple, validateField } from 'fsg-shared/util/validation';
// import { genShortId } from 'fsg-shared/util/idgen';

import fs from 'flatstore';
import { wsJoinRankedGame, wsJoinBetaGame, wsRejoinRoom } from './connection';

fs.set('games', []);

export async function findGames() {
    try {
        let response = await GET('/api/v1/games');
        let games = response.data;
        if (games.ecode) {
            throw games.ecode;
        }
        fs.set('games', games || []);
    }
    catch (e) {
        console.error(e);
        fs.set('games', []);
    }
}

export async function findGame(game_slug) {
    try {
        let response = await GET('/api/v1/game/' + game_slug);
        let game = response.data;
        if (game.ecode) {
            throw game.ecode;
        }
        fs.set(game_slug, game || null);
        fs.set('game', game || null);

    }
    catch (e) {
        console.error(e);
        fs.set(game_slug, null);
    }
}

export async function findGamePerson(game_slug) {
    try {
        let response = await GET('/api/v1/game/person/' + game_slug);
        let game = response.data;
        if (game.ecode) {
            throw game.ecode;
        }
        fs.set(game_slug, game || null);
        fs.set('game', game || null);

    }
    catch (e) {
        console.error(e);
        fs.set(game_slug, null);
    }
}

export async function findAndRejoin(game_slug, room_slug) {
    await findGame(game_slug);
    wsRejoinRoom(game_slug, room_slug);
}

let hJoining = 0;

export async function joinGame(game, istest) {

    let game_slug = game.game_slug;
    let version = game.version;
    if (istest) {
        version = game.latest_version;
    }
    await downloadGame(game.gameid, version);

    clearTimeout(hJoining);

    try {
        if (istest) {
            wsJoinBetaGame(game);
        }
        else {
            wsJoinRankedGame(game);
        }

    }
    catch (e) {
        console.error(e);
    }

    // hJoining = setTimeout(() => { joinGame(game_slug) }, 3000);
}


export async function downloadGame(gameid, version) {
    let url = `https://cdn.fivesecondgames.com/file/fivesecondgames/${gameid}/client/client.bundle.${version}.js`

    return new Promise(async (rs, rj) => {
        try {
            // let res = await fetch(url, { headers: { 'Content-Type': 'application/javascript' } })
            // let blob = await res.text();
            //let file = window.URL.createObjectURL(blob);
            fs.set('jsgame', true);
            rs(true);
        }
        catch (e) {
            console.error(e);
            rj(e);
        }
    })

}



export async function reportGame(game_slug, reportType) {

    let request = await POST('/api/v1/game/report', {
        game_slug,
        reportType
    });
    let response = request.data;


    return response;
}

export async function rateGame(game_slug, vote, previousVote) {

    let request = await POST('/api/v1/game/rate', {
        game_slug,
        vote,
        previousVote,
    });
    let response = request.data;

    return response;
}