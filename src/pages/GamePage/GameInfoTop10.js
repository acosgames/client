import { Box, chakra, VStack, Text, Icon, HStack, Grid, GridItem, Tr, Table, Th, Thead, Tbody, Td, Image, Heading } from '@chakra-ui/react';
import fs from 'flatstore';
import { Link } from 'react-router-dom';

import { GiLaurelsTrophy, } from '@react-icons';

import config from '../../config'
import ratingtext from 'shared/util/ratingtext';
import USAFlag from "../../assets/images/flags/USA.svg";

const ChakraLink = chakra(Link);

function GameInfoTop10({ leaderboard, tag, leaderboardCount }) {

    if (!leaderboard) {
        return <Box>
            <Text as="h4">No rankings found.</Text>
        </Box>
    }

    let user = fs.get('user');
    let player_stats = fs.get('player_stats');
    let game = fs.get('game');

    let playerGameStats = player_stats[game.game_slug];

    const renderRankings = (players) => {

        leaderboard = leaderboard || [];
        let elems = [];

        tag = tag || 'default'

        let rank = 0;
        for (var player of leaderboard) {
            rank++;
            let isLocalPlayer = user?.displayname == player.displayname;
            let isPast5Rank = rank == 10 && (playerGameStats && playerGameStats.ranking > 10);

            let displayname = player.displayname;
            if (displayname.length > 16) {
                displayname = displayname.substr(0, 16) + '...';
            }

            let ratingTxt = ratingtext.ratingToRank(Number.parseInt(player.rating));
            let ratingTextFormatted = ratingTxt.toUpperCase();
            let ratingImageFile = ratingTxt.replace(/ /ig, '');
            let rankNumber = ratingtext.ratingToRankNumber(Number.parseInt(player.rating));

            elems.push(
                <Tr
                    _hover={{
                        bgColor: 'gray.850'
                    }}
                    bgColor="gray.800" borderRadius="12px" filter="drop-shadow(2px 2px 2px var(--chakra-colors-gray-1000))">
                    <Td borderLeftRadius="12px" align='center'>
                        <Text textAlign={'center'} color="gray.0" fontSize={['1.4rem', '1.4rem', "2rem"]}>{rank}</Text>
                    </Td>
                    <Td>
                        <HStack>
                            <ChakraLink to={'/profile/' + player.displayname} display="block" position="relative" >
                                <Image
                                    src={`${config.https.cdn}images/portraits/${player.filename.replace(".", "-thumbnail.")}`}
                                    loading="lazy"
                                    w={["4.2rem", "4.2rem", "8.4rem"]}
                                    // pr="0.5rem"
                                    borderRadius={'999px'}
                                // filter={['', '', "drop-shadow(0 0 1px var(--chakra-colors-brand-600))"]}

                                />
                            </ChakraLink>
                            <ChakraLink pl="1rem" to={'/profile/' + player.displayname} display="inline-block" textAlign='center' textOverflow={'ellipsis'}>
                                <Text
                                    as="span"
                                    display="block"
                                    overflow="hidden"
                                    textOverflow={'ellipsis'}
                                    fontSize={["1.4rem", "1.4rem", "2rem"]}
                                    lineHeight={["3.2rem", "3.2rem", "8.4rem"]}
                                    fontWeight={'500'}
                                    color={isLocalPlayer ? "yellow.100" : 'gray.10'}>
                                    {displayname}
                                </Text>
                            </ChakraLink>
                        </HStack>
                    </Td>

                    {/* <Td align='right' display={['none', 'none', 'table-cell']}>
                        

                    </Td> */}
                    <Td borderRightRadius="12px">
                        <HStack justifyContent={'flex-end'}>
                            <HStack justifyContent={'flex-end'} display={['none', 'none', 'flex']}>


                                <Text position="relative"
                                    top="0rem"
                                    as="span"
                                    display={['none', 'none', 'none', 'inline-block']}
                                    // display="inline-block"
                                    color="gray.50"
                                    fontWeight={'light'}
                                    pr="1rem">
                                    {ratingTextFormatted}
                                </Text>
                                <Image
                                    src={`${config.https.cdn}icons/ranks/game/${rankNumber}.webp`}
                                    loading="lazy"
                                    title={ratingTextFormatted}
                                    height={["6rem"]}
                                    position="relative"
                                />
                            </HStack>
                            <Text
                                as="span"
                                display="inline-block"
                                width={["4.5rem", "4.5rem", "6rem"]}
                                fontSize={['1.6rem', '1.6rem', "2rem"]}
                                fontWeight={isLocalPlayer ? 'bold' : '500'}
                                color={isLocalPlayer ? "yellow.100" : 'gray.10'}>
                                {player.rating}

                            </Text>
                        </HStack>
                    </Td>
                </Tr>
            )
        }
        return elems;
    }

    let playerRank = -1;
    for (var player of leaderboard) {
        let isLocalPlayer = user?.displayname == player.value;
        if (isLocalPlayer) {
            playerRank = player.rank;
            break;
        }
    }

    let lbCount = leaderboardCount || 0;
    if (lbCount == 0) {
        return (
            <Box>
                <Text mt='1rem' fontWeight={'bold'}>No rankings yet.</Text>
            </Box>
        )
    }
    return (
        <Box w="100%" pt="0" py="6rem">

            <VStack w="100%" spacing="1rem" alignItems={'flex-start'}>
                <VStack w="100%" alignItems={'center'} _after={{
                    content: '""',
                    display: 'block',
                    clipPath: 'polygon(0% 0%, 100% 0%, 93.846% 100%, 6.154% 100%, 0% 0%)',
                    width: '65px',
                    height: '5px',
                    margin: '0.5rem 0 0',
                    background: 'brand.300',
                }
                }>
                    <Text as="span" color="brand.300" letterSpacing={'2px'} fontWeight={'bold'} fontSize={['1.2rem', '1.2rem', "1.4rem"]}>Top 10</Text>
                    <Heading as="h2" color="gray.0" fontSize={['2.4rem', '2.4rem', "4rem"]} fontWeight={'600'}>Leaderboard</Heading>
                </VStack>


                <Table variant='none' mb={playerRank == -1 ? '1rem' : '0'} width="100%"
                    style={{ borderCollapse: "separate", borderSpacing: "0 1rem", borderColor: 'gray.900' }}
                >
                    <Thead >
                        <Tr
                            //borderBottomColor="gray.600"
                            color="gray.100"
                            fontSize=""
                        >
                            <Th color={'gray.100'} fontSize="md" textAlign={'center'}>
                                Rank
                            </Th>
                            <Th color={'gray.100'} fontSize="md">Player</Th>
                            {/* <Th color={'gray.100'} fontSize="md" textAlign='right' display={['none', 'none', 'table-cell']} pr="3rem"></Th> */}
                            <Th color={'gray.100'} fontSize="md" textAlign='right' pr={["1rem", "1rem", "2rem"]}>Rating</Th>
                        </Tr>
                    </Thead>
                    <Tbody bgColor="gray.900" >
                        {renderRankings()}
                    </Tbody>
                </Table>
                <Box w="100%" display={playerRank == -1 ? 'none' : 'block'} pt="1rem" >
                    <Text fontSize="2rem" align='center' display={lbCount > 0 ? 'block' : 'none'} color="gray.10">Rank <Text as="span" fontWeight='500' color="brand.300">{playerRank || -1}</Text> of <Text as="span" fontWeight='500' >{lbCount}</Text>
                        {/* in
                        <Text as="span" > Rankings</Text> */}
                    </Text>
                </Box>

            </VStack>
        </Box >

    )
}

export default fs.connect(['leaderboard', 'leaderboardCount'])(GameInfoTop10);