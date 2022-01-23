import { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";
import { Redirect } from 'react-router';

import { findGames } from '../../actions/game';
import fs from 'flatstore';
import GameListItem from "./GameListItem";
import { Box, Divider, Flex, Heading, HStack, Icon, Text, VStack, Wrap, chakra, Link as ChLink } from "@chakra-ui/react";
import { FaDiscord, FaDev, FaGithub, TiDocumentText } from '@react-icons';
import SLink from "../widgets/SLink";

class GameList extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        findGames();

        gtag('event', 'gamelist');

    }

    render() {
        let gameLists = this.props.gameLists || {};
        let rankList = gameLists?.rankList || [];
        let experimentalList = gameLists?.experimentalList || [];
        // let productionGames = games.filter(v => v.status == 3);
        // let betaGames = games.filter(v => v.status == 2);
        return (
            <VStack width="100%" align="left" spacing="4rem">
                <VStack align="left">
                    <Heading as="h1" size="lg" pb="0rem">Ranked Games</Heading>
                    <Heading as="h3" size="md" pb="2rem" fontWeight="light" color="gray.300">You'll need skill to reach the top</Heading>
                    <Wrap w="100%" spacing="2rem">
                        {
                            rankList.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Wrap>
                </VStack>
                <VStack align="left" display={experimentalList.length == 0 ? 'none' : undefined}>
                    <Heading as="h1" size="lg">Needs Testing</Heading>
                    <Flex w="100%">
                        {
                            experimentalList.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Flex>
                </VStack>
                <Divider />
                <VStack align="left" justify={"left"}>
                    <Heading mb="0.5rem" as="h1" size="lg">Are you a developer?</Heading>
                    <Text as="span" fontWeight={'light'} fontSize="sm">Build a game, deploy, and start playing in a single day!</Text>
                    <Wrap spacing="1rem">
                        <Link to="/dev">
                            <Text fontSize="sm" display="flex" color="gray.300"><Icon color="white" alignSelf={'center'} as={FaDev} fontSize="16" />&nbsp;Developer Zone</Text>
                        </Link>
                        <ChLink isExternal textDecoration={"none"} href={'https://discord.gg/ydHkCcNgHD'} >
                            <Text fontSize="sm" display="flex" color="gray.300"><Icon color="white" alignSelf={'center'} as={FaDiscord} fontSize="16" />&nbsp;Chat on Discord</Text>
                        </ChLink>
                        <ChLink isExternal textDecoration={"none"} href={'https://github.com/acosgames'} >
                            <Text fontSize="sm" display="flex" color="gray.300"><Icon color="white" alignSelf={'center'} as={FaGithub} fontSize="16" />&nbsp;GitHub</Text>
                        </ChLink>
                        <ChLink isExternal textDecoration={"none"} href={'https://docs.acos.games'} >
                            <Text fontSize="sm" display="flex" color="gray.300"><Icon color="white" alignSelf={'center'} as={TiDocumentText} fontSize="16" />&nbsp;Documentation</Text>
                        </ChLink>
                    </Wrap>
                </VStack >
            </VStack >
            // <div id="game-grid-wrapper">
            //     <h3>Games</h3>
            //     <div id="game-grid">
            //         {
            //             productionGames.map(game => (<GameListItem key={"gamelistitem-" + game.gameid} game={game}></GameListItem>))
            //         }
            //     </div>
            //     <h3>Games in Beta</h3>
            //     <div id="game-grid">
            //         {
            //             betaGames.map(game => (<GameListItem key={"gamelistitem-" + game.gameid} game={game}></GameListItem>))
            //         }
            //     </div>
            // </div>
        )
    }
}

export default withRouter(fs.connect(['gameLists'])(GameList));