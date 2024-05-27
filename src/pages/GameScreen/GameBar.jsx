import {
    Box,
    HStack,
    Heading,
    IconButton,
    Image,
    Portal,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    VStack,
} from "@chakra-ui/react";

import Scoreboard from "./Scoreboard/Scoreboard";
import SocialPanel from "../../components/social/SocialPanel.jsx";
import ChatPanel from "../../components/chat/ChatPanel.jsx";

import { useState } from "react";

import QueuePanel from "../../components/queue/QueuePanel.jsx";
import { getPrimaryGamePanel } from "../../actions/room";

export default function GameBar({ layoutRef }) {
    let [tabIndex, setTabIndex] = useState(
        Number.parseInt(localStorage.getItem("rightbarTab")) || 0
    );

    let primary = getPrimaryGamePanel();
    let room = primary.room;

    return (
        <Tabs
            variant="brand"
            w="100%"
            height="100%"
            overflow="hidden"
            position="relative"
            bg="gray.925"
            index={tabIndex}
            onChange={(tabIndex) => {
                // console.log(tabIndex);
                localStorage.setItem("rightbarTab", tabIndex);
                setTabIndex(tabIndex);
            }}
        >
            <TabList
                pb="0"
                overflow="auto"
                bg="transparent"
                justifyContent={"center"}
            >
                <Tab
                    fontSize="1.2rem"
                    fontWeight="600"
                    borderBottom="none"
                    color="gray.200"
                    _hover={{ borderBottom: "none" }}
                    _selected={{ color: "brand.300", borderBottom: "none" }}
                    textShadow="0 0 2px var(--chakra-colors-gray-1200), 0 0 2px var(--chakra-colors-gray-1200),0 0 3px var(--chakra-colors-gray-1200), 0 0 2px var(--chakra-colors-gray-1200), 0 0 2px var(--chakra-colors-gray-1200)"
                >
                    Scoreboard
                </Tab>
                <Tab
                    fontSize="1.2rem"
                    fontWeight="600"
                    borderBottom="none"
                    color="gray.200"
                    _hover={{ borderBottom: "none" }}
                    _selected={{ color: "brand.300", borderBottom: "none" }}
                    textShadow="0 0 2px var(--chakra-colors-gray-1200), 0 0 2px var(--chakra-colors-gray-1200),0 0 3px var(--chakra-colors-gray-1200), 0 0 2px var(--chakra-colors-gray-1200), 0 0 2px var(--chakra-colors-gray-1200)"
                >
                    {room.maxplayers == 1 ? "Queue" : "Logs"}
                </Tab>
                <Tab
                    fontSize="1.2rem"
                    fontWeight="600"
                    bg="transparent"
                    borderBottom="none"
                    color="gray.200"
                    _hover={{ borderBottom: "none" }}
                    _selected={{ color: "brand.300", borderBottom: "none" }}
                    textShadow="0 0 2px var(--chakra-colors-gray-1200), 0 0 2px var(--chakra-colors-gray-1200),0 0 3px var(--chakra-colors-gray-1200), 0 0 2px var(--chakra-colors-gray-1200), 0 0 2px var(--chakra-colors-gray-1200)"
                >
                    Social
                </Tab>
            </TabList>
            <TabPanels
                w="100%"
                p="0"
                height="100%"
                // overflow="hidden"
                position="relative"
            >
                <TabPanel
                    display="flex"
                    spacing="0"
                    p="0"
                    flexDir={"column"}
                    height="100%"
                    pb="3rem"
                >
                    <Scoreboard />
                </TabPanel>
                <TabPanel
                    display="flex"
                    spacing="0"
                    p="0"
                    flexDir={"column"}
                    height="100%"
                    pb="3rem"
                >
                    {room.maxplayers == 1 ? <QueuePanel /> : <ChatPanel />}
                </TabPanel>
                <TabPanel
                    display="flex"
                    spacing="0"
                    p="0"
                    flexDir={"column"}
                    height="100%"
                    pb="3rem"
                >
                    <SocialPanel />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
