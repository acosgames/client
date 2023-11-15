import { HStack, VStack, Text, Image, Icon, Wrap, WrapItem } from "@chakra-ui/react";
import config from '../../config/index.js'

import fs from 'flatstore';
import ratingtext from 'shared/util/ratingtext';

import { AiOutlineCloseCircle } from '@react-icons'
import ActionBarItem from './ActionBarItem.jsx';

function PlayerRankInfo({ }) {

    let [game] = fs.useWatch('game');
    let [player_stats] = fs.useWatch('player_stats');
    let [playerHighScore] = fs.useWatch('localPlayerHighscore');
    let stats = player_stats[game.game_slug];
    if (!stats)
        stats = { played: 0, rating: 100 }
    console.log(stats);
    let played = Number.parseInt(stats.played);
    // played = 10;
    // stats.rating = 3000;
    // played = 0
    let ratingTxt = ratingtext.ratingToRank(Number.parseInt(stats.rating));
    let ratingTextFormatted = played >= 10 ? ratingTxt.toUpperCase() : 'UNRANKED';
    let ratingImageFile = played >= 10 ? ratingTxt.replace(/ /ig, '') : 'Unranked';
    let rankNumber = ratingtext.ratingToRankNumber(Number.parseInt(stats.rating));

    // ratingTextFormatted = 'King';
    // rankNumber = 24;

    if (game.maxplayers <= 1) {


        return (
            <HStack>
                <Text
                    color="yellow.200"
                    fontWeight={'bold'}>
                    Highscore:
                </Text>
                <Text
                    fontWeight={'bold'}>
                    {playerHighScore?.score || 0}
                </Text>
            </HStack>
        )
    }
    return (
        <ActionBarItem title={ratingTextFormatted} value={played < 10 ? `${played} / 10` : stats.rating} spacing="0" ml="0rem" mr="0">
            <>
                <Image
                    display={played >= 10 ? 'inline-block' : 'none'}
                    src={`${config.https.cdn}icons/ranks/platform/${rankNumber}.webp`}
                    loading="lazy"
                    title={ratingTextFormatted}
                    height="7rem"
                    position="relative"
                    top="1rem"
                // minW='auto'
                // position="relative"
                />
                <Icon
                    display={played < 10 ? 'inline-block' : 'none'}
                    as={AiOutlineCloseCircle}
                    width={'auto'}
                    color="gray.200"
                    height={["6rem"]}
                />
            </>
        </ActionBarItem>

        // <HStack spacing="1rem" h="100%" alignItems='center' justifyContent={'center'}>

        //     <VStack alignItems='center' justifyContent={'center'} h="100%">
        //         <Text
        //             color="yellow.200"
        //             fontSize={['xxs', 'xxs', 'xxs',]}
        //             fontWeight={'bolder'}
        //             lineHeight="1.2rem"
        //             align="center">{ratingTextFormatted}</Text>
        //         <HStack alignItems='center' justifyContent={'center'}>

        //             <Text
        //                 display={played >= 10 ? 'block' : 'none'}
        //                 color="gray.50"
        //                 fontSize={['xxs', 'xxs', 'xxs',]}
        //                 fontWeight="bold"
        //                 lineHeight={'1.6rem'}
        //                 pr={'1rem'}
        //                 align="center">{stats.rating} </Text>
        //             <Text
        //                 color="gray.50"
        //                 display={played < 10 ? 'block' : 'none'}
        //                 fontSize={['xxs', 'xxs', 'xxs']}
        //                 pl="0.5rem"
        //                 lineHeight="1.6rem">{played || 0} of 10 games remaining</Text>
        //         </HStack>
        //     </VStack>
        //     <Icon
        //         as={AiOutlineCloseCircle}
        //         width={'auto'}
        //         color="gray.200"
        //         height={["4.8rem", "4.8rem", "4.8rem"]}
        //     />
        //     {/* <Image
        //         src={`${config.https.cdn}icons/ranks/${ratingImageFile}.png`}
        //         width={'auto'}
        //         height={["4.8rem", "4.8rem", "4.8rem"]}
        //     /> */}
        // </HStack>
    )
}

export default PlayerRankInfo;