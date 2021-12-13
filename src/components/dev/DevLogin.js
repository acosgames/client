import { Component, Fragment, useState } from "react";
import fs from 'flatstore';

import {
    withRouter,
} from "react-router-dom";
import {
    Button, Text, chakra, Heading, VStack, Center,
    Link,
    useToast,
    IconButton,
    HStack,
} from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { FiDownload, FiRefreshCw } from "react-icons/fi";
import { sendGithubInvite } from "../../actions/devgame";
import SLink from "../widgets/SLink";

function DevLogin(props) {

    const [sentInvite, setSentInvite] = useState(false);
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


    let showInvite = ((user && !user.isdev) || !sentInvite);
    let showLogin = (!user || !user.github);
    return (
        <Center>
            <VStack align="center" w={['100%', '80%', '70%', '70%', '30%']}>
                <Heading>Login to GitHub to start</Heading>
                <Text as="p">
                    Join our GitHub Organization at <Link fontWeight="bold" isExternal href="https://github.com/fivesecondgames">fivesecondgames</Link> and start creating and publishing games instantly.
                    In the future, the org will be used to manage issues, code, and other purposes.
                </Text>

                {showInvite && (
                    <Button
                        onClick={onInvite}
                        w={"full"}
                        justifyContent={"left"}
                        variant={"outline"}
                        leftIcon={<FiDownload />} >
                        <Text>Send GitHub invite for 'fivesecondgames' organization</Text>
                    </Button>
                )}

                {sentInvite && (
                    <chakra.a target="_blank" href="https://github.com/orgs/fivesecondgames/invitation" w="full">
                        <Button
                            w={"full"}
                            justifyContent={"left"}
                            variant={"outline"}
                            leftIcon={<FiDownload />} >
                            <Text>Accept invite to 'fivesecondgames' organization</Text>
                        </Button>
                    </chakra.a>
                )}

                {showLogin && (
                    <chakra.a href="/login/github?ref=/dev" w="full">
                        <Button w={'full'} justifyContent="left" variant={'outline'} leftIcon={<FaGithub size="24px" />}>

                            <Text pl="1rem">Sign in with github</Text>

                        </Button>
                    </chakra.a>
                )}

                {sentInvite && (
                    <Link href="/login/github?ref=/dev">
                        <HStack>
                            <IconButton icon={<FiRefreshCw />} size="lg" isRound="true" />
                            <Text>Login again to access Developer Zone</Text>
                        </HStack>
                    </Link>
                )}
            </VStack>
        </Center>
    )

}

export default withRouter(fs.connect(['user'])(DevLogin));