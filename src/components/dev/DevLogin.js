import { Component, Fragment, useEffect, useState } from "react";
import fs from 'flatstore';

import {
    withRouter,
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
    if (user && user.apikey && user.apikey.length > 0 && user.apikey != 'undefined') {
        return <Fragment></Fragment>
    }

    const loggedIn = fs.get('loggedIn');
    const showInvite = ((user && !user.isdev) || !sentInvite);
    const showLogin = (!user || !user.github);
    return (
        <Center mb="2rem">
            <VStack align="left" w={['100%', '80%', '70%', '70%', '50%']} >
                <Heading w="100%" as="h1" size="xl" mb="2rem">Developer Zone Access</Heading>


                <Text as="p" pb={8} w="100%">
                    Join our GitHub Organization at <Link fontWeight="bold" isExternal href="https://github.com/acosgames">acosgames</Link> and start creating and publishing games instantly.
                    <br /><br />
                    Visit our documentation for more details.
                    <br />
                    <Link isExternal href="https://docs.acos.games" target="_blank">https://docs.acos.games</Link>
                    <br />
                    <br />
                    By signing up, you agree to our <Link href="/privacy">Privacy Policy</Link>
                </Text>

                <HStack>
                    <Icon color={showLogin ? 'yellow.500' : 'green.500'} fontSize="xl" as={showLogin ? FiSquare : FiCheckSquare} />
                    <Heading as="h3" size="md" color="gray.400">Step 1:</Heading>
                    <Heading as="h3" size="md" color="gray.100">Login to GitHub to begin</Heading>
                </HStack>
                <a href="/login/github?ref=/dev" w="full">
                    <Button disabled={!showLogin} w={'full'} justifyContent="left" variant={'outline'} leftIcon={<FaGithub size="24px" />}>

                        <Text fontSize="sm" ml="4rem">Sign in with github</Text>

                    </Button>
                </a>
                <VStack filter={!loggedIn ? "blur(2px)" : ''} align="left" w='100%' position="relative">
                    <Box position="absolute" w="100%" h="100%" display={loggedIn ? 'none' : 'block'} zIndex="2" >
                        &nbsp;
                    </Box>
                    <HStack pt="2rem">
                        <Icon color={!sentInvite ? 'yellow.500' : 'green.500'} fontSize="xl" as={!sentInvite ? FiSquare : FiCheckSquare} />
                        <Heading as="h3" size="md" color="gray.400">Step 2:</Heading>
                        <Heading as="h3" size="md" color="gray.100">Request invite to acosgames organization</Heading>
                    </HStack>

                    <Button

                        onClick={onInvite}
                        w={"full"}
                        justifyContent={"left"}
                        variant={"outline"}
                        leftIcon={<FiDownload />} >
                        <Text fontSize="sm" ml="4rem">Send GitHub invite for 'acosgames' organization</Text>
                    </Button>

                    <HStack pt="2rem">
                        <Icon color={!acceptInvite ? 'yellow.500' : 'green.500'} fontSize="xl" as={!acceptInvite ? FiSquare : FiCheckSquare} />
                        <Heading as="h3" size="md" color="gray.400">Step 3:</Heading>
                        <Heading as="h3" size="md" color="gray.100">Accept invite to acosgames organization</Heading>
                    </HStack>
                    <a target="_blank" href="https://github.com/orgs/acosgames/invitation" w="full">
                        <Button
                            onClick={() => {
                                setAcceptInvite(true);
                            }}
                            //disabled={acceptInvite}
                            w={"full"}
                            justifyContent={"left"}
                            variant={"outline"}
                            leftIcon={<FiDownload />} >
                            <Text fontSize="sm" ml="4rem">Accept invite to 'acosgames' organization</Text>
                        </Button>
                    </a>

                    <HStack pt="2rem">
                        <Icon color={'yellow.500'} fontSize="xl" as={FiSquare} />
                        <Heading as="h3" size="md" color="gray.400">Step 4:</Heading>
                        <Heading as="h3" size="md" color="gray.100">Re-login to get access</Heading>
                    </HStack>
                    <Link href="/login/github?ref=/dev">
                        <HStack>
                            <Button
                                onClick={async () => {
                                    await logout();
                                    setAcceptInvite(true);
                                }}
                                //disabled={acceptInvite}
                                w={"full"}
                                justifyContent={"left"}
                                variant={"outline"}
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

export default withRouter(fs.connect(['user'])(DevLogin));