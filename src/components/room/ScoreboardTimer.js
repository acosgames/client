import { VStack } from '@chakra-ui/react';
import fs from 'flatstore';
import { getPrimaryGamePanel, isUserNext } from '../../actions/room';
import Timeleft from '../room/Timeleft';

export default function ScoreboardTimer(props) {
    let [primaryGamePanelId] = fs.useWatch('primaryGamePanel');

    if (typeof primaryGamePanelId === 'undefined' || primaryGamePanelId == null)
        return <></>

    let gamepanel = getPrimaryGamePanel();
    let isNext = isUserNext(gamepanel);

    return (
        <VStack
            //bgColor="gray.1100"
            width={props.isBottomLayout ? '100%' : ['30rem', '30rem', '30rem', '40rem']}
            height={['4rem']}
            spacing="0"
            justifyContent={'center'}
            alignItems="center"
            alignContent={'center'}
            position="relative"
            onClick={() => {

            }}
        >
            <Timeleft id={primaryGamePanelId} />

        </VStack>
    )
}
