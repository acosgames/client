import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";
import { Redirect } from 'react-router';

import fs from 'flatstore';
import { findGame, joinGame } from "../../actions/game";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { HStack, VStack, Image, Icon, Text, Heading, Wrap, Box, Link, IconButton, Button, Spacer, Flex, Divider } from "@chakra-ui/react";

import { FiHeart, FiUsers } from "react-icons/fi";
import { IoCode, IoCodeWorking, IoDocument } from "react-icons/io5";
import { FaGithub, FaGofore, FaPlay, FaRestroom } from "react-icons/fa";
import SLink from "../widgets/SLink";
import FSGGroup from "../widgets/inputs/FSGGroup";


function GameInfo(props) {
    const game_slug = props.match.params.game_slug;
    try {
        let game = fs.get(game_slug);
        if (!game)
            findGame(game_slug)
    }
    catch (e) {
        findGame(game_slug)
    }

    const handleGoBack = () => {
        props.history.push("/games");
    }

    const handleJoin = () => {
        //let game_slug = props.match.params.game_slug;
        let game = fs.get(game_slug);
        if (!game)
            return

        joinGame(game);
    }

    const handleJoinBeta = () => {
        //let game_slug = props.match.params.game_slug;
        let game = fs.get(game_slug);
        if (!game)
            return

        joinGame(game, true);
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
        <VStack maxW={['100%', '100%', '100%', '80%', '1000px']}>
            <HStack w="100%" alignItems={'flex-start'}>
                <Box
                    _after={{
                        content: '""',
                        display: 'block',
                        paddingBottom: '100%'
                    }}
                    position="relative"
                    w={['50%', '300px']}
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

                <Flex height="100%" direction={'column'} pl="1rem" align="left" spacing="0">
                    <Heading>{game.name}</Heading>
                    <Text pt="0.5rem" fontSize="xl" fontWeight="bold">{game.shortdesc}</Text>
                    <Text color="gray.500" >version {game.version}</Text>
                    <Text pt="1rem">Created by @joetex</Text>

                    <VStack align="left" h="100%">
                        <HStack>
                            <HStack pr="1rem">
                                <Icon color="gray.300" as={FiUsers} />
                                <Text color="gray.300">{game.count || 0}</Text>
                            </HStack>
                            <HStack>
                                <Icon color="gray.300" as={FiHeart} />
                                <Text color="gray.300">{game.votes || 0}</Text>
                            </HStack>
                        </HStack>
                        <HStack>
                            <Icon color="gray.300" as={FaGithub} />
                            <Text color="gray.300"><Link target="_blank" href={`https://github.com/fivesecondgames/${props.game_slug}/issues`}>Submit an Issue</Link></Text>
                        </HStack>
                    </VStack>
                    {/* <Button
                        onClick={() => {
                            setAcceptInvite(true);
                        }}
                        bgColor="brand.500"
                        _hover={{ bg: "brand.600" }}
                        _active={{ bg: "brand.900" }}
                        //disabled={acceptInvite}
                        w={"full"}
                        justifyContent={"center"}
                        variant={"outline"}
                        leftIcon={<FaPlay size="2rem" />} >
                </Button> */}
                    <IconButton
                        mt="1rem"
                        bgColor="brand.500"
                        _hover={{ bg: "brand.600" }}
                        _active={{ bg: "brand.900" }}
                        size="lg"
                        icon={<FaPlay />}
                        isRound={true}><Text>Join</Text></IconButton>
                </Flex>
            </HStack >
            <FSGGroup>
                <Box align="left" id="game-info-longdesc">
                    <ReactMarkdown children={game.longdesc} remarkPlugins={[remarkGfm]}></ReactMarkdown>
                </Box>
            </FSGGroup>

        </VStack >
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