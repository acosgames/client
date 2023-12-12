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

import UserPanel from "./components/userpanel/UserPanel.jsx";
import ChatPanel from "./components/chat/ChatPanel.jsx";
import WaitingPanel from "./components/queue/WaitingPanel.jsx";
import fs from "flatstore";
import ChatSend from "./components/chat/ChatSend.jsx";

import { BsLayoutSidebarInsetReverse } from "@react-icons";
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
  let [hideDrawer] = fs.useWatch("hideDrawer");

  return (
    <>
      <IconButton
        // onClick={onSubmit}
        role="group"
        position="absolute"
        top="1.5rem"
        right={hideDrawer ? "0" : ["0", "0", "30rem", "30rem"]}
        transition="all 0.2s ease"
        bgColor="rgba(0,0,0,0.3)"
        py="1.5rem"
        px="1rem"
        borderRadius="0"
        borderTopLeftRadius="8px"
        borderBottomLeftRadius="8px"
        zIndex="1"
        // icon={
        //   <BsLayoutSidebarInsetReverse
        //     size="1.6rem"
        //     color="transparent"
        //     _groupHover={"white"}
        //   />
        // }
        // width="2.8rem"
        isRound="false"
        color="gray.50"
        _hover={{
          color: "gray.0",
          bgColor: "rgba(0,0,0,0.7)",
        }}
        onClick={() => {
          // fs.set("windowScrollPos", scrollRef.current.scrollTop);
          if (layoutRef && layoutRef.current)
            layoutRef.current.style.paddingRight = hideDrawer ? "30rem" : "0";
          fs.set("hideDrawer", !fs.get("hideDrawer"));
        }}
      />

      <VStack
        w={["100%", "27rem", "30rem"]}
        position="fixed"
        top={["unset", "0"]}
        bottom={["0", "unset"]}
        right={!hideDrawer ? "0" : ["100%", "-27rem", "-30rem"]}
        transition="all 0.2s ease"
        h={["5rem", "100vh"]}
        zIndex={1001}
        bgColor="gray.925"
        // borderLeft={["0", "1px solid var(--chakra-colors-gray-950)"]}
        // boxShadow={[
        //   "0px 0 20px 0px var(--chakra-colors-gray-600)",
        //   "0px 0 20px 0px var(--chakra-colors-gray-600)",
        // ]}
        spacing="0rem"
      >
        <UserPanel key="desktop-userpanel" />
        <Tabs
          variant="brand"
          w="100%"
          // height="100%"
          overflow="hidden"
          position="relative"
          bg="transparent"
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
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </Tabs>
        {/* <Box w="100%" h="100%" overflow="hidden"> */}

        {/* <WaitingPanel /> */}

        {/* </Box> */}
      </VStack>
    </>
  );
}

export default RightBar;
