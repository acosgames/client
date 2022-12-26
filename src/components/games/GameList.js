import { Component } from "react";

import {
    Link,

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
                    <Heading as="h1" size="md" pb="0rem" color="white">Ranked Games</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.175">You'll need skill to reach the top</Heading>
                    <Wrap w="100%" spacing={['1.2rem', '2rem', "1.4rem"]}>
                        {
                            rankList.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Wrap>
                </VStack>
                <Divider />
                <VStack align="left" display={soloList.length == 0 ? 'none' : undefined}>
                    <Heading as="h1" size="md" color="white">Solo Highscore</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.175">Play by yourself against the world</Heading>
                    <Flex w="100%" spacing={['0.6rem', '1rem', "1.4rem"]}>
                        {
                            soloList.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Flex>
                </VStack>
                <Divider display={experimentalList.length == 0 ? 'none' : undefined} />
                <VStack align="left" display={experimentalList.length == 0 ? 'none' : undefined}>
                    <Heading as="h1" size="md" color="white">Early Access</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.175">Not yet published, but the devs need your help!</Heading>
                    <Flex w="100%" spacing={['0.6rem', '1rem', "1.4rem"]}>
                        {
                            experimentalList.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Flex>
                </VStack>
                <Divider />
                <VStack align="left" justify={"left"}>
                    <ChLink isExternal textDecoration={"none"} href={'https://sdk.acos.games'} >
                        <Heading mb="0.5rem" as="h1" size="md" color="white">Develop Games using our Simulator and SDK</Heading>
                    </ChLink>
                    <Text as="h3" fontWeight={'light'} fontSize="sm" color="gray.175">Build, deploy, and play your game on ACOS instantly for free!</Text>
                    <Text as="h3" fontWeight={'light'} fontSize="sm" color="gray.175" pb="2rem">Check our documentation to quickly learn how to develop for ACOS.</Text>
                    <Wrap spacing="2rem">
                        <ChLink isExternal _hover={{ textDecoration: 'none' }} textDecoration={"none"} href={'https://sdk.acos.games'} p="2rem"
                            height="4.5rem"
                            display="flex"
                            flexDir={"row"}
                            bgColor="gray.1200"
                            borderRadius="2rem"
                            boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                            justifyContent="center" alignItems={'center'}>
                            <Text fontSize="xs" display="flex" color="white" >
                                <Icon color="white" alignSelf={'center'} as={TiDocumentText} fontSize="sm" />&nbsp;Documentation</Text>
                        </ChLink>
                        <Box p="2rem"
                            height="4.5rem"
                            display="flex"
                            flexDir={"row"}
                            bgColor="gray.1200"
                            borderRadius="2rem"
                            boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                            justifyContent="center" alignItems={'center'} _hover={{ textDecoration: 'none' }} >
                            <Link to="/dev">
                                <Text fontSize="xs" display="flex" color="white"><Icon color="white" alignSelf={'center'} as={FaDev} fontSize="sm" />&nbsp;Developer Zone</Text>
                            </Link>
                        </Box>
                        <ChLink isExternal _hover={{ textDecoration: 'none' }} textDecoration={"none"} href={'https://discord.gg/ydHkCcNgHD'} p="2rem"
                            height="4.5rem"
                            display="flex"
                            flexDir={"row"}
                            bgColor="gray.1200"
                            borderRadius="2rem"
                            boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                            justifyContent="center" alignItems={'center'}
                        >
                            <Text fontSize="xs" display="flex" color="white"><Icon color="white" alignSelf={'center'} as={FaDiscord} fontSize="sm" />&nbsp;Discord</Text>
                        </ChLink>
                        <ChLink isExternal _hover={{ textDecoration: 'none' }} textDecoration={"none"} href={'https://github.com/acosgames'} p="2rem"
                            height="4.5rem"
                            display="flex"
                            flexDir={"row"}
                            bgColor="gray.1200"
                            borderRadius="2rem"
                            boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                            justifyContent="center" alignItems={'center'}>

                            <Text fontSize="xs" display="flex" color="white"><Icon color="white" alignSelf={'center'} as={FaGithub} fontSize="sm" />&nbsp;GitHub</Text>
                        </ChLink>

                    </Wrap>
                </VStack >
                <Divider />
                <VStack align="left" justify={"left"}>
                    <Heading as="h1" size="md" color="white">Latest Blogs</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.175">Read the latest news for ACOS.games</Heading>
                    <HStack>
                        <ChLink isExternal textDecoration={"none"} href={'https://medium.com/@JoeOfTex/acos-web-developers-want-to-build-games-too-so-i-made-an-online-platform-to-make-it-easy-d225974fa2d8'} >
                            <HStack w={['100%']} spacing="1rem"
                                p="2rem"
                                display="flex"
                                flexDir={"row"}
                                bgColor="gray.1200"
                                borderRadius="2rem"
                                boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                                justifyContent="flex-start" alignItems={'center'} _hover={{ textDecoration: 'none' }}
                            >

                                <Box position={'relative'}>
                                    <Image
                                        borderRadius={'50%'}
                                        w={['5rem']}
                                        minW={['5rem']}
                                        h={['5rem']}
                                        minH={['5rem']}
                                        alt={'ACOS Logo'}
                                        src={'https://miro.medium.com/max/700/0*Jmxu0QcJ9STs3sji.png'}
                                        pb="0.3rem"
                                    // fallbackSrc={config.https.cdn + 'placeholder.png'}
                                    />

                                </Box>
                                <VStack justifyContent={'flex-start'} alignItems="flex-start">
                                    <Text as="span" fontWeight={'light'} fontSize="2xs" display={'block'} lineHeight={'1rem'} color="gray.150">March 29, 2022</Text>
                                    <Heading as="h2" fontWeight="light" fontSize="xs" color="white">Build web games using serverless code, persistent JSON state, and any JavaScript browser framework</Heading>
                                </VStack>

                                {/* <Text as="span" fontWeight={'light'} fontSize="sm">ACOS.games is a new type of serverless platform for simplifying the full-stack development of real-time, turn-based, competitive games.</Text> */}

                            </HStack>
                        </ChLink>
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

export default (fs.connect(['gameLists'])(GameList));