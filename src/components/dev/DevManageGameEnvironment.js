import { useEffect, useRef, useState } from "react";
import fs from 'flatstore';

import { Box, Center, FormLabel, Heading, HStack, Icon, IconButton, Input, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Portal, Select, Spacer, Switch, Text, toast, Tooltip, useClipboard, useToast, VStack, Wrap } from "@chakra-ui/react";
import FSGCopyText from "../widgets/inputs/FSGCopyText";

import { FiCopy, IoHelpCircleSharp, FiRefreshCcw } from '@react-icons';
import { updateGameAPIKey } from "../../actions/devgame";


function DevManageGameEnvironment(props) {


    let defaultDeployCmd = `npm run deploy -- ${props.devgame?.game_slug}.${props.devgame?.apikey}`;
    let displayedCmd = `Deploy Command`;

    let defaultScreentype = props.devgame?.latest_screentype || 1;
    let defaultMaxWidth = props.devgame?.latest_screenwidth || 1200;
    let defaultResow = props.devgame?.latest_resow || 4;
    let defaultResoh = props.devgame?.latest_resoh || 4;
    let defaultResolution = defaultResow + ':' + defaultResoh;

    const generateCommand = (screentype, rw, rh, mw) => {
        let cmd = defaultDeployCmd + '';
        switch (screentype) {
            case 1:
                cmd += ' --screentype=1'
                break;
            case 2:
                cmd += ' --screentype=2'
                cmd += ' --resow=' + rw;
                cmd += ' --resoh=' + rh;
                break;
            case 3:
                cmd += ' --screentype=3'
                cmd += ' --resow=' + rw;
                cmd += ' --resoh=' + rh;
                cmd += ' --screenwidth=' + mw;
                break;
            default:
                cmd += ' --screentype=1'
                break;
        }
        return cmd;
    }

    let fixedCmd = generateCommand(defaultScreentype, defaultResow, defaultResoh, defaultMaxWidth);
    const [deployCmd, setDeployCmd] = useState(fixedCmd);
    const { hasCopied, onCopy } = useClipboard(deployCmd);
    const copyRef = useRef(null);
    const [selected, setSelected] = useState(props.devgame?.latest_screentype || 0);
    const [resolution, setResolution] = useState(defaultResolution);
    const [resoWidth, setResoWidth] = useState(defaultResow);
    const [resoHeight, setResoHeight] = useState(defaultResoh);
    const [maxwidth, setMaxWidth] = useState(defaultMaxWidth);
    const [maxheight, setMaxHeight] = useState(0);
    const toast = useToast()



    const onUpdateDeployCmd = (screentype, rw, rh, mw) => {
        let cmd = generateCommand(Number(screentype), rw, rh, mw);

        setDeployCmd(cmd);
        return cmd;
    }

    const onUpdateAPIKey = async () => {

        await updateGameAPIKey();

        defaultDeployCmd = `npm run deploy -- ${props.devgame?.game_slug}.${props.devgame?.apikey}`
        onUpdateDeployCmd(selected, resoWidth, resoHeight, maxwidth);
    }

    const onResoChange = (e) => {
        let val = event.target.value;
        let parts = val.split(':');

        setResolution(val);

        if (!parts || parts.length != 2) {
            return;
        }

        let rw = 1 * parts[0];
        let rh = 1 * parts[1];
        if (!Number.isInteger(rw) || !Number.isInteger(rh))
            return;

        if (rw <= 0 || rh <= 0)
            return;

        setResoWidth(rw);
        setResoHeight(rh);
        calculateHeight(maxwidth, rw, rh);
        onUpdateDeployCmd(selected, rw, rh, maxwidth);
    }

    const onSelectViewport = (e) => {
        let choice = e.target.value;
        setSelected(choice);

        onUpdateDeployCmd(choice, resoWidth, resoHeight, maxwidth);
        console.log(e);
    }

    const calculateHeight = (w, rw, rh) => {
        let steps = w / rw;
        let h = rh * steps;
        setMaxHeight(h);
    }

    const onWidthChange = (e) => {
        let val = e.target.value;
        val = 1 * val;
        if (!Number.isInteger(val))
            return;

        if (val <= 0)
            return;

        setMaxWidth(val);
        calculateHeight(val, resoWidth, resoHeight);
        onUpdateDeployCmd(selected, resoWidth, resoHeight, val);
    }

    useEffect(() => {
        calculateHeight(maxwidth, resoWidth, resoHeight);
        onUpdateDeployCmd(selected, resoWidth, resoHeight, maxwidth);
    }, [])


    let displayResolution = selected == '2' || selected == '3';
    let displayWidthHeight = selected == '3';

    return (

        <VStack alignItems={'left'} w="100%">
            {/* <Center> */}
            <Text as="span" fontSize="xs" fontWeight={'light'} color="gray.100">Run this command in your <Text as={'span'} fontWeight={'light'}>"{props.devgame.game_slug}"</Text> project to deploy the game files</Text>
            {/* </Center> */}
            <HStack width="100%" >
                <FSGCopyText
                    value={deployCmd}
                    copyRef={copyRef}
                    color={'gray.100'}
                    fontSize={'xs'}
                    fontWeight={'light'}
                    bgColor={'gray.700'}
                    maxWidth={'100%'}
                    onFocus={(e) => {
                        e.target.select()
                    }} />
                <Center>
                    <Tooltip label="Copy Deploy Command" placement="top">
                        <IconButton
                            onClick={(e) => {
                                copyRef.current.focus();
                                copyRef.current.select();
                                onCopy(e);
                                setTimeout(() => {

                                    toast({
                                        fontSize: 'xs',
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
            <VStack pt={'2rem'} fontSize={'xxs'} color={'gray.200'} alignItems={'left'} justifyContent={'left'} w="100%">
                <Text fontSize="xxs" fontWeight={'bold'}>Screen Size Configuration</Text>
                {/* <FormLabel htmlFor={'switch-' + props.devgame.game_slug} p="0" m="0" fontSize="sm" >
                    <Text as="span">scaled</Text>
                    <Switch pl="0.5rem" id={'switch-' + props.devgame.game_slug} size="sm" onChange={onScaleChange} defaultChecked={scaled} />
                </FormLabel> */}
                <HStack w="100%">
                    {/* <FormLabel as="label" color="gray.200" htmlFor="screenType" fontSize={'xxs'}>Viewport</FormLabel> */}
                    <Select fontSize={'xxs'} color="gray.200" id="screenType" onChange={onSelectViewport} value={selected}>
                        <option value="1">Full Screen</option>
                        <option value="2">Fixed Resolution</option>
                        <option value="3">Scaled Resolution</option>
                    </Select>

                    <Popover>
                        <PopoverTrigger>

                            <Box>
                                <Center>
                                    <Icon fontSize="24px" as={IoHelpCircleSharp} color="gray.200" />
                                </Center>
                            </Box>

                        </PopoverTrigger>
                        <Portal>
                            <PopoverContent>
                                <PopoverArrow />
                                <PopoverHeader>Viewport Help</PopoverHeader>
                                <PopoverCloseButton />
                                <PopoverBody>
                                    <Text fontWeight="light">
                                        <Text as="strong">Full Screen</Text> uses responsive UI at 100% of the page width and height. <br />
                                        <Text as="strong">Fixed Resolution</Text> uses responsive UI at a resolution that is stretched to fit the page. <br />
                                        <Text as="strong">Scaled Resolution</Text> uses fixed pixel width and resolution, scaled to fit the page.
                                    </Text>
                                </PopoverBody>
                            </PopoverContent>
                        </Portal>
                    </Popover>
                </HStack>

                <HStack alignItems={'center'} justifyContent={'center'}>

                    <VStack display={displayResolution ? 'flex' : 'none'}>
                        <FormLabel fontSize="xxs" fontWeight={'bold'} m="0" color="gray.200" as="label" htmlFor="resolution">Resolution</FormLabel>
                        <Input
                            type="text"
                            className=""
                            id="resolution"
                            placeholder="16:9"
                            size="30"
                            onChange={onResoChange}
                            color="gray.400"
                            value={resolution}
                        />
                    </VStack>
                    <VStack display={displayWidthHeight ? 'flex' : 'none'}>
                        <FormLabel fontSize="xxs" fontWeight={'bold'} m="0" color="gray.200" as="label" htmlFor="maxwidth">Width (px)</FormLabel>
                        <Input
                            type="text"
                            className=""
                            id="maxwidth"
                            placeholder="1920"
                            size="30"
                            color="gray.400"
                            onChange={onWidthChange}
                            value={maxwidth}
                        />

                    </VStack>
                    <VStack display={displayWidthHeight ? 'flex' : 'none'}>
                        <FormLabel fontSize="xxs" fontWeight={'bold'} m="0" color="gray.200" as="label" htmlFor="maxheight">Height (px)</FormLabel>
                        <Input
                            type="text"
                            className=""
                            id="maxheight"
                            disabled
                            size="30"
                            color="gray.400"
                            value={maxheight}
                        />
                    </VStack>
                </HStack>


            </VStack>
        </VStack>
    )
}

export default DevManageGameEnvironment; 