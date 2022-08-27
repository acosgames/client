import { Text, Box, Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack, Link as ChLink, HStack, Wrap, Divider } from "@chakra-ui/react";

import fs from 'flatstore';
import { useEffect, useRef, useState } from "react";
import { createTempUser, loginComplete } from "../../actions/person";
import FSGGroup from "../widgets/inputs/FSGGroup";
import FSGSubmit from "../widgets/inputs/FSGSubmit";
import FSGTextInput from "../widgets/inputs/FSGTextInput";

import { FaFacebook, FaGithub, FaMicrosoft, FaGoogle } from '@react-icons';
import { useHistory } from "react-router-dom";
import { wsJoinQueues } from '../../actions/connection';
import { getJoinQueues } from "../../actions/queue";

function GameInfoCreateDisplayname(props) {

    const onClose = props.onClose;
    const isOpen = props.isOpen;
    const onOpen = props.onOpen;

    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);

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

    let joinButtonTitle = "Let's Go!";
    let game = fs.get('game');
    if (loginFrom == 'game') {
        if (game.maxplayers == 1) {
            joinButtonTitle = 'Join Game';
        } else {
            joinButtonTitle = 'Join Queue';
        }
    }


    return (
        <Box>
            <Modal size={'xl'} isOpen={props.isOpen || props.isCreateDisplayName} onClose={(e) => {
                fs.set('isCreateDisplayName', false);
                onClose(e);
            }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login to play</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack>
                            <FSGGroup>

                                <FSGTextInput
                                    onChange={onChange}
                                    maxLength="32"
                                    title="Choose Name"
                                    focus={true}
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
                            </FSGGroup>
                            <FSGSubmit onClick={onSubmit} title={joinButtonTitle} loadingText="Joining" />
                            <Divider pt={'1rem'} />
                            <Heading color="gray.300" pt={'1rem'} pb="1rem" size="xs">Or, sign in to reserve your name</Heading>
                            {/* <Heading color="gray.300" pt={'0rem'} pb={'0.5rem'} size="sm">Save your name and track your stats.</Heading> */}
                            <HStack w={['100%']} justifyItems={'center'} gap="0">
                                {/* Google */}
                                <ChLink href={"/login/google" + refPath} w="50%">
                                    <Button w="100%" color="gray.300" justifyContent="left" variant={'outline'} leftIcon={<FaGoogle size="16px" />}>

                                        <Text color="gray.100" fontSize="xs" pl="0.2rem">Google</Text>

                                    </Button>
                                </ChLink>

                                {/* Microsoft */}
                                <ChLink href={"/login/microsoft" + refPath} w="50%">
                                    <Button w="100%" color="gray.300" justifyContent="left" variant={'outline'} leftIcon={<FaMicrosoft size="16px" />}>

                                        <Text color="gray.100" fontSize="xs" pl="0.2rem">Microsoft</Text>

                                    </Button>
                                </ChLink>
                            </HStack>
                            <HStack w={['100%']}>
                                {/* Facebook */}
                                <ChLink href={"/login/facebook" + refPath} w={'50%'}>
                                    <Button w="100%" color="gray.300" justifyContent="left" variant={'outline'} leftIcon={<FaFacebook size="16px" />}>

                                        <Text color="gray.100" fontSize="xs" pl="0.2rem">Facebook</Text>

                                    </Button>
                                </ChLink>

                                {/* GitHub */}
                                <ChLink href={"/login/github" + refPath} w={'50%'}>
                                    <Button w="100%" color="gray.100" justifyContent="left" variant={'outline'} leftIcon={<FaGithub size="16px" />}>

                                        <Text color="gray.100" fontSize="xs" pl="0.2rem">GitHub</Text>

                                    </Button>
                                </ChLink>
                            </HStack>
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