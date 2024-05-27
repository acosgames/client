import { Box, HStack, Text, Tooltip } from '@chakra-ui/react';
import fs from 'flatstore';
import { getGamePanel, getPrimaryGamePanel, getRoomStatus, isUserNext } from '../../actions/room';

function Timeleft(props) {
    let [primaryGamePanelId] = fs.useWatch('primaryGamePanel');

    if (typeof primaryGamePanelId === 'undefined' || primaryGamePanelId == null)
        return <></>

    return <TimeleftDisplay id={primaryGamePanelId} />
}
function TimeleftDisplay(props) {



    let [timeleft] = fs.useWatch('timeleft/' + props.id) || 0;
    let [gamepanel] = fs.useWatch('gamepanel/' + props.id);

    // let gamepanel = getGamePanel(props.id);
    if (!gamepanel)
        return <></>



    try {
        timeleft = Number.parseInt(timeleft) / 1000;

        // if (timeleft > 10)
        //     timeleft = Math.floor(timeleft);
    }
    catch (e) {
        timeleft = 0;
    }

    if (Number.isNaN(timeleft))
        timeleft = 0;



    let hour = Math.floor((timeleft % 86400) / 3600);
    let min = Math.floor((timeleft % 3600) / 60);
    let sec = Math.floor(timeleft) % 60;
    let ms = (100 * (timeleft - Math.floor(timeleft)));
    if (ms < 10) {
        ms = "0" + ms;
    } else {
        ms = "" + ms;
    }
    ms = ms.substring(0, 2);

    let greaterThan10 = timeleft >= 10;
    let isEven = timeleft % 2 == 0;

    let isNext = isUserNext(gamepanel);

    let roomStatus = 'NONE';
    if (gamepanel?.room?.room_slug)
        roomStatus = getRoomStatus(gamepanel.room.room_slug);

    let nextColor = 'yellow.500'
    let nextText = 'WAIT';
    if (roomStatus == 'GAME' && isNext) {
        nextText = 'GO';
        nextColor = 'brand.900'
    } else if (roomStatus != 'GAME' && roomStatus != 'LOADING') {
        nextText = 'GG';
        nextColor = 'gray.200'
    }

    if (gamepanel?.room?.isReplay) {
        nextText = 'REPLAY';
        nextColor = 'red.500';
    }

    return (
        <HStack width="100%" align="center"
            alignContent='center'
            justifyContent={'center'}
            alignItems='center'
            className="timeleft-wrapper"
        >
            <HStack
                className="timeleft-wrapper"
                // width="100%" 
                height={'3rem'}
                alignContent='center'
                justifyContent={'center'}
                alignItems='center'
                px="0rem"
                py="1rem"
                cursor="pointer"
                //bgColor={isNext ? 'gray.700' : ""}
                borderRadius="2rem"
                // bgColor="gray.700"
                // border="2px solid"
                bgColor="gray.1200"
                // borderColor={isNext ? 'brand.1000' : 'yellow.800'}//"gray.175"
                width="15rem"
                spacing="0"
                fontSize='xl'
                fontWeight="light"
                color={greaterThan10 ? 'white' : 'red.500'}

                onClick={() => {
                    let scoreboardExpanded = fs.get('scoreboardExpanded');
                    fs.set('scoreboardExpanded', !scoreboardExpanded);
                    // if (scoreboardExpanded) {
                    //     fs.set('layoutRightMode', 'none');
                    // }
                }}>

                <HStack spacing="0" display={hour > 0 ? 'flex' : 'none'}>
                    <Text
                        as="span"

                        className="digitaltimer"
                    >
                        {(hour < 10) ? ("0" + hour) : hour}
                    </Text>
                    <Text as="span" px="0.1rem">:</Text>
                </HStack>
                <HStack spacing="0" display={min > 0 ? 'flex' : 'none'} >
                    <Text
                        as="span"
                        className="digitaltimer"
                    >
                        {(min < 10) ? ("0" + min) : min}
                    </Text>
                    <Text as="span" px="0.1rem" color="white"
                    >:</Text>
                </HStack>
                <HStack spacing="0">
                    <Text
                        as="span"
                        className="digitaltimer"
                    >
                        {(min > 0 && sec < 10) ? ("0" + sec) : sec}

                    </Text>

                </HStack>
                <HStack spacing="0" display={greaterThan10 ? 'none' : 'flex'}>
                    <Text as="span" px="0.1rem"
                    >.</Text>
                    <Text
                        as="span"
                        // animation={greaterThan10 ? '' : 'timerblink 1s infinite'}
                        className="digitaltimer"
                    // fontVariantNumeric="tabular-nums"
                    >
                        {ms}

                    </Text>
                </HStack>

            </HStack>
            <Text
                as="span"
                px="0.5rem"
                fontSize="sm"
                height="4rem"
                lineHeight={'4rem'}
                display={'block'}
                position="absolute"
                top="0"
                left="0"
                fontWeight={'bold'}
                //bgColor={isNext ? 'brand.900' : 'yellow.500'}
                textShadow="1px 1px 8px #111"
                color={nextColor}
            >
                {nextText}
            </Text>
        </HStack>
    )
}

export default Timeleft;