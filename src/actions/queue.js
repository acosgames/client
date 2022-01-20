
import fs from 'flatstore';

export async function addGameQueue(game_slug, mode) {

    let queues = fs.get('queues') || localStorage.getItem('queues') || [];
    let payload = { mode, game_slug };
    if (!queues.find(q => (q.mode == mode && q.game_slug == game_slug))) {
        queues.push(payload)
        fs.set('queues', queues);
    }
}

export async function clearGameQueues() {
    fs.set('queues', []);
    localStorage.setItem('queues', []);
}


export async function getQueues() {
    return fs.get('queues') || [];
}