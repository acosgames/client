import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Collapse,
  HStack,
  Heading,
  Text,
  VStack,
  chakra,
  useDisclosure,
} from "@chakra-ui/react";
import ChatSend from "./ChatSend.jsx";
import ChatMessage from "./ChatMessage.jsx";

import USAFlag from "../../../assets/images/flags/USA.svg";
import { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";

export default function ChatPanel({}) {
  let timeHandle = 0;
  const scrollBarHideDelay = 2000;
  const scrollRef = useRef();
  const { isOpen, onToggle } = useDisclosure();

  //setup scroll styling with classes
  const onScroll = () => {
    if (timeHandle > 0) clearTimeout(timeHandle);

    if (!scrollRef?.current?.classList) return;

    scrollRef.current.classList.add("showscroll");
    scrollRef.current.classList.remove("hidescroll");
    timeHandle = setTimeout(() => {
      if (!scrollRef?.current?.classList) return;
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
    <>
      {/* <Box position="relative" w="0" h="0"></Box> */}

      <VStack
        w="100%"
        h={["auto"]}
        spacing="0"
        position="relative"
        overflow="hidden"
        flex="1"
        mb="0.5rem"
        pt="0.5rem"
      >
        <Accordion
          allowToggle
          w="100%"
          defaultIndex={0}
          display="flex"
          flexDirection={"column"}
          position="relative"
          overflow="hidden"
        >
          <AccordionItem
            w="100%"
            borderTop="0"
            borderBottom="0"
            borderRadius="0.5rem"
            display="flex"
            flexDirection={"column"}
            position="relative"
            overflow="hidden"
          >
            <AccordionButton
              p="0"
              onClick={onToggle}
              bgColor="gray.800"
              m="0"
              borderRadius="0.5rem"
              display={["block"]}
            >
              <HStack
                alignItems={"center"}
                w="100%"
                //   mb="0.5rem"
                pb="0.5rem"
                borderRadius="0.5rem"
                bgColor="gray.800"
                position="relative"
              >
                <Heading
                  as="h4"
                  fontWeight={"500"}
                  fontSize="1.6rem"
                  color="gray.0"
                  flex="1"
                  textAlign={"left"}
                  pl="1rem"
                  pt="0.5rem"
                >
                  Logs
                </Heading>
                <VStack
                  position="relative"
                  top="0.3rem"
                  //   top="-0.8rem"
                  //   left="-0.8rem"
                  bgColor="red.500"
                  zIndex="2"
                  borderRadius="50%"
                  alignItems={"center"}
                  justifyContent={"center"}
                  width="2rem"
                  height="2rem"
                  //   border="2px solid var(--chakra-colors-gray-700)"
                  // boxShadow={
                  //   "inset 0.2em 0.2em 0.2em 0 rgba(255,255,255,0.2), inset -0.2em -0.2em 0.2em 0 rgba(0,0,0,0.2)"
                  // }
                >
                  <Text
                    as="span"
                    color="gray.10"
                    fontWeight="500"
                    fontSize="1.4rem"
                    display="inline-block"
                    textAlign={"center"}
                    lineHeight={"2rem"}
                    p="0"
                    m="0"
                  >
                    5
                  </Text>
                </VStack>
                <AccordionIcon
                  position="relative"
                  top="0.3rem"
                  color="gray.50"
                />
              </HStack>
            </AccordionButton>
            <Box
              as={Collapse}
              in={!isOpen}
              startingHeight="0"
              w="100%"
              flex="1"
              display="flex !important"
              flexDirection={"column"}
              position="relative"
              overflow="hidden"
            >
              <VStack
                width="100%"
                height={!isOpen ? "100%" : "0%"}
                transition={"all 0.3s ease"}
                boxSizing="border-box"
                spacing="0rem"
                position="relative"
                overflow="hidden"
                mb="0"
                pb="0"
              >
                <ChakraSimpleBar
                  boxSizing="border-box"
                  flex="1"
                  // borderTop={["2px solid var(--chakra-colors-gray-800)"]}
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
                    // pl="2rem"

                    px={["0.25rem", "0.5rem"]}
                    pt="0.25rem"
                    spacing="0.5rem"
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
                      msg="Do you want to play a game? this is a really long message"
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
                <ChatSend />
              </VStack>
            </Box>
          </AccordionItem>
        </Accordion>
      </VStack>
    </>
  );
}
