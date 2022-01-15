import React, { Component, useState } from "react";

// import { useSpring, animated } from 'react-spring';
import fs from 'flatstore';
import { wsLeaveQueue } from "../../actions/connection";
import { HStack, Text, VStack, Center, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter, Input, Button, Box, Badge, Divider, FormLabel, Switch, Spacer, useToast } from "@chakra-ui/react";
import LoaderLineUp from '../widgets/loaders/LoaderLineUp';
import LoaderShimmer from '../widgets/loaders/LoaderShimmer';
import { IoCloseSharp } from '@react-icons'

import { subscribeUser } from '../../subscription';

function NotifySwitch(props) {

    let toast = useToast();

    let defaultIsNotify = localStorage.getItem('notify') || false;
    defaultIsNotify = JSON.parse(defaultIsNotify);
    let [checked, setChecked] = useState(defaultIsNotify);

    const notSupported = () => {
        toast({
            description: 'Notifications are not supported on your device.',
            status: 'error'
        })
        setChecked(false);
        localStorage.setItem('notify', false);
    }

    const noPermission = () => {
        toast({
            description: 'You must grant notification permission.',
            status: 'error'
        })
        setChecked(false);
        localStorage.setItem('notify', false);
    }

    const onScaleChange = async (e) => {
        let isChecked = e.target.checked;

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

        }
        catch (e) {
            notSupported();
        }


    }

    return (
        <Box position="absolute" left="0">
            <FormLabel htmlFor={'switch-notif'} p="0" m="0" fontSize="xs" >
                <VStack>
                    <Text as="span" fontSize="xs">Notify</Text>
                    <Switch colorScheme={'green'} pl="0.5rem" id={'switch-notif'} size="sm" onChange={onScaleChange} isChecked={checked} />
                </VStack>
            </FormLabel>
        </Box>
    )
}


function QueuePanel(props) {


    const [isOpen, setOpen] = useState(false);
    const btnRef = React.useRef()

    const onClick = (e) => {
        setOpen(!isOpen);
    }

    const onClose = (e) => {
        setOpen(false);
    }

    const onCancel = (e) => {
        setOpen(false);
        wsLeaveQueue();
    }



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

    return (
        <>
            <Center position="fixed" top="0.5rem" width="50%" align="center" justifyItems={'center'} left="25%">

                <VStack width="100%" spacing="0.2rem">
                    <Button ref={btnRef} bg="gray.900" onClick={onClick} variant='outline'>
                        <Text p="0.3rem" as="span" lineHeight={'1rem'} color="white" fontWeight={'bolder'}>
                            SEARCHING
                        </Text>
                    </Button>
                    <LoaderLineUp />
                </VStack>
                <NotifySwitch />
                <IconButton position="absolute" right="0" onClick={onCancel} icon={<IoCloseSharp />} size="sm" isRound="true" />
            </Center>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Queue</DrawerHeader>

                    <DrawerBody>
                        <VStack divider={<Divider />} spacing="1rem">
                            {
                                gameList.map(game_slug => {
                                    let modes = queueMap[game_slug]
                                    return (
                                        <VStack key={'queueitem-' + game_slug}>
                                            <Text color="brand.100" as="span" fontWeight={'bold'}>{game_slug}</Text>
                                            <HStack>
                                                {
                                                    modes.map(m => (
                                                        <Badge title={m} key={game_slug + "-" + m + "-mode"}>{m}</Badge>
                                                    ))
                                                }
                                            </HStack>
                                        </VStack>
                                    )
                                })
                            }
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default fs.connect(['queues'])(QueuePanel);