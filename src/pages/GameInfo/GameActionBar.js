import { HStack } from '@chakra-ui/react';
import { GameActiveAchievements } from './GameAchievements.jsx';
import GameStats from './GameStats.jsx';
export default function GameActionBar({ }) {


    return (
        <HStack pt={['2rem',]} pb="2rem" flexWrap={'wrap'} w="100%" height="100%" bgColor="gray.925" alignItems={'flex-start'} justifyContent={'center'} spacing={['4rem', '4rem', '4rem', '4rem']}>


            <GameStats />


        </HStack>
    );
}

