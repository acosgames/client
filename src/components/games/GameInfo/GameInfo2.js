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

import GameInfoCreateDisplayname from "../../login/GameInfoCreateDisplayName";
import GameScreen2 from "../GameScreen/GameScreen2";
import { findQueue } from "../../../actions/queue";
import GameInfoLeaderboard from "./GameInfoLeaderboard";

fs.set('loadingGameInfo', true);
function GameInfo2(props) {
    const game_slug = props.match.params.game_slug;
    const room_slug = props.match.params.room_slug;
    const mode = props.match.params.mode || 'rank';
    let roomStatus = getRoomStatus(room_slug);

    const history = useHistory();

    useEffect(async () => {
        gtag('event', 'gameinfo', { game_slug });

    }, [])

    useEffect(async () => {
        let test = 1;

        // setCurrentRoom('room_slug');
        // fs.set('room_slug', room_slug);
        if (room_slug) {
            setCurrentRoom(room_slug);

            roomStatus = getRoomStatus(room_slug);
            if (roomStatus == 'NOTEXIST') {
                history.push('/g/' + game_slug);
                return;
            }
        }

        // if (room_slug)
        //     return;

        fs.set('iframeLoaded', false);
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
    let gamestate = fs.get('gamestate');
    let player_stats = fs.get('player_stats');
    let playerStats = player_stats[game_slug] || {};
    let game = props.game;
    if (!game || game.game_slug != game_slug) {
        //fs.set('game', null);

        return (
            <Box className="gameinfo" display="inline-block" width="100%" pl={[3, 4, 12]} pr={[3, 4, 12]} pt={6}>
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


    let shouldShowGame = room_slug;

    const parseDate = (dt) => {
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
    return (
        <Box width="100%" p="0" m="0" position="relative" h="100%">
            {shouldShowGame && (

                <GameScreen2 />

            )}
            <Box className="gameinfo" filter={shouldShowGame ? 'blur(20px)' : 'blur(0)'} transition={'all 0.3s ease-in'} display="inline-block" width="100%" pl={[3, 4, 12]} pr={[3, 4, 12]} pt={10}>

                <Center>

                    <VStack width="100%" maxW={['100%', '100%', '100%', '80%', '1000px']} align="center">

                        <Flex w="100%" >
                            <GameInfoImage game_slug={game.game_slug} imgUrl={imgUrl} />


                            <Flex ml="1rem" direction="column" alignSelf={'flex-start'} w="100%" position="relative">
                                <Heading fontSize={['xl', '2xl']}>{game.name}</Heading>

                                <Text as="h5" pt="0.5rem" fontSize={['xxs', 'xs']} fontWeight="400">{game.shortdesc}</Text>
                                <Text as="span" color="gray.500" fontSize="xxs">version {game.version}</Text>

                                <Box flexGrow={'1'}>
                                    <Text as="span" fontSize="xxs">Developed by </Text>
                                    <Link to={'/profile/' + game.displayname}><Text as="span" fontSize="xs" color="yellow.100">{game.displayname}</Text></Link>
                                </Box>
                                {/* <Box alignSelf={'flex-end'} bottom="0" display={['none', 'none', 'block']} w="100%">
                            <GameInfoJoinButton {...game} {...playerStats} />
                        </Box> */}
                                <Box mt="1rem" display={['none', 'none', 'none', 'block']}>
                                    <GameInfoActions {...game} {...playerStats} />
                                </Box>
                            </Flex>


                        </Flex>


                        <Box pt="1rem" display={['block', 'block', 'block', 'none']} >
                            <Center>
                                <GameInfoActions {...game} {...playerStats} />
                            </Center>
                        </Box>

                        <Flex display={['flex', 'flex']} h="100%" flex="1" w="100%" pt={['1rem', "1rem", "3rem"]}>
                            <GameInfoJoinButton {...game} {...playerStats} />
                        </Flex>
                        <GameInfoLeaderboard gameinfo={game} />

                        <Box p="0" m="0" pt="3rem" pb="3rem" width="100%">
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
                                    color={'white'}
                                    value={parseDate(game.tsinsert)}
                                />
                                <FSGRead disabled={true}
                                    hfontSize="xs"
                                    fontSize="xs"
                                    title="Updated"
                                    color={'white'}
                                    value={parseDate(game.tsupdate)}
                                />
                                <FSGRead disabled={true}
                                    hfontSize="xs"
                                    fontSize="xs"
                                    title="Published"
                                    color={'white'}
                                    value={'v' + game.version}
                                />
                                <FSGRead disabled={true}
                                    hfontSize="xs"
                                    fontSize="xs"
                                    title="Experimental"
                                    color={'white'}
                                    value={'v' + game.latest_version}
                                />
                                <FSGRead disabled={true}
                                    hfontSize="xs"
                                    fontSize="xs"
                                    title="Screen"
                                    color={'white'}
                                    value={screentype}
                                />
                                <Box display={game.screentype == 1 ? 'none' : 'block'}>


                                    <FSGRead disabled={true}
                                        hfontSize="xs"
                                        fontSize="xs"
                                        title="Resolution"
                                        color={'white'}
                                        value={resolution}
                                    />
                                </Box>
                            </Grid>

                        </FSGGroup>
                        {/* 
                        let screentype = game.screentype;
    let resow = game.resow;
    let resoh = game.resoh;
    let screenwidth = game.screenwidth;

                <FSGGroup fontSize="1.2rem" title="Reviews">
                
                <GameInfoReviews game_slug={game.game_slug} />
            </FSGGroup> */}

                    </VStack >
                </Center >
            </Box>
        </Box>
        // <div id="game-info" onClick={(e) => {
        //     if (e.target == e.currentTarget)
        //         this.props.history.push('/g');
        // }}>
        //     <div id="game-info-content">
        //         <img src={imgUrl} width="300" />
        //         <h3>{game.name} <span>Build: {game.version}</span></h3>

        //         <h4>{game.shortdesc}</h4>
        //         <div className="game-info-attributes">
        //             <div className="game-info-attribute">
        //                 <span>{playerCntRange}</span> <label>Seats</label>
        //             </div>
        //         </div>
        //         <div id="game-join-ranked">
        //             <button onClick={() => { this.handleJoin() }}>Join Ranked</button>
        //             <button onClick={() => { this.handleJoinBeta() }}>Join Beta</button>
        //         </div>
        //         <hr />
        //         <div id="game-info-longdesc">
        //             
        //         </div>

        //     </div>
        // </div>
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
            w={['12rem', '12rem', '25.6rem']}
            minW={['12rem', '12rem', '12.8rem']}
            className="gameinfo-image"
        >
            <Image
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