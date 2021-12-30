import { POST, GET, POSTFORM } from './http';

import { validateSimple, validateField } from 'shared/util/validation';
// import { genShortId } from 'shared/util/idgen';
import config from '../config/config.json';
import fs from 'flatstore';

import { getUser } from './person';
import { wsJoinRankedGame, wsJoinBetaGame, wsRejoinRoom } from './connection';

fs.set('rankList', []);
fs.set('experimentalList', []);

fs.set('game', null);
fs.set('games', {});
fs.set('player_stats', {});


export async function sortGames(games) {

    let rankList = [];
    let experimentalList = [];

    for (var game_slug in games) {
        let game = games[game_slug];
        if (game.version > 0) {
            rankList.push(game);
        }
        if (!game.version) {
            experimentalList.push(game);
        }
    }

    fs.set('rankList', rankList);
    fs.set('experimentalList', experimentalList);
}


export async function findGames() {
    try {
        let response = await GET('/api/v1/games');
        let result = response.data;
        if (result.ecode) {
            throw result.ecode;
        }

        let games = fs.get('games');
        for (var game of result) {
            games[game.game_slug] = game;
        }

        sortGames(games);

        fs.set('games', games || {});
    }
    catch (e) {
        console.error(e);
        fs.set('games', {});
    }
}

export async function findGame(game_slug) {
    try {
        let response = await GET('/api/v1/game/' + game_slug);
        let result = response.data;
        if (result.ecode) {
            throw result.ecode;
        }
        // fs.set('games>' + game_slug, game);
        // fs.set('game', game || null);

        fs.set('games>' + game_slug, result.game);
        fs.set('game', result.game || {});
        fs.set('top10', result.top10 || []);
        fs.set('leaderboard', []);
        fs.set('leaderboardCount', result.lbCount || []);


        return result;
    }
    catch (e) {
        console.error(e);
        fs.set('game', null);
    }
    return null;
}

export async function findGamePerson(game_slug) {
    try {
        let response = await GET('/api/v1/game/person/' + game_slug);
        let result = response.data;
        if (result.ecode) {
            throw result.ecode;
        }

        if (!result.game) {
            throw 'E_GAMENOTFOUND';
        }

        let player_stats = fs.get('player_stats') || {};
        if (result.player) {
            player_stats[game_slug] = result.player;
            fs.set('player_stats', player_stats);
        }


        // fs.set(game_slug, result.game || null);
        fs.set('games>' + game_slug, result.game);
        fs.set('game', result.game || {});
        fs.set('top10', result.top10 || []);
        fs.set('leaderboard', result.lb || []);
        fs.set('leaderboardCount', result.lbCount || []);
    }
    catch (e) {
        console.error(e);
        fs.set(game_slug, {});
    }
}

export async function findAndRejoin(game_slug, room_slug) {

    let player_stats = fs.get('player_stats');
    let player_stat = player_stats[game_slug];
    let user = await getUser();
    if (user && !player_stat) {

        await findGamePerson(game_slug);

    }
    else {
        await findGame(game_slug);
    }


    wsRejoinRoom(game_slug, room_slug);
}

let hJoining = 0;

export async function joinGame(game, istest) {

    let game_slug = game.game_slug;
    let version = game.version;
    if (istest) {
        version = game.latest_version;
    }
    // await downloadGame(game.gameid, version);

    // clearTimeout(hJoining);

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
    // let url = `${config.https.cdn}${gameid}/client/client.bundle.${version}.js`

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