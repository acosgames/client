import { HStack, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { FaCoins } from "@react-icons";
import config from "../../../config/index.js";
import { TbBrain } from "react-icons/tb";

export default function BadgePoints({ points }) {
  return (
    <HStack
      borderRadius="6px"
      pl="0rem"
      pr="0.75rem"
      // pt="0.2rem"
      // bgColor="gray.300"
      justifyContent={"center"}
      alignItems={"center"}
      spacing="0rem"
      h="2.5rem"
    >
      {/* <Image
        display={"inline-block"}
        src={`${config.https.cdn}icons/achievements/31-white-thumbnail.webp`}
        loading="lazy"
        title={"Points"}
        height="2rem"
        w="2rem"
        minW="2rem"
        position="relative"
        // filter="sepia(50%)"
        // filter="brightness(70%) hue-rotate(50deg)"
        // top="0.2rem"
        // left="-0.25rem"
      /> */}
      <Icon as={TbBrain} fontSize="1.6rem" color="yellow.200" />
      <Heading
        as="h6"
        fontSize="1.4rem"
        color="gray.10"
        lineHeight="1.7rem"
        fontWeight="700"
        letterSpacing={"0px"}
      >
        {points.toLocaleString()}
      </Heading>
    </HStack>
  );
}
