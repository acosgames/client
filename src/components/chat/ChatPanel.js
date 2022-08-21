
import { Box, HStack, VStack, Text, IconButton, Image } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useRef } from 'react';
import { clearChatMessages, getChatMessages, sendChatMessage } from '../../actions/chat.js';
import FSGButton from '../widgets/inputs/FSGButton.js';
import FSGSubmit from '../widgets/inputs/FSGSubmit';
import FSGTextInput from '../widgets/inputs/FSGTextInput';
import { IoSend } from '@react-icons';

import config from '../../config'
import ColorHash from 'color-hash'
import { Link } from 'react-router-dom';

fs.set('chat', []);
fs.set('chatMessage', '');

const colorHash = new ColorHash({ hue: 90, lightness: 0.7 });

function ChatPanel(props) {

    useEffect(() => {

    }, []);

    let width = '24.0rem';

    return (
        // position={'fixed'} top="0" right="0" 
        // zIndex={'99'}

        <VStack width={width} pl="1rem" borderLeft="1px solid #555" alignItems="stretch" pb="6rem" height="100%">
            <ChatHeader />
            <ChatMessages />
            <ChatSend />
        </VStack>
    )
}

function ChatHeader(props) {

    return (
        <HStack width="100%" height="5rem">
            <Text>Chat Messages</Text>
        </HStack>
    )
}
ChatHeader = fs.connect([])(ChatHeader);

function ChatMessages(props) {

    // useEffect(() => {
    //     clearChatMessages();
    // }, [])

    const messageListRef = useRef();

    const renderChatMessages = () => {
        let rows = [];
        let messages = getChatMessages();
        for (let msg of messages) {
            if (!msg || Array.isArray(msg))
                continue;

            let showThumb = false;
            if (msg.game_slug && msg.icon) {
                showThumb = true;
            }

            rows.push(
                <Box key={msg.displayname + msg.timestamp} width="100%">
                    {showThumb &&
                        (<Link to={`/g/${msg.game_slug}`}><Text as="span" lineHeight="1.3rem" pr="0.5rem"><Image
                            alt={'A cup of skill logo'}
                            src={`${config.https.cdn}g/${msg.game_slug}/preview/${msg.icon}`}
                            h="1.3rem" maxHeight={'90%'}
                            display="inline-block"
                            verticalAlign={'middle'}
                        /></Text></Link>)}
                    <Text lineHeight={'20px'} fontSize="1.3rem" fontWeight={'900'} as="span" color={colorHash.hex(msg.displayname)}>{msg.displayname}</Text>
                    <Text lineHeight={'20px'} fontSize="1.3rem" fontWeight={'light'} as="span">: </Text>
                    <Text lineHeight={'20px'} fontSize="1.3rem" fontWeight={'300'} as="span">{msg.message}</Text>
                </Box>)
        }
        return rows;
    }

    useEffect(() => {
        // messageListRef.windowScr
        messageListRef.current.scrollTo(0, messageListRef.current.scrollHeight);
    })

    return (
        <Box flex="1" alignSelf="stretch" width="100%" overflow="hidden" overflowY="scroll">
            <VStack width="100%" height="100%" spacing="0.5rem" ref={messageListRef}>
                {renderChatMessages()}
            </VStack>
        </Box>

    )
}
ChatMessages = fs.connect(['chat'])(ChatMessages);
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
        <HStack width="100%" height="3rem" px="0.5rem">
            <FSGTextInput
                name="name"
                id="name"
                title=""
                maxLength="120"
                value={props.chatMessage || ''}
                onChange={inputChange}
                onKeyUp={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit(e)
                    }
                }}
            />
            <IconButton
                onClick={onSubmit}

                icon={<IoSend />}
                size="sm"
                isRound="true"
            />

        </HStack>
    )
}
ChatSend = fs.connect(['chatMessage'])(ChatSend);

export default fs.connect([])(ChatPanel);




