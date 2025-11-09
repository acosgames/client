import { HStack, Heading, Icon, Image, Text } from "@chakra-ui/react";

import { btUser } from "../../actions/buckets.js";
import { useBucket, useBucketSelector } from "../../actions/bucket.js";
export default function BadgeLevel({}) {
    let userLevel = useBucketSelector(btUser, (user) => user?.level) || 0;
    let level = Math.trunc(userLevel || 1);
    return (
        <HStack
            borderRadius="8px"
            pl="0.4rem"
            pr="0.75rem"
            // bgColor="gray.300"
            justifyContent={"flex-start"}
            alignItems={"center"}
            spacing="0.3rem"
            h="2.5rem"
        >
            {/* <Image
        display={"inline-block"}
        src={`${config.https.cdn}icons/achievements/2-white-thumbnail.webp`}
        loading="lazy"
        title={"Level"}
        height="2rem"
        w="2rem"
        minW="2rem"
        position="relative"
        // filter="sepia(50%) hue-rotate(100deg)"
        // filter="brightness(70%) hue-rotate(50deg)"
        top="-0.1rem"
        // left="-0.5rem"
      /> */}
            {/* <Icon as={SiLevelsdotfyi} fontSize="1.2rem" color="brand.100" /> */}
            <Heading
                as="h6"
                fontSize="1.2rem"
                color="gray.10"
                fontWeight="500"
                lineHeight="1.7rem"
                letterSpacing={"0px"}
            >
                Level {level.toLocaleString()}
            </Heading>
        </HStack>
    );
}
