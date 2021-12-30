
import { Badge, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, IconButton, Input, Portal, useDisclosure, useShortcut } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { findAndRejoin } from '../../actions/game';
import Connection from './Connection';


import LeaveGame from './LeaveGame';
import { BsArrowsFullscreen, HiOutlineDotsCircleHorizontal } from '@react-icons';
import { wsLeaveGame } from '../../actions/connection';

const resizeEvent = new Event('resize');

function GameScreenActions(props) {

    const game_slug = props.match.params.game_slug;
    const mode = props.match.params.mode;
    const room_slug = props.match.params.room_slug;

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

        window.dispatchEvent(resizeEvent)
    }

    const onForfeit = (elem) => {
        wsLeaveGame(game_slug, room_slug);
    }


    return (
        <Box >

            <Button
                colorScheme='red'
                onClick={onForfeit}>
                Forfeit Game
            </Button>


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