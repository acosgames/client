import { Center, HStack, Icon, IconButton, Link, Text, Tooltip, useClipboard, useToast, VStack } from "@chakra-ui/react";

import { FaExternalLinkAlt, FiCopy } from '@react-icons';
import { useRef } from "react";
import FSGCopyText from "../widgets/inputs/FSGCopyText";

function DevManageGameGithub(props) {



    let cloneCmd = `git clone git@github.com:acosgames/${props.devgame?.game_slug}.git`;
    let acosgamesURL = "https://github.com/acosgames/";
    let githubURL = acosgamesURL + props.devgame?.game_slug

    const { hasCopied, onCopy } = useClipboard(cloneCmd);
    const copyRef = useRef();
    const toast = useToast();

    return (
        <VStack w="100%">
            <Text as="span" fontSize="xs" fontWeight={'bold'} color="gray.300">Your GitHub repo in <Link fontSize="xs" href={acosgamesURL}>acosgames</Link> organization</Text>
            <Link target="_blank" fontWeight={'light'} color="yellow.100" fontSize="sm" href={githubURL}>{githubURL}</Link>
            {/* <Text>
                <Link target="_blank" color="gray.300" fontSize="xs" href="https://sdk.acos.games/#start-from-an-existing-game-template"><Icon as={FaExternalLinkAlt} color="white" fontSize="xs" /> Instructions to start from existing game template</Link>
            </Text> */}
            <HStack w="100%" justifyContent={'center'}>
                <FSGCopyText
                    value={cloneCmd}
                    copyRef={copyRef}
                    maxWidth={'500px'}
                    onFocus={(e) => {
                        e.target.select()
                    }} />
                <Center>
                    <Tooltip label="Copy Clone Command" placement="top">
                        <IconButton
                            onClick={(e) => {
                                copyRef.current.focus();
                                copyRef.current.select();
                                onCopy(e);
                                setTimeout(() => {

                                    toast({
                                        description: "Copied to clipboard",
                                        status: 'success',
                                        duration: 4000,
                                        isClosable: true,
                                    })

                                }, 20)

                            }}
                            icon={<FiCopy />}
                            size="sm"
                            isRound="true"
                        />
                    </Tooltip>
                </Center>
            </HStack>
        </VStack>
    )
}

export default DevManageGameGithub;
