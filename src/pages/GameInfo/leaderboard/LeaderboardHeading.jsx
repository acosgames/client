import { Heading, Text, VStack } from "@chakra-ui/react";

export function LeaderboardHeading({ subtitle, caption, children }) {
    return (
        <VStack
            w="100%"
            alignItems={"flex-start"}
            pt="2rem"
            pb="2rem"
            pl="2rem"
            spacing="0"
            // bgColor="gray.875"
            // bg="linear-gradient(to right, var(--chakra-colors-gray-1200) 75%, var(--chakra-colors-gray-875))"
        >
            <Heading
                fontSize={["2.4rem"]}
                fontWeight="700"
                color="gray.0"
                lineHeight={"3.2rem"}
            >
                {children}
            </Heading>
            {subtitle && (
                <Text
                    as="h3"
                    color="gray.50"
                    fontSize={["1.4rem", "1.4rem", "1.4rem"]}
                    fontWeight={"500"}
                    lineHeight="2rem"
                >
                    {subtitle}
                </Text>
            )}
            {caption && (
                <Text
                    as="h4"
                    color="gray.0"
                    fontSize={["1.6rem", "1.6rem", "1.6rem"]}
                    fontWeight={"600"}
                    // bgColor="gray.300"
                    // borderRadius={"2rem"}
                    // p="1rem"
                    py="0.5rem"
                >
                    {caption}
                </Text>
            )}
        </VStack>
    );
}

export function TopRankNumber({ rank }) {
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
