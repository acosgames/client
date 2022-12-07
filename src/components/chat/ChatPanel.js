
import { Box, HStack, VStack, Text, IconButton, Image, Flex, Button, Icon, chakra } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useRef, useState } from 'react';
import { clearChatMessages, getChatMessages, sendChatMessage } from '../../actions/chat.js';
import FSGButton from '../widgets/inputs/FSGButton.js';
import FSGSubmit from '../widgets/inputs/FSGSubmit';
import FSGTextInput from '../widgets/inputs/FSGTextInput';
import { IoSend, BsChevronBarRight, BsChevronBarLeft, BsChevronBarUp, BsChevronBarDown, BsChatDotsFill, AiFillCloseCircle } from '@react-icons';

import config from '../../config'
import ColorHash from 'color-hash'
import { Link, useLocation } from 'react-router-dom';
import GameActions from '../games/GameDisplay/GameActions';
import QueuePanel from '../games/QueuePanel.js';
import Scrollbars from 'react-custom-scrollbars-2';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

fs.set('chat', []);
fs.set('chatMessage', '');
fs.set('chatMode', 'all');
fs.set('chatToggle', true);
const colorHash = new ColorHash({ lightness: 0.7 });

function ChatPanel(props) {

    useEffect(() => {

    }, []);

    // let [toggle, setToggle] = useState(true);

    const onPanelToggle = () => {

        let toggle = fs.get('chatToggle');
        fs.set('chatToggle', !toggle);

        // setTimeout(() => {
        //     fs.set('resize', (new Date()).getTime());
        // }, 500)
        // if (toggle) {
        //     fs.set('chatToggle', !toggle);
        //     setToggle(false);
        // }
        // else {
        //     setToggle(true);
        // }

    }

    // let width = '24.0rem';

    let toggle = fs.get('chatToggle') && props.displayMode != 'theatre';
    let desktopIcon = toggle ? <Icon as={AiFillCloseCircle} filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'} fontSize="2rem" color={'gray.400'} /> : <Icon as={BsChatDotsFill} filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'} fontSize="2rem" color={'gray.100'} />;
    let mobileIcon = toggle ? <Icon as={AiFillCloseCircle} filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'} fontSize="2rem" color={'gray.400'} /> : <Icon as={BsChatDotsFill} filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'} fontSize="2rem" color={'gray.100'} />
    return (
        <Box
            transition="width 0.3s ease, height 0.3s ease"
            width={props.isMobile ? '100%' : !toggle ? '0' : ['24.0rem', '24rem', '28.0rem']}
            height={!props.isMobile ? "100%" : (toggle ? '30rem' : '0')}
            position="relative"
        // overflow="hidden"
        >

            <VStack
                transition="width 0.3s ease, height 0.3s ease"
                // position="relative"
                // top="0"
                // left="0"
                width={props.isMobile ? '100%' : ['24.0rem', '24rem', '28.0rem']}
                height={!props.isMobile ? "100%" : '24rem'}

                // alignItems="stretch"
                pb={'0'}


                // flexGrow='1 !important'
                // display='flex !important'
                // flexDirection='column !important'
                spacing="0"
                mt="0"
            >

                <VStack
                    p="0"
                    bgColor="gray.900"
                    // borderRadius="2rem"
                    //boxShadow={'inset 0 1px 2px 0 rgb(255 255 255 / 20%), inset 0 2px 2px 0 rgb(0 0 0 / 28%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)'}
                    // width="100%"//{props.isMobile ? "100%" : (['22.0rem', '22rem', '26.0rem'])}
                    // height="calc(100vh - 6rem)"
                    spacing="0"
                    // height={['calc(100vh - 7rem)', 'calc(100vh - 8rem)', 'calc(100vh - 9rem)']}
                    height="100%"
                    // minHeight={['calc(100vh - 7rem)', 'calc(100vh - 8rem)', 'calc(100vh - 9rem)']}
                    // ref={scrollRef}
                    width="100%"
                    overflow="hidden"
                    position="relative"
                    justifyContent="flex-start"
                    alignItems={"flex-start"}
                // width={props.isMobile ? '100%' : ['24.0rem', '24rem', '28.0rem']}
                >


                    <GameActions />
                    <ChatHeader toggle={toggle} isMobile={props.isMobile} />


                    <ChatMessages toggle={toggle} isMobile={props.isMobile} />

                    <Box
                        // pr="1rem"
                        // pl="1rem"
                        width="100%"
                        // bgColor="gray.1000"
                        // boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 20%), inset 0 2px 2px 0 rgb(0 0 0 / 28%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                        height={["3.5rem", "3.5rem", "4.5rem"]}
                        px="0.5rem"
                        pb="0.5rem"
                    // justifyContent={'flex-end'}
                    >
                        <ChatSend />
                    </Box>

                </VStack >

            </VStack>
        </Box>
    )
}
ChatPanel = fs.connect(['chatToggle', 'isMobile', 'displayMode'])(ChatPanel);

function ChatHeader(props) {

    let [mode, setMode] = useState('all');

    const onChangeMode = (mode) => {
        setMode(mode);
        fs.set('chatMode', mode);
    }
    return (
        <HStack
            // boxShadow={'0 10px 15px -3px rgba(0, 0, 0, .2), 0 4px 6px -2px rgba(0, 0, 0, .1);'}
            pl={'1rem'}
            bgColor="gray.900"
            width={props.isMobile ? '100%' : ['24.0rem', '24rem', '28.0rem']}
            height={['3rem', '4rem', '5rem']}
            spacing={'2rem'}
            justifyContent='center'
            alignItems={'center'}
        >
            <Text cursor='pointer' as={'span'} fontSize={mode == 'all' ? 'sm' : 'sm'} fontWeight="bold" color={mode == 'all' ? 'gray.100' : 'gray.500'} onClick={() => { onChangeMode('all') }}>ACOS Chat</Text>
            {/* <Text cursor='pointer' as={'span'} fontSize={mode == 'game' ? 'sm' : 'sm'} fontWeight="bold" color={mode == 'game' ? 'gray.100' : 'gray.500'} onClick={() => { onChangeMode('game') }}>Friends</Text>
            <Text cursor='pointer' as={'span'} fontSize={mode == 'party' ? 'sm' : 'sm'} fontWeight="bold" color={mode == 'party' ? 'gray.100' : 'gray.500'} onClick={() => { onChangeMode('party') }}>Bounties</Text> */}

        </HStack>
    )
}
ChatHeader = fs.connect([])(ChatHeader);

function ChatMessages(props) {

    // useEffect(() => {
    //     clearChatMessages();
    // }, [])

    const location = useLocation();
    const messageListRef = useRef();

    const renderChatMessages = () => {
        let rows = [];
        let messages = getChatMessages(props.chatMode);
        for (let msg of messages) {
            if (!msg || Array.isArray(msg))
                continue;

            //show game icon if user is in game page
            let showThumb = false;
            if (msg.game_slug && msg.icon) {
                showThumb = true;
            }

            rows.push(
                <Box
                    bgColor="gray.700"
                    borderRadius="0.4rem"
                    p={["0.2rem", "0.2rem", "0.5rem"]}
                    //pl={["1rem", "1rem", "1rem"]}
                    // pr="0"
                    my="0.0rem"

                    key={msg.displayname + msg.timestamp}
                    width="100%"
                    overflow="hidden"
                    lineHeight="1.5rem"
                    //boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 20%), inset 0 2px 2px 0 rgb(0 0 0 / 28%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                    position="relative"

                >
                    {showThumb &&
                        (

                            <Link w="100%" h="100%" to={`/g/${msg.game_slug}`}>
                                <Image
                                    alt={'A cup of skill logo'}
                                    src={`${config.https.cdn}g/${msg.game_slug}/preview/${msg.icon}`}
                                    h="2rem"
                                    w="2rem"
                                    mr="0.5rem"
                                    display="inline-block"
                                    verticalAlign={'middle'}
                                />
                            </Link>
                        )
                    }
                    <Link to={`/profile/${msg.displayname}`}>
                        <Text fontWeight={'900'} fontSize="xxs" as="span" color={colorHash.hex(msg.displayname)}>{msg.displayname}</Text>
                    </Link>
                    <Text fontWeight={'light'} fontSize="xxs" as="span">: </Text>
                    <Text
                        fontWeight={'300'}
                        fontSize="xxs"
                        as="span"
                        textShadow="0px 1px 2px rgb(0 0 0 / 75%)"
                    >
                        {msg.message}
                    </Text>
                </Box >)
        }
        return rows;
    }


    //scroll to bottom of chat
    useEffect(() => {

        if (props.toggle)
            setTimeout(() => {
                // messageListRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' });
                if (scrollRef && scrollRef.current)
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }, 100)

    })

    //update chatMode for when user changes pages
    useEffect(() => {
        fs.set('chatMode', fs.get('chatMode'));
    }, [])

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

    let maxHeight = !props.isMobile ? "100%" : (props.toggle ? '23rem' : '0');

    const ChakraSimpleBar = chakra(SimpleBar)

    return (

        <VStack p="0.5rem" width="100%" height="auto" boxSizing='border-box' flex="1" overflow='hidden'>

            <ChakraSimpleBar
                // bgColor="gray.800"
                //borderRadius="2rem"
                boxSizing='border-box'
                // height="100%"
                // m="0.5rem"
                style={{
                    width: '100%',
                    // width: props.isMobile ? '100%' : '28.0rem',
                    height: 'auto', flex: '1', paddingBottom: '0.5rem', overflow: 'hidden scroll', boxSizing: 'border-box',
                    // borderRadius: '2rem',
                    // bgColor: 'gray.700',
                    // paddingLeft: "0.5rem",
                    // paddingRight: '0.5rem'
                    // p: "0.5rem"
                }} scrollableNodeProps={{ ref: scrollRef }}>
                {/* <Scrollbars
                    renderView={(props) => (
                        <div
                            className="main-scrollbars"
                            style={{
                                position: 'absolute',
                                inset: '0px',
                                paddingRight: '0px',
                                margin: '0',
                                padding: '0',
                                overflow: 'hidden scroll',
                                width: '100%'
                                // marginRight: '-8px',
                                // marginBottom: '-8px'
                            }}
                        />)}
                    // renderThumbVertical={(style, props) => <Box  {...props} {...style} w="10px" bgColor={'blacks.700'} className="thumb-vertical" />}
                    hideTracksWhenNotNeeded={true}
                    autoHide
                    autoHideTimeout={2000}
                    autoHideDuration={200}
                > */}
                <VStack
                    className="chat-message-panel"
                    // bgColor="gray.700"
                    // borderRadius="2rem"
                    height="100%"

                    pr="1rem"
                    pl="1rem"
                    width="100%"
                    spacing={['0.2rem', '0.2rem', "0.5rem"]}

                    justifyContent={'flex-end'} >
                    {renderChatMessages()}
                </VStack>
            </ChakraSimpleBar>
            {/* </Scrollbars> */}
            {/* <Box height="0px" ref={messageListRef} /> */}

        </VStack>

    )
}
ChatMessages = fs.connect(['chat', 'chatMode'])(ChatMessages);
// export ChatMessages;



function ChatSend(props) {

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        fs.set('chatMessage', value);
    }

    const onSubmit = async (e) => {
        //console.log(e);
        await sendChatMessage();
        fs.set('chatMessage', '');
    }

    return (
        <Box
            position={'relative'}

            width={"100%"} spacing="0" m="0">
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
                _focus={{ outline: 'gray.100', bgColor: 'black' }}
                _placeholder={{ color: 'gray.175' }}
                value={props.chatMessage || ''}
                onChange={inputChange}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit(e)
                    }
                }}
            />
            <HStack
                alignItems={'center'} justifyContent="center"
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
    )
}
ChatSend = fs.connect(['chatMessage'])(ChatSend);

export default fs.connect([])(ChatPanel);




