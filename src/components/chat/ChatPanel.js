
import { Box, HStack, VStack, Text, IconButton, Image, Flex, Button, Icon } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useRef, useState } from 'react';
import { clearChatMessages, getChatMessages, sendChatMessage } from '../../actions/chat.js';
import FSGButton from '../widgets/inputs/FSGButton.js';
import FSGSubmit from '../widgets/inputs/FSGSubmit';
import FSGTextInput from '../widgets/inputs/FSGTextInput';
import { IoSend, BsChevronBarRight, BsChevronBarLeft, BsChevronBarUp, BsChevronBarDown } from '@react-icons';

import config from '../../config'
import ColorHash from 'color-hash'
import { Link, useLocation } from 'react-router-dom';
import GameScreenInfo from '../games/GameScreen/GameScreenInfo.js';

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
        // if (toggle) {
        //     fs.set('chatToggle', !toggle);
        //     setToggle(false);
        // }
        // else {
        //     setToggle(true);
        // }

    }

    // let width = '24.0rem';

    let toggle = fs.get('chatToggle');
    let desktopIcon = toggle ? <Icon as={BsChevronBarRight} filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'} size="3rem" color={'white'} /> : <Icon as={BsChevronBarLeft} filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'} size="3rem" color={'white'} />;
    let mobileIcon = toggle ? <Icon as={BsChevronBarDown} filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'} size="3rem" color={'white'} /> : <Icon as={BsChevronBarUp} filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'} size="3rem" color={'white'} />
    return (
        // position={'fixed'} top="0" right="0" 
        // zIndex={'99'}

        <HStack spacing='0' m="0" p='0' bgColor={'blacks.200'} flexGrow='1 !important' height={!props.isMobile ? "100%" : (toggle ? '20rem' : '0')}>

            {props.isMobile && (
                <GameScreenInfo />
            )}

            <VStack
                bgColor={'blacks.200'}
                width={props.isMobile ? '100%' : (toggle ? ['24.0rem', '24rem', '28.0rem'] : '0rem')}
                borderLeft={toggle ? "1px solid" : ''}
                borderLeftColor={toggle ? 'blacks.500' : ''}

                height={!props.isMobile ? "100%" : (toggle ? '20rem' : '0')}
                alignItems="stretch"
                pb={toggle ? "1rem" : 0}
                // height="calc(100% - 10rem)"
                position="relative"


                // overflow='hidden scroll !important'
                // _webkitBoxFlex='1 !important'
                flexGrow='1 !important'
                // height='100% !important'
                //   width='100% !important'
                display='flex !important'
                flexDirection='column !important'
                mt="0"
            // zIndex='10 !important'
            >
                <Button
                    onClick={onPanelToggle}
                    _focus={{ outline: 'none' }}
                    bgColor={'transparent'}

                    _hover={{ bgColor: 'gray.700' }}
                    position={'absolute'}
                    top={!props.isMobile ? 0 : (!toggle ? '-3rem' : '0')}
                    left={!props.isMobile ? (toggle ? '-3rem' : '-3rem') : 'auto'}
                    right={!props.isMobile ? (toggle ? 'auto' : 'auto') : '0'}
                    // icon={props.isMobile ? mobileIcon : desktopIcon}
                    width="3rem"
                    height="3rem"
                    // isRound="false"
                    zIndex="100"
                    colorScheme={'none'}
                    // colorScheme="black"
                    // bgColor="gray.100"
                    borderRadius={'5px 0 0 5px'}

                >
                    {props.isMobile ? mobileIcon : desktopIcon}
                </Button>

                {!props.isMobile && (
                    <GameScreenInfo />
                )}

                <ChatHeader toggle={toggle} isMobile={props.isMobile} />

                <ChatMessages toggle={toggle} />
                <ChatSend />


            </VStack>


        </HStack>
    )
}
ChatPanel = fs.connect(['chatToggle', 'isMobile'])(ChatPanel);

function ChatHeader(props) {

    let [mode, setMode] = useState('all');

    const onChangeMode = (mode) => {
        setMode(mode);
        fs.set('chatMode', mode);
    }
    return (
        <HStack pl={'1rem'} width={props.isMobile ? '100%' : (props.toggle ? ['24.0rem', '24rem', '34.0rem'] : '0rem')} height="3rem" spacing={'2rem'} bgColor={'gray.900'} mt={'0 !important'} >
            <Text cursor='pointer' as={'span'} fontSize={'xxs'} color={mode == 'all' ? 'gray.100' : 'gray.300'} textShadow={mode == 'all' ? '0px 0px 5px #63ed56' : ''} onClick={() => { onChangeMode('all') }}>All</Text>
            <Text cursor='pointer' as={'span'} fontSize={'xxs'} color={mode == 'game' ? 'gray.100' : 'gray.300'} textShadow={mode == 'game' ? '0px 0px 5px #63ed56' : ''} onClick={() => { onChangeMode('game') }}>Game</Text>
            <Text cursor='pointer' as={'span'} fontSize={'xxs'} color={mode == 'party' ? 'gray.100' : 'gray.300'} textShadow={mode == 'party' ? '0px 0px 5px #63ed56' : ''} onClick={() => { onChangeMode('party') }}>Party</Text>
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
                <Box key={msg.displayname + msg.timestamp} width="100%" lineHeight={['1.3rem', '2rem']} fontSize={['1rem', "1.3rem"]}>
                    {showThumb &&
                        (<Link to={`/g/${msg.game_slug}`}>
                            <Text as="span" lineHeight="1.3rem" pr="0.5rem">
                                <Image
                                    alt={'A cup of skill logo'}
                                    src={`${config.https.cdn}g/${msg.game_slug}/preview/${msg.icon}`}
                                    h="1.3rem" maxHeight={'90%'}
                                    display="inline-block"
                                    verticalAlign={'middle'}
                                />
                            </Text>
                        </Link>)
                    }
                    <Link to={`/profile/${msg.displayname}`}>
                        <Text fontWeight={'900'} as="span" color={colorHash.hex(msg.displayname)}>{msg.displayname}</Text>
                    </Link>
                    <Text fontWeight={'light'} as="span">: </Text>
                    <Text fontWeight={'300'} as="span">{msg.message}</Text>
                </Box>)
        }
        return rows;
    }


    //scroll to bottom of chat
    useEffect(() => {

        if (props.toggle)
            setTimeout(() => {
                // messageListRef.current.scrollIntoView({ behavior: "smooth", block: 'nearest', inline: 'start' });
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }, 100)

    })

    //update chatMode for when user changes pages
    useEffect(() => {
        fs.set('chatMode', fs.get('chatMode'));
    }, [location])

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
        scrollRef.current.addEventListener('scroll', onScroll);

        return () => {
            if (scrollRef.current)
                scrollRef.current.removeEventListener('scroll', onScroll);
        }
    }, [])

    return (
        <Box pl={'1rem'} flex="1" alignSelf="stretch" width="100%" overflow="hidden" overflowY="scroll" ref={scrollRef}>
            <VStack width="100%" height="100%" spacing={['0.2rem', '0.3rem', "0.5rem"]} >
                {renderChatMessages()}
                <div ref={messageListRef} />
            </VStack>
        </Box>

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
        <HStack width="100%" height="3rem" px="2rem">
            <FSGTextInput
                name="name"
                id="name"
                title=""
                maxLength="120"
                height="3rem"
                autoComplete="off"
                value={props.chatMessage || ''}
                onChange={inputChange}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit(e)
                    }
                }}
            />
            <Box
                width="3rem"
                height="3rem"
            >
                <IconButton
                    onClick={onSubmit}

                    icon={<IoSend size="1.6rem" />}
                    width="2.8rem"
                    height="2.8rem"
                    isRound="true"
                />
            </Box>

        </HStack>
    )
}
ChatSend = fs.connect(['chatMessage'])(ChatSend);

export default fs.connect([])(ChatPanel);




