import { Flex, Box, Text, Button, HStack, Icon, Menu, MenuButton, MenuList, MenuItem, Link, Tooltip, VStack, useDisclosure, Image } from '@chakra-ui/react'
import { FaCaretDown, FaPlay, AiTwotoneExperiment, IoSunny } from '@react-icons';

import fs from 'flatstore';
import { useEffect } from 'react';

import { getUser, login } from '../../actions/person';
import { joinGame } from "../../actions/game";
import { getLastJoinType, setLastJoinType } from '../../actions/room';
import { validateLogin } from '../../actions/connection';

import config from '../../config'
import RatingText from 'shared/util/ratingtext';

fs.set('isCreateDisplayName', false);

function GameInfoJoinButton(props) {



    const handleJoin = async () => {
        setLastJoinType('rank');

        if (!(await validateLogin()))
            return;

        //let game_slug = props.match.params.game_slug;
        let game = fs.get('game');
        if (!game)
            return

        joinGame(game);
    }

    const handleJoinBeta = async () => {

        setLastJoinType('experimental');

        if (!(await validateLogin()))
            return;
        //let game_slug = props.match.params.game_slug;
        let game = fs.get('game');
        if (!game)
            return

        joinGame(game, true);
    }

    useEffect(() => {
        // if (!props.justCreatedName)
        //     return;

        // let lastJoin = getLastJoinType();
        // switch (lastJoin) {
        //     case 'rank':
        //         handleJoin();
        //         break;
        //     case 'experimental':
        //         handleJoinBeta();
        //         break;
        //     // default:
        //     //     handleJoin();
        //     //     break;
        // }
    })

    let user = fs.get('user');
    let player_stats = fs.get('player_stats');
    let game = fs.get('game');
    let playerGameStats = player_stats[game.game_slug];




    let isValidUser = user && user.shortid;
    let hasRankLeaderboard = game.maxplayers > 1;

    let version = props.version || 0;
    let latest_version = props.latest_version || 0;
    let hasExtra = version < latest_version;

    let myrating = props.rating;
    // myrating = 1200;
    let myplayed = props.played;
    // myplayed = 12;

    let rating = myplayed >= 10 ? '' + myrating + '' : ' ';
    let ratingTxt = myplayed >= 10 ? RatingText.ratingToRank(rating) : 'UNRANKED';
    ratingTxt = ratingTxt.toUpperCase();

    // if (myplayed >= 10 && playerGameStats.ranking == 1)
    //     ratingTxt = 'YOU ARE KING';

    hasExtra = true;


    return (
        <VStack
            w="full"
            spacing="1rem"
        //pt={hasRankLeaderboard ? '0' : '1rem'}
        //p="1rem"
        //borderRadius="2rem"
        //bgColor="gray.900"
        //boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 20%), inset 0 2px 2px 0 rgb(0 0 0 / 28%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
        >
            <HStack spacing="0" w="full">

                <Button
                    flex="1"
                    bgColor="brand.600"
                    _hover={{ bg: "brand.700" }}
                    _active={{ bg: "brand.800" }}
                    size="lg"
                    mr="0"
                    w="100%"
                    h={['4rem', '4rem', "4rem"]}
                    // icon={<FaPlay />}
                    borderTopLeftRadius={"9999px"}
                    borderBottomLeftRadius={"9999px"}
                    boxShadow={`inset 0 1px 3px 0 rgb(255 255 255 / 60%), inset 0 0 3px 5px rgb(0 0 0 / 5%)`}
                    //boxShadow={`inset 0 1px 3px 0 rgb(255 255 255 / 60%), inset 0 0 3px 5px rgb(0 0 0 / 5%)`}
                    borderTopRightRadius={'9999px'}
                    borderBottomRightRadius={'9999px'}
                    onClick={handleJoin}
                >
                    {/* <Text as="span" pr="1rem">LET'S GO</Text> */}
                    <Icon
                        // ml={0}
                        color="white"
                        //ml={hasExtra ? '65px' : 0}
                        as={FaPlay}
                        height={["1rem", "1.6rem"]}
                        width={["1rem", "1.6rem"]} />
                </Button>
                {/* <Box display={hasExtra ? 'block' : 'none'} h={['4rem', '4rem', "4rem"]}>

                    <Menu m="0" >
                        <MenuButton
                            as={Button}
                            size="lg"
                            h={['4rem', '4rem', "4rem"]}
                            borderLeftWidth={'1px'}
                            borderLeftStyle="solid"
                            borderLeftColor="green.500"
                            verticalAlign={'top'}
                            bgColor={'brand.500'}
                            _hover={{ bg: "brand.600" }}
                            _active={{ bg: "brand.900" }}
                            borderTopLeftRadius={"0"}
                            borderBottomLeftRadius={"0"}
                            borderTopRightRadius={"9999px"}
                            borderBottomRightRadius={"9999px"}
                            color={'white'}
                            boxShadow={`inset 0 1px 3px 0 rgb(255 255 255 / 60%), inset 0 0 3px 5px rgb(0 0 0 / 5%)`}
                        >
                            <Icon as={FaCaretDown} mr={1} width="16px" height="16px" />
                        </MenuButton>
                        <MenuList boxShadow={'0 4px 8px rgba(0,0,0,0.4),0 0px 4px rgba(0,0,0,0.4)'} border="0" borderRadius="8px" p="1rem">
                            <MenuItem icon={<IoSunny fontSize={'2.5rem'} />} onClick={handleJoinBeta}>Play Casual</MenuItem>
                        </MenuList>
                    </Menu>

                </Box> */}

            </HStack>

            <Text pt={'0.5rem'} as="span" fontWeight={'light'} fontSize="xs" display={game.queueCount > 0 ? 'inline-block' : 'none'} color={'yellow.100'}>
                <strong>{game.queueCount}</strong> player(s) waiting
            </Text>
        </VStack >

    )
}

export default fs.connect(['player_stats'])(GameInfoJoinButton);