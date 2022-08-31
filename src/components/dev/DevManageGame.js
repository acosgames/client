import { Component, Fragment, useEffect, useRef, useState } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevManageGameFields from "./DevManageGameFields";
// import DevClientBundle from "./DevClientBundle";
// import DevCreateServer from './DevCreateServer';
// import DevClientList from './DevClientList';
import { clearGameFields, findGame } from '../../actions/devgame';

// import { Flex } from "@chakra-ui/layout";

import fs from 'flatstore';


import { VStack } from "@chakra-ui/react";

function DevManageGame(props) {

    useEffect(() => {
        clearGameFields();
        let gameid = props.match.params.gameid;
        findGame(gameid);


        gtag('event', 'devmanagegame');

    }, [])

    let devgame = fs.get('devgame');
    if (!devgame || !devgame.game_slug) {
        return <></>
    }

    return (
        <VStack w="100%">

            <DevManageGameFields devgame={devgame} />


        </VStack>


    )
}

export default fs.connect(['loaded/devgame'])(withRouter(DevManageGame));