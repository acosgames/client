
import {
    Link,

} from "react-router-dom";
import fs from 'flatstore';
import SLink from "../widgets/SLink";
import { Text, Box, Heading, HStack, Icon, IconButton, VStack, Divider, Spacer, useClipboard, Skeleton } from "@chakra-ui/react";

import { FiPlus } from '@react-icons'
import DevMyGameListItem from "./DevMyGameListItem";
import { useEffect } from "react";
import { findDevGames } from "../../actions/devgame";
fs.set('loadingGames', true);

function DevMyGames(props) {



    const showInvitation = () => {
        let user = props.user;
        if (user && user.isdev) {
            return <h4>Organization: acosgames</h4>
        }

        return (
            <div>
                <span><a className="button" href="https://github.com/orgs/acosgames/invitation">Accept Invitation</a> to Github Organization "acosgames"</span>
            </div>
        )
    }

    useEffect(() => {
        gtag('event', 'devmygames');
        let user = props.user;
        findDevGames(user.id)
    }, [])

    const listGames = () => {
        let games = props.devgames || [];
        let elems = [];



        for (var i = 0; i < games.length; i++) {
            let game = games[i];
            elems.push((

                <DevMyGameListItem key={'devgames-' + game.game_slug} {...game} />

            ))
        }

        if (games.length == 0) {
            elems.push(
                <VStack key={"dev-nogames-found"} spacing="2rem">
                    <Heading size="2xl">No games found.</Heading>
                    <Heading color="gray.400" size="lg">Are you ready to create a game?</Heading>
                    <Box mt="2rem">
                        <Link to="/dev/game/create/">
                            <HStack>
                                <IconButton
                                    bgColor="brand.500"
                                    _hover={{ bg: "brand.600" }}
                                    _active={{ bg: "brand.900" }}
                                    size="lg"
                                    icon={<FiPlus />}
                                    isRound={true} />
                                <Text>Create Game</Text>
                            </HStack>
                        </Link>
                    </Box>
                </VStack>
            )
        }

        return elems;
    }




    if (props.loadingGames) {
        return (
            <>
                <Heading as="h2">My Games</Heading>
                <VStack align="left" width={['100%']} mt="5" spacing="3rem" divider={<Divider mt="1rem" mb="1rem" />}>
                    <Skeleton height="5rem" width="100%"></Skeleton>
                    <Skeleton height="5rem" width="100%"></Skeleton>
                    <Skeleton height="5rem" width="100%"></Skeleton>
                </VStack>
            </>
        )
    }

    /*
        Dashboard
        - Published games with stats
        - experimental games with stats
        - create new game
        - documentation
        - exmaple code
        - discord
    */

    return (
        <>
            {props.devgames && props.devgames.length > 0 && (
                <Heading as="h2">My Games</Heading>
            )}

            <VStack align="left" width={['100%']} mt="5" spacing="3rem" divider={<Divider mt="1rem" mb="1rem" />}>
                {listGames()}
            </VStack>
        </>

    )

}

export default (fs.connect(['devgames', 'loadingGames'])(DevMyGames));

