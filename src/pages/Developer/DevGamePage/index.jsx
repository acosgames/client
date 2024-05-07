import { useParams } from "react-router-dom";
import React, { useEffect, useRef } from "react";
import {
    clearGameFields,
    findGame,
    updateGame,
} from "../../../actions/devgame";

import {
    Heading,
    Text,
    VStack,
    HStack,
    Center,
    Box,
    Flex,
    Wrap,
    Button,
    Image,
    Icon,
    Tooltip,
    useToast,
    Link as ChLink,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    chakra,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
} from "@chakra-ui/react";
import FSGSubmit from "../../../components/widgets/inputs/FSGSubmit";
import { useBucket } from "../../../actions/bucket";
import { btDevGame, btFormFields } from "../../../actions/buckets";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import DevTabPageInfo from "./TabPageInfo";
import TabDeployment from "./TabPublishing";
import TabGameSettings from "./TabGameSettings";

const ChakraSimpleBar = chakra(SimpleBar);

export default function DevGamePage({ game_slug }) {
    let params = useParams();
    let toast = useToast();
    const scrollRef = useRef();

    let game = useBucket(btDevGame);

    const pullGame = async () => {
        clearGameFields();
        let game_slug = params.game_slug;
        let game = await findGame(game_slug);

        const group = "update-game_info";
        let form = btFormFields.get();
        let formGroup = (form[group] = { ...game });
        btFormFields.assign({ [group]: formGroup });

        gtag("event", "devmanagegame");
    };

    useEffect(() => {
        pullGame();
    }, []);

    const onSubmit = async (e) => {
        //console.log(e);
        try {
            let game = await updateGame();
            if (!game) {
                toast({
                    title: "Fix errors to continue",
                    status: "error",
                    isClosable: true,
                    duration: 1200,
                });
                // executeScroll();
                return;
            }

            toast({
                title: "Successfully saved",
                status: "success",
                isClosable: true,
                duration: 1200,
            });
            // props.history.replace('/dev/game/' + props.devgame.gameid);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <Center mb="2rem" w="100%" pt="4rem" px="2rem">
            <VStack
                gap="1rem"
                align="center"
                w={["100%", "100%", "100%", "100%", "900px"]}
            >
                <VStack alignItems="flex-start" w="100%">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/dev">
                                Manage Games
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbItem isCurrentPage>
                            <BreadcrumbLink href="#" color="gray.50">
                                {game.name}
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </VStack>
                <VStack w="100%">
                    <Wrap w="100%">
                        <VStack align="left">
                            <Heading variant={"h1"} mb="0">
                                {game.name}
                            </Heading>
                            {/* <Text as="h2" fontSize="2rem" fontWeight="500" color="gray.10">
                
              </Text> */}
                            <Text as="span" fontSize="1.2rem" color="gray.50">
                                {game.game_slug}
                            </Text>
                        </VStack>

                        <Box flex="1" pb="0rem" pt="0rem" align="right">
                            <Button variant="primary" onClick={onSubmit}>
                                Save
                            </Button>
                            {/* {props.devgame.status == 1 && (
                <DevManageGameDelete devgame={props.devgame} />
              )} */}
                        </Box>
                    </Wrap>
                </VStack>
                <Tabs colorScheme="dev" variant="dev">
                    <TabList>
                        <ChakraSimpleBar
                            boxSizing="border-box"
                            style={{
                                width: "100%",
                                height: "6.4rem",
                                // height: '100%',
                                // flex: '1',
                                display: "flex",
                                justifyContent: "center",
                                overflowX: "scroll",
                                overflowY: "hidden",
                                boxSizing: "border-box",
                            }}
                            scrollableNodeProps={{ ref: scrollRef }}
                        >
                            <HStack
                                // ref={tablistRef}
                                ref={scrollRef}
                                spacing="0"
                                width="max-content"
                                // width={["auto", "auto", "auto", "auto", "100%"]}
                                justifyContent={"center"}
                                alignItems={"center"}
                                // px="1rem"
                                height="6.4rem"
                                position={"relative"}
                                zIndex={2}
                            >
                                <Tab>Game Info</Tab>
                                <Tab>Publishing</Tab>
                                <Tab>Settings</Tab>
                                <Tab>Stats and Achievements</Tab>
                            </HStack>
                        </ChakraSimpleBar>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <DevTabPageInfo />
                        </TabPanel>
                        <TabPanel>
                            <TabDeployment />
                        </TabPanel>
                        <TabPanel>
                            <TabGameSettings />
                        </TabPanel>
                        <TabPanel></TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </Center>
    );
}
