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
import { VStack, Image, Text, Heading, Center, Box, Flex, IconButton, useDisclosure, Portal } from "@chakra-ui/react";

import SLink from "../../widgets/SLink";
import FSGGroup from "../../widgets/inputs/FSGGroup";
import FSGRead from "../../widgets/inputs/FSGRead";
// import FSGTextInput from "../widgets/inputs/FSGTextInput";

import GameInfoActions from './GameInfoActions'
import GameInfoJoinButton from './GameInfoJoinButton'
import GameInfoTop10 from './GameInfoTop10'
import GameInfoCreateDisplayname from "./GameInfoCreateDisplayName";
import GameScreen2 from "../GameScreen/GameScreen2";
function GameInfo2(props) {
    const game_slug = props.match.params.game_slug;
    const room_slug = props.match.params.room_slug;
    const mode = props.match.params.mode || 'rank';
    let roomStatus = getRoomStatus(room_slug);

    const history = useHistory();

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

    useEffect(async () => {
        gtag('event', 'gameinfo', { game_slug });


    }, [])







    // let game_slug = props.match.params.game_slug;
    let gamestate = fs.get('gamestate');
    let player_stats = fs.get('player_stats');
    let playerStats = player_stats[game_slug] || {};
    let game = props.game;
    if (!game || game.game_slug != game_slug) {
        //fs.set('game', null);
        return <React.Fragment></React.Fragment>
    }

    let imgUrl = config.https.cdn + 'placeholder.png';
    if (game.preview_images && game.preview_images.length > 0)
        imgUrl = `${config.https.cdn}g/${game.game_slug}/preview/${game.preview_images}`;

    let playerCntRange = game.minplayers + '-' + game.maxplayers;
    if (game.minplayers == game.maxplayers)
        playerCntRange = game.minplayers;


    let shouldShowGame = room_slug && roomStatus != "NOTEXIST";

    return (
        <>
            {shouldShowGame && (

                <GameScreen2 />

            )}
            <Box className="gameinfo" filter={shouldShowGame ? 'blur(20px)' : 'blur(0)'} transition={'all 0.3s ease-in'} display="inline-block" width="100%" pl={[3, 4, 12]} pr={[3, 4, 12]} pt={6}>



                <Center>

                    <VStack width="100%" maxW={['100%', '100%', '100%', '80%', '1000px']} align="center">

                        <Flex w="100%" >
                            <Box
                                _after={{
                                    content: '""',
                                    display: 'block',
                                    paddingBottom: '100%'
                                }}
                                position="relative"
                                w={['128px', '160px', '256px']}
                            >
                                <Image
                                    position="absolute"
                                    width="100%"
                                    height="100%"
                                    objectFit={'fill'}
                                    src={imgUrl}
                                    fallbackSrc={config.https.cdn + 'placeholder.png'}
                                    w="100%"
                                />
                            </Box>


                            <Flex ml="1rem" direction="column" alignSelf={'flex-start'} w="100%" position="relative">
                                <Heading fontSize={['xl', '2xl']}>{game.name}</Heading>

                                <Text as="h5" pt="0.5rem" fontSize={['md', 'lg']} fontWeight="bold">{game.shortdesc}</Text>
                                <Text as="span" color="gray.500" fontSize="xs">version {game.version}</Text>

                                <Box flexGrow={'1'}>
                                    <Text as="span" fontSize="xs">Created by </Text>
                                    <Link to={'/profile/' + game.displayname}><Text as="span" fontSize="xs" color="yellow.100">{game.displayname}</Text></Link>
                                </Box>
                                {/* <Box alignSelf={'flex-end'} bottom="0" display={['none', 'none', 'block']} w="100%">
                            <GameInfoJoinButton {...game} {...playerStats} />
                        </Box> */}
                                <Box mt="1rem" display={['none', 'none', 'block']}>
                                    <GameInfoActions {...game} {...playerStats} />
                                </Box>
                            </Flex>


                        </Flex>


                        <Box display={['block', 'block', 'none']}>
                            <Center>
                                <GameInfoActions {...game} {...playerStats} />
                            </Center>
                        </Box>

                        <Flex display={['flex', 'flex']} h="100%" flex="1" w="100%">
                            <GameInfoJoinButton {...game} {...playerStats} />
                        </Flex>
                        <GameInfoTop10 />

                        <FSGGroup fontSize="1.2rem" title="Description" hfontSize="1rem">
                            <Box align="left" id="game-info-longdesc">
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

                        <FSGGroup title="Release" spacing="1rem" hfontSize="1rem">
                            <FSGRead disabled={true}
                                size="xs"
                                title="Release Date"
                                value={game.tsinsert}
                            />
                            <FSGRead disabled={true}
                                size="xs"
                                title="Last Updated"
                                value={game.tsupdate}
                            />
                            <FSGRead disabled={true}
                                size="xs"
                                title="Build Version"
                                value={game.version}
                            />
                            <FSGRead disabled={true}
                                size="xs"
                                title="Experimental Version"
                                value={game.latest_version}
                            />
                        </FSGGroup>
                        {/* 
                <FSGGroup fontSize="1.2rem" title="Reviews">
                
                <GameInfoReviews game_slug={game.game_slug} />
            </FSGGroup> */}

                    </VStack >
                </Center >
            </Box>
        </>
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

export default withRouter(fs.connect(['game', 'player_stats'])(GameInfo2));