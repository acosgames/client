import { Box, HStack, Heading, VStack, chakra } from "@chakra-ui/react";
import ChatSend from "./ChatSend.jsx";
import ChatMessage from "./ChatMessage.jsx";

import USAFlag from "../../../assets/images/flags/USA.svg";
import { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";

export default function ChatPanel({}) {
  let timeHandle = 0;
  const scrollBarHideDelay = 2000;
  const scrollRef = useRef();

  //setup scroll styling with classes
  const onScroll = () => {
    if (timeHandle > 0) clearTimeout(timeHandle);

    scrollRef.current.classList.add("showscroll");
    scrollRef.current.classList.remove("hidescroll");
    timeHandle = setTimeout(() => {
      scrollRef.current.classList.remove("showscroll");
      scrollRef.current.classList.add("hidescroll");
    }, scrollBarHideDelay);
  };

  //setup scroll event
  useEffect(() => {
    scrollRef.current.addEventListener("scroll", onScroll);
    // return () => {
    //     if (scrollRef.current)
    //         scrollRef.current.removeEventListener('scroll', onScroll);
    // }
  }, []);

  const ChakraSimpleBar = chakra(SimpleBar);

  return (
    <VStack w="100%" spacing="0" flex="1" position="relative" overflow="hidden">
      <HStack
        alignItems={"flex-start"}
        w="100%"
        px={["0.5rem", "2rem"]}
        mb="0.5rem"
      >
        <Heading as="h4" fontWeight={"bold"} fontSize="1.6rem" color="gray.0">
          Chat
        </Heading>
      </HStack>
      <VStack
        width="100%"
        height={"auto"}
        boxSizing="border-box"
        overflow="hidden"
        position="relative"
        flex={"1"}
        spacing="0"
        _before={{
          content: "''",
          background:
            "linear-gradient(var(--chakra-colors-gray-900) 0.2rem, transparent 2rem);",
          position: "absolute",
          top: "0",
          left: "0",
          height: "3rem",
          width: "100%",
          zIndex: 3,
        }}
        _after={{
          content: "''",
          background:
            "linear-gradient(transparent 2rem, var(--chakra-colors-gray-900));",
          position: "absolute",
          bottom: "0",
          left: "0",
          height: "3rem",
          width: "100%",
          zIndex: 3,
        }}
      >
        <ChakraSimpleBar
          boxSizing="border-box"
          style={{
            width: "100%",
            height: "auto",
            flex: "1",
            overflow: "hidden scroll",
            boxSizing: "border-box",
          }}
          scrollableNodeProps={{ ref: scrollRef }}
        >
          <VStack
            className="chat-message-panel"
            height="100%"
            px={["0.5rem", "2rem"]}
            // pl="2rem"
            py="1rem"
            width="100%"
            spacing="0"
            justifyContent={"flex-end"}
          >
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:30"
              msg="Hello from Texas!"
            />
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:31"
              msg="Do you want to play a game?"
            />
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:30"
              msg="Hello from Texas!"
            />
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:31"
              msg="Do you want to play a game?"
            />
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:30"
              msg="Hello from Texas!"
            />
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:31"
              msg="Do you want to play a game?"
            />
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:30"
              msg="Hello from Texas!"
            />
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:31"
              msg="Do you want to play a game?"
            />
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:30"
              msg="Hello from Texas!"
            />
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:31"
              msg="Do you want to play a game?"
            />
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:30"
              msg="Hello from Texas!"
            />
            <ChatMessage
              flagCode={USAFlag}
              username="JoeOfTexas"
              msgTime="12:31"
              msg="Do you want to play a game?"
            />

            <Box w="100" flex="1"></Box>
          </VStack>
        </ChakraSimpleBar>
      </VStack>
      <ChatSend />
    </VStack>
  );
}
