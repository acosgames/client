import { Box, Icon, IconButton, Portal, Text, VStack } from "@chakra-ui/react";
import fs from "flatstore"
import Draggable from 'react-draggable';
import { useEffect, useRef, useState } from "react";
import { findGamePanelByRoom, isUserNext, maximizeGamePanel, updateGamePanel } from "../../../actions/room";
import { FaExpandAlt } from '@react-icons';
import GamePanel from "./GamePanel";
import Connection from "../Connection";
import LoadingBox from "./LoadingBox";
import ActionMenu from "../../chat/ActionMenu";

function GamePanelDraggables(props) {

    // let [gamepanels] = fs.useWatch('gamepanels', []);
    let [rooms] = fs.useWatch('rooms');
    let [layoutMode] = fs.useWatch('layoutMode');

    const renderDraggables = () => {

        let draggables = [];

        for (const key in rooms) {
            // for (var i = 0; i < gamepanels.length; i++) {
            // let gamepanel = gamepanels[i];
            let gamepanel = findGamePanelByRoom(rooms[key].room_slug)

            if (!gamepanel)
                continue;
            //let's not show gamepanels that are available to reserve 
            if (gamepanel.available)
                continue;



            draggables.push(
                <GamePanelDraggable key={'gpdraggable-' + gamepanel.id} gamepanel={gamepanel} />
            )
        }


        return draggables;
    }

    let elems = renderDraggables();

    return (
        <>
            <Box position="absolute" bottom="0rem" right="0rem" zIndex="1000" display={layoutMode == 'off' ? 'block' : 'none'}>
                <ActionMenu />
            </Box>
            {/* <LoadingBox /> */}
            {elems}
            <Connection></Connection>
        </>
    )

}

function GamePanelDraggable(props) {

    // let gamepanel = props.gamepanel;
    let gamepanel = props.gamepanel;
    // let [gamepanelUpdated] = fs.useWatch('gamepanel/' + gamepanel.id);

    let [justMinimized, setJustMinimized] = useState(0);
    // useEffect(() => {
    //     //if (gamepanel.draggableRef)
    //     //updateGamePanel(gamepanel);
    // }, [])
    // let draggableRef = useRef();

    let width = 100;
    let height = 100;

    let isPrimary = gamepanel.isPrimary;// = gamepanel.canvasRef == gamepanel.draggableRef;


    let isNext = isUserNext(gamepanel);

    useEffect(() => {
        // gamepanel.draggableRef = draggableRef;
        if (!isPrimary) {
            if (justMinimized == 0) {
                setJustMinimized(1);
                setTimeout(() => { setJustMinimized(2); }, 50)
            }

        }
        if (isPrimary && justMinimized > 0) {
            setJustMinimized(0);
        }
    })

    let viewport_width = window.innerWidth;
    let leftBounds = viewport_width - 180;

    if (gamepanel.available) {
        return <></>
    }
    if (gamepanel.canvasRef) {
        return <></>
        // <Portal containerRef={gamepanel.canvasRef}>
        //     <GamePanel key={'gamepanel-' + gamepanel.id} id={gamepanel.id} />
        // </Portal>
    }

    if (gamepanel?.room?.isReplay)
        return <></>

    return (
        <Draggable
            key={'draggable-' + gamepanel.id}
            disabled={true}
            position={isPrimary ? { x: 0, y: 0 } : justMinimized <= 1 ? { x: 0, y: 0 } : undefined}
        //bounds={{ left: leftBounds + 'px', right: '2rem' }}
        //bounds={{ top: 0, bottom: (window.innerHeight - 300) }}
        //axis={'y'}
        >
            <Box
                // display={isActive ? 'block' : 'none'}
                className={"draggable-ref"}


                position={'absolute'}
                top={isPrimary ? 0 : '-4rem'}
                right={isPrimary ? 0 : 'calc(50% - 3.5rem)'}
                width={isPrimary ? '100%' : '7.27rem'}
                height={isPrimary ? '100%' : '5rem'}
                // transition={isPrimary ? "all 0.1s ease" : "width 0.1s ease, height 0.1s ease"}
                transition={isPrimary ? "" : "width 0.1s ease, height 0.1s ease"}
                zIndex={isPrimary ? 999 : 9999}
                border={isPrimary ? '0' : "2px solid"}
                borderColor={isNext ? 'brand.900' : 'yellow.500'}
                // borderRadius={'2rem'}
                overflow="hidden"
                // ref={draggableRef}
                _hover={{ borderColor: isPrimary ? '' : isNext ? "brand.500" : "yellow.500" }}
                onClick={() => {
                    maximizeGamePanel(gamepanel);
                }}
            >

                <Box
                    display={isPrimary ? 'none' : 'block'}
                    position="absolute"
                    height="100%"
                    width="100%"
                    zIndex={11}
                    overflow="hidden"
                    backgroundColor={"rgba(0,0,0,0)"}
                    transition="background-color 0.1s ease"
                    _hover={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                    filter={'drop-shadow(0px -12px 24px rgba(0,0,0,0.2))'}
                    // borderRadius={'2rem'}
                    onClick={() => {
                        maximizeGamePanel(gamepanel);
                    }}

                >
                    {/* <VStack alignItems='center' position="absolute" top="0" left="0" spacing="0" justifyContent='flex-end' width="100%" height="100%" opacity="1" transition="opacity 0.2s ease" _hover={{ opacity: '0' }}> */}
                    {/* <Text color="white" fontWeight={'bold'} textAlign="center" h="2rem" lineHeight="2rem" fontSize="xs" bgColor="rgba(0,0,0,0.9)">{isNext ? 'You are next!' : ''}</Text> */}
                    {/* </VStack> */}
                    <VStack spacing="0" alignItems={'center'} justifyContent='flex-start' width="100%" height="100%" opacity="0" transition="opacity 0.2s ease" _hover={{ opacity: '1' }}>
                        {/* <Text textAlign={'center'} color="white" fontWeight={'bold'} w="100%" height="2rem" fontSize="xs" bgColor="rgba(0,0,0,0.9)">Ranked Match</Text> */}
                        <VStack
                            flex="1"
                            alignItems={'center'}
                            justifyContent='center'
                        >
                            <IconButton
                                //colorScheme={'clear'}
                                onClick={() => { maximizeGamePanel(gamepanel) }}
                                icon={<Icon
                                    as={FaExpandAlt}
                                    color={'white'}
                                    fontSize="md" />}
                                width={['1.8rem', '2.4rem', "3rem"]}
                                height={['1.8rem', '2.4rem', "3rem"]}
                                isRound="true" />
                        </VStack>

                    </VStack>
                </Box>

                <GamePanel key={'gamepanel-' + gamepanel.id} id={gamepanel.id} />
            </Box>
        </Draggable >
    )
}

export default GamePanelDraggables;
