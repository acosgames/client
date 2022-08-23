
import { Badge, Box, Button, Text, Flex, IconButton, Input, Portal, Spacer, HStack, Wrap, } from '@chakra-ui/react';
import { BsArrowsFullscreen, BsBarChartFill } from '@react-icons';

import fs from 'flatstore';
import { useLocation, useParams, withRouter } from 'react-router-dom';

import { joinGame } from '../../../actions/game';
import { wsLeaveGame } from '../../../actions/connection';
import { getRoomStatus } from '../../../actions/room';

const resizeEvent = new Event('resize');

function GameScreenActions(props) {


    const params = useParams();
    const location = useLocation();

    console.log('params', params);
    console.log('location', location);;

    const game_slug = params.game_slug;
    const mode = params.mode;
    const room_slug = params.room_slug;

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


    const handleJoin = async () => {

        let iframe = fs.get('iframe');
        //let game_slug = props.match.params.game_slug;
        let game = fs.get('game');
        if (!game)
            return

        let isExperimental = (window.location.href.indexOf('/experimental/') != -1);
        await wsLeaveGame(game_slug, room_slug);

        //0=experimental, 1=rank
        joinGame(game, isExperimental);



    }

    let gamestate = fs.get('gamestate') || {};//-events-gameover');
    let events = gamestate?.events || {};
    let roomStatus = getRoomStatus(room_slug);
    let isGameover = roomStatus == 'GAMEOVER' || roomStatus == 'NOSHOW' || roomStatus == 'ERROR';


    let latency = fs.get("latency") || 0;
    let latencyColor = 'green';
    if (latency > 400) {
        latencyColor = 'red';
    }
    else if (latency > 200) {
        latencyColor = 'yellow';
    }


    return (
        <Wrap h={props.isMobile ? '100%' : '3rem'} w={props.isMobile ? '13rem' : "100%"} justify={'center'} bgColor={'blacks.200'} py="0.6rem">
            <HStack alignItems={'center'}>
                <BsBarChartFill size="1.2rem" color={latencyColor} /><Text as="span" fontSize="xxs"> {latency}ms</Text>
            </HStack>
            <Box>
                <Button
                    fontSize={'xxs'}
                    bgColor={isGameover ? 'blacks.500' : 'red.800'}
                    onClick={onForfeit}>
                    {isGameover ? 'Leave' : 'Forfeit'}
                </Button>
            </Box>
            <Box display={isGameover ? 'block' : 'none'} ml="1rem">
                <Button
                    fontSize={'xxs'}
                    bgColor={'green.800'}
                    _hover={{ bgColor: 'rgb(42 181 28)' }}
                    _active={{ bgColor: 'rgb(42 181 28)' }}
                    onClick={handleJoin}>
                    Play Again
                </Button>
            </Box>

            <Box>
                <IconButton
                    fontSize={'xxs'}
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




export default (fs.connect(['fullScreenElem', 'roomStatus', 'isMobile'])(GameScreenActions));