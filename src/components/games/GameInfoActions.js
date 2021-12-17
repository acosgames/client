import { Flex, Center, Wrap, Button, IconButton, HStack, VStack, Icon, Text, Box, Menu, MenuButton, MenuList, MenuItem, Link, Tooltip, useToast, useShortcut } from '@chakra-ui/react'
import { FiUsers, FaThumbsUp, FaThumbsDown, FaGithub, IoWarningSharp } from '@react-icons';
import { useState } from 'react';

import { rateGame, reportGame } from '../../actions/game';


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
        <Center>
            <Flex wrap={'wrap'} alignItems={'center'} justifyContent={'center'} pt="1rem">
                <HStack spacing="2rem" pr="1.5rem" pb="1rem">
                    <HStack h='100%' pr={[0]}>
                        <Tooltip label="Yes">
                            <IconButton icon={<FaThumbsUp />} onClick={onLike} color={liked ? 'brand.500' : 'white'} />
                        </Tooltip>
                        <Text>{votes}</Text>
                        <Tooltip label="No">
                            <IconButton icon={<FaThumbsDown />} onClick={onDislike} color={disliked ? 'red.300' : 'white'} />
                        </Tooltip>
                    </HStack>
                    <HStack ml="1.5rem">
                        {/* <Icon color="gray.300" fontSize={['sm', 'md']} as={FiUsers} /> */}
                        <Text color="white" fontSize={['sm', 'md']}>{game.count || 0} PLAYING</Text>

                    </HStack>
                </HStack>
                <HStack pb="1rem">
                    <Tooltip label="Discuss issues on GitHub">
                        <HStack>

                            <Icon color="white" as={FaGithub} />
                            <Text color="white"><Link target="_blank" href={`https://github.com/fivesecondgames/${game.game_slug}/issues`}>DISCUSS</Link></Text>

                        </HStack>
                    </Tooltip>
                    <Box alignContent={'right'}>

                        <Menu>
                            <MenuButton as={Button} color={"gray.500"} size="sm" variant="clear">
                                <HStack spacing="0.2rem">
                                    <Icon as={IoWarningSharp} />
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
        </Center>


    )
}

export default GameInfoActions;