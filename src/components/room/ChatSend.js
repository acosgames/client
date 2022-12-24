import { Box, HStack, IconButton } from '@chakra-ui/react';
import fs from 'flatstore';
import { sendChatMessage } from '../../actions/chat';
import { IoSend } from '@react-icons';

import FSGTextInput from '../widgets/inputs/FSGTextInput'
import { getPrimaryGamePanel } from '../../actions/room';

function ChatSend(props) {

    let [chatMessage] = fs.useWatch('chatMessage');
    let [primaryGamePanelId] = fs.useWatch('primaryGamePanel');

    if (typeof primaryGamePanelId === 'undefined') {
        return <></>
    }

    let gamepanel = getPrimaryGamePanel();
    if (gamepanel?.room?.maxplayers == 1) {
        return <></>
    }
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
        <Box w="100%" height="4rem" px="1rem" >
            <Box
                position={'relative'}
                pb="0.5rem"

                width={"100%"} spacing="0" m="0">
                <FSGTextInput
                    name="name"
                    id="name"
                    title=""
                    borderRadius="2rem"
                    maxLength="120"
                    pr={"3rem"}

                    height={["3rem", "3rem", "3rem"]}
                    border="1px solid"
                    borderColor="gray.175"
                    bgColor="gray.1200"
                    color="gray.100"
                    fontSize="xs"
                    placeholder="Type a message..."
                    autoComplete="off"
                    _focus={{ outline: 'gray.100', bgColor: 'black' }}
                    _placeholder={{ color: 'gray.175' }}
                    value={chatMessage || ''}
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
                    height={["3rem", "3rem", "3rem"]}
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
        </Box>
    )
}

export default ChatSend;