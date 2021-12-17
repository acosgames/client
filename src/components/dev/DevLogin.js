import { Component, Fragment, useState } from "react";
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

import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FiCheckSquare } from "@react-icons/all-files/fi/FiCheckSquare";
import { FiDownload } from "@react-icons/all-files/fi/FiDownload";
import { FiRefreshCw } from "@react-icons/all-files/fi/FiRefreshCw";
import { FiSquare } from "@react-icons/all-files/fi/FiSquare";


// import { FaGithub, FiCheckSquare, FiDownload, FiRefreshCw, FiSquare } from "@react-icons";

import { sendGithubInvite } from "../../actions/devgame";
import SLink from "../widgets/SLink";

function DevLogin(props) {

    const [sentInvite, setSentInvite] = useState(false);
    const [acceptInvite, setAcceptInvite] = useState(false);
    const toast = useToast();

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
                <Heading as="h1" size="xl" mb="2rem">Developer Zone Access</Heading>


                <Text as="p">
                    Join our GitHub Organization at <Link fontWeight="bold" isExternal href="https://github.com/fivesecondgames">fivesecondgames</Link> and start creating and publishing games instantly.
                    In the future, the org will be used to manage issues, code, and other purposes.
                </Text>

                <HStack>
                    <Icon color={showLogin ? 'yellow.500' : 'green.500'} fontSize="xl" as={showLogin ? FiSquare : FiCheckSquare} />
                    <Heading as="h3" size="md" color="gray.100">Step 1:</Heading>
                    <Heading as="h3" size="md" color="gray.400">Login to GitHub to begin</Heading>
                </HStack>
                <a href="/login/github?ref=/dev" w="full">
                    <Button disabled={!showLogin} w={'full'} justifyContent="left" variant={'outline'} leftIcon={<FaGithub size="24px" />}>

                        <Text ml="4rem">Sign in with github</Text>

                    </Button>
                </a>
                <VStack filter={!loggedIn ? "blur(2px)" : ''} align="left" w='100%' position="relative">
                    <Box position="absolute" w="100%" h="100%" display={loggedIn ? 'none' : 'block'} zIndex="2" >
                        &nbsp;
                    </Box>
                    <HStack pt="2rem">
                        <Icon color={!sentInvite ? 'yellow.500' : 'green.500'} fontSize="xl" as={!sentInvite ? FiSquare : FiCheckSquare} />
                        <Heading as="h3" size="md" color="gray.100">Step 2:</Heading>
                        <Heading as="h3" size="md" color="gray.400">Request invite to fivesecondgames organization</Heading>
                    </HStack>

                    <Button

                        onClick={onInvite}
                        w={"full"}
                        justifyContent={"left"}
                        variant={"outline"}
                        leftIcon={<FiDownload />} >
                        <Text ml="4rem">Send GitHub invite for 'fivesecondgames' organization</Text>
                    </Button>

                    <HStack pt="2rem">
                        <Icon color={!acceptInvite ? 'yellow.500' : 'green.500'} fontSize="xl" as={!acceptInvite ? FiSquare : FiCheckSquare} />
                        <Heading as="h3" size="md" color="gray.100">Step 3:</Heading>
                        <Heading as="h3" size="md" color="gray.400">Accept invite to fivesecondgames organization</Heading>
                    </HStack>
                    <a target="_blank" href="https://github.com/orgs/fivesecondgames/invitation" w="full">
                        <Button
                            onClick={() => {
                                setAcceptInvite(true);
                            }}
                            //disabled={acceptInvite}
                            w={"full"}
                            justifyContent={"left"}
                            variant={"outline"}
                            leftIcon={<FiDownload />} >
                            <Text ml="4rem">Accept invite to 'fivesecondgames' organization</Text>
                        </Button>
                    </a>

                    <HStack pt="2rem">
                        <Icon color={'yellow.500'} fontSize="xl" as={FiSquare} />
                        <Heading as="h3" size="md" color="gray.100">Step 4:</Heading>
                        <Heading as="h3" size="md" color="gray.400">Re-login to get access</Heading>
                    </HStack>
                    <Link href="/login/github?ref=/dev">
                        <HStack>
                            <Button
                                onClick={() => {
                                    setAcceptInvite(true);
                                }}
                                //disabled={acceptInvite}
                                w={"full"}
                                justifyContent={"left"}
                                variant={"outline"}
                                leftIcon={<FiRefreshCw />} >
                                <Text ml="4rem">Login again to access Developer Zone</Text>
                            </Button>

                        </HStack>
                    </Link>
                </VStack>

            </VStack>
        </Center>
    )

}

export default withRouter(fs.connect(['user'])(DevLogin));