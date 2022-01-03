
import { Badge, Box, Button, Text, Flex, IconButton, Input, Portal, Spacer, HStack, Wrap, } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { findAndRejoin, joinGame } from '../../actions/game';
import Connection from './Connection';


import LeaveGame from './LeaveGame';
import { BsArrowsFullscreen, BsBarChartFill } from '@react-icons';
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

    let room = fs.get('room');

    const handleJoin = () => {

        let iframe = fs.get('iframe');
        //let game_slug = props.match.params.game_slug;
        let game = fs.get('game');
        if (!game)
            return

        let isExperimental = (window.location.href.indexOf('/experimental/') != -1);

        //0=experimental, 1=rank
        joinGame(game, isExperimental);

        let history = fs.get('history');
        history.push('/g/' + game_slug);

    }

    let gamestate = fs.get('gamestate') || {};//-events-gameover');
    let events = gamestate?.events || {};
    let isGameover = !!(events.gameover)


    let latency = fs.get("latency") || 0;
    let latencyColor = 'green';
    if (latency > 400) {
        latencyColor = 'red';
    }
    else if (latency > 200) {
        latencyColor = 'yellow';
    }

    return (
        <Wrap w="100%" justify={'center'}>
            <HStack alignItems={'center'}>
                <BsBarChartFill color={latencyColor} /><Text as="span"> {latency}ms</Text>
            </HStack>
            <Box>
                <Button
                    colorScheme={isGameover ? 'yellow' : 'red'}
                    onClick={onForfeit}>
                    {isGameover ? 'Leave' : 'Forfeit'} Game
                </Button>
            </Box>
            <Box display={isGameover ? 'block' : 'none'} ml="1rem">
                <Button
                    colorScheme={'green'}
                    onClick={handleJoin}>
                    Play Again
                </Button>
            </Box>

            <Box>
                <IconButton
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

        </Wrap >
    )


}




export default withRouter(fs.connect(['fullScreenElem', 'gamestate>events'])(GameScreenActions));