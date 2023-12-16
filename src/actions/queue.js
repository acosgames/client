
import fs from 'flatstore';


export async function onQueueStats(msg) {

    fs.set('queueStats', msg);
}

export async function addGameQueue(newQueues) {

    let queues = fs.get('queues') || localStorage.getItem('queues') || [];

    let queueMap = {};
    queues.forEach(q => queueMap[q.game_slug + q.mode] = true);

    newQueues.forEach(q => {
        if (!queueMap[q.game_slug + q.mode])
            queues.push(q);
    })


    fs.set('queues', queues);

}

export async function addJoinQueues(game_slug, mode) {
    let joinqueues = getJoinQueues() || {};

    if (!joinqueues.queues)
        joinqueues.queues = [];

    let game = fs.get('game');
    let games = fs.get('games');

    if (!game || !game.longdesc) {
        game = games[game_slug];
    }

    if (!joinqueues.queues.find(q => q.game_slug == game_slug && q.mode == mode)) {
        joinqueues.queues.push({ game_slug, mode, preview_image: game.preview_images, name: game.name });
        joinqueues.owner = null;
        fs.set('joinqueues', joinqueues);
        localStorage.setItem('joinqueues', JSON.stringify(joinqueues));
    }
}

export function getJoinQueues() {
    let joinqueues = fs.get('joinqueues') || [];
    try {
        if (!joinqueues || joinqueues.length == 0) {
            joinqueues = localStorage.getItem('joinqueues');
            if (joinqueues)
                joinqueues = JSON.parse(joinqueues);

            if (!joinqueues)
                joinqueues = {}
        }
    }
    catch (e) {
        console.error(e);
    }

    return joinqueues;
}

export function findQueue(game_slug) {
    let queues = fs.get('queues') || localStorage.getItem('queues') || [];
    if (queues.find(q => (q.game_slug == game_slug))) {
        return true;
    }
    return false;
}

export async function clearGameQueues() {
    fs.set('queues', []);
    localStorage.setItem('queues', []);
    fs.set('joinqueues', null);
    localStorage.removeItem('joinqueues');
}


export async function getQueues() {
    return fs.get('queues') || [];
}