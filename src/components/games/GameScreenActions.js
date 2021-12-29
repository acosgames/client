
import { Badge, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Input, Portal, useDisclosure, useShortcut } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { findAndRejoin } from '../../actions/game';
import Connection from './Connection';
import GameScreenInfo from './GameScreenInfo';

import LeaveGame from './LeaveGame';
import { BsArrowsFullscreen, HiOutlineDotsCircleHorizontal } from '@react-icons';
import { wsLeaveGame } from '../../actions/connection';

function GameScreenActions(props) {

    const game_slug = props.match.params.game_slug;
    const mode = props.match.params.mode;
    const room_slug = props.match.params.room_slug;

    var mounted = true;
    const [opacity, setOpacity] = useState(1);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [dragging, setDragging] = useState(false);
    const btnRef = useRef()

    /* When the openFullscreen() function is executed, open the video in fullscreen.
    Note that we must include prefixes for different browsers, as they don't support the requestFullscreen method yet */
    const openFullscreen = (elem) => {
        if (!elem)
            return;
        elem = elem.current;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    const [timer1, setTimer1] = useState(0);
    const [timer2, setTimer2] = useState(0);
    const updateOpacity = (op) => {
        setOpacity(op);
        let timer = setTimeout(() => {
            if (!mounted)
                return;
            setOpacity(0.2);
        }, 5000)
        setTimer1(timer);
    }

    const onOpenMenu = (e) => {
        if (!dragging)
            onOpen(e);

    }

    const onForfeit = (elem) => {
        wsLeaveGame(game_slug, room_slug);
    }

    const dragElement = (elmnt, iframe) => {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
        var mdown = false;
        var mmove = false;

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;

            updateOpacity(1);
            setIsMouseDown(true);
            mdown = true;

            if (iframe) {
                iframe.onmouseup = closeDragElement;
                // call a function whenever the cursor moves:
                iframe.onmousemove = elementDrag;
            }
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;


        }

        function elementDrag(e) {
            if (mdown) {
                setDragging(true);
                mmove = true;
            } else {
                setDragging(false);
                mmove = false;
            }
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            // stop moving when mouse button is released:
            document.onmouseup = null;
            document.onmousemove = null;
            if (iframe) {
                iframe.onmouseup = null;
                // call a function whenever the cursor moves:
                iframe.onmousemove = null;
            }

            setIsMouseDown(false);
            mdown = false;
            let timer = setTimeout(() => {
                if (!mounted)
                    return;
                mmove = false;
                setDragging(false);
            }, 300)
            setTimer2(timer);
        }
    }

    useEffect(() => {
        let iframes = fs.get('iframes') || {};
        let iframe = iframes[room_slug];
        dragElement(btnRef.current, iframe?.current);
        updateOpacity(1);

        return () => {
            mounted = false;
            if (timer1)
                clearTimeout(timer1);
            if (timer2)
                clearTimeout(timer2);
        }
    }, [])

    return (
        <Box h="0" w="0" position="absolute" top="32px" right="100px" zIndex={'2'} >

            <Button
                ref={btnRef}
                onClick={onOpenMenu}
                colorScheme={''}
                size="md"
                borderRadius={'50%'}
                bgColor="rgba(148, 255, 151,1)" transition={'opacity 0.3s ease'} opacity={opacity} >FSG</Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent bgColor={'rgba(0,0,0,0.8)'}>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        {props.game?.name} - <Badge title={props.room?.mode} />
                    </DrawerHeader>

                    <DrawerBody>
                        <GameScreenInfo room_slug={room_slug} />
                    </DrawerBody>

                    <DrawerFooter justifyContent={'center'}>
                        <Button
                            colorScheme='blue'
                            onClick={onForfeit}>
                            Forfeit Game
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

            <IconButton
                colorScheme={'clear'}
                icon={<BsArrowsFullscreen color="white" />}
                onClick={() => {
                    openFullscreen(props.gamewrapper)
                }}
            >
                Full Screen
            </IconButton>
            {/* <LeaveGame></LeaveGame> */}

        </Box >
    )


}




export default withRouter(fs.connect(['gamewrapper'])(GameScreenActions));