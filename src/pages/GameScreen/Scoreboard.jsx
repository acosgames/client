import { VStack, chakra } from "@chakra-ui/react";
import { useRef } from "react";
import fs from "flatstore";
import SimpleBar from "simplebar-react";

export default function Scoreboard({}) {
  let [queueStats] = fs.useWatch("queueStats");
  let [queues] = fs.useWatch("queues");

  const scrollRef = useRef();
  const ChakraSimpleBar = chakra(SimpleBar);

  let queueStatsKeys = Object.keys(queueStats || {});

  //   let available = RenderAvailable({ queues, queueStats });
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
          <VStack w="100%" pb="1rem" pt="1rem"></VStack>
        </ChakraSimpleBar>
      </VStack>
    </VStack>
  );
}
