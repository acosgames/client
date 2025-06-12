import { HStack, VStack, Box, Text } from "@chakra-ui/react";

import { wsLeaveQueue } from "../../actions/connection";
import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";

import { MdCancel } from "react-icons/md";
import { useBucket } from "../../actions/bucket";
import {
    btHideDrawer,
    btIsMobile,
    btPrimaryGamePanel,
    btQueueStats,
    btQueues,
} from "../../actions/buckets";

let intervalHandle = 0;
let intervalCount = 0;
let searchMessagees = [
    "Searching for Match",
    "Notifying #acos-queue on Discord",
    // "There are $ingame players in game.",
    "There are $queue players in queue(s).",
];
export default function Searching({ isHeader }) {
    let [message, setMessage] = useState(searchMessagees[0]);

    let primaryId = useBucket(btPrimaryGamePanel);
    let queueStats = useBucket(btQueueStats);
    let queues = useBucket(btQueues);

    const intervalLoop = () => {
        intervalCount++;
        intervalCount = intervalCount % searchMessagees.length;
        setMessage(searchMessagees[intervalCount]);
    };

    let hideDrawer = useBucket(btHideDrawer);
    let isMobile = useBucket(btIsMobile);

    //   useEffect(() => {
    //     intervalHandle = setInterval(intervalLoop, 5000);
    //   }, []);

    useEffect(() => {
        if (!queues || queues.length == 0) {
            intervalCount = 0;
            clearInterval(intervalHandle);
            intervalHandle = 0;
        } else {
            if (intervalHandle == 0) {
                intervalHandle = setInterval(intervalLoop, 5000);
            }
        }
    });

    // if (isHeader && isMobile) return <></>;

    if (!queues || queues.length == 0) {
        return <></>;
    }

    let playersIngame = 0;
    let playersQueued = 0;

    for (let i = 0; i < queues.length; i++) {
        let queue = queues[i];
        let key = queue.mode + "/" + queue.game_slug;

        if (queueStats && key in queueStats) {
            let stats = queueStats[key];
            if (stats.count > playersQueued) playersQueued = stats.count;
        }
    }

    message = message
        .replace("$ingame", playersIngame)
        .replace("$queue", playersQueued)
        .replace("players", playersQueued == 1 ? "player" : "players");

    return (
        <VStack
            w={isHeader ? "100%" : "100%"}
            maxW={isHeader ? "40rem" : "100%"}
            py="1rem"
            h="7rem"
            justifyContent="center"
            // top={"0"}
            // right={isHeader ? "50%" : "0"}
            zIndex={isHeader ? 4 : 0}
            position={"relative"}
            background={
                isHeader
                    ? "linear-gradient(to right, rgba(0,0,0,0) 1%, rgba(0,0,0,0.95) 30%, rgba(0,0,0,0.95) 70%, rgba(0,0,0,0) 99%)"
                    : "gray.700"
            }
            onClick={() => {}}
        >
            <IconButton
                // onClick={onSubmit}
                onClick={(e) => {
                    wsLeaveQueue();
                }}
                icon={<MdCancel size="2rem" />}
                width="3.5rem"
                title="Cancel"
                height="3.5rem"
                isRound="true"
                color="gray.100"
                _hover={{
                    color: "yellow.100",
                }}
                _focus={{
                    color: "yellow.100",
                }}
                position="absolute"
                top="0.75rem"
                right="1.5rem"
                filter="drop-shadow(1px 1px 2px var(--chakra-colors-gray-1200)) "
            />
            as={}
            <HStack className="queue-searching" justifyContent={"center"} spacing="0">
                <Text
                    as="span"
                    pr="1rem"
                    textShadow="0 0 1px var(--chakra-colors-brand-900)"
                    fontSize="1.8rem"
                    fontWeight="500"
                    color="gray.0"
                >
                    SEARCHING
                </Text>
                <HStack className="search-loader" spacing="0.25rem">
                    <Box></Box>
                    <Box></Box>
                    <Box></Box>
                </HStack>
            </HStack>
            <Text
                display={window.innerHeight <= 400 ? "none" : "inline-block"}
                as="span"
                fontSize="1.2rem"
                color="alt.900"
            >
                {message}
            </Text>
        </VStack>
    );
}
