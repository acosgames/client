import { useEffect, useRef, useState } from "react";
import fs from "flatstore";

import {
    Center,
    HStack,
    IconButton,
    Text,
    Tooltip,
    useClipboard,
    useToast,
    VStack,
    Wrap,
} from "@chakra-ui/react";
import FSGCopyText from "../../../components/widgets/inputs/FSGCopyText.jsx";

import { FiCopy, FiRefreshCcw } from "react-icons/fi";
// import { updateGameAPIKey } from "../../actions/devgame";
import { btDevGame } from "../../../actions/buckets";
import { updateGameAPIKey } from "../../../actions/devgame.js";
import { useBucket } from "../../../actions/bucket.js";

export default function DeploymentCommand(props) {
    let devgame = useBucket(
        btDevGame,
        (a, b) => a.deployCommand != b.deployCommand
    );

    const { hasCopied, onCopy } = useClipboard(devgame.deployCommand);
    const copyRef = useRef(null);
    const toast = useToast();

    const onUpdateAPIKey = async () => {
        await updateGameAPIKey();
    };

    return (
        <VStack alignItems={"left"} w="100%">
            {/* <Center> */}
            <Text
                color={props.titleColor || "gray.10"}
                fontSize="1.4rem"
                fontWeight="300"
            >
                Run command in{" "}
                <Text as={"span"} fontWeight={"500"}>
                    {devgame.game_slug}
                </Text>{" "}
                project folder to deploy the game.
            </Text>
            {/* </Center> */}
            <HStack width="100%">
                <FSGCopyText
                    value={devgame.deployCommand}
                    copyRef={copyRef}
                    color={"gray.20"}
                    fontSize={"1.3rem"}
                    fontWeight={"light"}
                    bgColor={"gray.950"}
                    borderRadius={"8px"}
                    maxWidth={"100%"}
                    onFocus={(e) => {
                        e.target.select();
                    }}
                />
                <Center>
                    <Tooltip label="Copy Deploy Command" placement="top">
                        <IconButton
                            onClick={(e) => {
                                copyRef.current.focus();
                                copyRef.current.select();
                                onCopy(e);
                                setTimeout(() => {
                                    toast({
                                        fontSize: "xs",
                                        description:
                                            "To deploy, run command in your terminal at project folder",
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
                    <Tooltip label="Refresh API Key" placement="top">
                        <IconButton
                            onClick={onUpdateAPIKey}
                            icon={<FiRefreshCcw />}
                            size="sm"
                            isRound="true"
                            ml="0.5rem"
                        />
                    </Tooltip>
                </Center>
            </HStack>
        </VStack>
    );
}
