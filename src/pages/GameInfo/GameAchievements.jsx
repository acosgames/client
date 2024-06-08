import { Grid, HStack, Heading, Text, VStack } from "@chakra-ui/react";

import AchievementPanel from "../../components/achievement/AchievementPanel.jsx";
import { useBucket } from "../../actions/bucket.js";
import { btGame } from "../../actions/buckets.js";

export function GameActiveAchievements({}) {
    let game = useBucket(btGame);

    let elemAchievements = [];
    let gameAchievements = game?.achievements || [];

    for (let i = 0; i < gameAchievements.length; i++) {
        elemAchievements.push(
            <AchievementPanel
                key={"achievement" + i}
                index={i}
                achievement={gameAchievements[i]}
                progress={gameAchievements[i]}
                // name={"Top Dawg"}
                // desc={"Win 5 Games"}
                // value={Math.floor(Math.random() * 6)}
                // maxValue={5}
            />
        );
    }

    return (
        <VStack
            pt="4rem"
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
                Season Achievements
            </Heading>
            <Grid
                mt="2rem"
                width="100%"
                templateColumns={{
                    // sm: "repeat(2, 0.25fr)",
                    // sm: "0.5fr 0.5fr",
                    // md: "0.5fr 0.5fr",
                    // lg: "0.333fr 0.333fr 0.333fr",
                    lg: "1fr",
                    xl: "0.5fr 0.5fr",
                }}
                gap="2rem"
                mb={{ lg: "26px" }}
            >
                {elemAchievements}
            </Grid>
        </VStack>
    );
}
