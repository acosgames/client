
import {
    Link,
    useHistory,
    withRouter,
} from "react-router-dom";
import fs from 'flatstore';
import SLink from "../widgets/SLink";
import { Text, Box, Heading, HStack, Icon, IconButton, VStack, Divider, Spacer, useClipboard } from "@chakra-ui/react";

// import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiPlus } from '@react-icons'
import DevMyGameListItem from "./DevMyGameListItem";

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

    const listGames = () => {
        let games = props.devgames || [];
        let elems = [];

        const history = useHistory();

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
                        <SLink to="/dev/game/create/">
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
                        </SLink>
                    </Box>
                </VStack>
            )
        }

        return elems;
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

export default withRouter(fs.connect(['devgames'])(DevMyGames));

