import {
  Box,
  HStack,
  Heading,
  IconButton,
  Portal,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";

import QueuePanel from "./components/queue/QueuePanel.jsx";
import SocialPanel from "./components/social/SocialPanel.jsx";
import UserPanel from "./components/userpanel/UserPanel.jsx";
import ChatPanel from "./components/chat/ChatPanel.jsx";

import { GoDotFill } from "react-icons/go";

import { useEffect, useState } from "react";
import GameActions from "../pages/GameScreen/GameActions.jsx";
import { getGamePanel } from "../actions/room.js";
import GameBar from "../pages/GameScreen/GameBar.jsx";
import { useBucket } from "../actions/bucket.js";
import {
  btHideDrawer,
  btIsMobile,
  btPrimaryGamePanel,
} from "../actions/buckets.js";
function RightBar({ layoutRef }) {
  return (
    // <VStack
    //   w={["0", "25rem"]}
    //   position={"sticky"}
    //   zIndex={1000}
    //   top="0"
    //   right="0"
    //   height="100vh"
    // >
    // <Portal>
    <Lobby layoutRef={layoutRef} />
    // </Portal>
    // </VStack>
  );
}

function Lobby({ layoutRef }) {
  let hideDrawer = useBucket(btHideDrawer);
  let isMobile = useBucket(btIsMobile);

  useEffect(() => {
    if (layoutRef && layoutRef.current)
      if (isMobile) {
        layoutRef.current.style.width = "100%";
      } else {
        layoutRef.current.style.width = hideDrawer
          ? "100%"
          : "calc(100% - 30rem)";
      }
  });
  const toggleRightbar = () => {
    if (layoutRef && layoutRef.current)
      if (isMobile) {
        layoutRef.current.style.width = "100%";
      } else {
        layoutRef.current.style.width = hideDrawer
          ? "calc(100% - 30rem)"
          : "100%";
      }
    btHideDrawer.set(!btHideDrawer.get());
  };
  return (
    <>
      <Portal>
        <Box
          w="100vw"
          h="100vh"
          position="fixed"
          left="0"
          top="0"
          bgColor="rgba(0,0,0,0.7)"
          zIndex="101"
          display={!isMobile || hideDrawer ? "none" : "block"}
          onClick={toggleRightbar}
        ></Box>
      </Portal>
      <VStack
        w={"30rem"}
        position="fixed"
        top={["0", "0"]}
        // bottom={["0", "unset"]}
        right={!hideDrawer ? "0" : "-30rem"}
        transition="all 0.3s ease"
        h={["100vh", "100vh"]}
        zIndex={1001}
        bgColor="gray.925"
        // borderLeft={["0", "1px solid var(--chakra-colors-gray-950)"]}
        // boxShadow={[
        //   "0px 0 20px 0px var(--chakra-colors-gray-600)",
        //   "0px 0 20px 0px var(--chakra-colors-gray-600)",
        // ]}
        spacing="0rem"
      >
        <IconButton
          // onClick={onSubmit}
          role="group"
          position="absolute"
          bottom="1.5rem"
          right={"30rem"}
          transition="all 0.3s ease"
          bgColor="rgba(0,0,0,0.3)"
          py="1.5rem"
          px="0.5rem"
          borderRadius="0"
          borderTopLeftRadius="8px"
          borderBottomLeftRadius="8px"
          zIndex="1"
          icon={<GoDotFill size="0.8rem" />}
          // width="2.8rem"
          isRound="false"
          color={hideDrawer ? "gray.200" : "gray.0"}
          _hover={{
            color: "gray.0",
            bgColor: "gray.925",
          }}
          onClick={toggleRightbar}
        ></IconButton>
        <UserPanel />
        <GameActions />

        <BarChooser layoutRef={layoutRef} />
        {/* <Box w="100%" h="100%" overflow="hidden"> */}

        {/* <WaitingPanel /> */}

        {/* </Box> */}
      </VStack>
    </>
  );
}

function BarChooser({ layoutRef }) {
  let primaryId = useBucket(btPrimaryGamePanel);
  let primary = getGamePanel(primaryId);
  if (primary) {
    return <GameBar layoutRef={layoutRef} />;
  }
  return <DefaultTabs layoutRef={layoutRef} />;
}

function DefaultTabs({}) {
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
      bg="transparent"
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
          Logs
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
          Queue
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
          <QueuePanel />
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

export default RightBar;
