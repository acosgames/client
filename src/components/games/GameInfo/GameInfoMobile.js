import { Component, useEffect } from "react";

import {
    Link,
    withRouter,
    useHistory
} from "react-router-dom";
import { Redirect } from 'react-router';

import config from '../../../config'

import fs from 'flatstore';
import { getUser } from '../../../actions/person';
import { findGame, findGamePerson } from "../../../actions/game";
import { getRoomStatus, setCurrentRoom } from '../../../actions/room';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { VStack, Image, Text, Heading, Center, Box, Flex, IconButton, useDisclosure, Portal, Tooltip, Button, Icon, Wrap, HStack, Grid } from "@chakra-ui/react";
import { GiCheckMark } from '@react-icons';
import SLink from "../../widgets/SLink";
import FSGGroup from "../../widgets/inputs/FSGGroup";
import FSGRead from "../../widgets/inputs/FSGRead";
// import FSGTextInput from "../widgets/inputs/FSGTextInput";

import GameInfoActions from './GameInfoActions'
import GameInfoJoinButton from './GameInfoJoinButton'

import { findQueue } from "../../../actions/queue";
import GameInfoLeaderboard from "./GameInfoLeaderboard";
import GameInfoReplay from "./GameInfoReplay";
import ratingtext from "shared/util/ratingtext";

fs.set('loadingGameInfo', true);
function GameInfo2(props) {
    const game_slug = props.match.params.game_slug;
    const room_slug = props.match.params.room_slug;
    const mode = props.match.params.mode || 'rank';
    // let roomStatus = getRoomStatus(room_slug);

    const history = useHistory();

    useEffect(async () => {
        gtag('event', 'gameinfo', { game_slug });

    }, [])

    useEffect(async () => {
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
        let player_stats = fs.get('player_stats');
        let player_stat = player_stats[game_slug];

        try {
            let curgame = fs.get('game');
            let game = null;
            let user = await getUser();
            if (user && user.shortid && !player_stat) {

                await findGamePerson(game_slug);
                return;
            }

            game = fs.get('games>' + game_slug);
            if (game && game.longdesc && (!curgame || !curgame.longdesc)) {
                fs.set('game', game);
                return;
            }

            if (!curgame || curgame.game_slug != game_slug) {
                await findGame(game_slug)
                return;
            }

        }
        catch (e) {

        }
    })



    // let game_slug = props.match.params.game_slug;
    // let gamestate = fs.get('gamestate');
    let player_stats = fs.get('player_stats');
    let playerStats = player_stats[game_slug] || {};
    let game = props.game;
    if (!game || game.game_slug != game_slug) {
        //fs.set('game', null);

        return (
            <Box className="gameinfo" display="inline-block" width="100%" >
                <Center>
                    <GameInfoLoading />
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


    const parseDate = (dt) => {
        if (!dt)
            return '';
        return dt.split('T')[0];
    }

    let screentype = game.screentype;
    switch (screentype) {
        case 1: screentype = 'Fullscreen'; break;
        case 2: screentype = 'Fixed Resolution'; break;
        case 3: screentype = 'Scaled Resolution'; break;
    }

    let resow = game.resow;
    let resoh = game.resoh;
    let screenwidth = game.screenwidth;
    let resolution = resow + ':' + resoh;
    if (game.screentype == 3) {
        resolution += ' @ ' + screenwidth + 'px';
    }

    let played = playerStats.played;
    played = 0;
    let ratingTxt = ratingtext.ratingToRank(playerStats.rating);
    let ratingTextFormatted = played >= 10 ? ratingTxt.toUpperCase() : 'UNRANKED';
    let ratingImageFile = played >= 10 ? ratingTxt.replace(/ /ig, '') : 'Unranked';

    return (

        <Box className="gameinfo" display="inline-block" width="100%" >

            <Center>

                <VStack width="100%" align="center">

                    <HStack w="100%" h="100%" justifyContent={'center'} spacing="2rem" alignItems={'flex-start'}>
                        <GameInfoImage borderRadius="2rem" game_slug={game.game_slug} imgUrl={imgUrl} />


                        <Flex ml="3rem" direction="column" alignSelf={'flex-start'} w="100%" position="relative">

                            <HStack w="100%">
                                <VStack flex="1" alignItems={'flex-start'}>
                                    <Heading color="gray.50" fontSize={['xl', '2xl']}>{game.name}</Heading>


                                    <Box flexGrow={'1'}>
                                        <Text color="gray.100" as="span" fontSize="xxs">By </Text>
                                        <Link to={'/profile/' + game.displayname}><Text as="span" fontSize="xs" color="gray.100">{game.displayname}</Text></Link>
                                    </Box>

                                    <Text color="gray.100" as="h5" pt="0.5rem" fontSize={['xs', 'sm']} fontWeight="400">{game.shortdesc}</Text>

                                </VStack>


                            </HStack>


                            <Flex display={['flex', 'flex']} h="100%" flex="1" w="100%" pt={['1rem', "1rem", "1rem"]}>
                                <GameInfoJoinButton {...game} {...playerStats} />
                            </Flex>

                            {/* <Box alignSelf={'flex-end'} bottom="0" display={['none', 'none', 'block']} w="100%">
                            <GameInfoJoinButton {...game} {...playerStats} />
                        </Box> */}
                            <Box mt="1rem" display={['none', 'none', 'none', 'block']}>
                                <GameInfoActions {...game} {...playerStats} />
                            </Box>
                        </Flex>



                    </HStack>

                    <Box pt="1rem" display={['block', 'block', 'block', 'none']} >
                        <Center>
                            <GameInfoActions {...game} {...playerStats} />
                        </Center>
                    </Box>



                    {/* <GameInfoReplay game_slug={game.game_slug} /> */}

                    <Flex w="100%">


                        <GameInfoLeaderboard gameinfo={game} />
                    </Flex>


                    <Box p="0" m="0" pt="0" pb="3rem" width="100%">
                        <FSGGroup fontSize="0.8rem" title="Description" hfontSize="sm">
                            <Box width="100%" align="left" id="game-info-longdesc">
                                <ReactMarkdown
                                    allowed
                                    allowedElements={[
                                        "strong",
                                        "span",
                                        "emphasis",
                                        "i",
                                        "b",
                                        "p",
                                        "strike",
                                        "s",
                                        "del",
                                        "div",
                                        "table", "thead", "tbody", "tr", "th", "td"
                                    ]}
                                    children={game.longdesc}
                                    remarkPlugins={[remarkGfm]}></ReactMarkdown>
                            </Box>
                        </FSGGroup>
                    </Box>
                    <FSGGroup title="Build Information" spacing="1rem" hfontSize="sm">
                        <Grid width="100%" spacing={'2rem'} gridTemplateColumns={'repeat(4, minmax(0, 1fr))'} rowGap={'1rem'} fontWeight='100'>
                            <FSGRead disabled={true}
                                hfontSize="xs"
                                fontSize="xs"
                                title="Released"
                                color={'color.100'}
                                value={parseDate(game.tsinsert)}
                            />
                            <FSGRead disabled={true}
                                hfontSize="xs"
                                fontSize="xs"
                                title="Updated"
                                color={'color.100'}
                                value={parseDate(game.tsupdate)}
                            />
                            <FSGRead disabled={true}
                                hfontSize="xs"
                                fontSize="xs"
                                title="Published"
                                color={'color.100'}
                                value={'v' + game.version}
                            />
                            <FSGRead disabled={true}
                                hfontSize="xs"
                                fontSize="xs"
                                title="Experimental"
                                color={'color.100'}
                                value={'v' + game.latest_version}
                            />
                            <FSGRead disabled={true}
                                hfontSize="xs"
                                fontSize="xs"
                                title="Screen"
                                color={'color.100'}
                                value={screentype}
                            />
                            <Box display={game.screentype == 1 ? 'none' : 'block'}>


                                <FSGRead disabled={true}
                                    hfontSize="xs"
                                    fontSize="xs"
                                    title="Resolution"
                                    color={'color.100'}
                                    value={resolution}
                                />
                            </Box>
                        </Grid>

                    </FSGGroup>


                </VStack >
            </Center >
        </Box >

    )

}

function GameInfoLoading(props) {

    if (props.loadingGameInfo)
        return <></>
    // return (<Text fontSize="4xl" color={'#D9E63A'}>Loading</Text>)
    return (
        <Text fontSize="4xl">404: Game Not Found</Text>
    )
}

GameInfoLoading = fs.connect(['game', 'loadingGameInfo'])(GameInfoLoading);


function GameInfoImage(props) {
    let inQueue = findQueue(props.game_slug);
    return (
        <Box
            _after={{
                content: '""',
                display: 'block',
                paddingBottom: '100%'
            }}
            position="relative"
            w={['12rem', '16rem', '24rem']}
            minW={['12rem', '16rem', '24rem']}
            className="gameinfo-image"
        >
            <Image
                borderRadius={'2rem'}
                position="absolute"
                width="100%"
                minHeight={'10rem'}
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

GameInfoImage = fs.connect(['queues'])(GameInfoImage);

export default withRouter(fs.connect(['game', 'player_stats'])(GameInfo2));