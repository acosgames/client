import { Box, HStack, Heading, Portal, Text, VStack } from "@chakra-ui/react";

import UserPanel from "./components/userstatus/UserPanel.jsx";
import ChatPanel from "./components/chat/ChatPanel.jsx";
import WaitingPanel from "./components/queue/WaitingPanel.jsx";

function RightBar({}) {
  return (
    // <VStack
    //   w={["0", "25rem"]}
    //   position={"sticky"}
    //   zIndex={1000}
    //   top="0"
    //   right="0"
    //   height="100vh"
    // >
    <Portal>
      <VStack
        w={["100%", "27rem", "30rem"]}
        position="fixed"
        top={["unset", "0"]}
        bottom={["0", "unset"]}
        right="0"
        h={["5rem", "100vh"]}
        zIndex={1001}
        bgColor="gray.900"
        borderLeft={["0", "1px solid var(--chakra-colors-gray-950)"]}
        // boxShadow={[
        //   "0px 0 20px 0px var(--chakra-colors-gray-600)",
        //   "0px 0 20px 0px var(--chakra-colors-gray-600)",
        // ]}
        spacing="1.5rem"
      >
        <Lobby />
      </VStack>
    </Portal>
    // </VStack>
  );
}

function Lobby() {
  return (
    <>
      {/* <Box w="100%" h="100%" overflow="hidden"> */}
      <UserPanel key="desktop-userpanel" />
      <WaitingPanel />
      <ChatPanel />
      {/* </Box> */}
    </>
  );
}

export default RightBar;
