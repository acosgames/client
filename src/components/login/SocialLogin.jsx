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

import {
    FacebookLoginButton,
    GoogleLoginButton,
    GithubLoginButton,
    MicrosoftLoginButton,
    YahooLoginButton
} from "react-social-login-buttons";

function SocialLoginSimple(props) {

    let refPath = fs.get('refPath');
    if (refPath) {
        refPath = '?ref=' + refPath;
    }
    else {
        refPath = '';
    }

    let user = fs.get('user');

    return (
        <VStack>

            {/* <Heading color="gray.300" pt={'0rem'} pb={'0.5rem'} size="sm">Or, login to save your temporary account</Heading> */}

            <Heading pt="0" mt="0" color="white" fontWeight="bold" fontSize="md">Sign in to remember and continue your battle</Heading>
            <Heading pt="0" mt="0" color="yellow.100" fontWeight="bold" fontSize="md">{user.displayname}</Heading>
            <Heading pt="0" mt="0" color="gray.100" fontSize="xs" pb="1rem" fontWeight={'light'}>By signing in, you agree to our <Link to="/privacy">Privacy Policy</Link></Heading>
            {/* <Heading color="gray.300" pt={'0rem'} pb={'0.5rem'} size="sm">Save your name and track your stats.</Heading> */}

            <VStack w="100%" maxWidth="22rem">
                <FacebookLoginButton
                    size="2.4rem"
                    iconSize="1.4rem"

                    style={{ fontSize: '1.2rem' }}
                    onClick={() => {
                        window.location.href = ('/login/facebook' + refPath);
                    }} />
                <GoogleLoginButton
                    size="2.4rem"
                    iconSize="1.4rem"
                    style={{ fontSize: '1.2rem' }}
                    onClick={() => {
                        window.location.href = ('/login/google' + refPath);
                    }} />
                <GithubLoginButton
                    size="2.4rem"
                    iconSize="1.4rem"
                    style={{ fontSize: '1.2rem' }}
                    onClick={() => {
                        window.location.href = '/login/github' + refPath;
                    }} />
                <MicrosoftLoginButton
                    size="2.4rem"
                    iconSize="1.4rem"
                    style={{ fontSize: '1.2rem' }}
                    onClick={() => {
                        window.location.href = ('/login/microsoft' + refPath);
                    }} />
            </VStack>
        </VStack>
    )

}


function SocialLogin(props) {

    const onClose = props.onClose;
    const isOpen = props.isOpen;
    const onOpen = props.onOpen;

    let defaultPlayerName = "Player" + Math.round(Math.random() * 10000);
    const [displayName, setDisplayName] = useState(defaultPlayerName);
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


    let loginFrom = fs.get('loginFrom');
    let joinButtonTitle = "Play now!";
    let game = fs.get('game');
    if (loginFrom == 'game') {
        if (game?.maxplayers == 1) {
            joinButtonTitle = 'Join Game';
        } else {
            joinButtonTitle = 'Join Queue';
        }
    }


    return (
        <VStack w="100%" justifyContent={'center'}>



            <VStack width={["100%", "80%", "80%", "60%"]}>
                <Heading align={'left'} color="white" size="lg">Enter Player Name</Heading>

                <VStack spacing="1rem">
                    <VStack spacing="1rem">
                        <FSGTextInput
                            onChange={onChange}
                            maxLength="32"
                            titleColor="gray.100"
                            // title="Pick Name"
                            borderRadius="2rem"
                            bgColor="gray.1200"
                            height="4rem"
                            focus={true}
                            onFocus={(e) => {
                                e.target.select();
                            }}
                            value={displayName}
                            onKeyDown={onKeyDown}
                        />

                        {
                            hasError && (
                                <Text color="red.600">
                                    {error.message}
                                </Text>
                            )
                        }
                        {/* </FSGGroup> */}
                        <FSGSubmit px={'2rem'} pb="1rem" py="2rem" color="white" fontSize="md" fontWeight="bold" borderRadius="2rem" onClick={onSubmit} title={joinButtonTitle} loadingText="Joining" />
                    </VStack>
                    <br />
                    {/* <Divider pt={'0'} pb="1rem" /> */}
                    <Heading pt="0" mt="0" color="white" fontWeight="bold" fontSize="xs">Or, sign in to remember and continue your battle</Heading>
                    <Heading pt="0" mt="0" color="gray.100" fontSize="2xs" pb="1rem" fontWeight={'light'}>By signing in, you agree to our <Link to="/privacy">Privacy Policy</Link></Heading>
                    {/* <Heading color="gray.300" pt={'0rem'} pb={'0.5rem'} size="sm">Save your name and track your stats.</Heading> */}

                    <VStack w="100%" maxWidth="22rem">
                        <FacebookLoginButton
                            size="2.4rem"
                            iconSize="1.4rem"

                            style={{ fontSize: '1.2rem' }}
                            onClick={() => {
                                window.location.href = ('/login/facebook' + refPath);
                            }} />
                        <GoogleLoginButton
                            size="2.4rem"
                            iconSize="1.4rem"
                            style={{ fontSize: '1.2rem' }}
                            onClick={() => {
                                window.location.href = ('/login/google' + refPath);
                            }} />
                        <GithubLoginButton
                            size="2.4rem"
                            iconSize="1.4rem"
                            style={{ fontSize: '1.2rem' }}
                            onClick={() => {
                                window.location.href = '/login/github' + refPath;
                            }} />
                        <MicrosoftLoginButton
                            size="2.4rem"
                            iconSize="1.4rem"
                            style={{ fontSize: '1.2rem' }}
                            onClick={() => {
                                window.location.href = ('/login/microsoft' + refPath);
                            }} />
                    </VStack>


                </VStack>
            </VStack>


        </VStack>
    )
}


export default (fs.connect(['userCheckedLogin', 'user'])(SocialLogin));