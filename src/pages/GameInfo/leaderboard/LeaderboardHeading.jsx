import { Heading, Text, VStack } from "@chakra-ui/react";

export function LeaderboardHeading({ subtitle, caption, children }) {
  return (
    <VStack
      w="100%"
      alignItems={"center"}
      pt="2rem"
      pb="1rem"
      // bgColor="gray.875"
      // bg="linear-gradient(to right, var(--chakra-colors-gray-1200) 75%, var(--chakra-colors-gray-875))"
    >
      <Heading as="h2" color="gray.10" fontSize={["2.2rem"]} fontWeight={"500"}>
        {children}
      </Heading>
      {subtitle && (
        <Heading
          as="h3"
          color="gray.100"
          fontSize={["1.6rem", "1.6rem", "2rem"]}
          fontWeight={"500"}
        >
          {subtitle}
        </Heading>
      )}
      {caption && (
        <Heading
          as="h4"
          color="gray.25"
          fontSize={["1.4rem", "1.4rem", "1.8rem"]}
          fontWeight={"500"}
        >
          {caption}
        </Heading>
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
