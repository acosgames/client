import { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";
import { Redirect } from 'react-router';

import SimpleBarReact from "simplebar-react";
import { findGames } from '../../actions/game';
import fs from 'flatstore';
import GameListItem from "./GameListItem";
import { Box, Divider, Flex, Heading, HStack, Icon, Text, VStack, Wrap, chakra, Link as ChLink, Image } from "@chakra-ui/react";
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
        let soloList = gameLists?.soloList || [];
        // let productionGames = games.filter(v => v.status == 3);
        // let betaGames = games.filter(v => v.status == 2);
        return (
            <VStack width="100%" align="left" spacing="4rem">
                <VStack align="left">
                    <Heading as="h1" size="md" pb="0rem">Ranked Games</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.300">You'll need skill to reach the top</Heading>
                    <Wrap w="96%" spacing={['0.6rem', '1rem', "1.4rem"]}>
                        {
                            rankList.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Wrap>
                </VStack>
                <Divider />
                <VStack align="left" display={soloList.length == 0 ? 'none' : undefined}>
                    <Heading as="h1" size="md">Solo Highscore</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.300">Play by yourself against the world</Heading>
                    <Flex w="100%" spacing={['0.6rem', '1rem', "1.4rem"]}>
                        {
                            soloList.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Flex>
                </VStack>
                <Divider display={experimentalList.length == 0 ? 'none' : undefined} />
                <VStack align="left" display={experimentalList.length == 0 ? 'none' : undefined}>
                    <Heading as="h1" size="md">Early Access</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.300">Not yet published, but the devs need your help!</Heading>
                    <Flex w="100%" spacing={['0.6rem', '1rem', "1.4rem"]}>
                        {
                            experimentalList.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Flex>
                </VStack>
                <Divider />
                <VStack align="left" justify={"left"}>
                    <ChLink isExternal textDecoration={"none"} href={'https://docs.acos.games'} >
                        <Heading mb="0.5rem" as="h1" size="md">Develop Games using our Simulator and SDK</Heading>
                    </ChLink>
                    <Text as="span" fontWeight={'light'} fontSize="sm" color="gray.300">Build, deploy, and play your game on ACOS instantly for free!</Text>
                    <Text as="span" fontWeight={'light'} fontSize="sm" color="gray.300">Check our documentation to quickly learn how to develop for ACOS.</Text>
                    <Wrap spacing="2rem">
                        <ChLink isExternal textDecoration={"none"} href={'https://docs.acos.games'} >
                            <Text fontSize="xs" display="flex" color="white" ><Icon color="white" alignSelf={'center'} as={TiDocumentText} fontSize="sm" />&nbsp;Docs</Text>
                        </ChLink>
                        <Link to="/dev">
                            <Text fontSize="xs" display="flex" color="white"><Icon color="white" alignSelf={'center'} as={FaDev} fontSize="sm" />&nbsp;Developer Zone</Text>
                        </Link>
                        <ChLink isExternal textDecoration={"none"} href={'https://discord.gg/ydHkCcNgHD'} >
                            <Text fontSize="xs" display="flex" color="white"><Icon color="white" alignSelf={'center'} as={FaDiscord} fontSize="sm" />&nbsp;Discord</Text>
                        </ChLink>
                        <ChLink isExternal textDecoration={"none"} href={'https://github.com/acosgames'} >
                            <Text fontSize="xs" display="flex" color="white"><Icon color="white" alignSelf={'center'} as={FaGithub} fontSize="sm" />&nbsp;GitHub</Text>
                        </ChLink>

                    </Wrap>
                </VStack >
                <Divider />
                <VStack align="left" justify={"left"}>
                    <Heading as="h1" size="md">Latest Blogs</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.300">Read the latest news for ACOS.games</Heading>
                    <HStack>
                        <Box w={['16rem']}>
                            <ChLink isExternal textDecoration={"none"} href={'https://medium.com/@JoeOfTex/acos-web-developers-want-to-build-games-too-so-i-made-an-online-platform-to-make-it-easy-d225974fa2d8'} >
                                <Box position={'relative'}>
                                    <Image
                                        w={['16rem']}
                                        minW={['16rem']}
                                        h={['16rem']}
                                        minH={['16rem']}
                                        alt={'ACOS Logo'}
                                        src={'https://miro.medium.com/max/700/0*Jmxu0QcJ9STs3sji.png'}
                                        pb="0.3rem"
                                    // fallbackSrc={config.https.cdn + 'placeholder.png'}
                                    />
                                    <Text as="span" fontWeight={'light'} fontSize="2xs" backgroundColor="rgba(0,0,0,0.5)" display={'block'} position='absolute' top="0" left="0" padding="0.2rem" lineHeight={'1rem'}>March 29, 2022</Text>
                                </Box>
                                <Heading p="1rem" as="h2" fontWeight="light" fontSize="xs">Build web games using serverless code, persistent JSON state, and any JavaScript browser framework</Heading>
                                {/* <Text as="span" fontWeight={'light'} fontSize="sm">ACOS.games is a new type of serverless platform for simplifying the full-stack development of real-time, turn-based, competitive games.</Text> */}
                            </ChLink>
                        </Box>
                    </HStack>
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