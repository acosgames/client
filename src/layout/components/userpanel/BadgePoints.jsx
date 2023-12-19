import { HStack, Heading, Icon, Image, Text } from "@chakra-ui/react";
import { FaCoins } from "@react-icons";
import config from "../../../config/index.js";
import { TbBrain } from "react-icons/tb";
import fs from "flatstore";
export default function BadgePoints({}) {
  let [user] = fs.useWatch("user");
  let points = user.points || 0;
  return (
    <HStack
      borderRadius="8px"
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
      <Icon as={TbBrain} fontSize="1.8rem" color="brand.600" />
      <Heading
        as="h6"
        fontSize="1.2rem"
        color="gray.10"
        lineHeight="1.7rem"
        fontWeight="700"
        letterSpacing={"0px"}
        pl="0.25rem"
      >
        {points.toLocaleString()}
      </Heading>
    </HStack>
  );
}
