import { POST, GET, POSTFORM } from './http';

import { validateSimple, validateField } from 'fsg-shared/util/validation';
// import { genShortId } from 'fsg-shared/util/idgen';

import fs from 'flatstore';
import { wsJoinGame } from './connection';

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
    }
    catch (e) {
        console.error(e);
        fs.set(game_slug, null);
    }
}

let hJoining = 0;

export async function joinGame(game_slug) {

    clearTimeout(hJoining);

    try {
        wsJoinGame(game_slug);
    }
    catch (e) {
        console.error(e);
    }

    // hJoining = setTimeout(() => { joinGame(game_slug) }, 3000);
}

