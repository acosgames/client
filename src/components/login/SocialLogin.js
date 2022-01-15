import React, { Component, Fragment, useEffect } from "react";
import fs from 'flatstore';

import {
    Link,
    withRouter,
    Redirect,
} from "react-router-dom";
import Logout from "./Logout";
import { Heading, VStack, Button, Center, Text, chakra, useToast } from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaMicrosoft, FaGoogle } from '@react-icons';
import { removeWithExpiry } from "../../actions/cache";
function SocialLogin(props) {

    const toast = useToast();

    useEffect(() => {
        removeWithExpiry('user');
        gtag('event', 'sociallogin');

        let error = fs.get('error');
        if (error) {
            toast({
                title: 'ERROR',
                status: 'error',
                description: error,
            })
        }
    }, []);


    let user = props.user;
    if (user) {
        return <Logout></Logout>
    }

    let refPath = fs.get('refPath');
    if (refPath) {
        refPath = '?ref=' + refPath;
    }
    else {
        refPath = '';
    }

    return (
        <VStack>

            <Heading>Login to Play</Heading>
            <VStack w={['95%', '80%', '50%', '40%']}>
                {/* Google */}
                <chakra.a href={"/login/google" + refPath} w="full">
                    <Button w={'full'} justifyContent="left" variant={'outline'} leftIcon={<FaGoogle size="24px" />}>

                        <Text pl="1rem">Sign in with Google</Text>

                    </Button>
                </chakra.a>

                {/* Microsoft */}
                <chakra.a href={"/login/microsoft" + refPath} w="full" >
                    <Button w={'full'} justifyContent="left" variant={'outline'} leftIcon={<FaMicrosoft size="24px" />}>

                        <Text pl="1rem">Sign in with Microsoft</Text>

                    </Button>
                </chakra.a>

                {/* Facebook */}
                <chakra.a href={"/login/facebook" + refPath} w="full">
                    <Button w={'full'} justifyContent="left" variant={'outline'} leftIcon={<FaFacebook size="24px" />}>

                        <Text pl="1rem">Sign in with Facebook</Text>

                    </Button>
                </chakra.a>

                {/* GitHub */}
                <chakra.a href={"/login/github" + refPath} w="full">
                    <Button w={'full'} justifyContent="left" variant={'outline'} leftIcon={<FaGithub size="24px" />}>

                        <Text pl="1rem">Sign in with GitHub</Text>

                    </Button>
                </chakra.a>
            </VStack>
        </VStack >
    )

}

export default withRouter(fs.connect(['userCheckedLogin'])(SocialLogin));