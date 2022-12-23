

const ModeFromID = [
    'experimental', 'rank', 'public', 'private'
]
const ModeFromName = {
    'experimental': 0,
    'rank': 1,
    'public': 2,
    'private': 3
}

export function getGameModeID(name) {
    return ModeFromName[name];
}

export function getGameModeName(id) {
    return ModeFromID[id];
}