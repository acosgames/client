import { Box, Image, HStack, VStack, IconButton, Spacer, Text, useClipboard, Icon, Container } from "@chakra-ui/react";
import { FiCopy, FiEdit, FiHeart, FiUsers } from "react-icons/fi";
import SLink from "../widgets/SLink";
import { useToast } from '@chakra-ui/react'

function DevMyGameListItem(props) {

    let deployCmd = `npm run deploy ${props.game_slug}.${props.apikey}`;
    let displayedCmd = `Deploy Command`;

    const { hasCopied, onCopy } = useClipboard(deployCmd)


    const toast = useToast()
    let imageURL = 'https://cdn.fivesecondgames.com/file/fivesecondgames/' + props.gameid + '/preview/' + props.preview_images;

    return (
        <Box>
            <HStack align="stretch">
                <Image src={imageURL} alt={"Icon for " + props.name} w="72px" h="72px" />
                <VStack
                    align="stretch"
                    pl="0.5rem"
                >
                    <SLink to={'/dev/game/' + props.gameid}>
                        <Text fontSize="2xl" fontWeight="600">{props.name}</Text>
                    </SLink>
                    <HStack pl="1rem" spacing="2rem" >
                        <HStack>
                            <Icon color="gray.500" as={FiUsers} />
                            <Text color="gray.400">{props.count || 0}</Text>
                        </HStack>
                        <HStack>
                            <Icon color="gray.500" as={FiHeart} />
                            <Text color="gray.400">{props.votes || 0}</Text>
                        </HStack>
                    </HStack>

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
                <Spacer />
                <SLink to={`/dev/game/${props.gameid}`}>
                    <IconButton icon={<FiEdit />} size="lg" isRound="true" />
                </SLink>

            </HStack>
        </Box >
    )
}

export default DevMyGameListItem;