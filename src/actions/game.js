import { POST, GET, POSTFORM } from "./http";

import config from "../config";
import { getUser } from "./person";
import { wsJoinRankedGame, wsJoinBetaGame } from "./connection";
import { addRoom } from "./room";
import ACOSEncoder from "acos-json-encoder/encoder";
import ACOSDictionary from 'shared/model/acos-dictionary.json';
ACOSEncoder.createDefaultDict(ACOSDictionary);

import delta from "acos-json-delta";
import { getWithExpiry, setWithExpiry } from "./cache";
import {
    btAchievementAward,
    btClaimingAchievement,
    btDivision,
    btGame,
    btGameFound,
    btGameLists,
    btGameSlug,
    btGames,
    btJSGame,
    btLeaderboard,
    btLeaderboardHighscore,
    btLeaderboardHighscoreChange,
    btLeaderboardHighscoreCount,
    btLoading,
    btLoadingHightscores,
    btLocalPlayerHighscores,
    btNationalRankings,
    btPlayerStats,
    btRankings,
    btReplay,
    btReplays,
    btUser,
} from "./buckets";

export async function sortGames(games) {
    let rankList = [];
    let experimentalList = [];
    let soloList = [];

    for (var game_slug in games) {
        let game = games[game_slug];
        if (game.version > 0) {
            if (game.maxplayers == 1) soloList.push(game);
            else rankList.push(game);
        }
        if (!game.version) {
            experimentalList.push(game);
        }
    }

    btGameLists.set({ rankList, experimentalList, soloList });
}

export async function findGames() {
    try {
        let response = await GET("/api/v1/games");
        let result = response.data;
        if (result.ecode) {
            throw result.ecode;
        }

        let games = btGames.get();
        for (var game of result) {
            games[game.game_slug] = game;
        }

        sortGames(games);

        btGames.set(games);
    } catch (e) {
        console.error(e);
        btGames.set({});
    }
}

export async function findGame(game_slug) {
    try {
        let response = await GET("/api/v1/game/" + game_slug);
        let game = response.data;
        if (game.ecode) {
            throw game.ecode;
        }

        btGames.assign({ [game_slug]: game });
        btGame.set(game);
        // btGameFound.set(true);

        return game;
    } catch (e) {
        console.error(e);
        btGame.set(null);
        throw "E_GAMENOTFOUND";
    }
}

export async function findGameReplays(game_slug) {
    try {
        let response = await GET("/api/v1/game/replays/" + game_slug);
        let replays = response.data;
        if (!replays || replays.length == 0) return;

        for (const replay of replays) {
            replay.game_slug = game_slug;
        }

        btReplays.assign({ [game_slug]: replays });

        if (replays && replays.length > 0) {
            await downloadGameReplay(replays[0]);
        }
    } catch (e) {
        console.error(e);
    }
}

function base64ToBytesArr(str) {
    const abc = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"]; // base64 alphabet
    let result = [];

    for (let i = 0; i < str.length / 4; i++) {
        let chunk = [...str.slice(4 * i, 4 * i + 4)];
        let bin = chunk.map((x) => abc.indexOf(x).toString(2).padStart(6, 0)).join("");
        let bytes = bin.match(/.{1,8}/g).map((x) => +("0b" + x));
        result.push(...bytes.slice(0, 3 - (str[4 * i + 2] == "=") - (str[4 * i + 3] == "=")));
    }
    return result;
}

export function decodeReplay(data) {
    // let buffer = base64ToBytesArr(data);

    console.log("[REPLAY] data size = ", data.length);
    // console.log('[REPLAY] buffer size = ', buffer.length);
    // let msg = decode(buffer);
    let msg = data;

    if (msg.length > 0) {
        msg[0].payload = delta.merge({}, msg[0].payload);
        msg[0].payload = delta.merge({}, msg[0].payload);
    }

    console.log("[REPLAY] json size", JSON.stringify(msg).length);
    return msg;
}

export async function downloadGameReplay(replay) {
    if (!replay || !replay.version || !replay.mode) return null;

    //add json ext if missing
    // if (replay.filename.indexOf(".json") == -1) replay.filename += ".json";

    let url = `${config.https.cdn}g/${replay.game_slug}/replays/${replay.room_slug}.json`;

    let response = await GET(url);

    let history = response.data;

    if (history) {
        history = decodeReplay(history);
    }

    if (history[0] && history[0].version && history[0].gameid) {
        replay = Object.assign(replay, history[0]);
        // history.shift();
    }

    replay.replayId = `${replay.room_slug}`;
    replay.room_slug = "REPLAY/" + replay.game_slug;
    replay.isReplay = true;
    // replay.timerSequence = 0;

    // replay.version = 21;

    console.log(history);

    let msg = {
        room: replay,
        payload: history,
    };

    let gamepanel = addRoom(msg);
    console.log("[downloadGameReplay] ", gamepanel);

    btReplay.assign({ [replay.game_slug]: replay.room_slug });

    return gamepanel;
}

export function createRedisKey(config) {
    // if (config?.redisKey) return config?.redisKey;
    let key = ["lb"];
    if (!config?.type) config.type = "rank";
    key.push(config.type);

    if (config?.game_slug) key.push(config.game_slug);
    if (config?.countrycode) key.push(config.countrycode);
    if (typeof config?.season === "number") key.push("S" + config.season);
    if (config?.division_id) key.push(config.division_id);
    if (config?.stat_slug) key.push(config.stat_slug);

    if (config?.monthly) {
        let now = new Date();
        key.push(now.getUTCFullYear() + "" + now.getUTCMonth());
    }

    config.redisKey = key.join("/");
    return config.redisKey;
}

export async function findLeaderboard(config) {
    try {
        btLoading.assign({ leaderboardAPI: true });
        let key = createRedisKey(config);

        let cachedRanking = getWithExpiry(key);
        if (cachedRanking) {
            btLeaderboard.set(cachedRanking);
            btLoading.assign({ leaderboardAPI: false });
            return true;
        }

        let response = await POST("/api/v1/game/leaderboard/", config);
        let result = response.data;

        btLoading.assign({ leaderboardAPI: false });
        if (result.ecode) {
            if (result.ecode == "E_NOTAUTHORIZED") {
                return;
            }
            throw result.ecode;
        }

        let leaderboard = combineLeaderboards(result.leaderboard, result.localboard);
        let total = result.total;

        btLeaderboard.set({ leaderboard, total });
        setWithExpiry(key, { leaderboard, total }, 10);

        // btGameFound.set(true);
        return true;
    } catch (e) {
        console.error(e);
    }
    return false;
}

// export async function findGameLeaderboardHighscore(game_slug) {
//     try {
//         btLoadingHightscores.set(true);
//         let response = await GET("/api/v1/game/lbhs/" + game_slug);
//         let result = response.data;
//         btLoadingHightscores.set(false);
//         if (result.ecode) {
//             if (result.ecode == "E_NOTAUTHORIZED") {
//                 return;
//             }
//             throw result.ecode;
//         }

//         //combine top10 + player leaderboard
//         let top10 = result.top10hs || [];
//         let leaderboard = result.lbhs || [];
//         let combined = top10.concat(leaderboard);
//         let rankmap = {};
//         for (var i = 0; i < combined.length; i++) {
//             let ranking = combined[i];
//             rankmap[ranking.displayname] = ranking;
//         }

//         let fixed = [];
//         for (var key in rankmap) {
//             fixed.push(rankmap[key]);
//         }

//         fixed.sort((a, b) => a.rank - b.rank);

//         let local = btUser.get();
//         let localPlayer = null;
//         if (local) {
//             for (var i = 0; i < fixed.length; i++) {
//                 if (fixed[i].value == local.displayname) {
//                     localPlayer = fixed[i];
//                     break;
//                 }
//             }
//         }

//         if (localPlayer) btLocalPlayerHighscores.set(localPlayer);

//         let oldLeaderboard = btLeaderboardHighscore.get();
//         if (oldLeaderboard && local) {
//             let prevLocalLb = null;
//             let nextLocalLb = null;

//             for (var i = 0; i < oldLeaderboard.length; i++) {
//                 let oldPlayerLb = oldLeaderboard[i];
//                 if (oldPlayerLb.value == local.displayname) {
//                     prevLocalLb = oldPlayerLb;
//                     break;
//                 }
//             }

//             for (var i = 0; i < fixed.length; i++) {
//                 let playerLb = fixed[i];
//                 if (playerLb.value == local.displayname) {
//                     nextLocalLb = playerLb;
//                     break;
//                 }
//             }

//             let diffLocalLb = null;
//             if (prevLocalLb && nextLocalLb) {
//                 diffLocalLb = {};
//                 diffLocalLb.score = nextLocalLb.score - prevLocalLb.score;
//                 diffLocalLb.rank = nextLocalLb.rank - prevLocalLb.rank;
//                 btLeaderboardHighscoreChange.set(diffLocalLb);
//             } else {
//                 btLeaderboardHighscoreChange.set(null);
//             }
//         }

//         btLeaderboardHighscore.set(fixed || []);
//         btLeaderboardHighscoreCount.set(result.lbhsCount || []);
//     } catch (e) {
//         console.error(e);
//     }
// }

export function combineLeaderboards(a, b) {
    a = a || [];
    b = b || [];
    let combined = a.concat(b);
    let rankmap = {};
    for (var i = 0; i < combined.length; i++) {
        let ranking = combined[i];
        rankmap[ranking.displayname] = ranking;
    }

    let leaderboard = [];
    for (let key in rankmap) leaderboard.push(rankmap[key]);
    leaderboard.sort((a, b) => a.rank - b.rank);

    return leaderboard;
}

// export async function findGameRankNational(game_slug, countrycode) {
//     try {
//         countrycode = countrycode || "US";
//         let rankingKey = game_slug + "/rankings/national/" + countrycode;
//         let cachedRanking = getWithExpiry(rankingKey);
//         if (cachedRanking) {
//             updateNationalRanking(
//                 game_slug,
//                 countrycode,
//                 cachedRanking.leaderboard,
//                 cachedRanking.total
//             );
//             return true;
//         }
//         btLoading.assign({ GameRankNationalView: true });

//         let response = await GET("/api/v1/game/rankings/" + game_slug + "/" + countrycode);
//         let result = response.data;
//         if (result.ecode || result.localboard.ecode) {
//             if (result.ecode == "E_NOTAUTHORIZED") {
//                 // return await findGame(game_slug);
//             }
//             btLoading.assign({ GameRankNationalView: false });
//             throw result.ecode || result.localboard.ecode;
//         }

//         let leaderboard = combineLeaderboards(result.leaderboard, result.localboard);
//         updateNationalRanking(game_slug, countrycode, leaderboard, result.total);
//         btLoading.assign({ GameRankNationalView: false });

//         btGameFound.set(true);
//     } catch (e) {
//         console.error(e);
//     }
// }

// export async function findGameRankGlobal(game_slug) {
//     try {
//         let rankingKey = game_slug + "/rankings/global";
//         let cached = getWithExpiry(rankingKey);
//         if (cached) {
//             updateGlobalRanking(game_slug, cached.leaderboard, cached.total);
//             return true;
//         }
//         btLoading.assign({ GameRankGlobal: true });
//         let response = await GET("/api/v1/game/rankings/" + game_slug);
//         let result = response.data;
//         if (result.ecode) {
//             if (result.ecode == "E_NOTAUTHORIZED") {
//                 let game = await findGame(game_slug);
//                 btLoading.assign({ GameRankGlobal: false });
//                 return game;
//             }
//             btLoading.assign({ GameRankGlobal: false });
//             throw result.ecode;
//         }

//         let leaderboard = combineLeaderboards(result.leaderboard, result.localboard);

//         updateGlobalRanking(game_slug, leaderboard, result.total);
//         btLoading.assign({ GameRankGlobal: false });

//         btGameFound.set(true);
//     } catch (e) {
//         console.error(e);
//     }
// }

// export async function findGameRankDivision(game_slug, division_id) {
//     try {
//         let rankingKey = game_slug + "/rankings/division/" + division_id;
//         let cached = getWithExpiry(rankingKey);
//         if (cached) {
//             updateDivisionRanking(game_slug, division_id, cached.leaderboard, cached.total);
//             return true;
//         }
//         btLoading.assign({ GameRankDivision: true });
//         let response = await GET("/api/v1/game/rankings/division/" + game_slug + "/" + division_id);
//         let result = response.data;
//         if (result.ecode) {
//             if (result.ecode == "E_NOTAUTHORIZED") {
//                 let game = await findGame(game_slug);
//                 btLoading.assign({ GameRankDivision: false });
//                 return game;
//             }
//             btLoading.assign({ GameRankDivision: false });
//             throw result.ecode;
//         }

//         //combine top10 + player leaderboard
//         let leaderboard = result.leaderboard || [];

//         updateDivisionRanking(game_slug, division_id, leaderboard, leaderboard.length);
//         btLoading.assign({ GameRankDivision: false });
//         btGameFound.set(true);
//     } catch (e) {
//         console.error(e);
//     }
// }

// export function updateNationalRanking(game_slug, countrycode, leaderboard, total) {
//     let rankings = btNationalRankings.get();
//     if (!(game_slug in rankings)) rankings[game_slug] = {};
//     rankings[game_slug][countrycode] = {
//         leaderboard,
//         total,
//     };
//     btNationalRankings.set(rankings);
//     let rankingKey = game_slug + "/rankings/national/" + countrycode;
//     setWithExpiry(rankingKey, rankings[game_slug][countrycode], 10);
// }

// export function updateGlobalRanking(game_slug, leaderboard, total) {
//     let rankings = btRankings.get();
//     if (!(game_slug in rankings))
//         rankings[game_slug] = {
//             leaderboard,
//             total,
//         };
//     btRankings.set(rankings);
//     let rankingKey = game_slug + "/rankings/global";
//     setWithExpiry(rankingKey, rankings[game_slug], 1);
// }

// export function updateDivisionRanking(game_slug, division_id, leaderboard, total) {
//     let rankings = btDivision.get();
//     if (!(game_slug in rankings))
//         rankings[game_slug] = {
//             leaderboard,
//             total,
//         };
//     btDivision.set(rankings);
//     let rankingKey = game_slug + "/rankings/division/" + division_id;
//     setWithExpiry(rankingKey, rankings[game_slug], 1);
// }

export async function findGamePerson(game_slug) {
    try {
        let response = await GET("/api/v1/game/person/" + game_slug);
        let result = response.data;
        if (result.ecode) {
            if (result.ecode == "E_NOTAUTHORIZED" || result.ecode == "E_NOTFOUND") {
                return await findGame(game_slug);
            }
            throw result.ecode;
        }

        if (!result.game) {
            throw "E_GAMENOTFOUND";
        }

        let player_stats = btPlayerStats.get((bucket) => bucket[game_slug]) || {};
        if (result.player) {
            player_stats = result.player;
            btPlayerStats.assign({ [game_slug]: player_stats });
        }

        btGame.set(result.game);
        btGames.assign({ [game_slug]: result.game });

        // btGameFound.set(true);
    } catch (e) {
        console.error(e);
    }
}

export async function findAndRejoin(game_slug, room_slug) {
    let player_stat = btPlayerStats.get((bucket) => bucket[game_slug]);
    // let player_stat = player_stats[game_slug];
    let user = await getUser();
    if (user && user.shortid && !player_stat) {
        await findGamePerson(game_slug);
    } else {
        await findGame(game_slug);
    }

    wsRejoinRoom(game_slug, room_slug);
}

let hJoining = 0;

export async function joinGame(game, istest) {
    let game_slug = game.game_slug;
    // let version = game.version;
    // if (istest) {
    //     version = game.latest_version;
    // }
    // await downloadGame(game.gameid, version);

    // clearTimeout(hJoining);

    try {
        if (istest) {
            wsJoinBetaGame(game);
        } else {
            wsJoinRankedGame(game);
        }
    } catch (e) {
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
            btJSGame.set(true);
            rs(true);
        } catch (e) {
            console.error(e);
            rj(e);
        }
    });
}

export async function claimAchievement(game_slug, achievement_slug) {
    try {
        btClaimingAchievement.set(true);
        let request = await POST("/api/v1/game/achievement/claim", {
            game_slug,
            achievement_slug,
        });
        let response = request.data;

        if (response?.type == "award_xp") {
            let level = response.newLevel;
            btUser.assign({ level });
        }

        btAchievementAward.set(response);
        btClaimingAchievement.set(false);

        let game = btGame.get();
        let achievements = game?.achievements || [];

        for (let achievement of achievements) {
            if (achievement.achievement_slug == achievement_slug) {
                achievement.claimed = 1;
            }
        }

        btGame.assign({ achievements });

        return response;
    } catch (e) {
        btClaimingAchievement.set(false);
        console.error(e);
    }
    return null;
}

export async function reportGame(game_slug, reportType) {
    let request = await POST("/api/v1/game/report", {
        game_slug,
        reportType,
    });
    let response = request.data;

    return response;
}

export async function rateGame(game_slug, vote, previousVote) {
    let request = await POST("/api/v1/game/rate", {
        game_slug,
        vote,
        previousVote,
    });
    let response = request.data;

    return response;
}
