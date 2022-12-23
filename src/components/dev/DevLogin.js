import { Component, Fragment, useEffect, useState } from "react";
import fs from 'flatstore';

import {
    Navigate, Route,
} from "react-router-dom";
import {
    Button, Text, Heading, VStack, Center,
    Link,
    useToast,
    IconButton,
    HStack,
    Icon,
    Box,
} from "@chakra-ui/react";


import { FaGithub, FiCheckSquare, FiDownload, FiRefreshCw, FiSquare } from "@react-icons";

import { sendGithubInvite } from "../../actions/devgame";
import SLink from "../widgets/SLink";
import { logout } from "../../actions/person";

function DevLogin(props) {

    const [sentInvite, setSentInvite] = useState(false);
    const [acceptInvite, setAcceptInvite] = useState(false);
    const toast = useToast();

    useEffect(() => {
        gtag('event', 'devlogin');
    }, [])
    const onInvite = async () => {
        let success = await sendGithubInvite();
        if (success) {
            toast({
                title: "Invite sent successfully",
                status: "success",
                duration: 4000
            })
            setSentInvite(true);
        } else {
            toast({
                title: "Invite failed.",
                status: "error",
                duration: 4000
            })
            setSentInvite(false);
        }
    }

    let user = props.user;
    if (user && (user.isdev && user.github)) {

        return <Navigate to="/dev" />
    }
    if (user && user.apikey && user.apikey.length > 0 && user.apikey != 'undefined') {
        return <></>
    }

    if (props.loadingUser) {
        return <></>
    }

    const loggedIn = fs.get('loggedIn');
    const isLoggedIn = loggedIn != 'LURKER';
    const showInvite = ((user && !user.isdev) || !sentInvite);
    const showLogin = (!user || !user.github);

    let step1 = showLogin;
    let step2 = !showLogin && !sentInvite;
    let step3 = sentInvite && !acceptInvite;
    let step4 = acceptInvite;

    return (
        <Center mb="2rem">
            <VStack align="left" w={['100%', '80%', '70%', '70%', '50%']} >
                <Heading w="100%" as="h1" size="xl" mb="2rem">Developer Zone Access</Heading>


                <Text as="p" pb={8} w="100%">
                    Join our GitHub Organization at <Link fontWeight="bold" isExternal href="https://github.com/acosgames">acosgames</Link> and start creating and publishing games instantly.
                    <br /><br />
                    Visit our documentation for more details.
                    <br />
                    <Link isExternal href="https://sdk.acos.games" target="_blank">https://sdk.acos.games</Link>
                    <br />
                    <br />
                    By signing up, you agree to our <Link href="/privacy">Privacy Policy</Link>
                </Text>

                <HStack>
                    <Icon color={step1 ? 'yellow.500' : 'green.500'} fontSize="xl" as={step1 ? FiSquare : FiCheckSquare} />
                    <Heading as="h3" size="md" color="gray.400">Step 1:</Heading>
                    <Heading as="h3" size="md" color="white">Login to GitHub to begin</Heading>
                </HStack>
                <a href="/login/github?ref=/dev" w="full">
                    <Button
                        h="5rem"
                        disabled={!step1}
                        w={'full'}
                        justifyContent="left"
                        bgColor={step1 ? "brand.500" : 'gray.600'}
                        _hover={{ bg: step1 ? "brand.600" : 'gray.700' }}
                        _active={{ bg: step1 ? "brand.900" : 'gray.900' }}
                        leftIcon={<FaGithub
                            size="24px" />}>

                        <Text fontSize="sm" ml="4rem">Sign in with github</Text>

                    </Button>
                </a>
                <VStack filter={step1 ? "blur(2px)" : ''} align="left" w='100%' position="relative">
                    <Box position="absolute" w="100%" h="100%" display={(loggedIn != 'LURKER') ? 'none' : 'block'}  >
                        &nbsp;
                    </Box>
                    <HStack pt="2rem">
                        <Icon color={!sentInvite ? 'yellow.500' : 'green.500'} fontSize="xl" as={!sentInvite ? FiSquare : FiCheckSquare} />
                        <Heading as="h3" size="md" color="gray.400">Step 2:</Heading>
                        <Heading as="h3" size="md" color="white">Request invite to acosgames organization</Heading>
                    </HStack>

                    <Button
                        h="5rem"
                        onClick={onInvite}
                        w={"full"}
                        justifyContent={"left"}
                        bgColor={step2 ? "brand.600" : 'gray.600'}
                        _hover={{ bg: step2 ? "brand.700" : 'gray.700' }}
                        _active={{ bg: step2 ? "brand.900" : 'gray.900' }}
                        leftIcon={<FiDownload />} >
                        <Text fontSize="sm" ml="4rem">Send GitHub invite for 'acosgames' organization</Text>
                    </Button>

                    <HStack pt="2rem">
                        <Icon color={!acceptInvite ? 'yellow.500' : 'green.500'} fontSize="xl" as={!acceptInvite ? FiSquare : FiCheckSquare} />
                        <Heading as="h3" size="md" color="gray.400">Step 3:</Heading>
                        <Heading as="h3" size="md" color="white">Accept invite to acosgames organization</Heading>
                    </HStack>
                    <a target="_blank" href="https://github.com/orgs/acosgames/invitation" w="full">
                        <Button
                            h="5rem"
                            onClick={() => {
                                setAcceptInvite(true);
                            }}
                            //disabled={acceptInvite}
                            w={"full"}
                            justifyContent={"left"}
                            bgColor={step3 ? "brand.600" : 'gray.600'}
                            _hover={{ bg: step3 ? "brand.700" : 'gray.700' }}
                            _active={{ bg: step3 ? "brand.900" : 'gray.900' }}
                            leftIcon={<FiDownload />} >
                            <Text fontSize="sm" ml="4rem">Accept invite to 'acosgames' organization</Text>
                        </Button>
                    </a>

                    <HStack pt="2rem">
                        <Icon color={'yellow.500'} fontSize="xl" as={FiSquare} />
                        <Heading as="h3" size="md" color="gray.400">Step 4:</Heading>
                        <Heading as="h3" size="md" color="white">Re-login to get access</Heading>
                    </HStack>
                    <Link href="/login/github?ref=/dev">
                        <HStack h="5rem">
                            <Button
                                onClick={async () => {
                                    await logout();
                                    setAcceptInvite(true);
                                }}
                                h="5rem"
                                //disabled={acceptInvite}
                                w={"full"}
                                justifyContent={"left"}
                                bgColor={step4 ? "brand.600" : ''}
                                _hover={{ bg: step4 ? "brand.700" : '' }}
                                _active={{ bg: step4 ? "brand.900" : '' }}
                                leftIcon={<FiRefreshCw />} >
                                <Text fontSize="sm" ml="4rem">Login again to access Developer Zone</Text>
                            </Button>

                        </HStack>
                    </Link>
                </VStack>

            </VStack>
        </Center>
    )

}

export default (fs.connect(['user', 'loadingUser'])(DevLogin));