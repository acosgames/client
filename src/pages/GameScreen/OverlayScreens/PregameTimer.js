import { Box, HStack, Text } from "@chakra-ui/react";

import fs from 'flatstore';
import { motion } from "framer-motion";
import { useEffect } from "react";

const MotionBox = motion(HStack);
let prevTimeleft = 0;

export default function PregameTimer({ gamepanel, status }) {
    let [timeleftUpdated] = fs.useWatch("timeleftUpdated");
    let timeleft = fs.get("timeleft/" + gamepanel.id) || 0;
    timeleft = Math.ceil(timeleft / 1000);


    useEffect(() => {
        let timeleft = fs.get("timeleft/" + gamepanel.id) || 0;
        timeleft = Math.ceil(timeleft / 1000);
        if (timeleft != prevTimeleft) {

        }
        prevTimeleft = timeleft;
    })
    let gameName = gamepanel?.room?.name;
    let gamestatus = gamepanel?.gamestate?.room?.status;

    // timeleft = timeleft % 5;

    return (
        <MotionBox
            position="absolute"
            left="0"
            w="100%"

            top="0"
            //   transform="translate(-150%,-50%)"
            // pb="0.5rem"
            px="0rem"
            pt="0"
            py="0.5rem"
            zIndex={"5"}
            bgColor="rgba(0,0,0,0.8)"
            border="0"
            // borderTop="1px solid"
            // borderBottom="1px solid"
            // borderColor="gray.500"
            _before={{
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '1px',
                bottom: 0,
                left: 0,
                bg: "linear-gradient(to right, var(--chakra-colors-gray-1200),  var(--chakra-colors-gray-10), var(--chakra-colors-gray-1200))"
            }}
            // borderRadius={"8px"}
            // textAlign={"center"}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{
                delay: 0.5,
                duration: 0.3,
                ease: [0, 0.71, 0.2, 1.01],
                scale: {
                    type: "spring",
                    damping: 1,
                    stiffness: 100,
                    restDelta: 0.001
                }
            }}
        >
            <Text ml="1rem" as="span" color="gray.20" fontSize={["1.2rem", "1.4rem", "1.4rem", "1.4rem"]} fontWeight="500" minW="0" overflow="hidden" textOverflow={'ellipsis'} whiteSpace={'nowrap'} pr="1rem">
                {gameName || "a game"}
            </Text>
            <Box flex="1" h="1px"></Box>
            <Text whiteSpace={'nowrap'} fontSize="1.2rem" lineHeight="2.4rem" color="gray.20">{gamestatus == 'pregame' ? 'Waiting for players' : 'Starting in'}</Text>
            <Box w="5rem"
                minW="5rem" height="2rem" textAlign={'left'}>

                <Text
                    color="gray.0"
                    lineHeight={"2rem"}
                    fontWeight={"500"}
                    as="h3"
                    display="inline-block"
                    fontSize="2rem"
                    // mr="0.5rem"
                    // ml="0.5rem"
                    // transformOrigin={'center'}
                    animation={timeleft <= 3 ? 'pulse 1s linear infinite' : ''}
                // w="5rem"
                // minW="5rem"
                // whiteSpace={'nowrap'}
                >
                    {timeleft}
                </Text>
            </Box>
        </MotionBox>
    );
}