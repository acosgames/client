import { HStack, Text, Tooltip } from '@chakra-ui/react';
import fs from 'flatstore';
import { getGamePanel, getPrimaryGamePanel, isUserNext } from '../../../actions/room';

function Timeleft(props) {
    let [primaryGamePanelId] = fs.useWatch('primaryGamePanel');

    if (typeof primaryGamePanelId === 'undefined' || primaryGamePanelId == null)
        return <></>

    return <TimeleftDisplay id={primaryGamePanelId} />
}
function TimeleftDisplay(props) {



    let [timeleft] = fs.useWatch('timeleft/' + props.id) || 0;


    let gamepanel = getGamePanel(props.id);
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
    let sec = Math.ceil(timeleft) % 60;
    let ms = (100 * (timeleft - Math.floor(timeleft)));
    if (ms < 10) {
        ms = "0" + ms;
    } else {
        ms = "" + ms;
    }
    ms = ms.substring(0, 2);

    let greaterThan10 = timeleft >= 9;
    let isEven = timeleft % 2 == 0;

    let isNext = isUserNext(gamepanel);

    return (

        <Tooltip position={'bottom'} label={isNext ? 'Your move' : 'Waiting for opponent'}>
            <HStack
                // width="100%" 
                height={'3rem'}
                maxWidth="100%"
                alignContent='center'
                p="0.1rem"
                px="2rem"

                bgColor={isNext ? 'gray.700' : ""}
                borderRadius="2rem"
                spacing="0"
                fontSize='xl'
                onClick={() => {
                    let scoreboardExpanded = fs.get('scoreboardExpanded');
                    fs.set('scoreboardExpanded', !scoreboardExpanded);
                }}>

                <HStack spacing="0" display={hour > 0 ? 'flex' : 'none'}>
                    <Text
                        as="span"
                        //animation={greaterThan10 ? '' : 'timerblink 1s infinite'}
                        color={greaterThan10 ? 'gray.100' : 'red.500'}
                        fontWeight="bold"
                        className="digitaltimer"
                    // fontVariantNumeric="tabular-nums"
                    >
                        {(hour < 10) ? ("0" + hour) : hour}
                    </Text>
                    <Text as="span" px="0.1rem">:</Text>
                </HStack>
                <HStack spacing="0" display={min > 0 ? 'flex' : 'none'} >
                    <Text
                        as="span"
                        //animation={greaterThan10 ? '' : 'timerblink 1s infinite'}
                        color={greaterThan10 ? 'gray.100' : 'red.500'}
                        fontWeight="bold"
                        className="digitaltimer"
                    // fontVariantNumeric="tabular-nums"
                    >
                        {(min < 10) ? ("0" + min) : min}
                    </Text>
                    <Text as="span" px="0.1rem"
                    >:</Text>
                </HStack>
                <HStack spacing="0">
                    <Text
                        as="span"
                        //animation={greaterThan10 ? '' : 'timerblink 1s infinite'}
                        color={greaterThan10 ? 'gray.100' : 'red.500'}
                        fontWeight="bold"

                        className="digitaltimer"
                    // fontVariantNumeric="tabular-nums"
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
                        color={greaterThan10 ? 'gray.100' : 'red.500'}
                        fontWeight="bold"
                        className="digitaltimer"
                    // fontVariantNumeric="tabular-nums"
                    >
                        {ms}

                    </Text>
                </HStack>

            </HStack>
        </Tooltip>
    )
}

export default Timeleft;