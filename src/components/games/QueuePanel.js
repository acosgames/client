import React, { Component, useEffect, useState } from "react";

import config from '../../config';

// import { useSpring, animated } from 'react-spring';
import fs from 'flatstore';
import { wsLeaveQueue } from "../../actions/connection";
import { HStack, Text, VStack, Center, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Input, Button, Box, Badge, Divider, FormLabel, Switch, Spacer, useToast, Checkbox, Icon, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, Wrap, WrapItem, PopoverFooter, Tooltip } from "@chakra-ui/react";
import LoaderLineUp from '../widgets/loaders/LoaderLineUp';
import LoaderShimmer from '../widgets/loaders/LoaderShimmer';
import { IoPersonAddSharp, IoCloseSharp, IoShareSocial, IoNotificationsOffSharp, IoNotificationsSharp } from '@react-icons'
import { subscribeUser } from '../../subscription';

function NotifySwitch(props) {

    let toast = useToast();

    let defaultIsNotify = localStorage.getItem('notify') || false;
    defaultIsNotify = JSON.parse(defaultIsNotify);
    let [checked, setChecked] = useState(defaultIsNotify);

    const notSupported = () => {
        toast({
            description: 'Notifications are not supported on your device.',
            status: 'error',
            position: 'top-right'
        })
        setChecked(false);
        localStorage.setItem('notify', false);
    }

    const noPermission = () => {
        toast({
            description: 'You must grant notification permission.',
            status: 'error',
            position: 'top-right'
        })
        setChecked(false);
        localStorage.setItem('notify', false);
    }

    const onNotifyClick = async (e) => {
        let isChecked = !checked;

        try {


            let supported = await subscribeUser(isChecked)
            let permissionGranted = Notification.permission === 'granted';
            if (!permissionGranted) {
                noPermission();
                return;
            }
            if (!supported) {
                notSupported();
                return;
            }

            setChecked(isChecked);
            localStorage.setItem('notify', isChecked);

            if (isChecked) {
                toast({
                    description: 'Notifications turned ON.',
                    status: 'success',
                    position: 'top-right'
                })
            }
            else {
                toast({
                    description: 'Notifications turned OFF.',
                    status: 'warning',
                    position: 'top-right'
                })
            }



        }
        catch (e) {
            notSupported();
        }


    }

    let NotifIcon = checked ? IoNotificationsSharp : IoNotificationsOffSharp;

    return (
        <Tooltip label="Toggle Notifications" placement="top">
            <Box  >
                <FormLabel htmlFor={'switch-notif'} p="0" m="0" fontSize={['xs', "md"]} >
                    <IconButton
                        bgColor={''}
                        onClick={onNotifyClick}
                        icon={<Icon
                            as={NotifIcon}
                            color={checked ? 'white' : "gray.400"}
                            fontSize="md" />}
                        width={['1.8rem', '2.4rem', "3rem"]}
                        height={['1.8rem', '2.4rem', "3rem"]}
                        isRound="true" />

                    {/* <VStack>
                    <Text as="span" color="gray.300" fontSize="10px"></Text>
                    
                    <Switch colorScheme={'green'} id={'switch-notif'} size="sm" onChange={onScaleChange} isChecked={checked} />
                </VStack> */}
                </FormLabel>
            </Box>
        </Tooltip>
    )
}

function QueueButton(props) {

    return (
        <Box
            p="0.5rem"
            mr="1rem"
            height="3rem"
            bgColor={props.bgColor || 'gray.600'}
            display='flex'
            justifyContent={'center'}
            justifyItems={'center'}
            alignItems={'center'}
        >{props.children}</Box>
    )
}

function InviteToPlayButton(props) {



    const onShareClick = () => {

        let queues = fs.get('queues');
        let user = fs.get('user');

        let queueList = [];
        for (var i = 0; i < queues.length; i++) {
            let queue = queues[i];
            queueList.push(queue.game_slug + '+' + queue.mode);
        }
        if (navigator.share) {

            navigator.share({
                title: user?.displayname + ' is inviting you to play on acos.games!',
                text: 'Jump straight into their queue by clicking here',
                url: config.https.api + '/join/' + queueList.join('+')
            }).then(() => {
                gtag('event', 'inviteshare', { user: user?.displayname });
                console.log('Good luck on the invite!');
            })
                .catch(console.error);
        } else {
            // shareDialog.classList.add('is-open');
        }
    }

    let checked = true;

    return (
        <Tooltip label="Send invite to your friends" placement="top">
            <Box>
                <IconButton
                    bgColor={''}
                    onClick={onShareClick}
                    icon={<Icon
                        as={IoPersonAddSharp}
                        color={checked ? 'white' : "gray.400"}
                        fontSize={['xs', 'xs', "md"]} />}
                    // icon={<IoPersonAddSharp />}
                    width={['1.8rem', '2.4rem', "3rem"]}
                    height={['1.8rem', '2.4rem', "3rem"]}
                    // fontSize="xl"
                    isRound="true" />
            </Box>
        </Tooltip>
    )
}

function PlayerCount(props) {
    const abbrevNumber = (num) => {
        if (num > 999999) {
            return (num / 1000000.0).toFixed(1) + "M";
        }
        if (num > 999) {
            return (num / 1000.0).toFixed(1) + "k";
        }
        return num;
    }

    let playerCount = props.playerCount || 0;
    playerCount = abbrevNumber(playerCount);
    return (
        <Text as="span" color={props.color || 'white'} fontSize={props.fontSize || 'md'}>
            {playerCount || 0} player{props.playerCount != 1 ? 's' : ''} online
        </Text>
    )
}

PlayerCount = fs.connect(['playerCount'])(PlayerCount);

function QueuePanel(props) {


    const [isOpen, setOpen] = useState(true);
    const [prevLen, setPrevLen] = useState(0);
    const btnRef = React.useRef()
    let previousQueue = 0;
    let toast = useToast();

    const onOpen = (e) => {
        setOpen(!isOpen);
    }

    const onClose = (e) => {
        setOpen(false);
    }

    const onCancel = (e) => {
        setOpen(false);
        wsLeaveQueue();

        // toast({
        //     description: 'You were removed from all queue(s).',
        //     status: 'warning',
        //     isClosable: true,
        //     position: 'top-right'
        // })
    }

    useEffect(() => {

        if (isOpen)
            return;

        if (prevLen != queues.length && queues.length > 0) {
            setOpen(true);
            setPrevLen(queues.length);
        }


    })

    let queues = props.queues;
    // queues = queues || [];
    let panelClass = isOpen ? 'open' : '';

    if (!queues || queues.length == 0) {
        return (<React.Fragment></React.Fragment>)
    }



    var queueMap = {};
    var gameList = [];
    for (let i = 0; i < queues.length; i++) {
        let queue = queues[i];
        if (!queueMap[queue.game_slug]) {
            queueMap[queue.game_slug] = [];
            gameList.push(queue.game_slug);
        }
        queueMap[queue.game_slug].push(queue.mode);
    }

    let games = fs.get('games') || {};


    // <Button ref={btnRef} bg="gray.900" onClick={onClick} variant='outline'>
    //                 </Button>

    return (
        <Box maxWidth="25rem" h="100%">
            <VStack

                // position="fixed"
                // top={['0.25rem', '0.25rem', "0.5rem"]}
                // width={['6rem', '6rem', "7rem"]}
                w="100%"
                px="1rem"
                pt={["0.25rem", "0.25rem", "0.5rem"]}
                height={['3.5rem', '4.5rem', "5.0rem"]}
                align="center"
                justifyItems={'center'}
                alignContent="center"
                // transform='translateX(-50%)'
                // left="50%"
                // bgColor="gray.1000"
                zIndex={99}
            >

                <HStack
                    borderRadius={'30px'}
                    position="relative"
                    bgColor={'gray.900'}
                    // boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 28%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                    height={['2.5rem', '3.5rem', "4.0rem"]}
                    w="100%"
                    justifyContent={'flex-start'}
                    spacing="0rem">
                    <HStack
                        // position="absolute"
                        // top="0"
                        // left="2rem"
                        ml="1rem"
                        height="100%"
                        spacing="1rem"
                        justifySelf='flex-start'
                    >

                        <NotifySwitch />
                        <InviteToPlayButton />
                    </HStack>
                    <Box flex="1" px={['1rem', '1rem', "2rem"]}>
                        <Popover
                            // width="100px"
                            isOpen={isOpen}
                            onOpen={onOpen}
                            onClose={onClose}>
                            <PopoverTrigger
                            // width="100px"
                            >
                                <VStack cursor={'pointer'}>

                                    <Text
                                        className="blink_me"
                                        as="span"
                                        display="inline-block"
                                        fontSize={['2xs', 'xxs', "xs"]}
                                        color="white"
                                        position="relative"
                                        top={['0.5rem', '0']}
                                        fontWeight={'bold'} height="100%">
                                        Searching
                                    </Text>
                                    <LoaderLineUp />
                                </VStack>
                            </PopoverTrigger>
                            <PopoverContent mb="2rem" _focus={{ outline: 'none' }}>
                                <PopoverArrow />
                                <PopoverCloseButton onClick={onClose} />
                                <PopoverHeader
                                    h="3rem"
                                    lineHeight={'3rem'}
                                    bgColor="gray.800"
                                    pt="0">
                                    <Text h="3rem"
                                        lineHeight={'3rem'}
                                        as="span"
                                        fontSize="sm"
                                        fontWeight="bolder"
                                        color="gray.150"
                                    >
                                        Queues
                                    </Text>
                                </PopoverHeader>
                                <PopoverBody bgColor={'gray.900'}>
                                    <VStack divider={<Divider />} spacing="0.2rem">
                                        {
                                            gameList.map(game_slug => {
                                                let modes = queueMap[game_slug]
                                                let game = games[game_slug] || null;
                                                let title = game?.name || game_slug;
                                                return (
                                                    <HStack key={'queueitem-' + game_slug}>
                                                        <Text color="white" as="span" fontSize="xs" fontWeight={'bold'}>{title}</Text>
                                                        <HStack>
                                                            {
                                                                modes.map(m => (
                                                                    <Badge fontSize="2xs" title={m} key={game_slug + "-" + m + "-mode"}>{m}</Badge>
                                                                ))
                                                            }
                                                        </HStack>
                                                    </HStack>
                                                )
                                            })
                                        }
                                    </VStack>
                                </PopoverBody>
                                {/* <PopoverFooter>
                                    <PlayerCount color="gray.300" />
                                </PopoverFooter> */}
                            </PopoverContent>
                        </Popover>
                    </Box>

                    {/* <VStack
                        position="absolute"
                        top="0"
                        right="3rem"
                        height="100%"
                        justifyContent={'center'}
                        justifyItems={'center'}
                        alignContent={'center'}
                        spacing="0"
                        display={['none', 'none', 'flex']}
                    >

                        <Text fontSize="xxs" color="gray.200">In {queues.length} queues</Text>
                        <PlayerCount fontSize="xxs" color="gray.400" />
                    </VStack> */}
                    <Box w="6rem">
                        <Tooltip label="Leave Queue" placement="top">
                            <IconButton float="right" mr="1rem" bgColor={'gray.800'} onClick={onCancel} icon={<IoCloseSharp />} size="sm" isRound="true" />
                        </Tooltip>
                    </Box>
                </HStack>


            </VStack>
        </Box>
    )
}

export default fs.connect(['queues'])(QueuePanel);