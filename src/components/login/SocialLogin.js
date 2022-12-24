import React, { Component, Fragment, useEffect, useState } from "react";
import fs from 'flatstore';

import {
    Link,
    Redirect,
    useHistory,
    useNavigate
} from "react-router-dom";
import Logout from "./Logout";
import { Heading, VStack, Button, Center, Text, chakra, Link as ChLink, useToast, Modal, Box, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Divider, HStack, ModalFooter } from "@chakra-ui/react";
import { FaFacebook, FaGithub, FaMicrosoft, FaGoogle } from '@react-icons';
import { removeWithExpiry } from "../../actions/cache";
import { createTempUser, loginComplete } from "../../actions/person";
import FSGGroup from "../widgets/inputs/FSGGroup";
import FSGTextInput from "../widgets/inputs/FSGTextInput";
import FSGSubmit from "../widgets/inputs/FSGSubmit";
function SocialLoginSimple(props) {

    let refPath = fs.get('refPath');
    if (refPath) {
        refPath = '?ref=' + refPath;
    }
    else {
        refPath = '';
    }
    return (
        <VStack>

            <Heading color="gray.100" pt={'1rem'} pb="0" size="md">Login to reserve your name</Heading>
            {/* <Heading color="gray.300" pt={'0rem'} pb={'0.5rem'} size="sm">Or, login to save your temporary account</Heading> */}

            <VStack justifyContent={'center'} width="100%" height="100%">

                <VStack w={['15rem']} justifyItems={'center'} gap="0">
                    {/* Google */}
                    <ChLink href={"/login/google" + refPath} w="100%">
                        <Button w="100%" height="5rem" color="white" justifyContent="left" variant={'outline'} leftIcon={<FaGoogle size="24px" />}>

                            <Text color="gray.100" fontWeight="300" fontSize="md" pl="0.2rem">Google</Text>

                        </Button>
                    </ChLink>

                    {/* Microsoft */}
                    <ChLink href={"/login/microsoft" + refPath} w="100%">
                        <Button w="100%" height="5rem" color="white" justifyContent="left" variant={'outline'} leftIcon={<FaMicrosoft size="24px" />}>

                            <Text color="gray.100" fontWeight="300" fontSize="md" pl="0.2rem">Microsoft</Text>

                        </Button>
                    </ChLink>
                    {/* Facebook */}
                    <ChLink href={"/login/facebook" + refPath} w={'100%'}>
                        <Button w="100%" height="5rem" color="white" justifyContent="left" variant={'outline'} leftIcon={<FaFacebook size="24px" />}>

                            <Text color="gray.100" fontWeight="300" fontSize="md" pl="0.2rem">Facebook</Text>

                        </Button>
                    </ChLink>

                    {/* GitHub */}
                    <ChLink href={"/login/github" + refPath} w={'100%'}>
                        <Button w="100%" height="5rem" color="white" justifyContent="left" variant={'outline'} leftIcon={<FaGithub size="24px" />}>

                            <Text color="gray.100" fontWeight="300" fontSize="md" pl="0.2rem">GitHub</Text>

                        </Button>
                    </ChLink>
                </VStack>
            </VStack>
        </VStack>
    )

}


function SocialLogin(props) {

    const onClose = props.onClose;
    const isOpen = props.isOpen;
    const onOpen = props.onOpen;

    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);

    const toast = useToast();
    const history = useNavigate();
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
    })

    const onSubmit = async () => {


        if (!displayName || displayName.length < 3) {
            setError({ message: `The name '${displayName}' is too short.` });
            return;
        }

        let user = await createTempUser(displayName);

        if (!user) {
            setError({ message: `Server not working. Please try again.` });
            return;
        }

        if (user.ecode) {

            switch (user.ecode) {
                case 'E_PERSON_EXISTSNAME':
                    setError({ message: `You already have a display name.` });

                    break;
                case 'E_EXISTS_DISPLAYNAME':
                    setError({ message: `The name '${displayName}' already exists.` });
                    break;
                case 'E_PERSON_DUPENAME':
                    setError({ message: `The name '${displayName}' already exists.` });
                    break;
                case 'E_MISSING_DISPLAYNAME':
                    setError({ message: `Please enter a display name.` });
                    break;
                case 'E_DISPLAYNAME_TOOSHORT':
                    setError({ message: `The name '${displayName}' is too short.` });
                    break;
                default:
                    setError({ message: `[${user.ecode}] Server not working. Please try again.` });
                    break;
            }
        }
        else {

            // fs.set('user')
            // setTimeout(redirect, 1000);
            loginComplete();

            history('/login/success');
        }

    }

    const onChange = (e) => {
        console.log(e.target.value);
        let name = e.target.value;
        name = name.replace(/[^A-Za-z0-9\_]/ig, '');
        setDisplayName(name);
        localStorage.setItem('displayname', name);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    }

    let hasError = (error);

    let refPath = fs.get('refPath');
    if (refPath) {
        refPath = '?ref=' + refPath;
    }
    else {
        refPath = '';
    }

    const user = fs.get('user');
    if (user && user.id) {
        return <SocialLoginSimple />
    }

    return (
        <VStack w="100%" justifyContent={'center'}>



            <VStack width={["100%", "80%", "80%", "60%"]}>
                <Heading align={'left'} size="lg">asdfChoose a player name</Heading>
                <FSGGroup  bgColor="gray.1200">

                    <FSGTextInput
                        onChange={onChange}
                        maxLength="32"
                        title="Player Name"
                        focus={true}
                        value={displayName}
                        onKeyDown={onKeyDown}
                        helpText={'This is a temporary acount, login to make it permanent'}
                    />

                    {
                        hasError && (
                            <Text color="red.600">
                                {error.message}
                            </Text>
                        )
                    }
                </FSGGroup>
                <FSGSubmit onClick={onSubmit} title="Create" loadingText="Creating" />
                <Divider pt={'1rem'} />
                <Heading color="gray.100" pt={'1rem'} pb="0" size="md">Sign in to reserve your name</Heading>
                <VStack w={['100%']} justifyItems={'center'} gap="0">
                    {/* Google */}
                    <ChLink href={"/login/google" + refPath} w="100%">
                        <Button w="100%" color="gray.300" justifyContent="left" variant={'outline'} leftIcon={<FaGoogle size="24px" />}>

                            <Text color="gray.100" fontWeight="300" fontSize="md" pl="0.2rem">Sign in with Google</Text>

                        </Button>
                    </ChLink>

                    {/* Microsoft */}
                    <ChLink href={"/login/microsoft" + refPath} w="100%">
                        <Button w="100%" color="gray.300" justifyContent="left" variant={'outline'} leftIcon={<FaMicrosoft size="24px" />}>

                            <Text color="gray.100" fontWeight="300" fontSize="md" pl="0.2rem">Sign in with Microsoft</Text>

                        </Button>
                    </ChLink>
                    {/* Facebook */}
                    <ChLink href={"/login/facebook" + refPath} w={'100%'}>
                        <Button w="100%" color="gray.300" justifyContent="left" variant={'outline'} leftIcon={<FaFacebook size="24px" />}>

                            <Text color="gray.100" fontWeight="300" fontSize="md" pl="0.2rem">Sign in with Facebook</Text>

                        </Button>
                    </ChLink>

                    {/* GitHub */}
                    <ChLink href={"/login/github" + refPath} w={'100%'}>
                        <Button w="100%" color="gray.300" justifyContent="left" variant={'outline'} leftIcon={<FaGithub size="24px" />}>

                            <Text color="gray.100" fontWeight="300" fontSize="md" pl="0.2rem">Sign in with GitHub</Text>

                        </Button>
                    </ChLink>
                </VStack>
            </VStack>


        </VStack>
    )
}


export default (fs.connect(['userCheckedLogin', 'user'])(SocialLogin));