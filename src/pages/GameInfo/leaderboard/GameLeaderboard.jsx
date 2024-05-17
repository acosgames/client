import {
    Box,
    Card,
    CardBody,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    VStack,
} from "@chakra-ui/react";
import GameRankGlobal from "./GameRankGlobal";
import GameRankDivision from "./GameRankDivision";
import GameRankNational from "./GameRankNational";

import { btGame, btUser } from "../../../actions/buckets";

function ContentContainer({ children }) {
    return (
        <Card variant="brand" w="100%">
            {/* <CardHeader>
                <Text fontWeight={"500"}>Game Settings</Text>
            </CardHeader> */}
            <CardBody pt="0">
                <VStack>{children}</VStack>
            </CardBody>
        </Card>
    );
    return (
        <VStack
            w="100%"
            bgColor="gray.925"
            // pt="0rem"
            // borderRadius="0.5rem"

            // pb="10rem"
            position="relative"
            zIndex="20"
            mb="4rem"
            mt="2rem"
        >
            <Box
                boxShadow={"0px 3px 7px 0px rgba(0, 0, 0, 0.21)"}
                content="''"
                position="absolute"
                zIndex="0"
                top="0"
                left="50%"
                transform={"translateX(-50%)"}
                width="100%"
                height="100%"
                maxW={["100%", "100%", "100%", "95%", "70%", "60%"]}
                bgColor="gray.875"
                borderRadius="8px"
                clipPath="polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)"
            ></Box>
            <Box
                p="0rem"
                pb="2rem"
                // bgColor="gray.875"
                position="relative"
                // borderRadius="0.5rem"
                borderRadius={"8px"}
                w="100%"
                // zIndex="1"
                maxW={["100%", "100%", "100%", "95%", "70%", "60%"]}
                // border="1px solid"
                // borderColor="gray.800"

                mt="0"
            >
                {children}
            </Box>
        </VStack>
    );
}

export default function GameLeaderboard({ game_slug }) {
    let user = btUser.get();
    let game = btGame.get();

    return (
        // <Box w="100%" h="100%" p="0" pt="2rem" px={["1rem"]} bgColor="gray.925">
        <Tabs variant="subtabs" isLazy>
            <TabList border="0" justifyContent={"center"}>
                {game?.division_name && <Tab>Division</Tab>}
                <Tab>National</Tab>
                <Tab>Global</Tab>
            </TabList>
            <TabPanels>
                {game?.division_name && (
                    <TabPanel>
                        <ContentContainer>
                            <GameRankDivision game_slug={game_slug} />
                        </ContentContainer>
                    </TabPanel>
                )}
                <TabPanel>
                    <ContentContainer>
                        <GameRankNational
                            game_slug={game_slug}
                            countrycode={user?.countrycode || "US"}
                        />
                    </ContentContainer>
                </TabPanel>
                <TabPanel>
                    <ContentContainer>
                        <GameRankGlobal game_slug={game_slug} />
                    </ContentContainer>
                </TabPanel>
            </TabPanels>
        </Tabs>
        // </Box>
    );
}
