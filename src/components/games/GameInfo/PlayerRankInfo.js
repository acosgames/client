const { HStack, VStack, Text, Image } = require("@chakra-ui/react");
import config from '../../../config'

import fs from 'flatstore';
import ratingtext from 'shared/util/ratingtext';

function PlayerRankInfo(props) {

    let [player_stats] = fs.useWatch('player_stats');
    let [playerHighScore] = fs.useWatch('localPlayerHighscore');
    let stats = player_stats[props.game_slug];
    if (!stats)
        stats = { played: 0, rating: 2500 }
    console.log(stats);
    let played = Number.parseInt(stats.played);
    // played = 10;
    // stats.rating = 3000;
    let ratingTxt = ratingtext.ratingToRank(Number.parseInt(stats.rating));
    let ratingTextFormatted = played >= 10 ? ratingTxt.toUpperCase() : 'UNRANKED';
    let ratingImageFile = played >= 10 ? ratingTxt.replace(/ /ig, '') : 'Unranked';

    if (props?.game?.maxplayers <= 1) {


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
        <HStack spacing="1rem" >

            <VStack>
                <Text
                    color="yellow.200"
                    fontSize={['xs', 'xs', 'md',]}
                    fontWeight={'bolder'}
                    lineHeight="1.6rem"
                    align="center">{ratingTextFormatted}</Text>
                <HStack>
                    <Text
                        display={played >= 10 ? 'block' : 'none'}
                        color="gray.50"
                        fontSize={['xs', 'xs', 'md',]}
                        fontWeight="bold"
                        lineHeight={'1.6rem'}
                        pr={'1rem'}
                        align="center">{stats.rating} </Text>
                    <Text
                        color="gray.50"
                        display={played < 10 ? 'block' : 'none'}
                        fontSize={['xxs', 'xs', 'xs']}
                        pl="0.5rem"
                        lineHeight="1.6rem">{played || 0} of 10 games remaining</Text>
                </HStack>
            </VStack>
            <Image
                src={`${config.https.cdn}icons/ranks/${ratingImageFile}.png`}
                width={'auto'}
                height={["4.8rem", "4.8rem", "4.8rem"]}
            />
        </HStack>
    )
}

export default PlayerRankInfo;