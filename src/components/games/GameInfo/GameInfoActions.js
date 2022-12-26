import { Flex, Center, Wrap, Button, IconButton, HStack, VStack, Icon, Text, Box, Menu, MenuButton, MenuList, MenuItem, Link, Tooltip, useToast, useShortcut } from '@chakra-ui/react'
import config from '../../../config'
import { FaThumbsUp, FaThumbsDown, FaGithub, IoWarningSharp, IoShareSocial } from '@react-icons';
import { useState } from 'react';

import { rateGame, reportGame } from '../../../actions/game';
// import { WarningIcon } from '@chakra-ui/icons';
import fs from 'flatstore';

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

    const onShareClick = () => {
        if (navigator.share) {

            navigator.share({
                title: 'Play ' + game.name + ' on acos.games!',
                text: game.shortdesc,
                url: config.https.api + '/g/' + game.game_slug
            }).then(() => {
                gtag('event', 'gameshare', { game_slug: game.game_slug });
                console.log('Thanks for sharing!');
            })
                .catch(console.error);
        } else {
            // shareDialog.classList.add('is-open');
        }
    }

    return (

        <Flex wrap={'wrap'} alignItems={['center', 'center', 'left']} justifyContent={['center', 'center', 'left']} >
            <HStack spacing="1rem" wrap={['wrap', 'wrap', 'nowrap']}>
                <Button
                    p="1rem"
                    boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 7%), inset 0 2px 2px 0 rgb(0 0 0 / 15%), inset 0 0 3px 5px rgb(0 0 0 / 2%), 2px 2px 4px 0 rgb(0 0 0 / 12%)`}
                    height="4.5rem"
                    minWidth="4.5rem"
                    bgColor="gray.1200"
                    borderRadius="2rem"
                    textAlign={"center"}
                    //boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 20%), inset 0 2px 2px 0 rgb(0 0 0 / 28%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                    onClick={onShareClick}

                >
                    <HStack spacing="2px" color={"gray.100"} lineHeight={'4.5rem'} justifyContent="center" alignItems={"center"}>
                        <IoShareSocial size="2.3rem" />
                    </HStack>

                    {/* <Text color="gray.100" fontWeight={"bold"} lineHeight="1.4rem" fontSize={['xxs', 'xxs', 'xs']}></Text> */}
                </Button>

                <HStack w='100px' spacing="0.5rem"
                    p="1rem"
                    height="4.5rem"
                    bgColor="gray.1200"
                    borderRadius="2rem"
                    boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 7%), inset 0 2px 2px 0 rgb(0 0 0 / 15%), inset 0 0 3px 5px rgb(0 0 0 / 2%), 2px 2px 4px 0 rgb(0 0 0 / 12%)`}
                    //boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                    justifyContent="center"
                >

                    <Tooltip label="Great!">
                        <IconButton width="2.4rem" height="2.4rem" icon={<FaThumbsUp />} onClick={onLike} color={liked ? 'brand.100' : 'gray.100'} />
                    </Tooltip>
                    <Text color="gray.100" fontSize={'xs'} fontWeight={"bold"} px="0.5rem">{votes}</Text>
                    <Tooltip label="Bad!">
                        <IconButton width="2.4rem" height="2.4rem" icon={<FaThumbsDown />} onClick={onDislike} color={disliked ? 'red.300' : 'gray.100'} />
                    </Tooltip>
                </HStack>
                {/* <HStack spacing="0" pr="1rem" alignContent={'center'} alignItems={'center'}>
                    <Text lineHeight={'1.2rem'} color="white" fontWeight={'500'} fontSize={['1.2rem']} >{game.count || 0}</Text>
                    <Text lineHeight={'1.2rem'} color="white" fontSize={['1rem']} pl={'0.4rem'}>PLAYING</Text>

                </HStack> */}
                <Box
                    p="1rem"
                    height="4.5rem"
                    bgColor="gray.1200"
                    borderRadius="2rem"
                    boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 7%), inset 0 2px 2px 0 rgb(0 0 0 / 15%), inset 0 0 3px 5px rgb(0 0 0 / 2%), 2px 2px 4px 0 rgb(0 0 0 / 12%)`}
                //boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 20%), inset 0 2px 2px 0 rgb(0 0 0 / 28%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                >


                    <Tooltip label="Discuss issues on GitHub">
                        <Link _hover={{ textDecor: 'none' }} textDecoration={'none'} target="_blank" href={`https://github.com/acosgames/${game.game_slug}/issues`} height="1.4rem">
                            <HStack h="100%" w="100%" spacing="4px" color="gray.100" alignItems={"center"} justifyContent="center">

                                <Icon height="3rem" as={FaGithub} />


                                <Text textDecoration={'none'} as="span" fontSize={['xxs', 'xxs', 'xs']} fontWeight={"bold"} >DISCUSS</Text>


                            </HStack>
                        </Link>
                        {/* <Text color="white" fontSize="xs" lineHeight={"1.3rem"}>
                        
                            <Icon color="white" as={FaGithub} fontSize={'1.6rem'} />DISCUSS
                        </Link>
                    </Text> */}

                    </Tooltip>
                </Box>
                <Box alignContent={'right'} ml="1rem">

                    <Menu>
                        <MenuButton as={Button} variant="clear"
                            p="1rem"
                            minWidth="4.5rem"
                            height="4.5rem"
                            bgColor="gray.1200"
                            borderRadius="2rem"
                            textAlign={"center"}
                            boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 7%), inset 0 2px 2px 0 rgb(0 0 0 / 15%), inset 0 0 3px 5px rgb(0 0 0 / 2%), 2px 2px 4px 0 rgb(0 0 0 / 12%)`}
                        //boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 20%), inset 0 2px 2px 0 rgb(0 0 0 / 28%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                        >


                            <HStack spacing="2px" color={"gray.100"} lineHeight={'4.5rem'} justifyContent="center" alignItems={"center"}>
                                <Icon size="2.3rem" as={IoWarningSharp} p="0" />
                            </HStack>


                            {/* <HStack spacing="0.2rem" alignContent={'center'}>
                                <Icon as={IoWarningSharp} fontSize="1.6rem" />
                                <Text as="span" fontSize="xs" color="gray.500">{report > 0 ? 'REPORTED' : 'REPORT'}</Text>
                            </HStack> */}

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
        </Flex >


    )
}

export default GameInfoActions;