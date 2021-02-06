import { POST } from './http';

import fs from 'flatstore';
fs.set('devgameimages', []);
fs.set('devgame', {});
fs.set('devgameerror', []);

export async function addImages(images) {
    fs.set('devgameimages', images);
}

export async function updateGame(name, value) {
    let game = fs.get('devgame');
    game[name] = value;

    fs.set('devgame', game);

    console.log(game);
}

export async function createGame(progressCB) {

    try {
        let newGame = fs.get('devgame');
        // let images = fs.get('devgameimages');

        // let progress = {
        //     onUploadProgress: progressEvent => console.log(progressEvent.loaded)
        // };

        // var formData = new FormData();
        // images.forEach((image) => {
        //     formData.append("images", image.file);
        // })

        let response = await POST('/dev/create/game', newGame);
        let game = response.data;

        if (game.ecode) {
            fs.set('devgameerror', game);
            //TODO: add notification here for error codes
            console.log(game);
            return null;
        }

        //fs.set('devgame', game);
        console.log(game);
        return game;
    }
    catch (e) {
        console.error(e);
    }
    return null;
}