import { HStack, Heading, Text, VStack } from "@chakra-ui/react";

import AchievementPanel from "../../layout/components/achievement/AchievementPanel.jsx";

export function GameActiveAchievements({}) {
  let achievements = [];
  for (let i = 40; i <= 40; i++) {
    achievements.push(
      <AchievementPanel
        key={"achievement" + i}
        index={i}
        name={"Top Dawg"}
        desc={"Win 5 Games"}
        value={Math.floor(Math.random() * 6)}
        maxValue={5}
      />
    );
  }

  return (
    <VStack
      pt="2rem"
      h="100%"
      display={achievements.length > 0 ? "flex" : "none"}
    >
      <VStack
        w="100%"
        alignItems={"center"}
        pb="1rem"
        _after={{
          content: '""',
          display: "block",
          clipPath: "polygon(0% 0%, 100% 0%, 93.846% 100%, 6.154% 100%, 0% 0%)",
          width: "65px",
          height: "5px",
          margin: "0.5rem 0 0",
          background: "brand.300",
        }}
      >
        <Text
          as="span"
          color="brand.300"
          //   letterSpacing={"2px"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          fontSize={["1.2rem", "1.2rem", "1.4rem"]}
        >
          ACTIVE
        </Text>
        <Heading
          as="h2"
          color="gray.0"
          fontSize={["2.4rem", "2.4rem", "3rem"]}
          fontWeight={"600"}
        >
          Achievements
        </Heading>
      </VStack>
      <HStack
        flexWrap="wrap"
        w="100%"
        alignItems={"center"}
        justifyContent={"center"}
        flex="1 0 100%"
      >
        {achievements}
      </HStack>
    </VStack>
  );
}
