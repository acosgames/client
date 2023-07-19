import { HStack, Heading, Portal, Text, VStack } from "@chakra-ui/react";

import UserPanel from "./components/userstatus/UserPanel.jsx";
import ChatPanel from "./components/chat/ChatPanel.jsx";
import WaitingPanel from "./components/queue/WaitingPanel.jsx";

function RightBar({}) {
  return (
    <VStack
      w={["0", "25rem"]}
      position={"sticky"}
      zIndex={1000}
      top="0"
      right="0"
      height="100vh"
    >
      <Portal>
        <VStack
          w={["100%", "25rem"]}
          position="fixed"
          top={["initial", "0"]}
          bottom={["0", "initial"]}
          right="0"
          h={["50%", "100vh"]}
          zIndex={1001}
          bgColor="gray.900"
          boxShadow={["0", "0.5rem 0 5rem var(--chakra-colors-gray-700)"]}
          spacing="1.5rem"
        >
          <Lobby />
        </VStack>
      </Portal>
    </VStack>
  );
}

function Lobby() {
  return (
    <>
      <UserPanel />
      <WaitingPanel />
      <ChatPanel />
    </>
  );
}

export default RightBar;
