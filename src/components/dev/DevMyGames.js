import { Component } from "react";

import { findDevGames } from '../../actions/devgame';

import {
    Link,
    useHistory,
    withRouter,
} from "react-router-dom";
import fs from 'flatstore';
import SLink from "../widgets/SLink";
import { Text, Box, Heading, HStack, Icon, IconButton, VStack, Divider, Spacer, useClipboard } from "@chakra-ui/react";

import {
    FiCopy,
    FiEdit, FiTrash
} from 'react-icons/fi'
import DevMyGameListItem from "./DevMyGameListItem";

function DevMyGames(props) {



    const showInvitation = () => {
        let user = props.user;
        if (user && user.isdev) {
            return <h4>Organization: fivesecondgames</h4>
        }

        return (
            <div>
                <span><a className="button" href="https://github.com/orgs/fivesecondgames/invitation">Accept Invitation</a> to Github Organization "fivescondgames"</span>
            </div>
        )
    }

    const listGames = () => {
        let games = props.devgames || [];
        let elems = [];

        const history = useHistory();

        for (var i = 0; i < games.length; i++) {
            let game = games[i];
            elems.push((

                <DevMyGameListItem key={'devgames-' + game.gameid} {...game} />

            ))
        }

        return elems;
    }
    /*
        Dashboard
        - Published games with stats
        - beta games with stats
        - create new game
        - documentation
        - exmaple code
        - discord
    */

    return (
        <>
            <Heading as="h2">My Games</Heading>
            <VStack align="left" mt="5" spacing="1rem" divider={<Divider mt="1rem" mb="1rem" />}>
                {listGames()}
            </VStack>
        </>

    )

}

export default withRouter(fs.connect(['devgames'])(DevMyGames));

