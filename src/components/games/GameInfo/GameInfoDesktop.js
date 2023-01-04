import { Component, useEffect } from "react";

import {
    Link, useParams,
} from "react-router-dom";

import config from '../../../config'

import fs from 'flatstore';
import { getUser, loadUserGameData } from '../../../actions/person';
import { findGame, findGamePerson } from "../../../actions/game";


import { VStack, Image, Text, Heading, Center, Box, Flex, IconButton, useDisclosure, Portal, Tooltip, Button, Icon, Wrap, HStack, Grid } from "@chakra-ui/react";
import { GiCheckMark } from '@react-icons';
// import FSGTextInput from "../widgets/inputs/FSGTextInput";

import GameInfoActions from './GameInfoActions'
import GameInfoJoinButton from './GameInfoJoinButton'

import { findQueue } from "../../../actions/queue";
import GameInfoLeaderboard from "./GameInfoLeaderboard";
import GameInfoDescription from "./GameInfoDescription";
import GameInfoBuild from "./GameInfoBuild";
import PlayerRankInfo from "./PlayerRankInfo";
import GameInfoReplay from "./GameInfoReplay";
import GameInfoTag from "./GameInfoTag";

fs.set('loadingGameInfo', true);
function GameInfo2(props) {

    let [game] = fs.useWatch('game');
    let [player_stats] = fs.useWatch('player_stats');
    let [loadingGameInfo] = fs.useWatch('loadingGameInfo');


    let { game_slug, room_slug, mode } = useParams();

    mode = mode || 'rank';
    // let roomStatus = getRoomStatus(room_slug);


    useEffect(() => {
        gtag('event', 'gameinfo', { game_slug });

    }, [])

    useEffect(() => {
        let test = 1;

        // setCurrentRoom('room_slug');
        // fs.set('room_slug', room_slug);
        // if (room_slug) {
        //     setCurrentRoom(room_slug);

        //     roomStatus = getRoomStatus(room_slug);
        //     if (roomStatus == 'NOTEXIST') {
        //         history.push('/g/' + game_slug);
        //         return;
        //     }
        // }

        // if (room_slug)
        //     return;

        // fs.set('iframeLoaded', false);
        // fs.set('gamepanel', null);


        loadUserGameData(game_slug)
    }, [])



    // let game_slug = props.match.params.game_slug;
    // let gamestate = fs.get('gamestate');

    if (loadingGameInfo)
        return (
            <Box className="gameinfo" display="inline-block" width="100%" >
                <Center>
                    <Text fontWeight={"bold"} color="white">Loading...</Text>
                </Center>
            </Box >
        )


    let playerStats = player_stats[game_slug] || {};
    if (!game || game.game_slug != game_slug) {
        //fs.set('game', null);
        return (
            <Box className="gameinfo" display="inline-block" width="100%" >
                <Center>
                    <GameInfo404 />
                </Center>
            </Box>
        )

    }

    let imgUrl = config.https.cdn + 'placeholder.png';
    if (game.preview_images && game.preview_images.length > 0)
        imgUrl = `${config.https.cdn}g/${game.game_slug}/preview/${game.preview_images}`;

    let playerCntRange = game.minplayers + '-' + game.maxplayers;
    if (game.minplayers == game.maxplayers)
        playerCntRange = game.minplayers;


    let hasOpenSource = game.opensource == 1
    let hasTeams = game.minteams > 0
    let hasMultiplayerTopScore = game.lbscore == 1 && game.maxplayers > 1;

    return (

        <Box className="gameinfo" display="inline-block" width="100%" >

            <Center>

                <VStack width="100%" align="center">

                    <HStack w="100%" h="100%" justifyContent={'center'} spacing="0rem" alignItems={'flex-start'}>
                        <GameInfoImage borderRadius="2rem" game_slug={game.game_slug} imgUrl={imgUrl} />


                        <Flex pl="1rem" flex="1" ml="3rem"
                            direction="column"
                            alignSelf={'flex-start'}
                            w="auto"
                            h="100%"
                            position="relative">

                            <HStack w="100%" height="100%">
                                <VStack alignItems={'flex-start'} spacing="0">
                                    <Heading color="gray.50" fontSize={['xl', '2xl']} lineHeight={['2rem', '2rem', '3rem']}>{game.name}</Heading>


                                    <Box>
                                        <Text color="gray.100" as="span" fontSize="xs" pt="0">By </Text>
                                        <Link to={'/profile/' + game.displayname}><Text as="span" fontSize="xs" color="gray.100" pt="0">{game.displayname}</Text></Link>
                                    </Box>

                                    <Wrap width="100%" pt="1rem" flex="1" justifyContent={'flex-start'} alignItems={"flex-end"}>
                                        {
                                            hasOpenSource &&
                                            <GameInfoTag to={"https://github.com/acosgames/" + game.game_slug}
                                                title="opensource" />
                                        }
                                        {
                                            hasMultiplayerTopScore &&
                                            <GameInfoTag title="topscore" />
                                        }
                                        {
                                            hasTeams &&
                                            <GameInfoTag title="teams" />
                                        }
                                        <GameInfoTag title="replays" />
                                    </Wrap>
                                    {/* <Text color="gray.100" as="h5" pt="0.5rem" fontSize={['xs', 'sm']} fontWeight="400">{game.shortdesc}</Text> */}

                                </VStack>



                            </HStack>



                            {/* <Box alignSelf={'flex-end'} bottom="0" display={['none', 'none', 'block']} w="100%">
                            <GameInfoJoinButton {...game} {...playerStats} />
                        </Box> */}

                        </Flex>


                        <VStack display={['none', 'none', 'none', 'flex']} width="30rem">

                            <Flex display={['flex', 'flex']} h="100%" flex="1" w="100%" pb="1rem">
                                <GameInfoJoinButton {...game} {...playerStats} />
                            </Flex>
                            <PlayerRankInfo game_slug={game_slug} game={game} />
                        </VStack>
                    </HStack>

                    <VStack display={['flex', 'flex', 'flex', 'none']} width="100%" alignItems={'center'} justifyContent='center'>


                        <Flex display={['flex', 'flex']} h="100%" flex="1" w="100%" pt="1rem" pb="1rem">
                            <GameInfoJoinButton {...game} {...playerStats} />
                        </Flex>
                        <PlayerRankInfo game_slug={game_slug} game={game} />
                    </VStack>

                    <Center pt="2rem">
                        <GameInfoActions {...game} {...playerStats} />
                    </Center>



                    <GameInfoReplay game_slug={game.game_slug} />

                    <Flex w="100%">


                        <GameInfoLeaderboard gameinfo={game} />
                    </Flex>


                    <GameInfoDescription longdesc={game.longdesc} />

                    <GameInfoBuild />


                </VStack >
            </Center >
        </Box >

    )

}

function GameInfo404(props) {

    // let [game] = fs.useWatch('game');
    // let [loadingGameInfo] = fs.useWatch('loadingGameInfo');

    // if (loadingGameInfo)
    //     return <></>
    // // return (<Text fontSize="4xl" color={'#D9E63A'}>Loading</Text>)
    return (
        <Text fontSize="4xl">404: Game Not Found</Text>
    )
}


function GameInfoImage(props) {
    // let [queues] = fs.useWatch('queues');
    let inQueue = findQueue(props.game_slug);
    return (
        <Box
            _after={{
                content: '""',
                display: 'block',
                paddingBottom: '100%'
            }}
            position="relative"
            w={['8rem', '12rem', '14rem']}
            minW={['8rem', '12rem', '14rem']}
            className="gameinfo-image"
        >
            <Image
                borderRadius={'2rem'}
                position="absolute"
                width="100%"
                minHeight={'8rem'}
                // height="100%"
                objectFit={'fill'}
                src={props.imgUrl}
                // fallbackSrc={config.https.cdn + 'placeholder.png'}
                w="100%"
            />
            <Tooltip label={`In queue`}>
                <Button
                    display={inQueue ? 'flex' : 'none'}
                    flex="1"
                    bgColor='gray.800'
                    _hover={{ bg: "gray.800" }}
                    _active={{ bg: "gray.800" }}
                    size="md"
                    mr="0"
                    w="30%"
                    p="0.5rem"
                    position="absolute"
                    top="-10px"
                    right="-10px"
                    // icon={<FaPlay />}
                    borderTopLeftRadius={"9999px"}
                    borderBottomLeftRadius={"9999px"}

                    borderTopRightRadius={'9999px'}
                    borderBottomRightRadius={'9999px'}
                >
                    <Icon color={'brand.500'} ml={0} fontSize="20px" as={GiCheckMark} />
                </Button>
            </Tooltip>
        </Box>
    )
}


export default GameInfo2;