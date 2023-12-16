import { Text, Box, Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, VStack, Link as ChLink, HStack, Wrap, Divider, Image, Icon } from "@chakra-ui/react";

import fs from 'flatstore';
import { useEffect, useRef, useState } from "react";
import { createDisplayName, createTempUser, loginComplete } from "../../../actions/person";
import FSGSubmit from "../../../components/widgets/inputs/FSGSubmit";//" widgets/inputs/FSGSubmit";
import FSGTextInput from "../../../components/widgets/inputs/FSGTextInput";

import { MdEdit } from '@react-icons';
import { Link, useHistory, useLocation, useNavigate, useNavigation } from "react-router-dom";
import { wsJoinQueues } from '../../../actions/connection';
import { getJoinQueues } from "../../../actions/queue";
import config from "../../../config";

import {
    FacebookLoginButton,
    GoogleLoginButton,
    GithubLoginButton,
    MicrosoftLoginButton,
    YahooLoginButton
} from "react-social-login-buttons";
import ChooseCountry from "./ChooseCountry";
import { removeWithExpiry } from "../../../actions/cache";

export default function GameInfoCreateDisplayname({ onClose, isOpen, onOpen }) {

    let [user] = fs.useWatch('user');

    let [isCreateDisplayName] = fs.useWatch('isCreateDisplayName');
    let [portraitid] = fs.useWatch('portraitid');

    // const onClose = onClose;
    // const isOpen = isOpen;
    // const onOpen = onOpen;

    let defaultPlayerName = localStorage.getItem('displayname') || ("Player" + Math.round(Math.random() * 10000));

    let [displayname] = fs.useWatch('displayname');
    if (!displayname) {
        displayname = defaultPlayerName;
    }
    // const [displayname, setDisplayName] = useState(defaultPlayerName);
    const [error, setError] = useState(null);

    // const navigate = useNavigate();

    let joinqueues = getJoinQueues();

    let queues = joinqueues.queues || [];
    let isJoiningQueues = queues.length > 0;

    useEffect(() => {
        if (user && !user.displayname && !isCreateDisplayName)
            fs.set('isCreateDisplayName', true);
    })

    const onSubmit = async () => {



        if (!displayname || displayname.length < 3) {
            setError({ message: `The name '${displayname}' is too short.` });
            return;
        }

        // let portraitid = fs.get('portraitid');
        let countryChanged = fs.get('countryChanged') || { label: 'United States of America (USA)', value: 'US' };
        let countrycode = countryChanged.value;

        let user = null;
        let existingUser = fs.get('user');
        if (existingUser && existingUser.email && !existingUser.displayname) {
            user = await createDisplayName({ displayname, portraitid, countrycode })
        }
        else if (!existingUser) {
            user = await createTempUser({ displayname, portraitid, countrycode });
        }
        else {
            setError({ message: `Invalid Account Creation.` });
            return;
        }

        // let user = await createTempUser(displayname);

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
                    setError({ message: `The name '${displayname}' already exists.` });
                    break;
                case 'E_PERSON_DUPENAME':
                    setError({ message: `The name '${displayname}' already exists.` });
                    break;
                case 'E_MISSING_DISPLAYNAME':
                    setError({ message: `Please enter a display name.` });
                    break;
                case 'E_DISPLAYNAME_TOOSHORT':
                    setError({ message: `The name '${displayname}' is too short.` });
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

    portraitid = portraitid || Math.floor(Math.random() * (2104 - 1 + 1) + 1)
    let filename = "assorted-" + portraitid + "-original.webp";

    return (
        <Box>
            <Modal borderRadius="2rem" size={'2xl'} isOpen={isOpen || isCreateDisplayName} onClose={(e) => {
                fs.set('isCreateDisplayName', false);
                onClose(e);
            }}>
                <ModalOverlay />
                <ModalContent bg="linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-800))" borderRadius="2rem" bgColor="gray.800">
                    <ModalHeader color="gray.10" fontWeight={'600'} textAlign={"center"} fontSize="1.6rem" pb="0" py="1rem">
                        {user && !user.email ? 'Save your profile' : 'Create Champion'}
                    </ModalHeader>
                    <ModalCloseButton fontSize="1rem" />
                    <ModalBody >
                        <VStack spacing="1rem" w="100%">
                            {/* <FSGGroup bgColor="gray.1100"> */}

                            <VStack display={user && !user.email ? 'none' : 'flex'} spacing="0rem" w="100%">
                                <HStack w="100%" alignItems={'flex-start'} spacing="1rem">
                                    <Box
                                        w="8rem"
                                        role="group"
                                        position="relative"

                                        transition="all 0.2s ease"
                                        cursor="pointer"
                                        _hover={{
                                            transform: 'scale(1.05)',
                                            zIndex: '1',
                                        }}>
                                        <Box position="absolute" bottom="0" right="0" >
                                            <Icon
                                                fontSize="2rem"
                                                color="gray.100"
                                                bgColor="rgba(0,0,0,0.5)"
                                                p="0.25rem"
                                                borderRadius={'8px'}
                                                as={MdEdit}
                                                position="relative"
                                                zIndex="2"
                                                _groupHover={{
                                                    color: 'gray.0'
                                                }}
                                                onClick={() => { fs.set('isChoosePortrait', true); fs.set('isCreateDisplayName', false); }}
                                            />

                                        </Box>
                                        <Image
                                            onClick={() => { fs.set('isChoosePortrait', true); fs.set('isCreateDisplayName', false); }}
                                            fallbackSrc={config.https.cdn + 'placeholder.png'}
                                            display="inline-block"
                                            src={`${config.https.cdn}images/portraits/${filename}`}
                                            loading="lazy"
                                            borderRadius={"8px"}
                                            width={["100%"]}
                                            transition="all 0.2s ease"
                                            boxShadow={'0 0 12px var(--chakra-colors-gray-1000)'}
                                            // border='2px solid'
                                            // borderColor="transparent"
                                            _groupHover={{

                                                // border: '2px solid',
                                                // borderColor: 'brand.600'
                                            }}
                                        />

                                    </Box>
                                    <VStack flex="1" w="100%">
                                        <FSGTextInput
                                            onChange={onChange}
                                            maxLength="32"
                                            titleColor="gray.100"
                                            // title="Pick Name"
                                            borderRadius="8px"
                                            bgColor="gray.600"
                                            height="4rem"
                                            focus={true}
                                            onFocus={(e) => {
                                                e.target.select();
                                            }}
                                            _placeholder={{
                                                color: 'gray.200'
                                            }}
                                            color="gray.0"
                                            fontWeight="600"
                                            value={displayname}
                                            onKeyDown={onKeyDown}
                                            boxShadow={'0 0 12px var(--chakra-colors-gray-1000)'}
                                        // helpText={'This is a temporary acount, login to make it permanent'}
                                        />

                                        <ChooseCountry />
                                    </VStack>

                                </HStack>
                                {
                                    hasError && (
                                        <Text color="red.600">
                                            {error.message}
                                        </Text>
                                    )
                                }
                                {/* </FSGGroup> */}
                                <FSGSubmit _hover={{
                                    border: "4px solid",
                                    borderColor: "brand.300",
                                    bgColor: 'brand.300',
                                }}
                                    _focus={{
                                        border: "4px solid",
                                        borderColor: "brand.300",
                                        bgColor: 'brand.300',
                                    }}
                                    // _active={{
                                    //     border: "4px solid",
                                    //     borderColor: "brand.300",
                                    //     bgColor: 'gray.800',
                                    // }}
                                    px={'2rem'}
                                    pb="1rem"
                                    border="4px solid"
                                    borderColor="brand.300"
                                    bgColor={'gray.800'}
                                    py="2rem"
                                    color="white"
                                    fontSize="md"
                                    fontWeight="bold"
                                    borderRadius="8px"
                                    onClick={onSubmit}
                                    title={joinButtonTitle}
                                    loadingText="Joining" />
                            </VStack>

                            {/* <Heading color="gray.300" pt={'0rem'} pb={'0.5rem'} size="sm">Save your name and track your stats.</Heading> */}

                            <SocialLoginButtons />

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
        </Box >
    )
}

function updateRefPath(pathname) {
    localStorage.setItem('refPath', pathname);
    fs.set('refPath', pathname);
    removeWithExpiry('user');

    localStorage.setItem('portraitid', fs.get('portraitid'));
}

function SocialLoginButtons() {

    const location = useLocation();
    let refPath = location.pathname;


    let [user] = fs.useWatch('user');
    if (user && user.email && !user.displayname) {
        return <></>
    }

    return (
        <>
            <Divider pt={'0'} pb="1rem" />
            <Heading pt="0" mt="0" color="white" fontWeight="light" fontSize="xs">Sign In and access more features for free.</Heading>
            <Heading pt="0" mt="0" color="gray.100" fontSize="2xs" pb="1rem" fontWeight={'light'}>By signing in, you agree to our <Link to="/privacy">Privacy Policy</Link></Heading>

            <VStack w="100%" maxWidth="22rem">
                <FacebookLoginButton
                    size="2.4rem"
                    iconSize="1.4rem"

                    style={{ fontSize: '1.2rem' }}
                    onClick={() => {
                        updateRefPath(refPath);
                        window.location.href = ('/login/facebook');
                    }} />
                <GoogleLoginButton
                    size="2.4rem"
                    iconSize="1.4rem"
                    style={{ fontSize: '1.2rem' }}
                    onClick={() => {
                        updateRefPath(refPath);
                        window.location.href = ('/login/google');
                    }} />
                <GithubLoginButton
                    size="2.4rem"
                    iconSize="1.4rem"
                    style={{ fontSize: '1.2rem' }}
                    onClick={() => {
                        updateRefPath(refPath);
                        window.location.href = '/login/github';
                    }} />
                <MicrosoftLoginButton
                    size="2.4rem"
                    iconSize="1.4rem"
                    style={{ fontSize: '1.2rem' }}
                    onClick={() => {
                        updateRefPath(refPath);
                        window.location.href = ('/login/microsoft');
                    }} />
            </VStack>
        </>
    )
}
