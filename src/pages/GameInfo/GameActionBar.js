import { Box, Center, HStack, Heading, Icon, IconButton, WrapItem, Text, VStack, Wrap, Image } from '@chakra-ui/react';
import config from "../../config/index.js";
import PlayerRankInfo from "./PlayerRankInfo.js";
import GameInfoJoinButton from "./GameInfoJoinButton.js";
import fs from 'flatstore';
import ActionBarItem from './ActionBarItem.jsx';
import AchievementPanel from '../../layout/components/achievement/AchievementPanel.jsx';

export default function GameActionBar({ }) {
    let [game] = fs.useWatch("game");
    let [player_stats] = fs.useWatch('player_stats');
    let stats = player_stats[game.game_slug];

    let index = 2;

    let achievements = [];
    for (let i = 20; i <= 30; i++) {
        achievements.push(
            <AchievementPanel key={'achievement' + i} index={i} name={'Top Dawg'} desc={'Win 5 Games'} value={Math.floor(Math.random() * 6)} maxValue={5} />
        )
    }
    return (
        <HStack w="100%" bgColor="gray.925">
            <HStack>

                {achievements}


            </HStack>

            <HStack

                py="4rem"
                w="100%"
                justifyContent={"center"}
                spacing={["6rem", "6rem"]}
                position="relative"
            >
                <PlayerRankInfo />
                <ActionBarItem title={'WINS'} value={stats.win || 0}>
                    <Image
                        display={'inline-block'}
                        src={`${config.https.cdn}icons/diamond.svg`}
                        loading="lazy"
                        title={'WINS'}
                        height="6rem"
                        position="relative"
                        top="0.5rem"

                    />
                </ActionBarItem>

                <ActionBarItem title={'BATTLES'} value={stats.played || 0}>
                    <Image
                        display={'inline-block'}
                        src={`${config.https.cdn}icons/swords4.svg`}
                        loading="lazy"
                        title={'BATTLES'}
                        height="5rem"

                    />
                </ActionBarItem>


            </HStack>

        </HStack>
    );
}

