import React, { Component } from "react";

import {
    withRouter,
} from "react-router-dom";

import config from '../../config'


import Connection from "./Connection";
import fs from 'flatstore';
import { sendLoadMessage, wsJoinRankedGame, wsRejoinRoom } from "../../actions/connection";
import { joinGame, findGame, downloadGame, findAndRejoin } from "../../actions/game";
import LeaveGame from "./LeaveGame";
import { Box, Button, IconButton } from "@chakra-ui/react";
import { BsArrowsFullscreen } from '@react-icons';

// fs.set('iframe', null);
fs.set('iframes', {});
fs.set('iframesLoaded', {});

class GamePanel extends Component {
    constructor(props) {
        super(props);

        this.gamepanel = null;
        this.iframe = null;
        this.state = {}
        this.sent = 0;
        this.game_slug = props.match.params.game_slug;
        this.experimental = props.match.params.experimental;
        this.room_slug = props.match.params.room_slug;

        let games = fs.get('games');

        if (Object.keys(games).length == 0) {
            findAndRejoin(this.game_slug, this.room_slug);

        }
        else {
            this.game = null;
            for (var i = 0; i < games.length; i++) {
                if (games[i].game_slug == this.game_slug) {
                    this.game = games[i];
                    break;
                }
            }
        }

        let iframesLoaded = fs.get('iframesLoaded');
        if (!iframesLoaded[this.room_slug]) {
            iframesLoaded[this.room_slug] = false;
            fs.set('iframesLoaded', iframesLoaded);
        }
    }





    async componentDidMount() {
        let game = this.props.game;
        if (!game)
            game = this.game;
    }

    renderIframe(room) {

        if (!room)
            return (<React.Fragment></React.Fragment>)

        let room_slug = room.room_slug;
        let game_slug = room.game_slug;
        let version = room.version;
        let srcUrl = `${config.https.cdn}${game_slug}/client/client.bundle.${version}.html`;
        srcUrl = '/iframe';


        return (
            <Box
                position="absolute"
                top="0"
                bottom="0"
                left="0"
                right="0"
                bg="white"
                // id="gamepanel-wrapper"
                ref={(c) => {
                    this.gamepanel = c;
                }}>
                <iframe
                    className="gamescreen"
                    ref={(c) => {
                        this.iframe = c;

                        let iframes = fs.get('iframes');
                        iframes[room_slug] = c;
                        fs.set('iframes', iframes);

                    }}
                    onLoad={() => {
                        //joinGame(game, game.istest);
                        let iframesLoaded = fs.get('iframesLoaded');
                        iframesLoaded[room_slug] = true;
                        fs.set('iframesLoaded', iframesLoaded);

                        sendLoadMessage(room_slug, game_slug, version);
                    }}
                    src={srcUrl}
                    sandbox="allow-scripts"
                />
                <Connection></Connection>
                <IconButton icon={<BsArrowsFullscreen />} onClick={() => { this.openFullscreen(this.gamepanel) }}>Full Screen</IconButton>
                <LeaveGame></LeaveGame>
            </Box>
        )
    }

    renderLoadingScreen(room) {

        let game = fs.get('game');



        let iframesLoaded = fs.get('iframesLoaded');

        if (room && iframesLoaded[room.room_slug])
            return (<React.Fragment></React.Fragment>)

        let gamename = game ? game.name : room ? room.game_slug : '';
        return (
            <div id="gameloading-wrapper">
                <div id="gameloading">
                    <h2>{gamename}</h2>
                    <h3>Loading...</h3>
                </div>
            </div>
        )
    }

    render() {

        let room = this.props.room;

        return (
            <div id="gameframe">
                <Box
                    w="100%"
                    pb="75%">

                </Box>
                {this.renderLoadingScreen(room)}
                {this.renderIframe(room)}
            </div>
        )
    }
}

let onCustomWatched = ownProps => {
    let room_slug = ownProps.match.params.room_slug;
    return ['rooms>' + room_slug, 'iframesLoaded>' + room_slug];
};
let onCustomProps = (key, value, store, ownProps) => {
    let room_slug = ownProps.match.params.room_slug;
    if (key == 'rooms>' + room_slug)
        key = 'room';
    else if (key == 'iframesLoaded>' + room_slug)
        key = 'loaded';
    if (!value)
        return {};

    return {
        [key]: value
    };
};
export default withRouter(fs.connect([], onCustomWatched, onCustomProps)(GamePanel));