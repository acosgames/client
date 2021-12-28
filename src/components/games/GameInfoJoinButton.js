import { Flex, Box, Text, Button, HStack, Icon, Menu, MenuButton, MenuList, MenuItem, Link, Tooltip, VStack } from '@chakra-ui/react'


// import { FaCaretDown } from "@react-icons/all-files/fa/FaCaretDown";
// import { FaPlay } from "@react-icons/all-files/fa/FaPlay";

import { FaCaretDown, FaPlay } from '@react-icons';

import { joinGame } from "../../actions/game";
import fs from 'flatstore';

function GameInfoJoinButton(props) {

    const handleJoin = () => {
        //let game_slug = props.match.params.game_slug;
        let game = fs.get('game');
        if (!game)
            return

        joinGame(game);
    }

    const handleJoinBeta = () => {
        //let game_slug = props.match.params.game_slug;
        let game = fs.get('game');
        if (!game)
            return

        joinGame(game, true);
    }

    let user = fs.get('user');
    let player_stats = fs.get('player_stats');
    let game = fs.get('game');
    let playerGameStats = player_stats[game.game_slug];




    let isValidUser = user && user.shortid;

    let version = props.version || 0;
    let latest_version = props.latest_version || 0;
    let hasExtra = version < latest_version;

    let rating = props.played >= 10 ? '(' + props.rating + ')' : '';
    let ratingTxt = props.played >= 10 ? props.ratingTxt : 'UNRANKED';
    ratingTxt = ratingTxt.toUpperCase();

    if (props.played >= 10 && playerGameStats.ranking == 1)
        ratingTxt = 'SUPREME GRAND MASTER';

    // hasExtra = false;

    return (
        <VStack w="full" spacing="0">
            <HStack
                display={isValidUser ? 'flex' : 'none'}
                transform="perspective(15px) rotateX(1deg)"
                w="90%"
                height="2rem"
                bg="gray.900"
                justifyContent="center"
                zIndex={-1}
            >
                <Text
                    display={props.played >= 10 ? 'block' : 'none'}
                    color="yellow.100"
                    fontSize={['1rem']}
                    fontWeight="bold"
                    lineHeight={'2rem'}
                    align="center">{rating} </Text>
                <Text
                    color="yellow.100"
                    fontSize={['1rem',]}
                    fontWeight={'bolder'}
                    lineHeight="2rem"
                    align="center">{ratingTxt}</Text>
                <Text
                    display={props.played < 10 ? 'block' : 'none'}
                    fontSize={['0.8rem',]}
                    pl="0.5rem"
                    lineHeight="2rem">{props.played || 0} of 10 games remaining</Text>
            </HStack>

            <Flex spacing="0" w="full">

                <Button
                    flex="1"
                    bgColor="brand.500"
                    _hover={{ bg: "brand.600" }}
                    _active={{ bg: "brand.900" }}
                    size="lg"
                    mr="0"
                    w="70%"
                    // icon={<FaPlay />}
                    borderTopLeftRadius={"9999px"}
                    borderBottomLeftRadius={"9999px"}

                    borderTopRightRadius={hasExtra ? 0 : '9999px'}
                    borderBottomRightRadius={hasExtra ? 0 : '9999px'}
                    onClick={handleJoin}
                >
                    <Icon ml={hasExtra ? '65px' : 0} as={FaPlay} />
                </Button>
                <Box display={hasExtra ? 'block' : 'none'}>

                    <Menu m="0" >
                        <MenuButton
                            as={Button}
                            size="lg"
                            borderLeftWidth={'1px'}
                            borderLeftStyle="solid"
                            borderLeftColor="green.300"
                            bgColor={'brand.500'}
                            _hover={{ bg: "brand.600" }}
                            _active={{ bg: "brand.900" }}
                            borderTopLeftRadius={"0"}
                            borderBottomLeftRadius={"0"}
                            borderTopRightRadius={"9999px"}
                            borderBottomRightRadius={"9999px"}
                        >
                            <Icon as={FaCaretDown} mr={1} width="16px" height="16px" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={handleJoinBeta}>Play Experimental</MenuItem>
                            <MenuItem>Create Private Room</MenuItem>
                        </MenuList>
                    </Menu>

                </Box>

            </Flex>

        </VStack >

    )
}

export default GameInfoJoinButton;