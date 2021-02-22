import { POST, GET, POSTFORM } from './http';

import { validateSimple } from 'forkoff-shared/util/validation';
import { genShortId } from 'forkoff-shared/util/idgen';

import fs from 'flatstore';
fs.set('devgameimages', []);
fs.set('devgame', {});
fs.set('devgameerror', []);

fs.set('devClientsImages', []);
fs.set('devClients', []);
fs.set('devClientsError', []);

fs.set('devServerImages', []);
fs.set('devServers', []);
fs.set('devServerError', []);

function imagesToMap(images) {
    let obj = {};
    images.forEach((v, i) => {
        v.file.index = i;
        obj[v.file.name] = v;
    });
    return obj;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



export async function addImages(imgstore, nextImages, uploadFunc) {

    let game = fs.get('devgame');
    let curImages = fs.get(imgstore);
    if (!curImages)
        return;

    let curMap = imagesToMap(curImages);
    let nextMap = imagesToMap(nextImages);

    let added = [];
    let deleted = [];
    for (var key in curMap) {
        if (!(key in nextMap)) {
            deleted.push(curMap[key]);
        }
    }

    for (var key in nextMap) {
        if (!(key in curMap)) {
            let image = nextMap[key];

            added.push(image);
        }
    }

    if (added.length > 0) {

        if (uploadFunc) {
            uploadFunc(added, nextImages);

        }
    }


    fs.set(imgstore, nextImages);
}

export async function findClients(gameid) {
    try {
        let response = await GET('/dev/find/clients/' + gameid);
        let clients = response.data;

        for (var i = 0; i < clients.length; i++) {
            let client = clients[i];
            if (client.preview_images) {
                let images = [];
                let list = client.preview_images.split(',');
                for (var i = 0; i < list.length; i++) {
                    let url = 'https://f000.backblazeb2.com/file/fivesecondgames/' + client.gameid + '/clients/preview/' + list[i];
                    images.push({ data_url: url, file: {} });
                }
                fs.set('devclientimages_' + client.id, images);
            }
        }

        fs.set('devclientserror', []);
        console.log(clients);
        fs.set('devclients', clients);
        return clients;
    }
    catch (e) {
        console.error(e);

        if (e.response) {
            const { response } = e;
            const data = response.data;
            fs.set('devclientserror', [data]);
        }
    }
    return null;
}

function rowsToMap(list) {
    let map = {};
    for (var i = 0; i < list.length; i++) {
        let obj = list[i];
        map[obj.id] = obj;
    }
    return map;
}

export async function findGame(gameid) {
    try {
        let response = await GET('/dev/find/game/' + gameid);
        let game = response.data;

        if (game.preview_images) {
            let images = [];
            let list = game.preview_images.split(',');
            for (var i = 0; i < list.length; i++) {
                let url = 'https://f000.backblazeb2.com/file/fivesecondgames/' + game.gameid + '/preview/' + list[i];
                images.push({ data_url: url, file: {} });
            }
            fs.set('devgameimages', images);
        }

        fs.set('devgameerror', []);
        console.log(game);
        fs.set('devgame', game);

        fs.set('devClientsCnt', game.clients.length);
        for (var i = 0; i < game.clients.length; i++) {
            updateClient(game.clients[i]);
        }


        fs.set('devServersCnt', game.servers.length);
        fs.set('devServers', rowsToMap(game.servers));

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

function updateClient(client) {
    let game = fs.get('devgame');
    let clients = game.clients;
    if (!clients)
        return;

    fs.set('devClients-' + client.id, client);

    var storageURL = 'https://f000.backblazeb2.com/file/fivesecondgames/';
    var storagePath = client.gameid + '/client/' + client.id + '/'
    if (client.preview_images) {
        let images = [];
        let list = client.preview_images.split(',');
        for (var j = 0; j < list.length; j++) {
            let url = storageURL + storagePath + list[j];
            images.push({ data_url: url, file: {} });
        }
        fs.set('devclientimages_' + client.id, images);

        let bundleURL = storageURL + storagePath + client.build_client;
        fs.set('devClientBundle_' + client.id, bundleURL);
    }
}

export async function uploadClientBundle(client, file) {

    let progress = {
        onUploadProgress: progressEvent => {
            console.log(progressEvent.loaded)
        }
    };

    var formData = new FormData();
    formData.append('clientid', client.id);
    formData.append('gameid', client.gameid);
    //images.forEach(image => {
    formData.append("bundle", file);
    //})

    let response = await POST('/dev/update/client/bundle/' + client.id, formData, progress);
    let updatedClient = response.data;

    updateClient(updatedClient);

    console.log(updatedClient);

    return updatedClient
}


export async function uploadClientImages(images, nextImages) {
    var client = fs.get('devclient');
    var preview_images = null;
    for (var i = 0; i < images.length; i++) {
        let image = images[i];

        let response = await uploadClientImage(client, image);
        preview_images = response.images;
        console.log(preview_images);
    }

    if (preview_images) {
        for (var i = 0; i < preview_images.length; i++) {
            if (nextImages[i]) {
                let url = 'https://f000.backblazeb2.com/file/fivesecondgames/' + client.gameid + '/client/' + client.id + '/' + preview_images[i];
                nextImages[i].data_url = url;
            }
        }
    }
}

export async function uploadClientImage(client, image) {
    try {
        let progress = {
            onUploadProgress: progressEvent => {
                console.log(progressEvent.loaded)
            }
        };

        var formData = new FormData();
        formData.append('clientid', client.id);
        formData.append('gameid', client.gameid);
        //images.forEach(image => {
        formData.append("images", image.file);
        //})

        let response = await POST('/dev/update/client/images/' + client.id, formData, progress);
        let client = response.data;
        updateClient(client);
        console.log(client);

        return client;
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

export async function uploadGameImages(images, nextImages) {
    var game = fs.get('devgame');
    var preview_images = null;
    for (var i = 0; i < images.length; i++) {
        let image = images[i];

        let response = await uploadGameImage(game.gameid, image);
        preview_images = response.images;
        console.log(preview_images);
    }

    if (preview_images) {
        for (var i = 0; i < preview_images.length; i++) {
            if (nextImages[i]) {
                let url = 'https://f000.backblazeb2.com/file/fivesecondgames/' + game.gameid + '/preview/' + preview_images[i];
                nextImages[i].data_url = url;
            }
        }
    }
}

export async function uploadGameImage(gameid, image) {
    try {
        let progress = {
            onUploadProgress: progressEvent => {
                console.log(progressEvent.loaded)
            }
        };

        var formData = new FormData();
        formData.append('gameid', gameid);

        //images.forEach(image => {
        formData.append("images", image.file);
        //})

        let response = await POST('/dev/update/game/images/' + gameid, formData, progress);
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

        let errors = validateSimple('game_info', newGame);
        if (errors.length > 0) {
            fs.set('devgameerror', errors);
            return newGame;
        }

        // var formData = new FormData();
        // for (var key in newGame) {
        //     let value = newGame[key];
        //     if (value == null || key.indexOf("ts") == 0)
        //         continue;
        //     formData.append(key, newGame[key]);
        // }
        // let images = fs.get('devgameimages');
        // images.forEach(image => {
        //     formData.append("images", image.file, image.file.filename);
        // })

        // let response = await uploadImage(image, image.file.index, filename);
        // console.log(response.data);


        let response = await POST('/dev/update/game', newGame);
        let game = response.data;

        //let imageResponse = await uploadImages();
        //let gameWithImages = response.data;

        //console.log(gameWithImages);

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

    let errors = validateSimple('game_info', game);
    if (errors.length > 0) {
        fs.set('devgameerror', errors);
        return game;
    }

    game[name] = value;

    fs.set('devgame', game);

    console.log(game);
}

export async function updateClientField(name, value) {
    let client = fs.get('devclient');

    let errors = validateSimple('game_client', client);
    if (errors.length > 0) {
        fs.set('devclienterror', errors);
        return client;
    }

    client[name] = value;

    fs.set('devclient', client);

    console.log(client);
}

export async function updateServerField(name, value) {
    let server = fs.get('devserver');

    let errors = validateSimple('game_server', server);
    if (errors.length > 0) {
        fs.set('devservererror', errors);
        return server;
    }

    server[name] = value;

    fs.set('devserver', server);

    console.log(server);
}

export async function createClient(progressCB) {

    try {
        let game = fs.get('devgame');
        let newClient = fs.get('devclient');

        let errors = validateSimple('game_client', newClient);
        if (errors.length > 0) {
            fs.set('devclienterror', errors);
            return newClient;
        }

        let response = await POST('/dev/create/client/' + game.gameid, newClient);
        let client = response.data;

        fs.set('devclienterror', []);
        console.log(client);
        return client;
    }
    catch (e) {
        console.error(e);

        if (e.response) {
            const { response } = e;
            const data = response.data;

            //const { request, ...errorObject } = response; // take everything but 'request'
            //console.log(errorObject);

            fs.set('devclienterror', [data]);
        }


    }
    return null;
}


export async function createServer(progressCB) {

    try {
        let game = fs.get('devgame');
        let newServer = fs.get('devserver');

        let errors = validateSimple('game_server', newServer);
        if (errors.length > 0) {
            fs.set('devservererror', errors);
            return newServer;
        }

        let response = await POST('/dev/create/server/' + game.gameid, newServer);
        let server = response.data;

        fs.set('devservererror', []);
        console.log(server);
        return server;
    }
    catch (e) {
        console.error(e);

        if (e.response) {
            const { response } = e;
            const data = response.data;

            //const { request, ...errorObject } = response; // take everything but 'request'
            //console.log(errorObject);

            fs.set('devservererror', [data]);
        }


    }
    return null;
}

export async function createGame(progressCB) {

    try {
        let newGame = fs.get('devgame');

        let errors = validateSimple('game_info', newGame);
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