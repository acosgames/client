import { Box, Image, HStack, VStack, IconButton, Spacer, Text, useClipboard, Icon, Container, StackDivider, Link, Wrap, Flex } from "@chakra-ui/react";
import SLink from "../widgets/SLink";
import { useToast } from '@chakra-ui/react'

// import { IoCode } from "@react-icons/all-files/io5/IoCode";
// import { IoCodeWorking } from "@react-icons/all-files/io5/IoCodeWorking";
// import { IoDocument } from "@react-icons/all-files/io5/IoDocument";
// import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
// import { FiCopy } from "@react-icons/all-files/fi/FiCopy";
// import { FiHeart } from "@react-icons/all-files/fi/IoDocument";
// import { FiUsers } from "@react-icons/all-files/fi/FiUsers";

import { IoCode, IoCodeWorking, IoDocument } from "@react-icons";
import { FaGithub } from "@react-icons";
import { FiCopy, FiHeart, FiUsers } from "@react-icons";

function DevMyGameListItem(props) {

    let deployCmd = `npm run deploy ${props.game_slug}.${props.apikey}`;
    let displayedCmd = `Deploy Command`;

    const { hasCopied, onCopy } = useClipboard(deployCmd)


    const toast = useToast()
    let imageURL = 'https://cdn.fivesecondgames.com/file/fivesecondgames/' + props.gameid + '/preview/' + props.preview_images;

    return (
        <Box>
            <Wrap align="stretch">
                <Flex justifyItems={['left', 'left']}>
                    <SLink to={'/dev/game/' + props.gameid}>
                        <Image src={imageURL} alt={"Icon for " + props.name} minWidth={['72px']} maxW={['72px']} h={['72px']} />
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
                                    <Text color="gray.400">v{props.version || 0}</Text>
                                </HStack>
                                <HStack>
                                    <Icon color="gray.500" as={IoCodeWorking} />
                                    <Text color="gray.400">v{props.latest_version || 0}</Text>
                                </HStack>
                            </HStack>
                            <HStack pr={['1rem', '1rem', "1rem", "1rem"]}>
                                <Icon color="gray.500" as={FaGithub} />
                                <Text color="gray.400"><Link target="_blank" href={`https://github.com/fivesecondgames/${props.game_slug}/issues`}>issues</Link></Text>
                            </HStack>

                            <HStack>
                                <Icon color="gray.500" as={IoDocument} />
                                <Text color="gray.400"><SLink to={`/g/${props.game_slug}`}>listing</SLink></Text>
                            </HStack>
                        </Wrap>

                        <div className="deploy-info">
                            <div className="deploy-cmd">
                                {/* <h5>Ready to deploy? Simply run this command from your development environment.</h5> */}
                                <HStack>
                                    <Box bgColor="gray.900" p="0.4rem">
                                        <pre>{displayedCmd}</pre>
                                    </Box>

                                    <IconButton onClick={(e) => {
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

                                    }} icon={<FiCopy />} size="sm" isRound="true" />

                                </HStack>

                            </div>
                        </div>
                    </VStack>
                </Flex>

            </Wrap >
        </Box >
    )
}

export default DevMyGameListItem;