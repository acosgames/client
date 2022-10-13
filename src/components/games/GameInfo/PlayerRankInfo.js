const { HStack, VStack, Text, Image } = require("@chakra-ui/react");
import config from '../../../config'

import fs from 'flatstore';
import ratingtext from 'shared/util/ratingtext';

function PlayerRankInfo(props) {

    let [player_stats] = fs.useWatch('player_stats');

    let played = player_stats.played;
    played = 0;
    let ratingTxt = ratingtext.ratingToRank(player_stats.rating);
    let ratingTextFormatted = played >= 10 ? ratingTxt.toUpperCase() : 'UNRANKED';
    let ratingImageFile = played >= 10 ? ratingTxt.replace(/ /ig, '') : 'Unranked';

    return (
        <HStack spacing="1rem" >

            <VStack>
                <Text
                    color="yellow.200"
                    fontSize={['xxs', 'xs', 'md',]}
                    fontWeight={'bolder'}
                    lineHeight="1.6rem"
                    align="center">{ratingTextFormatted}</Text>
                <HStack>
                    <Text
                        display={played >= 10 ? 'block' : 'none'}
                        color="gray.50"
                        fontSize={['xxs', 'xs', 'md',]}
                        fontWeight="bold"
                        lineHeight={'1.6rem'}
                        pr={'1rem'}
                        align="center">{player_stats.rating} </Text>
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
                height={["3.4rem", "6.4rem", "8rem"]}
            />
        </HStack>
    )
}

export default PlayerRankInfo;