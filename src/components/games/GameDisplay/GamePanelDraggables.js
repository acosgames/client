import { Box, Icon, IconButton, Portal, Text, VStack } from "@chakra-ui/react";
import fs from "flatstore"
import Draggable from 'react-draggable';
import { useEffect, useRef } from "react";
import { isUserNext, maximizeGamePanel, updateGamePanel } from "../../../actions/room";
import { FaExpandAlt } from '@react-icons';

function GamePanelDraggables(props) {

    let [gamepanels] = fs.useWatch('gamepanels');

    const renderDraggables = () => {

        let draggables = [];

        for (var i = 0; i < gamepanels.length; i++) {
            let gamepanel = gamepanels[i];

            //let's not show gamepanels that are available to reserve 
            if (gamepanel.available)
                continue;



            draggables.push((
                <GamePanelDraggable key={'gpdraggable-' + gamepanel.id} gamepanel={gamepanel} />
            ))
        }


        return draggables;
    }

    return (
        <>
            {renderDraggables()}
        </>
    )

}

function GamePanelDraggable(props) {

    let [gamepanel] = fs.useWatch('gamepanel/' + props.gamepanel.id);

    // useEffect(() => {
    //     //if (gamepanel.draggableRef)
    //     //updateGamePanel(gamepanel);
    // }, [])
    gamepanel.draggableRef = useRef();

    let width = 100;
    let height = 100;

    let isActive = gamepanel.canvasRef == gamepanel.draggableRef;


    let isNext = isUserNext(gamepanel);


    return (
        <Draggable key={'draggable-' + gamepanel.id}      >
            <Box
                display={isActive ? 'block' : 'none'}
                className={"draggable-ref"}


                position={'absolute'}
                top={0}
                left={0}
                width={'16rem'}
                height={'11rem'}
                zIndex={999}
                border="2px solid"
                borderColor={isNext ? "brand.300" : "yellow.300"}
                // borderRadius={'2rem'}
                overflow="hidden"
                ref={gamepanel.draggableRef}
                _hover={{ borderColor: isNext ? "brand.500" : "yellow.500" }}
            >

                <Box
                    position="absolute"
                    height="100%"
                    width="100%"
                    zIndex={11}
                    overflow="hidden"
                    backgroundColor={"rgba(0,0,0,0)"}
                    transition="background-color 0.1s ease"
                    _hover={{ backgroundColor: "rgba(0,0,0,0.4)" }}
                    // borderRadius={'2rem'}
                    onDoubleClick={() => {
                        maximizeGamePanel(gamepanel);
                    }}
                >
                    <VStack alignItems='center' position="absolute" top="0" left="0" spacing="0" justifyContent='flex-end' width="100%" height="100%" opacity="1" transition="opacity 0.2s ease" _hover={{ opacity: '0' }}>
                        <Text color="white" fontWeight={'bold'} textAlign="center" h="2rem" lineHeight="2rem" fontSize="xs" bgColor="rgba(0,0,0,0.9)">{isNext ? 'You are next!' : ''}</Text>
                    </VStack>
                    <VStack spacing="0" alignItems={'center'} justifyContent='flex-start' width="100%" height="100%" opacity="0" transition="opacity 0.2s ease" _hover={{ opacity: '1' }}>
                        <Text textAlign={'center'} color="white" fontWeight={'bold'} w="100%" height="2rem" fontSize="xs" bgColor="rgba(0,0,0,0.9)">Ranked Match</Text>
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
            </Box>
        </Draggable >
    )
}

export default GamePanelDraggables;
