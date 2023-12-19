import { Box, Text } from "@chakra-ui/react";

import fs from 'flatstore';

export default function PregameTimer({ gamepanel, status }) {
    let [timeleftUpdated] = fs.useWatch("timeleftUpdated");
    let timeleft = fs.get("timeleft/" + gamepanel.id) || 0;
    timeleft = Math.ceil(timeleft / 1000);

    let gamestatus = gamepanel?.gamestate?.room?.status;
    return (
        <Box
            position="absolute"
            right="1rem"
            top="1rem"
            //   transform="translate(-150%,-50%)"
            p="1rem"
            px="3rem"
            zIndex={"5"}
            bgColor="rgba(0,0,0,0.9)"
            borderRadius={"8px"}
            textAlign={"center"}
        >
            <Text fontSize="1.4rem">{gamestatus == 'pregame' ? 'Waiting for players' : 'Starting in'}</Text>
            <Text
                color="gray.0"
                lineHeight={"2rem"}
                fontWeight={"500"}
                as="h3"
                fontSize="2rem"
            >
                {timeleft}
            </Text>
        </Box>
    );
}