import { Box, HStack, VStack, IconButton, Spacer, Text, useClipboard } from "@chakra-ui/react";
import { FiCopy, FiEdit } from "react-icons/fi";
import SLink from "../widgets/SLink";
import { useToast } from '@chakra-ui/react'

function DevMyGameListItem(props) {

    let deployCmd = `npm run deploy ${props.apikey}`
    const { hasCopied, onCopy } = useClipboard(deployCmd)


    const toast = useToast()
    return (
        <Box>
            <HStack align="stretch">
                <VStack
                    align="stretch"
                >
                    <SLink to={'/dev/game/' + props.gameid}>
                        <Text fontSize="2xl" fontWeight="700">{props.name}</Text>
                    </SLink>
                    <div className="deploy-info">
                        <div className="deploy-cmd">
                            {/* <h5>Ready to deploy? Simply run this command from your development environment.</h5> */}
                            <HStack>
                                <Box bgColor="gray.900" p="0.4rem">
                                    <pre>{deployCmd}</pre>
                                </Box>

                                <IconButton onClick={(e) => {
                                    onCopy(e);
                                    setTimeout(() => {

                                        toast({
                                            title: 'Copied!',
                                            description: "Run deploy command in your game project terminal",
                                            status: 'success',
                                            duration: 9000,
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
                    <IconButton icon={<FiEdit />} size="sm" isRound="true" />
                </SLink>

            </HStack>
        </Box >
    )
}

export default DevMyGameListItem;