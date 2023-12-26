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
import SocialPanel from "../../layout/components/social/SocialPanel.jsx";
import UserPanel from "../../layout/components/userpanel/UserPanel.jsx";
import ChatPanel from "../../layout/components/chat/ChatPanel.jsx";
import WaitingPanel from "../../layout/components/queue/WaitingPanel.jsx";
import fs from "flatstore";
import ChatSend from "../../layout/components/chat/ChatSend.jsx";
import { GoDotFill } from "react-icons/go";
import config from "../../config";
import { BsLayoutSidebarInsetReverse } from "@react-icons";
import { useEffect, useState } from "react";
import GameActions from "./GameActions.jsx";

export default function GameBar({ layoutRef }) {
  let [tabIndex, setTabIndex] = useState(
    Number.parseInt(localStorage.getItem("rightbarTab")) || 0
  );

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
          Logs
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
          <ChatPanel />
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
