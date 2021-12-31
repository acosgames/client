import { Box, Image, HStack, VStack, IconButton, Spacer, Text, useClipboard, Icon, Container, StackDivider, Link, Wrap, Flex, Tooltip, Switch, Button, Center, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, FormLabel, FormControl, Popover, PopoverTrigger, Portal, PopoverContent, PopoverArrow, PopoverHeader, PopoverCloseButton, PopoverBody } from "@chakra-ui/react";
import SLink from "../widgets/SLink";
import { useToast } from '@chakra-ui/react'

import cfg from '../config/config.json';
let config = process.env.NODE_ENV == 'production' ? config.prod : cfg.local;

// import { IoCode } from "@react-icons/all-files/io5/IoCode";
// import { IoCodeWorking } from "@react-icons/all-files/io5/IoCodeWorking";
// import { IoDocument } from "@react-icons/all-files/io5/IoDocument";
// import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
// import { FiCopy } from "@react-icons/all-files/fi/FiCopy";
// import { FiHeart } from "@react-icons/all-files/fi/FiHeart";
// import { FiUsers } from "@react-icons/all-files/fi/FiUsers";
import { FaGithub, FiCopy, FiHeart, FiUsers, IoCode, IoCodeWorking, IoDocument, IoHelpCircleSharp } from "@react-icons";
import { useEffect, useRef, useState } from "react";
import { deployToProduction } from "../../actions/devgame";
import FSGCopyText from "../widgets/inputs/FSGCopyText";

function DevMyGameListItem(props) {

    let defaultDeployCmd = `npm run deploy -- ${props.game_slug}.${props.apikey}`;
    let displayedCmd = `Deploy Command`;

    const [scaled, setScaled] = useState(props.latest_scaled);
    const [deployCmd, setDeployCmd] = useState(defaultDeployCmd);
    const { hasCopied, onCopy } = useClipboard(deployCmd);
    const [isOpen, setIsOpen] = React.useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()
    const copyRef = useRef(null);
    const [version, setVersion] = useState(props.version);

    const toast = useToast()

    const onScaleChange = (e) => {
        setScaled(e.target.checked);
        updateCmdScaled(e.target.checked);
    }

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

    const updateCmdScaled = (isScaled) => {
        if (isScaled)
            setDeployCmd(defaultDeployCmd + ' --scaled');
        else
            setDeployCmd(defaultDeployCmd);
    }


    useEffect(() => {

        updateCmdScaled(scaled);
    }, [])


    let imgUrl = config.https.cdn + 'placeholder.png';
    if (props.preview_images && props.preview_images.length > 0)
        imgUrl = `${config.https.cdn}${props.game_slug}/preview/${props.preview_images}`;

    return (
        <Box>
            <Flex>
                <Wrap align="stretch" flexGrow={1}>
                    <Flex justifyItems={['left', 'left']}>
                        <SLink to={'/dev/game/' + props.gameid}>
                            <Image src={imgUrl} alt={"Icon for " + props.name} minWidth={['72px']} maxW={['72px']} h={['72px']}
                                fallbackSrc={config.https.cdn + 'placeholder.png'}
                            />
                        </SLink>

                        <VStack
                            align="stretch"
                            pl="0.5rem"
                        >
                            <Box >
                                <SLink to={'/dev/game/' + props.gameid}>
                                    <Text pl={['1rem', '1rem', '0', '0']} align={['left', 'left']} fontSize="2xl" fontWeight="600">{props.name}</Text>
                                </SLink>
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
                                    <Text color="gray.400"><Link target="_blank" href={`https://github.com/acosgames/${props.game_slug}/issues`}>issues</Link></Text>
                                </HStack>

                                <HStack>
                                    <Icon color="gray.500" as={IoDocument} />
                                    <Text color="gray.400"><SLink to={`/g/${props.game_slug}`}>listing</SLink></Text>
                                </HStack>
                            </Wrap>

                            <div className="deploy-info">
                                <div className="deploy-cmd">
                                    {/* <h5>Ready to deploy? Simply run this command from your development environment.</h5> */}
                                    <VStack opacity={0.6}>


                                        <Wrap>
                                            <Center>
                                                <Text as="span" fontSize="sm" fontWeight={'bold'}>Run to deploy</Text>
                                            </Center>
                                            <FSGCopyText
                                                value={deployCmd}
                                                width="13rem"
                                                copyRef={copyRef}
                                                onFocus={(e) => {
                                                    e.target.select()
                                                }} />
                                            {/* <Box p="0.4rem" fontSize={'xs'} width="150px" overflowX={'hidden'} bgColor={'gray.800'} border="2px solid" borderColor={'gray.900'}>
                                            <pre>{deployCmd}</pre>
                                        </Box> */}
                                            <Center>
                                                <IconButton
                                                    onClick={(e) => {
                                                        copyRef.current.focus();
                                                        copyRef.current.select();
                                                        onCopy(e);
                                                        setTimeout(() => {

                                                            toast({
                                                                title: 'Copied!',
                                                                description: "To deploy, run command in your terminal at project folder",
                                                                status: 'success',
                                                                duration: 4000,
                                                                isClosable: true,
                                                            })

                                                        }, 20)

                                                    }}
                                                    icon={<FiCopy />}
                                                    size="sm"
                                                    isRound="true"
                                                    mr="2rem" />
                                            </Center>
                                            <Spacer w="2rem" />
                                            <HStack alignItems={'center'} justifyContent={'center'}>
                                                <FormLabel htmlFor={'switch-' + props.game_slug} p="0" m="0" fontSize="sm" >
                                                    <Text as="span">scaled</Text>
                                                    <Switch pl="0.5rem" id={'switch-' + props.game_slug} size="sm" onChange={onScaleChange} defaultChecked={scaled} />
                                                </FormLabel>


                                                <Popover>
                                                    <PopoverTrigger>

                                                        <Box>
                                                            <Center>
                                                                <Icon as={IoHelpCircleSharp} />
                                                            </Center>
                                                        </Box>

                                                    </PopoverTrigger>
                                                    <Portal>
                                                        <PopoverContent>
                                                            <PopoverArrow />
                                                            <PopoverHeader>Scaled Viewport</PopoverHeader>
                                                            <PopoverCloseButton />
                                                            <PopoverBody>
                                                                <Text>Adds <Text as="strong">--scaled</Text> to the command.<br />The game's iframe will always be scaled to <Text as="strong">1920x1080</Text>, and the iframe will scale to fit inside the main website's viewport using <Text as="strong">transform: scale().</Text></Text>
                                                            </PopoverBody>
                                                        </PopoverContent>
                                                    </Portal>
                                                </Popover>




                                            </HStack>
                                        </Wrap>


                                    </VStack>
                                </div>
                            </div>
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
                                        Delete Customer
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