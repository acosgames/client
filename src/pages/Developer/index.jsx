import {
    Heading,
    Text,
    VStack,
    HStack,
    Center,
    Box,
    Flex,
    Wrap,
    Image,
    Icon,
    Tooltip,
    Link as ChLink,
    Card,
    CardBody,
} from "@chakra-ui/react";
import { findDevGames } from "../../actions/devgame";
import { useEffect } from "react";
import { btDevGames, btUser } from "../../actions/buckets";
import { useBucket } from "../../actions/bucket";
import DevGameListItem from "./DevGameListItem";

export default function DevManager({}) {
    let user = useBucket(btUser);
    let games = useBucket(btDevGames);

    useEffect(() => {
        gtag("event", "devmygames");
        // let user = btUser.get();
        if (user) findDevGames(user.id);
    }, [user]);

    return (
        <Center mb="2rem" w="100%" p="2rem" pt="4rem">
            <VStack
                gap="1rem"
                align="center"
                w={["100%", "100%", "100%", "100%", "1000px"]}
            >
                <Heading variant={"h1"}>Manage Games</Heading>
                <Wrap w="100%" spacing="3rem">
                    {games.map((game) => (
                        <DevGameListItem
                            key={"devgameitem-" + game.gameid}
                            {...game}
                        />
                    ))}
                </Wrap>
            </VStack>
        </Center>
    );
}
