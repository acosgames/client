import { Box, Center, HStack, Heading, Icon, IconButton, WrapItem, Text, VStack, Wrap, Image } from '@chakra-ui/react';
import config from "../../config";
import PlayerRankInfo from "./PlayerRankInfo.js";
import GameInfoJoinButton from "./GameInfoJoinButton.js";
import fs from 'flatstore';
import ActionBarItem from './ActionBarItem.jsx';

export default function GameActionBar({ }) {
    let [game] = fs.useWatch("game");
    let [player_stats] = fs.useWatch('player_stats');
    let stats = player_stats[game.game_slug];

    return (
        <Box w="100%" bgColor="gray.925">


            <HStack

                py="2rem"
                w="100%"
                justifyContent={"center"}
                spacing={["2rem", "3rem", "6rem", "6rem"]}
                position="relative"
            >
                <ActionBarItem title={'WINS'} value={stats.win || 0}>
                    <Image
                        display={'inline-block'}
                        src={`${config.https.cdn}icons/diamond.svg`}
                        loading="lazy"
                        title={'WINS'}
                        height={["4rem", "4rem", "5rem", "6rem"]}
                    />
                </ActionBarItem>

                <ActionBarItem title={'BATTLES'} value={stats.played || 0}>
                    <Image
                        display={'inline-block'}
                        src={`${config.https.cdn}icons/swords.svg`}
                        loading="lazy"
                        title={'BATTLES'}
                        height={["4rem", "3.8rem", "4.5rem", "6rem"]}
                    />
                </ActionBarItem>

                <PlayerRankInfo />
            </HStack>
        </Box>
    );
}

