import {
    Box,
    HStack,
    VStack,
    Text,
    IconButton,
    Image,
    Flex,
    Button,
    Icon,
    chakra,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
} from "@chakra-ui/react";
import fs from "flatstore";
import { useEffect, useRef, useState } from "react";
import {
    clearChatMessages,
    getChatMessages,
    sendChatMessage,
} from "../../actions/chat.js";
import FSGTextInput from "../../../components/widgets/inputs/FSGTextInput.jsx";
import { IoSend, BsChatDotsFill, AiFillCloseCircle } from "@react-icons";

import config from "../../config";
import ColorHash from "color-hash";
import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Scoreboard from "./Scoreboard.js";
import { getPrimaryGamePanel } from "../../actions/room.js";

fs.set("chat", []);
fs.set("chat_room", []);
fs.set("chatMessage", "");
fs.set("chatMode", "all");
fs.set("chatToggle", true);
const colorHash = new ColorHash({ lightness: 0.7 });

function ChatPanel(props) {
    let [layoutMode] = fs.useWatch("layoutMode");
    let [displayMode] = fs.useWatch("displayMode");
    let [chatToggle] = fs.useWatch("chatToggle");

    let toggle = fs.get("chatToggle") && displayMode != "theatre";
    let desktopIcon = toggle ? (
        <Icon
            as={AiFillCloseCircle}
            filter={"drop-shadow(0px -12px 24px rgba(0,0,0,0.2))"}
            fontSize="2rem"
            color={"gray.400"}
        />
    ) : (
        <Icon
            as={BsChatDotsFill}
            filter={"drop-shadow(0px -12px 24px rgba(0,0,0,0.2))"}
            fontSize="2rem"
            color={"gray.100"}
        />
    );
    let mobileIcon = toggle ? (
        <Icon
            as={AiFillCloseCircle}
            filter={"drop-shadow(0px -12px 24px rgba(0,0,0,0.2))"}
            fontSize="2rem"
            color={"gray.400"}
        />
    ) : (
        <Icon
            as={BsChatDotsFill}
            filter={"drop-shadow(0px -12px 24px rgba(0,0,0,0.2))"}
            fontSize="2rem"
            color={"gray.100"}
        />
    );

    let isBottomLayout = layoutMode == "bottom";

    let gamepanel = getPrimaryGamePanel();
    let isSolo = false;
    if (gamepanel?.room) {
        if (gamepanel.room.maxplayers == 1) isSolo = true;
    }

    if (layoutMode == "off") {
        return <></>;
    }

    return (
        <Box
            transition="width 0.3s ease, height 0.3s ease"
            width={
                isBottomLayout
                    ? "100%"
                    : !toggle
                    ? "0"
                    : ["28.0rem", "28rem", "28.0rem"]
            }
            height={!isBottomLayout ? "100%" : ""}
            maxHeight={!isBottomLayout ? "" : "50%"}
            minHeight={!isBottomLayout ? "100%" : ""}
            position="relative"
            borderLeft="1px solid"
            borderLeftColor="gray.800"
        >
            <VStack
                transition="width 0.3s ease, height 0.3s ease"
                width={
                    isBottomLayout ? "100%" : ["24.0rem", "24rem", "28.0rem"]
                }
                height={"100%"}
                flex="1"
                pb={"0"}
                spacing="0"
                mt="0"
                borderLeft="2px solid"
                borderLeftColor="gray.900"
            >
                <Scoreboard toggle={toggle} layoutMode={layoutMode} />
                <ChatView toggle={toggle} layoutMode={layoutMode} />
            </VStack>
        </Box>
    );
}

function ChatView(props) {
    let [chatExpanded] = fs.useWatch("chatExpanded");
    let [scoreboardExpanded] = fs.useWatch("scoreboardExpanded");
    let [primaryGamePanelId] = fs.useWatch("primaryGamePanel");
    let chatViewRef = useRef();

    let simplebarRef = null;
    if (chatViewRef?.current) {
        simplebarRef = chatViewRef.current.querySelector(".simplebar-wrapper");
    }
    let layoutFlex = "1";
    let layoutHeight = "auto";

    let [layoutRightMode] = fs.useWatch("layoutRightMode");
    let [scoreboardRef] = fs.useWatch("scoreboardRef");
    let [chatMode] = fs.useWatch("chatMode");

    useEffect(() => {
        setTimeout(() => {
            if (props.layoutMode == "right") {
                if (layoutRightMode != "flex") {
                    if (scoreboardRef?.current?.clientHeight > 0) {
                        fs.set("layoutRightMode", "flex");
                    } else if (layoutRightMode != "none") {
                        fs.set("layoutRightMode", "none");
                    }
                }
            }
        }, 10);
    });

    if (props.layoutMode == "right") {
        if (scoreboardExpanded && chatExpanded) {
            let height =
                chatViewRef?.current?.clientHeight || window.innerHeight;
            if (height < 300) {
                layoutHeight = "50%";
                layoutFlex = "0";
            } else {
                layoutFlex = "1";
                layoutHeight = "auto";
            }
        } else if (chatExpanded) {
            layoutFlex = "1";
            layoutHeight = "auto";
        } else if (!chatExpanded) {
            layoutFlex = "";
            layoutHeight = "auto";
        }
    } else if (props.layoutMode == "bottom") {
        if (scoreboardExpanded && chatExpanded) {
            let height =
                chatViewRef?.current?.clientHeight || window.innerHeight;
            if (height < 300) {
                layoutHeight = "50%";
                layoutFlex = "0";
            } else {
                layoutFlex = "1";
                layoutHeight = "auto";
            }
        } else if (chatExpanded) {
            layoutFlex = "1";
            layoutHeight = "auto";
        } else if (!chatExpanded) {
            layoutFlex = "";
            layoutHeight = "auto";
        }
    }

    useEffect(() => {
        fs.set("chatViewRef", chatViewRef);
    }, []);

    if (
        typeof primaryGamePanelId !== "undefined" &&
        primaryGamePanelId != null
    ) {
        let gamepanel = getPrimaryGamePanel();
        if (gamepanel?.room?.maxplayers == 1) {
            return <></>;
        }
    }

    return (
        <VStack
            ref={chatViewRef}
            spacing="0"
            w="100%"
            height="auto"
            overflow="hidden"
            flex={chatExpanded ? "1" : ""}
        >
            <ChatHeader
                height={["3rem", "4rem", "5rem"]}
                toggle={props.toggle}
                isBottomLayout={props.layoutMode == "bottom"}
            />
            <ChatMessages
                chatMode={chatMode}
                expanded={chatExpanded}
                toggle={props.toggle}
                isBottomLayout={props.layoutMode == "bottom"}
            />
            <Box
                width="100%"
                height={chatExpanded ? ["3.5rem", "3.5rem", "4.5rem"] : "0"}
                px="0.5rem"
            >
                <ChatSend />
            </Box>
        </VStack>
    );
}

function ChatHeader(props) {
    let [mode, setMode] = useState("all");
    let [primaryGamePanelId] = fs.useWatch("primaryGamePanel");

    const onChangeMode = (mode) => {
        setMode(mode);
        fs.set("chatMode", mode);
    };

    let title = "Lobby Chat";
    if (
        typeof primaryGamePanelId !== "undefined" &&
        primaryGamePanelId != null
    ) {
        title = "Room Chat";
    }
    // useEffect(() => {
    //     let gamepanel = getPrimaryGamePanel();
    //     onChangeMode(gamepanel.room.room_slug);
    // }, []);

    return (
        <HStack
            pl={"1rem"}
            bgColor="gray.800"
            width={
                props.isBottomLayout ? "100%" : ["24.0rem", "24rem", "28.0rem"]
            }
            height={["4rem"]}
            spacing={"2rem"}
            justifyContent="center"
            alignItems={"center"}
            onClick={() => {}}
        >
            <Text
                cursor="pointer"
                as={"span"}
                fontSize={"sm"}
                fontWeight="bold"
                color={"white"}
                onClick={() => {
                    let chatExpanded = fs.get("chatExpanded");
                    fs.set("chatExpanded", !chatExpanded);
                }}
            >
                {title}
            </Text>
        </HStack>
    );
}

function ChatMessages(props) {
    let chatMode = props.chatMode;
    let channel = "chat";
    if (chatMode != "all") {
        channel = "chat/" + chatMode;
    }
    // let [chat] = fs.useWatch(channel);
    let [chatUpdated] = fs.useWatch("chatUpdated");

    const messageListRef = useRef();

    const renderChatMessages = () => {
        let rows = [];
        let messages = getChatMessages(channel);
        for (let msg of messages) {
            if (!msg || Array.isArray(msg)) continue;
            rows.push(
                <ChatMessage key={msg.displayname + msg.timestamp} msg={msg} />
            );
        }
        return rows;
    };

    //scroll to bottom of chat
    useEffect(() => {
        if (props.toggle)
            if (scrollRef && scrollRef.current)
                // setTimeout(() => {
                // messageListRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' });

                scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight);
        // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        // }, 100)
    });

    //update chatMode for when user changes pages
    // useEffect(() => {
    //     fs.set('chatMode', fs.get('chatMode'));
    // }, [])

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

    let maxHeight = !props.isBottomLayout
        ? "100%"
        : props.toggle
        ? "23rem"
        : "0";
    const ChakraSimpleBar = chakra(SimpleBar);

    return (
        <VStack
            width="100%"
            height={props.expanded ? "auto" : "0"}
            maxHeight={props.isBottomLayout ? "20rem" : ""}
            boxSizing="border-box"
            overflow="hidden"
            flex={props.expanded ? "1" : ""}
            spacing="0"
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
                    pr="1rem"
                    pl="1rem"
                    width="100%"
                    spacing={["0.2rem", "0.2rem", "0.5rem"]}
                    justifyContent={"flex-end"}
                >
                    {renderChatMessages()}
                </VStack>
            </ChakraSimpleBar>
            {/* <Box height="0px" ref={messageListRef} /> */}
        </VStack>
    );
}
// export ChatMessages;

function ChatMessage(props) {
    let msg = props?.msg;
    //show game icon if user is in game page
    let showThumb = false;
    if (msg.game_slug && msg.icon) {
        showThumb = true;
    }

    return (
        <Box
            bgColor="gray.700"
            borderRadius="2rem"
            p={["0.2rem", "0.2rem", "0.5rem"]}
            my="0.0rem"
            width="100%"
            overflow="hidden"
            lineHeight="1.5rem"
            position="relative"
        >
            {showThumb && (
                <Link w="100%" h="100%" to={`/g/${msg.game_slug}`}>
                    <Image
                        alt={"A cup of skill logo"}
                        src={`${config.https.cdn}g/${msg.game_slug}/preview/${msg.icon}`}
                        h="2rem"
                        w="2rem"
                        mr="0.5rem"
                        display="inline-block"
                        verticalAlign={"middle"}
                    />
                </Link>
            )}
            <Link to={`/profile/${msg.displayname}`}>
                <Text
                    fontWeight={"900"}
                    fontSize="xxs"
                    as="span"
                    color={colorHash.hex(msg.displayname)}
                >
                    {msg.displayname}
                </Text>
            </Link>
            <Text fontWeight={"light"} fontSize="xxs" as="span">
                :{" "}
            </Text>
            <Text
                fontWeight={"300"}
                fontSize="xxs"
                as="span"
                textShadow="0px 1px 2px rgb(0 0 0 / 75%)"
            >
                {msg.message}
            </Text>
        </Box>
    );
}

function ChatSend(props) {
    let [chatMessage] = fs.useWatch("chatMessage");

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        fs.set("chatMessage", value);
    };

    const onSubmit = async (e) => {
        //console.log(e);
        await sendChatMessage();
        fs.set("chatMessage", "");
    };

    return (
        <Box position={"relative"} width={"100%"} spacing="0" m="0">
            <FSGTextInput
                name="name"
                id="name"
                title=""
                borderRadius="2rem"
                maxLength="120"
                pr={"3rem"}
                height={["3rem", "3rem", "4rem"]}
                border="0"
                bgColor="gray.900"
                color="gray.100"
                fontSize="xs"
                placeholder="Type a message..."
                autoComplete="off"
                _focus={{ outline: "gray.100", bgColor: "black" }}
                _placeholder={{ color: "gray.175" }}
                value={chatMessage || ""}
                onChange={inputChange}
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
                        onSubmit(e);
                    }
                }}
            />
            <HStack
                alignItems={"center"}
                justifyContent="center"
                width="3rem"
                height={["3rem", "3rem", "4rem"]}
                position="absolute"
                top="0"
                right="0"
                spacing="0"
                zIndex={10}
            >
                <IconButton
                    onClick={onSubmit}
                    icon={<IoSend size="1.6rem" />}
                    width="2.8rem"
                    isRound="true"
                />
            </HStack>
        </Box>
    );
}

export default ChatPanel;
