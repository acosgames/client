import React, { Component, useState } from "react";

// import { useSpring, animated } from 'react-spring';
import fs from 'flatstore';
import { wsLeaveQueue } from "../../actions/connection";
import { HStack, Text, VStack, Center, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Input, Button, Box, Badge, Divider } from "@chakra-ui/react";
import LoaderLineUp from '../widgets/loaders/LoaderLineUp';
import LoaderShimmer from '../widgets/loaders/LoaderShimmer';
import { IoCloseCircleOutline } from '@react-icons'

function QueuePanel(props) {

    const [isOpen, setOpen] = useState(false);
    const btnRef = React.useRef()

    const onClick = (e) => {
        setOpen(!isOpen);
    }

    const onClose = (e) => {
        setOpen(false);
    }

    const onCancel = (e) => {
        setOpen(false);
        wsLeaveQueue();
    }

    let queues = props.queues;
    // queues = queues || [];
    let panelClass = isOpen ? 'open' : '';

    if (!queues || queues.length == 0) {
        return (<React.Fragment></React.Fragment>)
    }

    var queueMap = {};
    var gameList = [];
    for (let i = 0; i < queues.length; i++) {
        let queue = queues[i];
        if (!queueMap[queue.game_slug]) {
            queueMap[queue.game_slug] = [];
            gameList.push(queue.game_slug);
        }
        queueMap[queue.game_slug].push(queue.mode);
    }

    return (
        <>
            <Center zIndex={3} position="fixed" top="0.5rem" width="50%" align="center" justifyItems={'center'} left="25%">
                <VStack width="100%" spacing="0.2rem">
                    <Button ref={btnRef} bg="gray.900" onClick={onClick} variant='outline'>
                        <Text p="0.3rem" as="span" lineHeight={'1rem'} color="white" fontWeight={'bolder'}>
                            SEARCHING
                        </Text>
                    </Button>
                    <LoaderLineUp />
                </VStack>
                <IconButton position="absolute" right="0" onClick={onCancel} icon={<IoCloseCircleOutline />} size="sm" isRound="true" />
            </Center>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Queue</DrawerHeader>

                    <DrawerBody>
                        <VStack divider={<Divider />} spacing="1rem">
                            {
                                gameList.map(game_slug => {
                                    let modes = queueMap[game_slug]
                                    return (
                                        <VStack key={'queueitem-' + game_slug}>
                                            <Text color="brand.100" as="span" fontWeight={'bold'}>{game_slug}</Text>
                                            <HStack>
                                                {
                                                    modes.map(m => (
                                                        <Badge title={m} key={game_slug + "-" + m + "-mode"}>{m}</Badge>
                                                    ))
                                                }
                                            </HStack>
                                        </VStack>
                                    )
                                })
                            }
                        </VStack>
                    </DrawerBody>
                    {/* 
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onCancel}>
                            Leave Queue
                        </Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
        </>
        // <animated.div id="queue-panel" style={springProps} ref={myRef}>
        //     <div id="queue-header" >
        //         <div id="queue-header-content">

        //             <div
        //                 id="queue-tab"

        //                 onClick={onClick}
        //             // onMouseDown={onMouseDown}
        //             // onMouseUp={onMouseUp}
        //             // onMouseMove={onMouseMove}
        //             // onMouseOut={onMouseUp}
        //             >
        //                 {/* <div id="queue-tab-divet"></div> */}
        //                 <div id="queue-tab-cancel" onClick={onCancel}>&times;</div>
        //                 <div id="queue-searching">Searching</div>
        //                 <div id="queue-loader">
        //                     <div className="loader-inner line-scale-pulse-out-rapid">
        //                         <div></div>
        //                         <div></div>
        //                         <div></div>
        //                         <div></div>
        //                         <div></div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div id="queue-content"
        //     // onClick={onClick}
        //     >
        //         <div id="queue-games">
        //             <ul>
        //                 {
        //                     gameList.map(game_slug => {
        //                         let modes = queueMap[game_slug]
        //                         return (
        //                             <li key={game_slug}>
        //                                 <span className="queue-game-title">{game_slug}</span>
        //                                 {
        //                                     modes.map(m => (
        //                                         <span key={game_slug + "-" + m + "-mode"} className="queue-game-mode">{m}</span>
        //                                     ))
        //                                 }
        //                             </li>
        //                         )
        //                     })
        //                 }
        //             </ul>
        //         </div>
        //     </div>

        // </animated.div>
    )

}

export default fs.connect(['queues'])(QueuePanel);