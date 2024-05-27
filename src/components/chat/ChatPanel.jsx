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

// import USAFlag from "../../../assets/images/flags/USA.svg";
import { useEffect, useRef } from "react";
import SimpleBar from "simplebar-react";
import { getChatMessages } from "../../actions/chat.js";

import { AnimatePresence, motion } from "framer-motion";
import { useBucket } from "../../actions/bucket.js";
import { btChat } from "../../actions/buckets.js";
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

    useEffect(() => {
        if (scrollRef && scrollRef.current)
            scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    });
    //setup scroll event
    useEffect(() => {
        scrollRef.current.addEventListener("scroll", onScroll);

        // return () => {
        //     if (scrollRef.current)
        //         scrollRef.current.removeEventListener('scroll', onScroll);
        // }
    }, []);

    const ChakraSimpleBar = chakra(SimpleBar);
    let queue;
    return (
        <>
            {/* <Box position="relative" w="0" h="0"></Box> */}

            <VStack
                w="100%"
                h={["100%"]}
                spacing="0"
                position="relative"
                overflow="hidden"
                flex="1"
                // mb="0.5rem"
                // pt="0.5rem"
                // px="0.5rem"
                mb="1rem"
                // filter="drop-shadow(1px 1px 2px var(--chakra-colors-gray-1000)) "
            >
                <VStack
                    className="chatpanel"
                    width="100%"
                    height={"100%"}
                    transition={"all 0.3s ease"}
                    boxSizing="border-box"
                    spacing="0rem"
                    position="relative"
                    overflow="hidden"
                    mb="0"
                    pb="2.4rem"
                    // borderRadius={"8px"}
                    border="1px solid"
                    zIndex="2"
                    borderColor="gray.925"
                    bgColor="gray.900"
                    pt="0.25rem"
                    // boxShadow="inset 0 0px 6px var(--chakra-colors-gray-1000), inset 0 0px 2px var(--chakra-colors-gray-1000), inset 0 0px 4px var(--chakra-colors-gray-1000)"
                >
                    <ChakraSimpleBar
                        boxSizing="border-box"
                        // flex="1"
                        // borderTop={["2px solid var(--chakra-colors-gray-800)"]}
                        style={{
                            width: "100%",
                            height: "auto",
                            flex: "1",
                            // height: "100%",
                            overflow: "hidden scroll",
                            // boxSizing: "border-box",
                        }}
                        scrollableNodeProps={{ ref: scrollRef }}
                    >
                        <ChatMessages scrollRef={scrollRef} />
                    </ChakraSimpleBar>
                    <ChatSend />
                </VStack>
                {/* </Box> */}
                {/* </AccordionItem>
        </Accordion> */}
            </VStack>
        </>
    );
}

function ChatMessages({ scrollRef }) {
    let chat = useBucket(btChat);
    let messages = getChatMessages("chat");

    useEffect(() => {
        if (scrollRef.current)
            scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
    });

    if (!messages) return <></>;
    return (
        <VStack
            className="chat-message-panel"
            // height="100%"
            width="100%"
            // pl="2rem"
            // bgColor="gray.900"
            px={["0.25rem", "0.5rem"]}
            pt="0.25rem"
            spacing="0rem"
            justifyContent={"flex-end"}
        >
            <AnimatePresence>
                {messages.map((msg) => (
                    <ChatMessage
                        key={msg.displayname + "-msg-" + msg.timestamp}
                        portraitid={msg.portraitid}
                        countrycode={msg.countrycode}
                        displayname={msg.displayname}
                        timestamp={msg.timestamp}
                        message={msg.message}
                    />
                ))}
            </AnimatePresence>
            <Box w="100" flex="1"></Box>
        </VStack>
    );
}
