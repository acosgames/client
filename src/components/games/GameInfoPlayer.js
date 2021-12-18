import { Flex, Box, Button, HStack, Text, Icon, Menu, MenuButton, MenuList, MenuItem, Link, Tooltip } from '@chakra-ui/react'


// import { FaCaretDown } from "@react-icons/all-files/fa/FaCaretDown";
// import { FaPlay } from "@react-icons/all-files/fa/FaPlay";

import { FaCaretDown, FaPlay } from '@react-icons';

import { joinGame } from "../../actions/game";
import fs from 'flatstore';
import { getUser } from '../../actions/person';




function GameInfoPlayer(game) {


    let user = game.user;
    if (!user) {
        return <></>
    }

    let ratingTxt = game.played < 10 ? 'Unranked' : game.rating;
    return (
        <Flex spacing="0" w="100%">

            <HStack>
                <Text>{ratingTxt}</Text>
            </HStack>

        </Flex>

    )
}

export default fs.connect(['user'])(GameInfoPlayer);