import { Box, Heading, Text, VStack, chakra } from "@chakra-ui/react";
import fs from "flatstore";
import QueueMessage from "./QueueMessage.jsx";

import SimpleBar from "simplebar-react";
import { useRef } from "react";

export default function QueuePanel({}) {
  let [queueStats] = fs.useWatch("queueStats");
  let [queues] = fs.useWatch("queues");

  const scrollRef = useRef();
  const ChakraSimpleBar = chakra(SimpleBar);

  let queueStatsKeys = Object.keys(queueStats || {});

  let available = RenderAvailable({ queues, queueStats });
  return (
    <VStack
      w="100%"
      h={["100%"]}
      spacing="0"
      position="relative"
      overflow="hidden"
      flex="1"
      // mb="0.5rem"
      // pt="0.5rem"
      px="0.5rem"
      mb="1rem"

      // filter="drop-shadow(1px 1px 2px var(--chakra-colors-gray-1000)) "
    >
      <VStack
        width="100%"
        height={"100%"}
        transition={"all 0.3s ease"}
        boxSizing="border-box"
        spacing="0rem"
        position="relative"
        overflow="hidden"
        flex="1"
        mb="0"
        pb="0"
        borderRadius={"8px"}
        border="1px solid"
        zIndex="2"
        borderColor="gray.925"
        bgColor="gray.900"
        boxShadow="inset 0 0px 6px var(--chakra-colors-gray-1000), inset 0 0px 2px var(--chakra-colors-gray-1000), inset 0 0px 4px var(--chakra-colors-gray-1000)"
      >
        <ChakraSimpleBar
          boxSizing="border-box"
          flex="1"
          // borderTop={["2px solid var(--chakra-colors-gray-800)"]}
          style={{
            width: "100%",
            height: "auto",
            flex: "1",
            overflow: "hidden scroll",
            boxSizing: "border-box",
          }}
          scrollableNodeProps={{ ref: scrollRef }}
        >
          <VStack w="100%" pb="1rem" pt="1rem">
            <Box
              pt="1rem"
              textAlign={"center"}
              display={
                queues.length > 0 || available.length > 0 ? "none" : "block"
              }
            >
              <Text as="span">No active queues</Text>
              <Text as="p" fontSize="1.2rem">
                Join a queue to see it listed here.
              </Text>
            </Box>

            <VStack px="1rem" w="100%">
              <RenderJoined queues={queues} queueStats={queueStats} />
              {available}
            </VStack>
          </VStack>
        </ChakraSimpleBar>
      </VStack>
    </VStack>
  );
}

function RenderJoined({ queues, queueStats }) {
  let queueElems = [];
  queueStats = queueStats || {};

  for (let i = 0; i < queues.length; i++) {
    let queue = queues[i];

    let queueStat = queueStats[queue.mode + "/" + queue.game_slug] || {
      count: 0,
    };

    queueElems.push(
      <QueueMessage
        key={"joined-queued-" + queue.game_slug + queue.mode}
        game_slug={queue.game_slug}
        mode={queue.mode}
        preview_image={queue.preview_image}
        name={queue.name}
        count={queueStat.count}
        queued={true}
      />
    );
  }

  return queueElems;
}

function RenderAvailable({ queues, queueStats }) {
  queueStats = queueStats || {};
  let queueElems = [];

  let queueMap = {};
  queues.forEach((q) => (queueMap[q.mode + "/" + q.game_slug] = true));

  for (let key in queueStats) {
    if (key == "type") continue;
    // if (key in queueMap) continue;
    let parts = key.split("/");
    let mode = parts[0];
    let game_slug = parts[1];
    let queue = queueStats[key];
    queue.game_slug = game_slug;
    queue.mode = mode;

    queueElems.push(
      <QueueMessage
        key={"joined-queued-" + queue.game_slug + queue.mode}
        game_slug={queue.game_slug}
        mode={queue.mode}
        preview_image={queue.preview_image}
        name={queue.name}
        count={queue.count}
        queued={false}
      />
    );
  }

  return queueElems;
}
