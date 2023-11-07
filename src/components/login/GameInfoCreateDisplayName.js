import { Text, Box, Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack, Link as ChLink, HStack, Wrap, Divider } from "@chakra-ui/react";

import fs from 'flatstore';
import { useEffect, useRef, useState } from "react";
import { createTempUser, loginComplete } from "../../actions/person";
import FSGGroup from "../widgets/inputs/FSGGroup";
import FSGSubmit from "../widgets/inputs/FSGSubmit";
import FSGTextInput from "../widgets/inputs/FSGTextInput";

import { FaFacebook, FaGithub, FaMicrosoft, FaGoogle } from '@react-icons';
import { Link, useHistory, useLocation, useNavigate } from "react-router-dom";
import { wsJoinQueues } from '../../actions/connection';
import { getJoinQueues } from "../../actions/queue";


import {
    FacebookLoginButton,
    GoogleLoginButton,
    GithubLoginButton,
    MicrosoftLoginButton,
    YahooLoginButton
} from "react-social-login-buttons";

function GameInfoCreateDisplayname(props) {

    const onClose = props.onClose;
    const isOpen = props.isOpen;
    const onOpen = props.onOpen;

    let defaultPlayerName = "Player" + Math.round(Math.random() * 10000);

    const [displayName, setDisplayName] = useState(defaultPlayerName);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    let joinqueues = getJoinQueues();

    let queues = joinqueues.queues || [];
    let isJoiningQueues = queues.length > 0;

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
    joinButtonTitle = 'Join'

    return (
        <Box>
            <Modal borderRadius="2rem" size={'2xl'} isOpen={props.isOpen || props.isCreateDisplayName} onClose={(e) => {
                fs.set('isCreateDisplayName', false);
                onClose(e);
            }}>
                <ModalOverlay />
                <ModalContent borderRadius="2rem" bgColor="gray.800">
                    <ModalHeader color="gray.20" fontWeight={'light'} textAlign={"center"} fontSize="xs" pb="0">Enter Player Name</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <VStack spacing="1rem">
                            {/* <FSGGroup bgColor="gray.1100"> */}

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
                                // helpText={'This is a temporary acount, login to make it permanent'}
                                />

                                {
                                    hasError && (
                                        <Text color="red.600">
                                            {error.message}
                                        </Text>
                                    )
                                }
                                {/* </FSGGroup> */}
                                <FSGSubmit px={'2rem'} pb="1rem" bgColor={'brand.600'} py="2rem" color="white" fontSize="md" fontWeight="bold" borderRadius="2rem" onClick={onSubmit} title={joinButtonTitle} loadingText="Joining" />
                            </VStack>
                            <Divider pt={'0'} pb="1rem" />
                            <Heading pt="0" mt="0" color="white" fontWeight="light" fontSize="xs">Or, sign in to remember and continue your battle</Heading>
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

                            {/* <HStack w={['100%']} justifyItems={'center'} gap="0"> */}
                            {/* Google */}
                            {/* <ChLink href={"/login/google" + refPath} isExternal _hover={{ textDecoration: 'none' }} textDecoration={"none"} p="2rem"
                                    height="4.5rem"
                                    display="flex"
                                    flexDir={"row"}
                                    bgColor="gray.800"
                                    borderRadius="2rem"
                                    color="gray.100"
                                    boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                                    justifyContent="center" alignItems={'center'}>
                                    <FaGoogle size="2rem" />
                                    <Text fontSize="sm" fontWeight={'bold'} pl="0.5rem">Google</Text>

                                </ChLink> */}

                            {/* Microsoft */}
                            {/* <ChLink href={"/login/microsoft" + refPath} isExternal _hover={{ textDecoration: 'none' }} textDecoration={"none"} p="2rem"
                                    height="4.5rem"
                                    display="flex"
                                    flexDir={"row"}
                                    bgColor="gray.800"
                                    borderRadius="2rem"
                                    color="gray.100"
                                    boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                                    justifyContent="center" alignItems={'center'}>
                                    <FaMicrosoft size="2rem" />
                                    <Text fontSize="sm" fontWeight={'bold'} pl="0.5rem">Microsoft</Text>

                                </ChLink>
                            </HStack>
                            <HStack w={['100%']}> */}
                            {/* Facebook */}
                            {/* <ChLink href={"/login/facebook" + refPath} isExternal _hover={{ textDecoration: 'none' }} textDecoration={"none"} p="2rem"
                                    height="4.5rem"
                                    display="flex"
                                    flexDir={"row"}
                                    bgColor="gray.800"
                                    borderRadius="2rem"
                                    color="gray.100"
                                    boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                                    justifyContent="center" alignItems={'center'}>

                                    <FaFacebook size="2rem" />
                                    <Text fontSize="sm" fontWeight={'bold'} pl="0.5rem">Facebook</Text>

                                </ChLink> */}

                            {/* GitHub */}
                            {/* <ChLink href={"/login/github" + refPath} isExternal _hover={{ textDecoration: 'none' }} textDecoration={"none"} p="2rem"
                                    height="4.5rem"
                                    display="flex"
                                    flexDir={"row"}
                                    bgColor="gray.800"
                                    borderRadius="2rem"
                                    color="gray.100"
                                    boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                                    justifyContent="center" alignItems={'center'}>
                                    <FaGithub size="2rem" />
                                    <Text fontSize="sm" fontWeight={'bold'} pl="0.5rem">GitHub</Text>

                                </ChLink>
                            </HStack> */}
                        </VStack>


                    </ModalBody>

                    <ModalFooter>
                        {/* <Button variant='ghost' mr={3} onClick={(e) => {
                            fs.set('isCreateDisplayName', false);
                            onClose(e);
                        }}>
                            Close
                        </Button> */}

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default fs.connect(['isCreateDisplayName'])(GameInfoCreateDisplayname);