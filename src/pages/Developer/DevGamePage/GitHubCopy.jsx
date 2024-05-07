import {
    Center,
    HStack,
    Icon,
    IconButton,
    Link,
    Text,
    Tooltip,
    useClipboard,
    useToast,
    VStack,
} from "@chakra-ui/react";

import { FiCopy } from "react-icons/fi";
import { useRef } from "react";
import FSGCopyText from "../../../components/widgets/inputs/FSGCopyText.jsx";
import { btDevGame } from "../../../actions/buckets";

export default function GitHubCopy(props) {
    let devgame = btDevGame.get();

    let cloneCmd = `git clone git@github.com:acosgames/${devgame?.game_slug}.git`;
    let acosgamesURL = "https://github.com/acosgames/";
    let githubURL = acosgamesURL + devgame?.game_slug;

    const { hasCopied, onCopy } = useClipboard(cloneCmd);
    const copyRef = useRef();
    const toast = useToast();

    return (
        <VStack w="100%" alignItems={"flex-start"}>
            <Text
                color={props.titleColor || "gray.10"}
                fontSize="1.4rem"
                fontWeight="500"
            >
                Clone{" "}
                <Link
                    target="_blank"
                    fontWeight={"light"}
                    color="gray.10"
                    fontSize="1.4rem"
                    href={githubURL}
                >
                    GitHub repo
                </Link>{" "}
                to get started
            </Text>
            {/* <Link target="_blank" fontWeight={'light'} color="gray.100" fontSize="sm" href={githubURL}>{githubURL}</Link> */}
            {/* <Text>
                <Link target="_blank" color="gray.300" fontSize="xs" href="https://sdk.acos.games/#start-from-an-existing-game-template"><Icon as={FaExternalLinkAlt} color="white" fontSize="xs" /> Instructions to start from existing game template</Link>
            </Text> */}
            <HStack w="100%">
                <FSGCopyText
                    value={cloneCmd}
                    copyRef={copyRef}
                    color={"gray.20"}
                    fontSize={"1.3rem"}
                    fontWeight={"light"}
                    bgColor={"gray.950"}
                    borderRadius={"8px"}
                    maxWidth={"500px"}
                    onFocus={(e) => {
                        e.target.select();
                    }}
                />
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
                                        status: "success",
                                        duration: 4000,
                                        isClosable: true,
                                    });
                                }, 20);
                            }}
                            icon={<FiCopy />}
                            size="sm"
                            isRound="true"
                        />
                    </Tooltip>
                </Center>
            </HStack>
        </VStack>
    );
}
