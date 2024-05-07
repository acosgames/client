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
    let devgame = useBucket(btDevGame);

    let defaultDeployCmd = `npm run deploy -- ${devgame?.game_slug}.${devgame?.apikey}`;
    let displayedCmd = `Deploy Command`;

    // let defaultScreentype = devgame?.latest_screentype || 1;
    // let defaultMaxWidth = devgame?.latest_screenwidth || 1200;
    // let defaultResow = devgame?.latest_resow || 4;
    // let defaultResoh = devgame?.latest_resoh || 4;
    // let defaultResolution = defaultResow + ":" + defaultResoh;

    const generateCommand = () => {
        let cmd =
            defaultDeployCmd +
            "" +
            (process.env.NODE_ENV === "development" ? " --local" : "");
        return cmd;
    };

    let fixedCmd = generateCommand();
    // defaultScreentype,
    // defaultResow,
    // defaultResoh,
    // defaultMaxWidth
    const [deployCmd, setDeployCmd] = useState(fixedCmd);
    const { hasCopied, onCopy } = useClipboard(deployCmd);
    const copyRef = useRef(null);
    // const [selected, setSelected] = useState(
    //     devgame?.latest_screentype || 0
    // );
    // const [resolution, setResolution] = useState(defaultResolution);
    // const [resoWidth, setResoWidth] = useState(defaultResow);
    // const [resoHeight, setResoHeight] = useState(defaultResoh);
    // const [maxwidth, setMaxWidth] = useState(defaultMaxWidth);
    // const [maxheight, setMaxHeight] = useState(0);
    const toast = useToast();

    const onUpdateDeployCmd = () => {
        let cmd = generateCommand();

        setDeployCmd(cmd);
        return cmd;
    };

    const onUpdateAPIKey = async () => {
        await updateGameAPIKey();

        defaultDeployCmd = `npm run deploy -- ${devgame?.game_slug}.${devgame?.apikey}`;
        onUpdateDeployCmd();
    };

    // const onResoChange = (e) => {
    //     let val = event.target.value;
    //     let parts = val.split(':');

    //     setResolution(val);

    //     if (!parts || parts.length != 2) {
    //         return;
    //     }

    //     let rw = 1 * parts[0];
    //     let rh = 1 * parts[1];
    //     if (!Number.isInteger(rw) || !Number.isInteger(rh))
    //         return;

    //     if (rw <= 0 || rh <= 0)
    //         return;

    //     setResoWidth(rw);
    //     setResoHeight(rh);
    //     calculateHeight(maxwidth, rw, rh);
    //     onUpdateDeployCmd(selected, rw, rh, maxwidth);
    // }

    // const onSelectViewport = (e) => {
    //     let choice = e.target.value;
    //     setSelected(choice);

    //     onUpdateDeployCmd(choice, resoWidth, resoHeight, maxwidth);
    //     console.log(e);
    // }

    // const calculateHeight = (w, rw, rh) => {
    //     let steps = w / rw;
    //     let h = rh * steps;
    //     setMaxHeight(h);
    // };

    // const onWidthChange = (e) => {
    //     let val = e.target.value;
    //     val = 1 * val;
    //     if (!Number.isInteger(val))
    //         return;

    //     if (val <= 0)
    //         return;

    //     setMaxWidth(val);
    //     calculateHeight(val, resoWidth, resoHeight);
    //     onUpdateDeployCmd(selected, resoWidth, resoHeight, val);
    // }

    useEffect(() => {
        // calculateHeight(maxwidth, resoWidth, resoHeight);
        onUpdateDeployCmd();
    }, []);

    // let displayResolution = selected == '2' || selected == '3';
    // let displayWidthHeight = selected == '3';

    return (
        <VStack alignItems={"left"} w="100%">
            {/* <Center> */}
            <Text
                color={props.titleColor || "gray.10"}
                fontSize="1.4rem"
                fontWeight="500"
            >
                Run command in{" "}
                <Text as={"span"} fontWeight={"light"}>
                    {devgame.game_slug}
                </Text>{" "}
                project to deploy the game files
            </Text>
            {/* </Center> */}
            <HStack width="100%">
                <FSGCopyText
                    value={deployCmd}
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
