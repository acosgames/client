import {
    Box,
    Button,
    Heading,
    HStack,
    Progress,
    Text,
    Spinner,
    Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { claimAchievement } from "../../actions/game";
import { useBucket } from "../../actions/bucket";
import { btClaimingAchievement } from "../../actions/buckets";
import { FaCheck } from "react-icons/fa";

export default function AchievementExperienceBar({
    game_slug,
    percent,
    achievement,
}) {
    // let [claimed, setClaimed] = useState(false);
    let isClaiming = useBucket(btClaimingAchievement);

    let completed = achievement?.completed || null;
    let claimed = achievement?.claimed || null;
    let color = "yellow";
    if (percent >= 100) color = "green";

    if (percent >= 100) {
        if (!claimed)
            return (
                <Button
                    height="2rem"
                    w="10rem"
                    borderRadius="4px"
                    display={"block"}
                    fontSize={"xxs"}
                    bgColor={"gray.1000"}
                    transform="skew(-15deg)"
                    boxShadow="3px 3px 0 var(--chakra-colors-brand-300)"
                    _hover={{
                        boxShadow: "6px 4px 0 var(--chakra-colors-brand-300)",
                    }}
                    _active={{
                        boxShadow: "6px 4px 0 var(--chakra-colors-brand-300)",
                    }}
                    onClick={() => {
                        claimAchievement(
                            achievement?.game_slug,
                            achievement?.achievement_slug
                        );
                    }}
                >
                    <Heading
                        as="span"
                        fontSize="1.4rem"
                        color="gray.0"
                        transform="skew(15deg)"
                    >
                        {isClaiming && <Spinner size="sm" />}
                        {!isClaiming && "Claim!"}
                    </Heading>
                </Button>
            );
        return (
            <Heading
                as="h6"
                fontSize="1.4rem"
                fontWeight="600"
                color={"brand.300"}
            >
                <Icon as={FaCheck} height="1.2rem" mr="0.25rem" /> COMPLETED
            </Heading>
        );
    }

    return (
        <HStack
            position="relative"
            width="100%"
            bgColor="gray.400"
            spacing="0rem"
            borderRadius="0.5rem"
        >
            <Progress
                borderRadius="0.5rem"
                value={percent}
                size="xs"
                // colorScheme="green"
                variant={color}
                w="100%"
                height="1rem"
            />
            <Box
                width="0.2rem"
                height="100%"
                position="absolute"
                top="0"
                left="20%"
                bgColor="gray.700"
            ></Box>
            <Box
                width="0.2rem"
                height="100%"
                position="absolute"
                top="0"
                left="40%"
                bgColor="gray.700"
            ></Box>
            <Box
                width="0.2rem"
                height="100%"
                position="absolute"
                top="0"
                left="60%"
                bgColor="gray.700"
            ></Box>
            <Box
                width="0.2rem"
                height="100%"
                position="absolute"
                top="0"
                left="80%"
                bgColor="gray.700"
            ></Box>
            {/* <Box width="0.4rem" height="100%" position="absolute" top="0" left="20%" ></Box> */}
        </HStack>
    );
}
