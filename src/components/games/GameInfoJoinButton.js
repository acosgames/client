import { Flex, Box, Button, HStack, Icon, Menu, MenuButton, MenuList, MenuItem, Link, Tooltip } from '@chakra-ui/react'
import { FaCaretDown, FaPlay } from '@react-icons';

import { joinGame } from "../../actions/game";
import fs from 'flatstore';

function GameInfoJoinButton(props) {

    const handleJoin = () => {
        //let game_slug = props.match.params.game_slug;
        let game = fs.get(props.game_slug);
        if (!game)
            return

        joinGame(game);
    }

    const handleJoinBeta = () => {
        //let game_slug = props.match.params.game_slug;
        let game = fs.get(props.game_slug);
        if (!game)
            return

        joinGame(game, true);
    }

    let version = props.version || 0;
    let latest_version = props.latest_version || 0;
    let hasExtra = version < latest_version;
    // hasExtra = false;

    return (
        <Flex spacing="0" w="full">
            <Tooltip label="PLAY RANKED GAME" hasArrow arrowSize={15} placement='top' >
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
            </Tooltip>
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
                        <MenuItem>Create Private Room (¢)</MenuItem>
                    </MenuList>
                </Menu>

            </Box>

        </Flex>

    )
}

export default GameInfoJoinButton;