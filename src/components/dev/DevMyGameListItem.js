import { Box, Image, HStack, VStack, IconButton, Spacer, Text, useClipboard, Icon, Container, StackDivider, Link as ChLink, Wrap, Flex, Tooltip, Switch, Button, Center, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, FormLabel, FormControl, Popover, PopoverTrigger, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody } from "@chakra-ui/react";
import SLink from "../widgets/SLink";
import { useToast } from '@chakra-ui/react'

import config from '../../config'

import { FaGithub, FiCopy, FiHeart, FiUsers, IoCode, IoCodeWorking, IoDocument, IoHelpCircleSharp } from "@react-icons";
import { useEffect, useRef, useState } from "react";
import { deployToProduction } from "../../actions/devgame";
import FSGCopyText from "../widgets/inputs/FSGCopyText";
import { Link } from "react-router-dom";

function DevMyGameListItem(props) {




    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()

    const [version, setVersion] = useState(props.version);





    const toast = useToast()



    const onApproveDeploy = async (e) => {
        let deployedGame = await deployToProduction({ gameid: props.gameid, latest_version: props.latest_version });
        if (!deployedGame) {
            toast({
                title: 'Error trying to deploy',
                description: "There was an error. Please try again.",
                status: 'error',
                duration: 4000,
                isClosable: true,
            })
            setIsOpen(false);
            return;
        }

        toast({
            title: 'Deploy Success!',
            description: "The game version will be propagate in about one (1) hour.",
            status: 'success',
            duration: 30000,
            isClosable: true,
        })

        setVersion(deployedGame.version);
        setIsOpen(false)
    }



    let imgUrl = config.https.cdn + 'placeholder.png';
    if (props.preview_images && props.preview_images.length > 0)
        imgUrl = `${config.https.cdn}${props.game_slug}/preview/${props.preview_images}`;

    return (
        <Box>
            <Flex>
                <Wrap align="stretch" flexGrow={1}>
                    <Flex justifyItems={['left', 'left']}>
                        <Link to={'/dev/game/' + props.gameid}>
                            <Image src={imgUrl} alt={"Icon for " + props.name} minWidth={['72px']} maxW={['72px']} h={['72px']}
                                fallbackSrc={config.https.cdn + 'placeholder.png'}
                            />
                        </Link>

                        <VStack
                            align="stretch"
                            pl="0.5rem"
                        >
                            <Box >
                                <Link to={'/dev/game/' + props.gameid}>
                                    <Text pl={['1rem', '1rem', '0', '0']} align={['left', 'left']} fontSize="2xl" fontWeight="600">{props.name}</Text>
                                </Link>
                            </Box>
                            <Wrap pl="1rem">
                                <HStack pr={['1rem', '2rem', "2rem", "2rem"]}>
                                    <HStack >
                                        <Icon color="gray.500" as={FiUsers} />
                                        <Text color="gray.400">{props.count || 0}</Text>
                                    </HStack>
                                    <HStack>
                                        <Icon color="gray.500" as={FiHeart} />
                                        <Text color="gray.400">{props.votes || 0}</Text>
                                    </HStack>
                                </HStack>
                                <HStack pr={['1rem', '2rem', "2rem", "2rem"]}>
                                    <HStack>
                                        <Icon color="gray.500" as={IoCode} />
                                        <Text color="gray.400">build {version || 0}</Text>
                                    </HStack>
                                    <HStack>
                                        <Icon color="gray.500" as={IoCodeWorking} />
                                        <Text color="gray.400">build {props.latest_version || 0}</Text>
                                    </HStack>
                                </HStack>
                                <HStack pr={['1rem', '1rem', "1rem", "1rem"]}>
                                    <Icon color="gray.500" as={FaGithub} />
                                    <Text color="gray.400"><ChLink target="_blank" href={`https://github.com/acosgames/${props.game_slug}/issues`}>issues</ChLink></Text>
                                </HStack>

                                <HStack>
                                    <Icon color="gray.500" as={IoDocument} />
                                    <Text color="gray.400"><Link to={`/g/${props.game_slug}`}>listing</Link></Text>
                                </HStack>
                            </Wrap>


                        </VStack>
                    </Flex>

                </Wrap >
                <Box display={(version != null && version < props.latest_version) ? 'block' : 'none'}>
                    <VStack justifyContent={'center'}>
                        <Button size="xs" onClick={() => setIsOpen(true)}><Text as="span" color="gray.300">Push to Production</Text></Button>
                        <Text fontSize="xs" color="gray.400">{props.game_slug} - build {props.latest_version}</Text>

                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Deploy to Production
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        Are you sure?  <br />Make sure there are no bugs in your game!
                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme='green' onClick={onApproveDeploy} ml={3}>
                                            Deploy Build {props.latest_version} to Production
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                    </VStack>

                </Box>
            </Flex >
        </Box >
    )
}

export default DevMyGameListItem;