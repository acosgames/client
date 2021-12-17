import { Component, useEffect } from "react";

import {
    withRouter,
} from "react-router-dom";
import { Redirect } from 'react-router';

import fs from 'flatstore';
import { getUser } from '../../actions/person';
import { findGame, findGamePerson } from "../../actions/game";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { HStack, VStack, Image, Icon, Text, Heading, Center, Wrap, Box, Link, IconButton, Button, Spacer, Flex, Divider, Menu, MenuItem, MenuList, MenuButton, Grid } from "@chakra-ui/react";

// import { FiUsers } from "@react-icons/all-files/fi/FiUsers";
// import { IoWarningSharp } from "@react-icons/all-files/io5/IoWarningSharp";
// import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
// import { FaPlay } from "@react-icons/all-files/fa/FaPlay";
// import { FaThumbsUp } from "@react-icons/all-files/fa/FaThumbsUp";
// import { FaThumbsDown } from "@react-icons/all-files/fa/FaThumbsDown";

import { FiUsers } from "@react-icons";
import { IoWarningSharp } from "@react-icons";
import { FaGithub, FaPlay, FaThumbsDown, FaThumbsUp, FaCaretDown } from "@react-icons";
import SLink from "../widgets/SLink";
import FSGGroup from "../widgets/inputs/FSGGroup";
import FSGRead from "../widgets/inputs/FSGRead";
// import FSGTextInput from "../widgets/inputs/FSGTextInput";

import GameInfoActions from './GameInfoActions'
import GameInfoJoinButton from './GameInfoJoinButton'


function GameInfo(props) {
    const game_slug = props.match.params.game_slug;

    useEffect(async () => {
        let test = 1;
        let user = await getUser();


        try {
            let game = fs.get(game_slug);
            if (!game) {
                if (!user) {
                    await findGame(game_slug)
                }
                else
                    await findGamePerson(game_slug);
            }

        }
        catch (e) {
            if (!user) {
                await findGame(game_slug)
            }
            else
                await findGamePerson(game_slug);
        }
    }, [])


    const handleGoBack = () => {
        props.history.push("/games");
    }




    // let game_slug = props.match.params.game_slug;
    let game = fs.get(game_slug);
    if (!game) {
        //fs.set('game', null);
        return <React.Fragment></React.Fragment>
    }

    let imgUrl = 'https://cdn.fivesecondgames.com/file/fivesecondgames/placeholder.png';
    if (game.preview_images && game.preview_images.length > 0)
        imgUrl = `https://cdn.fivesecondgames.com/file/fivesecondgames/${game.gameid}/preview/${game.preview_images}`;

    let playerCntRange = game.minplayers + '-' + game.maxplayers;
    if (game.minplayers == game.maxplayers)
        playerCntRange = game.minplayers;

    return (
        <Center>
            <VStack maxW={['100%', '100%', '100%', '80%', '1000px']} align="center">

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
                            w="100%"
                        />
                    </Box>


                    <Flex ml="1rem" direction="column" alignSelf={'stretch'} w="100%" position="relative">
                        <Heading fontSize={['xl', '2xl']}>{game.name}</Heading>

                        <Text as="h5" pt="0.5rem" fontSize={['md', 'lg']} fontWeight="bold">{game.shortdesc}</Text>
                        <Text as="span" color="gray.500" >version {game.version}</Text>

                        <Box flexGrow={'1'}>
                            <Text as="span" >Created by @joetex</Text>
                        </Box>
                        <Box alignSelf={'flex-end'} bottom="0" display={['none', 'none', 'block']} w="100%">
                            <GameInfoJoinButton {...game} />
                        </Box>
                    </Flex>


                </Flex>
                <Flex display={['flex', 'flex', 'none']} pt="1rem" h="100%" flex="1" w="100%">
                    <GameInfoJoinButton {...game} />
                </Flex>

                <GameInfoActions {...game} />

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

export default withRouter(fs.connect(['game'])(GameInfo));