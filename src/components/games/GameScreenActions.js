
import { Badge, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, IconButton, Input, Portal, Spacer, useDisclosure, useShortcut } from '@chakra-ui/react';
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

    let gamestate = fs.get('gamestate') || {};//-events-gameover');
    let events = gamestate?.events || {};
    let isGameover = !!(events.gameover)


    return (
        <Flex w="100%">
            <Box w='2px'>

            </Box>
            <Spacer />
            <Box>
                <Button
                    colorScheme={isGameover ? 'yellow' : 'red'}
                    onClick={onForfeit}>
                    {isGameover ? 'Leave' : 'Forfeit'} Game
                </Button>
            </Box>
            <Spacer />
            <Box>
                <IconButton
                    ml="2rem"
                    colorScheme={'clear'}
                    icon={<BsArrowsFullscreen color="white" />}
                    onClick={() => {
                        openFullscreen(props.fullScreenElem)
                    }}
                >
                    Full Screen
                </IconButton>
            </Box>
            {/* <LeaveGame></LeaveGame> */}

        </Flex >
    )


}




export default withRouter(fs.connect(['fullScreenElem', 'gamestate>events'])(GameScreenActions));