
import {
    Link,
    withRouter,
} from "react-router-dom";

import config from '../../config'

import { findQueue } from '../../actions/queue';
import fs from 'flatstore';
import { useEffect } from "react";
import { VStack, Image, Text, HStack, Icon, Button, Tooltip, Box } from "@chakra-ui/react";

import { FaPlay, GiCheckMark, IoPeople } from '@react-icons';
import { getUser, login } from "../../actions/person";
import { joinGame } from "../../actions/game";
import { setLastJoinType } from "../../actions/room";
import { validateLogin } from "../../actions/connection";

function GameListItem(props) {

    const game = props.game;

    const handleJoin = async () => {

        setLastJoinType('rank');

        if (!validateLogin()) {
            return;
        }

        joinGame(game);
    }


    const abbrevNumber = (num) => {
        if (num > 999999) {
            return (num / 1000000.0).toFixed(1) + "M";
        }
        if (num > 999) {
            return (num / 1000.0).toFixed(1) + "k";
        }
        return num;
    }

    const handleClick = () => {
        // fs.set('game', game);
        props.history.push("/g/" + game.game_slug);
    }

    var imgUrl = config.https.cdn + 'placeholder.png';
    if (game.preview_images && game.preview_images.length > 0)
        imgUrl = `${config.https.cdn}g/${game.game_slug}/preview/${game.preview_images}`;

    let gameName = game.name;
    if (gameName.length > 20) {
        gameName = gameName.substr(0, 20) + '...';
    }

    let gameQueueCount = game.queueCount;


    let inQueue = findQueue(game.game_slug);
    return (

        <VStack
            // bgColor={'blacks.900'}
            // boxShadow={'0px 0px 4px 0.4px rgb(255 255 255 / 5%)'}
            borderRadius={'6px 6px 6px 6px'}
            w={['8rem', '14rem', '18rem', '18rem']}
            pl="2px"
            pr="2px"
            cursor="pointer"
            pt="0"
            spacing="0"
            key={game.game_slug} position="relative"

        >



            <Link to={'/g/' + game.game_slug}>
                <Image
                    borderRadius={'6px'}
                    w={['8rem', '14rem', '18rem', '18rem']}
                    minW={['8rem', '14rem', '18rem', '18rem']}
                    h={['8rem', '14rem', '18rem', '18rem']}
                    minH={['8rem', '14rem', '18rem', '18rem']}
                    alt={gameName}
                    src={imgUrl}
                    transition="transform 0.4s ease"
                    transform={'transform:scale(1)'}
                    _hover={{ transform: 'scale(1.05)' }}
                // fallbackSrc={config.https.cdn + 'placeholder.png'}
                />
            </Link>

            <VStack pt="0.8125rem" pb="" pl="0.5rem" pr="0.5rem" width="100%" alignItems={'flex-start'} spacing='0'>


                {/* <HStack alignSelf={'flex-start'} flex="1" alignItems={'flex-end'}> */}
                <Link to={'/g/' + game.game_slug} display="block">
                    <Text
                        as="h4"
                        fontSize={['xxs', "xs", 'sm']}
                        fontWeight={''}
                        color={'white'}
                        w="100%"
                        h="2.4rem"
                        p="0"
                        lineHeight="2.4rem"
                        // pt="0.5rem"
                        // pb="0.5rem"

                        m="0"
                        textOverflow={'ellipsis'}
                        overflow="hidden"
                        whiteSpace={'nowrap'}
                    // textAlign={'center'}
                    // alignSelf={'flex-end'}
                    >{gameName}</Text>
                </Link>

                {/* </HStack> */}
                {/* 
                <Box mt="0" height="3.2rem" overflow="hidden">
                    <Text as="h5" mt="0" p="0" lineHeight="1.6rem" fontSize={['sm']} fontWeight="light">{game.shortdesc}</Text>

                </Box> */}

                {/* <Box>
                <PlayButton inQueue={inQueue} handleJoin={handleJoin} />
            </Box> */}

                {/* <Link to={'/g/' + game.game_slug} >
                <Text as="span" fontWeight={'light'} fontSize="xs" display={game.queueCount > 0 ? 'inline-block' : 'none'} color={'yellow.100'}>
                    <strong>{gameQueueCount}</strong> player(s) waiting
                </Text>
            </Link> */}
                <HStack spacing="4px" color="gray.100" pb="1rem">
                    <Icon fontSize={['2xs', 'xxs', 'xs']} as={IoPeople} />
                    <Text fontSize={['2xs', 'xxs', 'xs']} fontWeight={'light'}>{abbrevNumber(game.maxplayers)} player</Text>
                </HStack>
            </VStack>

        </VStack>
        // <div className="game-item" >

        //     <div className="game-title"><span></span></div>
        //     <div className="game-attributes">
        //         <ul>
        //             <li>
        //                 <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 0 24 24" width="24px" fill="#ccc"><path d="M0 0h24v24H0V0z" fill="none" /><path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z" /></svg>
        //                 <span>{abbrevNumber(game.activePlayers * game.maxplayers)}</span>
        //             </li>
        //         </ul>
        //     </div>
        // </div>
    )
}

function PlayButton(props) {
    return (
        <>
            <Button
                display={props.inQueue ? 'none' : 'flex'}
                flex="1"
                bgColor='gray.800'
                _hover={{ bg: "gray.800" }}
                _active={{ bg: "gray.800" }}
                size="md"
                mr="0"
                w="30%"
                p="0.5rem"
                // position="absolute"
                // top="-10px"
                // right="-10px"
                // icon={<FaPlay />}
                borderTopLeftRadius={"9999px"}
                borderBottomLeftRadius={"9999px"}

                borderTopRightRadius={'9999px'}
                borderBottomRightRadius={'9999px'}
                onClick={props.handleJoin}
            >
                <Icon color={'white'} ml={0} fontSize="12px" as={FaPlay} />
            </Button>
            <Tooltip label={`In queue`}>
                <Button
                    display={props.inQueue ? 'flex' : 'none'}
                    flex="1"
                    bgColor='gray.800'
                    _hover={{ bg: "gray.800" }}
                    _active={{ bg: "gray.800" }}
                    size="md"
                    mr="0"
                    w="30%"
                    p="0.5rem"
                    // position="absolute"
                    // top="-10px"
                    // right="-10px"
                    // icon={<FaPlay />}
                    borderTopLeftRadius={"9999px"}
                    borderBottomLeftRadius={"9999px"}

                    borderTopRightRadius={'9999px'}
                    borderBottomRightRadius={'9999px'}
                >
                    <Icon color={'brand.500'} ml={0} fontSize="20px" as={GiCheckMark} />
                </Button>
            </Tooltip>
        </>
    )
}

export default withRouter(fs.connect(['queues'])(GameListItem));