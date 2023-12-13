import { Heading, VStack } from "@chakra-ui/react";
import fs from "flatstore";
export default function QueuePanel({}) {
  let [queueStats] = fs.useWatch("queueStats");
  let [queues] = fs.useWatch("queues");

  return (
    <VStack>
      <Heading
        display={queues.length > 0 ? "block" : "none"}
        as="h3"
        fontSize="1.6rem"
        fontWeight="500"
        color="brand.600"
      >
        Joined
      </Heading>
      <VStack></VStack>
      <Heading as="h3" fontSize="1.6rem" fontWeight="500" color="brand.600">
        Available
      </Heading>
    </VStack>
  );
}
