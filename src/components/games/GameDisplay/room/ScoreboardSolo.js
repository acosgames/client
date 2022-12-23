
import { HStack, Text, VStack } from '@chakra-ui/react';
import fs from 'flatstore';

import ratingtext from 'shared/util/ratingtext';
import { getPrimaryGamePanel, isUserNext } from '../../../../actions/room';
import config from '../../../../config'

export default function ScoreboardSolo(props) {

    let players = props.players;
    let player = null;
    for (const id in players) {
        player = players[id];
    }

    let gamepanel = getPrimaryGamePanel();
    let isNext = isUserNext(gamepanel);
    let rank = player.rank + "";


    // if (rank.length < 2) {
    //     rank = "0" + rank;
    // }

    return (
        <VStack width="100%" justifyContent={'center'} alignItems={'center'} fontWeight={isNext ? 'bold' : ''} key={"player-rank-" + player.name}

        >
            {/* <Text w='3rem' align="center" fontSize="xxs" color="gray.100"></Text> */}
            {/* <Text
                w='100%'
                align="center"
                pr="1rem"
                pl="1rem"
                fontSize="sm"
                color={player.ingame === false ? 'gray.175' : "white"}
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow={'ellipsis'}
                maxHeight="3rem"
                lineHeight="3rem"
                height="3rem"
                flex="1"
            >
                {player.name}
            </Text> */}
            <Text as="span" align="center" fontSize="lg" color="gray.200">Score</Text>
            <Text w='6rem' align="center" fontSize="2xl" color={player.ingame === false ? 'gray.175' : "gray.100"}>{player.score}</Text>
        </VStack>
    )
}
