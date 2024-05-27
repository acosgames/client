import { Component, Fragment, useEffect, useRef, useState } from "react";


import DevManageGameFields from "./DevManageGameFields";
// import DevClientBundle from "./DevClientBundle";
// import DevCreateServer from './DevCreateServer';
// import DevClientList from './DevClientList';
import { clearGameFields, findGame } from '../../actions/devgame';

// import { Flex } from "@chakra-ui/layout";

import fs from 'flatstore';


import { VStack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

function DevManageGame(props) {

    let params = useParams();

    useEffect(() => {
        clearGameFields();
        let gameid = params.gameid;
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

export default fs.connect(['loaded/devgame'])((DevManageGame));