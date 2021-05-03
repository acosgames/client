import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";
import GameList from "./gamepanel/GameList";

import { w3cwebsocket as W3CWebSocket } from "websocket";

import { encode, decode } from 'fsg-shared/util/encoder';

class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        this.sent = 0;

        this.connect();
    }

    parseCookies() {
        let cookies = {};
        document.cookie.split(';').forEach(v => {
            let pair = v.split('=');
            if (!pair || !pair[0])
                return;

            cookies[pair[0].trim()] = pair[1].trim();
        })
        return cookies;
    }

    connect() {
        let cookies = this.parseCookies();
        this.client = new W3CWebSocket('ws://127.0.0.1:9002/g/1234', cookies['X-API-KEY'], 'http://localhost:3000', {});
        this.client.onopen = (err) => {
            console.log(err);
            console.log('WebSocket Client Connected');

            if (this.client.readyState == this.client.OPEN) {

                let payload = { "state": { "deck": ["2D", "3C", "2S", "JC", "4S", "9C", "KC", "4D", "AC", "7D", "4C", "8C", "6C", "WW", "TC", "5S", "3H", "5D", "8S", "3D", "2C", "QS", "6D", "9S", "QH", "7S", "AH", "8H", "3S", "AS", "TD", "4H"], "seats": "Joel,Tim,Bob,Bob2,Bob3,Bob4,Bob5,0,0,0", "players": { "Joel": { "name": "Joel", "cards": "4D,WW", "active": true, "status": 2, "chips": 93, "bets": "90", "seat": 0, "betpool": 0 }, "Tim": { "name": "Tim", "cards": "4C,9H", "active": true, "status": 3, "chips": 103, "bets": "96", "seat": 1, "betpool": 0 }, "Bob": { "name": "Bob", "cards": "2S,2C", "active": false, "status": 3, "chips": 98, "bets": "2", "seat": 2, "betpool": 0 }, "Bob2": { "name": "Bob2", "cards": "2H,6S", "active": false, "status": 3, "chips": 96, "bets": "4", "seat": 3, "betpool": 0 }, "Bob3": { "name": "Bob3", "cards": "TD,KS", "active": false, "status": 3, "chips": 100, "bets": "0", "seat": 4, "betpool": 0 }, "Bob4": { "name": "Bob4", "cards": "4S,WW", "active": false, "status": 3, "chips": 100, "bets": "0", "seat": 5, "betpool": 0 }, "Bob5": { "name": "Bob5", "cards": "7S,QD", "active": false, "status": 3, "chips": 100, "bets": "0", "seat": 6, "betpool": 0 } }, "burned": "6S,JS,9H", "table": "QD,7H,TS,6H,WW", "dealer": 1, "blinds": "2,3", "phase": 4, "pot": 192, "bettingPot": "96", "betcount": 2, "lastBet": 96, "lastBetter": 1, "lastAction": "fold", "minBet": 4, "maxBet": 8 }, "rules": { "deck": { "decks": 1, "jokers": 2, "type": "standard52" }, "game": "" }, "next": { "seatid": 3, "actions": "call,fold" }, "errors": "", "hands": [[{ "rank": 7, "score": 10, "name": "Straight", "hand": "6H,7H,WW,WW,TS", "player": "Joel", "chips": 93 }, { "rank": 7, "score": 10, "name": "Straight", "hand": "6H,7H,WW,9H,TS", "player": "Tim", "chips": 99 }]] };

                let msg = encode(payload);
                console.log("msg size: ", msg.length);
                this.client.send(msg);
            }

        };

        this.client.onerror = (error) => {
            console.error(error);
        }
        this.client.onmessage = async (message) => {
            let buffer = await message.data.arrayBuffer();
            let msg = decode(buffer);
            console.log(msg);
            // let buffer = await message.data.arrayBuffer();
            // console.log("buffer size: ", buffer.byteLength);
            // let decoded = this.pson.decode(buffer);
            // console.log(decoded);

            // if (this.sent < 2) {
            //     this.sent++;

            //     let encoded = this.pson.encode({ "state": { "deck": ["2D", "3C", "2S", "JC", "4S", "9C", "KC", "4D", "AC", "7D", "4C", "8C", "6C", "WW", "TC", "5S", "3H", "5D", "8S", "3D", "2C", "QS", "6D", "9S", "QH", "7S", "AH", "8H", "3S", "AS", "TD", "4H"], "seats": "Joel,Tim,Bob,Bob2,Bob3,Bob4,Bob5,0,0,0", "players": { "Joel": { "name": "Joel", "cards": "4D,WW", "active": true, "status": 2, "chips": 93, "bets": "90", "seat": 0, "betpool": 0 }, "Tim": { "name": "Tim", "cards": "4C,9H", "active": true, "status": 3, "chips": 103, "bets": "96", "seat": 1, "betpool": 0 }, "Bob": { "name": "Bob", "cards": "2S,2C", "active": false, "status": 3, "chips": 98, "bets": "2", "seat": 2, "betpool": 0 }, "Bob2": { "name": "Bob2", "cards": "2H,6S", "active": false, "status": 3, "chips": 96, "bets": "4", "seat": 3, "betpool": 0 }, "Bob3": { "name": "Bob3", "cards": "TD,KS", "active": false, "status": 3, "chips": 100, "bets": "0", "seat": 4, "betpool": 0 }, "Bob4": { "name": "Bob4", "cards": "4S,WW", "active": false, "status": 3, "chips": 100, "bets": "0", "seat": 5, "betpool": 0 }, "Bob5": { "name": "Bob5", "cards": "7S,QD", "active": false, "status": 3, "chips": 100, "bets": "0", "seat": 6, "betpool": 0 } }, "burned": "6S,JS,9H", "table": "QD,7H,TS,6H,WW", "dealer": 1, "blinds": "2,3", "phase": 4, "pot": 192, "bettingPot": "96", "betcount": 2, "lastBet": 96, "lastBetter": 1, "lastAction": "fold", "minBet": 4, "maxBet": 8 }, "rules": { "deck": { "decks": 1, "jokers": 2, "type": "standard52" }, "game": "" }, "next": { "seatid": 3, "actions": "call,fold" }, "errors": "", "hands": [[{ "rank": 7, "score": 10, "name": "Straight", "hand": "6H,7H,WW,WW,TS", "player": "Joel", "chips": 93 }, { "rank": 7, "score": 10, "name": "Straight", "hand": "6H,7H,WW,9H,TS", "player": "Tim", "chips": 99 }]] })

            //     let buffer = encoded.toArrayBuffer();
            //     console.log("buffer size: ", buffer.byteLength);
            //     this.client.send(buffer);
            // }
        };
    }
    render() {
        return (
            <div id="mainpage">
                <GameList />

            </div>
        )
    }
}

export default withRouter(MainPage);

