import { POST, GET } from './http';

import { validateSimple } from 'forkoff-shared/util/validation';

import fs from 'flatstore';
fs.set('devgameimages', []);
fs.set('devgame', {});
fs.set('devgameerror', []);

export async function addImages(images) {
    fs.set('devgameimages', images);
}


export async function findGame(gameid) {
    try {
        let response = await GET('/dev/find/game/' + gameid);
        let game = response.data;

        fs.set('devgameerror', []);
        console.log(game);
        fs.set('devgame', game);
        return game;
    }
    catch (e) {
        console.error(e);

        if (e.response) {
            const { response } = e;
            const data = response.data;
            fs.set('devgameerror', [data]);
        }
    }
    return null;
}

export async function uploadImages() {
    try {
        let images = fs.get('devgameimages');

        let progress = {
            onUploadProgress: progressEvent => console.log(progressEvent.loaded)
        };

        var formData = new FormData();
        images.forEach((image) => {
            formData.append("images", image.file);
        })

        formData.append('count', "" + images.length);

        let response = await POST('/dev/update/game/images', formData);
        let game = response.data;
        console.log(game);

        return game;
    }
    catch (e) {
        console.error(e);

        if (e.response) {
            const { response } = e;
            const data = response.data;
            fs.set('devgameerror', [data]);
        }
        throw e;
    }

}

export async function updateGame() {
    try {
        let newGame = fs.get('devgame');

        let errors = validateSimple('game', newGame);
        if (errors.length > 0) {
            fs.set('devgameerror', errors);
            return newGame;
        }

        let response = await POST('/dev/update/game', newGame);
        let game = response.data;

        let imageResponse = await uploadImages();
        let gameWithImages = response.data;

        console.log(gameWithImages);

        fs.set('devgameerror', []);
        console.log(game);
        return game;
    }
    catch (e) {
        console.error(e);

        if (e.response) {
            const { response } = e;
            const data = response.data;
            fs.set('devgameerror', [data]);
        }
    }
    return null;
}

export async function updateGameField(name, value) {
    let game = fs.get('devgame');

    let errors = validateSimple(game);
    if (errors.length > 0) {
        fs.set('devgameerror', errors);
        return game;
    }

    game[name] = value;

    fs.set('devgame', game);

    console.log(game);
}


export async function createGame(progressCB) {

    try {
        let newGame = fs.get('devgame');

        let errors = validateSimple('game', newGame);
        if (errors.length > 0) {
            fs.set('devgameerror', errors);
            return newGame;
        }

        let response = await POST('/dev/create/game', newGame);
        let game = response.data;

        fs.set('devgameerror', []);
        console.log(game);
        return game;
    }
    catch (e) {
        console.error(e);

        if (e.response) {
            const { response } = e;
            const data = response.data;

            //const { request, ...errorObject } = response; // take everything but 'request'
            //console.log(errorObject);

            fs.set('devgameerror', [data]);
        }


    }
    return null;
}