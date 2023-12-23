
import { Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, chakra } from '@chakra-ui/react';
import fs from 'flatstore';
import config from '../../../config';
import SimpleBar from 'simplebar-react';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import LeftPlayer from './LeftPlayer';

const MotionVStack = motion(VStack);

export default function ModalGameOver({ gamepanel, players, team, status }) {

    let [show, setShow] = useState(true);
    let scrollRef = useRef();

    const onClose = (e) => {
        setShow(false);
    }

    let user = fs.get('user');

    let localPlayer = user;
    let shortid = user.shortid;
    if (shortid in players) {
        localPlayer = players[shortid];
    }

    let ChakraSimpleBar = chakra(SimpleBar);
    return (

        <MotionVStack
            // overflow="hidden"
            w="50%"
            h="50%"
            position="absolute"
            top="50%"
            left="50%"
            border="0"
            zIndex={101}

            // borderTop="1px solid"
            // borderBottom="1px solid"
            // borderColor="gray.1200"
            initial={{ scale: 0.1, x: '-50%', y: '-50%' }}
            animate={{ scale: 1, x: '-50%', y: '-50%' }}
            transition={{
                duraton: 1,
            }}

            // filter="drop-shadow(0 0 20px var(--chakra-colors-red-300)) drop-shadow(0 0 40px black) drop-shadow(0 0 60px black)"
            // opacity="0.95"
            // bgColor="gray.100"
            // boxShadow="6px 5px 30px rgba(0,0,0,0.7)"
            bg="linear-gradient(to top, var(--chakra-colors-gray-1200), var(--chakra-colors-gray-900))"
        >
            <VStack
                width="100%"
                height={"100%"}
                transition={"all 0.3s ease"}
                spacing="0rem"
                position="relative"
                overflow="hidden"
                flex="1"
                mb="0"
                pb="0"
                borderRadius={"8px"}
                zIndex="2"
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
                    <VStack w="100%" pb="1rem" pt="0.5rem">
                        <Heading
                            as="h5"
                            fontSize={["2.4rem", "3rem", "3rem", "3rem"]}
                            color="gray.10"
                            textShadow="0 0 4px #ccc, 0 0 4px #ccc"
                        >
                            GAME CANCELLED
                        </Heading>
                        {/* <LeftPlayer player={localPlayer} isLeft={true} ignoreLocal={true} initial={{ opacity: 0 }} animate={{ opacity: 1 }} /> */}
                        {/* 
                        Screen 1:
                            - Win / Lose / Forfeit / Crash
                            - Rank Up / Down 
                            - Skill Points awarded
                        Screen 2:
                            - Match Completed XP
                            - Score XP
                            - Win XP
                            - Daily Win XP
                        Screen 3 - Achievements
                        Screen 4 - Extras (bounties/etc)
                        */}
                    </VStack>
                </ChakraSimpleBar>
            </VStack>
        </MotionVStack>
    )
}