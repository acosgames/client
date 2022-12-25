
import fs from 'flatstore';
import { Box, chakra, Text, VStack } from "@chakra-ui/react";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect, useRef } from 'react';
import { getChatMessages } from '../../actions/chat';
import ChatMessage from './ChatMessage';
import { getPrimaryGamePanel } from '../../actions/room';

function ChatMessages(props) {
    let [chatUpdated] = fs.useWatch('chatUpdated');
    let chatMode = fs.get('chatMode');
    let channel = 'chat';

    const messageListRef = useRef();

    const renderChatMessages = () => {
        let rows = [];
        let messages = getChatMessages(channel);
        let salt = 0;
        for (let msg of messages) {
            if (!msg || Array.isArray(msg))
                continue;

            rows.push(<ChatMessage key={msg.displayname + msg.timestamp + (salt++)} msg={msg} />)
        }
        return rows;
    }

    //scroll to bottom of chat
    useEffect(() => {
        //if (props.toggle)
        // setTimeout(() => {
        // messageListRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' });

        if (scrollRef && scrollRef.current)
            scrollRef.current.scrollTo(0, scrollRef.current.scrollHeight)
        // scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        // }, 100)
    })

    //update chatMode for when user changes pages
    // useEffect(() => {
    //     fs.set('chatMode', fs.get('chatMode'));
    // }, [])

    let timeHandle = 0;
    const scrollBarHideDelay = 2000;
    const scrollRef = useRef();

    //setup scroll styling with classes
    const onScroll = () => {
        if (timeHandle > 0)
            clearTimeout(timeHandle);

        scrollRef.current.classList.add('showscroll');
        scrollRef.current.classList.remove("hidescroll")
        timeHandle = setTimeout(() => {
            scrollRef.current.classList.remove("showscroll")
            scrollRef.current.classList.add("hidescroll")
        }, scrollBarHideDelay)
    }

    //setup scroll event
    useEffect(() => {
        // scrollRef.current.addEventListener('scroll', onScroll);
        // return () => {
        //     if (scrollRef.current)
        //         scrollRef.current.removeEventListener('scroll', onScroll);
        // }
    }, [])


    // let maxHeight = !props.isBottomLayout ? "100%" : '23rem';
    const ChakraSimpleBar = chakra(SimpleBar)

    return (
        <VStack spacing="0" p="1rem" pt="0rem" pb="0" w="100%" flex="1" overflow="hidden">

            <Box w="100%" height="3rem">
                <Text w="100%" as="div" align="center" fontSize="xs" fontWeight={'bold'} color="white" lineHeight={'3rem'}>Lobby</Text>
            </Box>
            <VStack w="100%"
                bgColor="gray.1100"
                borderRadius="2rem"
                //border="2px solid"
                borderColor={'gray.175'}
                // minHeight={"10rem"}
                // height="100%"
                flex="1"
                spacing={'0rem'}
                overflow="hidden"
            // py="0.5rem"
            // overflow="hidden"
            >



                <VStack width="100%"
                    // height="100%"
                    // height={"auto"}
                    //  maxHeight={props.isBottomLayout ? "20rem" : ''} 
                    boxSizing='border-box'
                    overflow='hidden'
                    flex={"1"}
                    pb="0.5rem"
                    spacing="0">


                    <ChakraSimpleBar
                        boxSizing='border-box'
                        style={{
                            width: '100%',
                            // height: '100%', 
                            // flex: '1',
                            overflow: 'hidden scroll', boxSizing: 'border-box',
                        }} scrollableNodeProps={{ ref: scrollRef }}>
                        <VStack
                            className="chat-message-panel"
                            height="100%"

                            px="2rem"

                            width="100%"
                            spacing={['0.2rem', '0.2rem', "0.5rem"]}
                            justifyContent={'flex-end'} >
                            {renderChatMessages()}
                        </VStack>
                    </ChakraSimpleBar>
                    {/* <Box position="absolute" bottom="0" left="0" width="100%" height="1rem"></Box> */}
                </VStack>
                {/* <Box height="0px" ref={messageListRef} /> */}
            </VStack>
        </VStack>
    )
}

export default ChatMessages;