import { Heading, Text, VStack } from "@chakra-ui/react";

export function LeaderboardHeading({ subtitle, caption, children }) {
    return (
        <VStack
            w="100%"
            alignItems={"flex-start"}
            pt="2rem"
            pb="1rem"
            pl="2rem"
            spacing="0"
            // bgColor="gray.875"
            // bg="linear-gradient(to right, var(--chakra-colors-gray-1200) 75%, var(--chakra-colors-gray-875))"
        >
            <Heading
                fontSize={["2.4rem"]}
                fontWeight="400"
                letterSpacing={"1px"}
                color="gray.0"
                lineHeight={"3.2rem"}
            >
                {children}
            </Heading>
            {subtitle && (
                <Text
                    as="h3"
                    color="brand.50"
                    fontSize={["1.8rem"]}
                    fontWeight={"400"}
                    lineHeight="2.6rem"
                >
                    {subtitle}
                </Text>
            )}
            {caption && (
                <Text
                    as="h4"
                    color="brand.100"
                    fontSize={["1.6rem", "1.6rem", "1.6rem"]}
                    fontWeight={"400"}
                    // bgColor="gray.300"
                    // borderRadius={"2rem"}
                    // p="1rem"
                    py="0.5rem"
                    pb="1rem"
                >
                    {caption}
                </Text>
            )}
        </VStack>
    );
}

function indicator(i) {
    i = Math.abs(i);
    const cent = i % 100;
    if (cent >= 10 && cent <= 20) return "th";
    const dec = i % 10;
    if (dec === 1) return "st";
    if (dec === 2) return "nd";
    if (dec === 3) return "rd";
    return "th";
}

export function TopRankNumber({ rank }) {
    if (rank > 4) {
        return <Text as="span">{rank}</Text>;
    }
    return (
        <>
            <Text as="span" fontSize="2rem">
                {rank}
            </Text>
            <Text as="span" fontSize="1rem" pl="0.1rem" position="relative" bottom="0.1rem">
                {indicator(rank)}
            </Text>
        </>
    );
    if (rank == 1)
        return (
            <>
                <Text as="span">1</Text>
                <Text as="span" fontSize="1.2rem">
                    st
                </Text>
            </>
        );

    if (rank == 2)
        return (
            <>
                <Text as="span">2</Text>
                <Text as="span" fontSize="1.2rem">
                    nd
                </Text>
            </>
        );

    if (rank == 3)
        return (
            <>
                <Text as="span">3</Text>
                <Text as="span" fontSize="1.2rem">
                    rd
                </Text>
            </>
        );

    return <Text as="span">{rank}</Text>;
}
