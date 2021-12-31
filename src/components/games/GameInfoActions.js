import { Flex, Center, Wrap, Button, IconButton, HStack, VStack, Icon, Text, Box, Menu, MenuButton, MenuList, MenuItem, Link, Tooltip, useToast, useShortcut } from '@chakra-ui/react'


import { FaThumbsUp, FaThumbsDown, FaGithub, IoWarningSharp } from '@react-icons';
import { useState } from 'react';

import { rateGame, reportGame } from '../../actions/game';
// import { WarningIcon } from '@chakra-ui/icons';


function GameInfoActions(game) {

    const toast = useToast();

    const [liked, setLiked] = useState(game.vote == true);
    const [disliked, setDisliked] = useState(game.vote == false);
    const [votes, setVotes] = useState(game.votes);
    const [report, setReport] = useState(game.report);

    const onLike = async () => {

        if (liked) {
            return;
        }
        let result = await rateGame(game.game_slug, true, liked ? true : disliked ? false : null);
        if (result.ecode) {
            toast({
                title: "[" + error.ecode + "] Liking failed, please try again.",
                duration: "3000"
            })
            return;
        }

        setVotes(result.votes);
        setLiked(true);
        setDisliked(false);

    }

    const onDislike = async () => {

        if (disliked) {
            return;
        }
        let result = await rateGame(game.game_slug, false, liked ? true : disliked ? false : null);
        if (result.ecode) {
            toast({
                title: "[" + error.ecode + "] Disliking failed, please try again.",
                duration: "3000"
            })
            return;
        }

        setVotes(result.votes);
        setLiked(false);
        setDisliked(true);

    }

    const onReport = async (type) => {
        let result = await reportGame(game.game_slug, type);
        if (result.ecode) {
            toast({
                title: "[" + result.ecode + "] Disliking failed, please try again.",
                duration: "3000",
                status: "error"
            })
            return;
        }

        toast({
            title: "Report received.  Investigation will follow.  Thank you.",
            duration: "3000",
            status: "success"
        })

        setReport(type);
    }


    return (

        <Flex wrap={'wrap'} spacing="0" alignItems={['center', 'center', 'left']} justifyContent={['center', 'center', 'left']}>
            <HStack spacing="0">
                <HStack h='100%' spacing="0.5rem" pr="1rem">
                    <Tooltip label="Yes">
                        <IconButton icon={<FaThumbsUp />} onClick={onLike} color={liked ? 'brand.100' : 'white'} />
                    </Tooltip>
                    <Text color="white" fontSize={'1.2rem'} fontWeight={'500'}>{votes}</Text>
                    <Tooltip label="No">
                        <IconButton icon={<FaThumbsDown />} onClick={onDislike} color={disliked ? 'red.300' : 'white'} />
                    </Tooltip>
                </HStack>
                {/* <HStack spacing="0" pr="1rem" alignContent={'center'} alignItems={'center'}>
                    <Text lineHeight={'1.2rem'} color="white" fontWeight={'500'} fontSize={['1.2rem']} >{game.count || 0}</Text>
                    <Text lineHeight={'1.2rem'} color="white" fontSize={['1rem']} pl={'0.4rem'}>PLAYING</Text>

                </HStack> */}
            </HStack>
            <HStack spacing="0">
                <Tooltip label="Discuss issues on GitHub">
                    <HStack spacing="0.2rem" pr="1rem" alignContent={'center'}>

                        <Icon color="white" as={FaGithub} fontSize={'1.2rem'} />
                        <Text color="white"><Link target="_blank" href={`https://github.com/acosgames/${game.game_slug}/issues`}>DISCUSS</Link></Text>

                    </HStack>
                </Tooltip>
                <Box alignContent={'right'} >

                    <Menu>
                        <MenuButton as={Button} color={"gray.500"} size="sm" variant="clear" p={0}>
                            <HStack spacing="0.2rem" alignContent={'center'}>
                                <Icon as={IoWarningSharp} fontSize="1.2rem" />
                                <Text as="span" color="gray.500">{report > 0 ? 'REPORTED' : 'REPORT'}</Text>
                            </HStack>

                        </MenuButton>
                        <MenuList>
                            <MenuItem
                                color={report == 1 ? 'red.300' : 'white'}
                                onClick={() => {
                                    onReport(1)
                                }}>Does not work</MenuItem>
                            <MenuItem
                                color={report == 2 ? 'red.300' : 'white'}
                                onClick={() => {
                                    onReport(2)
                                }}>Inappropriate</MenuItem>
                            <MenuItem
                                color={report == 3 ? 'red.300' : 'white'}
                                onClick={() => {
                                    onReport(3)
                                }}>Spam</MenuItem>
                        </MenuList>
                    </Menu>
                </Box>
            </HStack>
        </Flex>


    )
}

export default GameInfoActions;