import { Grid, HStack, Heading, Text, VStack } from "@chakra-ui/react";

import AchievementPanel from "../../layout/components/achievement/AchievementPanel.jsx";

export function GameActiveAchievements({}) {
    let achievements = [];
    for (let i = 35; i <= 36; i++) {
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
            pb="10rem"
            h="100%"
            w={["100%", "100%", "100%", "100%", "1000px"]}
            display={"flex"}
            flexDir="column"
        >
            <Heading
                as="h2"
                color="gray.0"
                fontSize={["2.4rem", "2.4rem", "3rem"]}
                fontWeight={"600"}
            >
                Achievements
            </Heading>
            <Grid
                width="100%"
                templateColumns={{
                    // sm: "repeat(2, 0.25fr)",
                    lg: "0.5fr  0.5fr",
                }}
                gap="2rem"
                mb={{ lg: "26px" }}
            >
                {achievements}
            </Grid>
        </VStack>
    );
}
