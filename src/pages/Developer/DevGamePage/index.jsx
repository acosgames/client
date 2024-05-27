import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { FiExternalLink } from "react-icons/fi";
import { notif } from "../../../components/ToastMessage";
import TabStatsAndAchievements from "./TabStatsAndAchievements";

const ChakraSimpleBar = chakra(SimpleBar);

const tabHash = {
    "#gameinfo": 0,
    "#publishing": 1,
    "#settings": 2,
    "#stats": 3,
};

export default function DevGamePage({}) {
    let params = useParams();
    let toast = useToast();
    const navigate = useNavigate();
    const scrollRef = useRef();
    const { hash } = useLocation();
    console.log("hash", hash);
    let game = useBucket(btDevGame);
    let game_slug = game?.game_slug;

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

    const onRefresh = async (e) => {
        pullGame();
    };

    const onSubmit = async (e) => {
        //console.log(e);
        try {
            let game = await updateGame();
            if (!game) {
                toast({
                    title: "Fix errors to continue",
                    type: "error",
                    isClosable: true,
                    duration: 1200,
                });
                // executeScroll();
                return;
            }

            notif({
                title: "Successfully saved",
                // description: "Testing the second line.",
                status: "success",
                isClosable: true,
                duration: 4000,
            });
            // props.history.replace('/dev/game/' + props.devgame.gameid);
        } catch (e) {
            console.error(e);
        }
    };

    let defaultTab = (hash && tabHash[hash]) || 0;

    return (
        <Center mb="2rem" w="100%" pt="4rem" px="2rem">
            <VStack
                gap="1rem"
                align="center"
                w={["100%", "100%", "100%", "100%", "1000px"]}
            >
                <VStack alignItems="flex-start" w="100%" mb="2rem">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            {/* <BreadcrumbLink href="/dev">
                                Manage Games
                            </BreadcrumbLink> */}
                            <Link
                                // target="_blank"
                                to={`/g/${game_slug}`}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    as="span"
                                    fontSize="1.2rem"
                                    color="gray.20"
                                    pt="0"
                                >
                                    Manage Games
                                </Text>
                            </Link>
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
                            <Heading variant={"h1"} mb="0" color="gray.0">
                                {game.name}
                            </Heading>
                            {/* <Text as="h2" fontSize="2rem" fontWeight="500" color="gray.10">
                
              </Text> */}
                            <Text as="span" fontSize="1.4rem" color="gray.50">
                                {game.game_slug}
                            </Text>
                        </VStack>
                        <Link
                            // target="_blank"
                            to={`/g/${game_slug}`}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                paddingTop: "0.5rem",
                                paddingLeft: "2rem",
                            }}
                        >
                            <Icon w="1.5rem" h="1.5rem" as={FiExternalLink} />
                            <Text as="span" fontSize="1rem" color="gray.100">
                                Public
                            </Text>
                        </Link>
                        <HStack
                            flex="1"
                            pb="0rem"
                            pt="0rem"
                            justifyContent="flex-end"
                            spacing="2rem"
                        >
                            <Button
                                variant="secondary"
                                border="1px solid var(--chakra-colors-blue-800)"
                                fontSize="1.4rem"
                                fontWeight="300"
                                onClick={onRefresh}
                                mr="2rem"
                            >
                                Refresh
                            </Button>

                            <Button variant="primary" onClick={onSubmit}>
                                Save
                            </Button>
                            {/* {props.devgame.status == 1 && (
                <DevManageGameDelete devgame={props.devgame} />
              )} */}
                        </HStack>
                    </Wrap>
                </VStack>
                <Tabs
                    colorScheme="dev"
                    variant="dev"
                    defaultIndex={defaultTab}
                    onChange={(index) => {
                        let urlHash = "";
                        for (let key in tabHash) {
                            if (tabHash[key] == index) {
                                urlHash = key;
                            }
                        }
                        navigate(urlHash, {
                            replace: true,
                            preventScrollReset: true,
                        });
                    }}
                >
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
                                <Tab>Achievements</Tab>
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
                        <TabPanel>
                            <TabStatsAndAchievements />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </VStack>
        </Center>
    );
}
