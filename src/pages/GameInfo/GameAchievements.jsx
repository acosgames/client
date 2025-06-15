import { Grid, HStack, Heading, Text, VStack } from "@chakra-ui/react";

import AchievementPanel from "../../components/achievement/AchievementPanel.jsx";
import { useBucket } from "../../actions/bucket.js";
import { btAchievementAward, btGame } from "../../actions/buckets.js";
import {
    OverlayFrame,
    XPLineItems,
    XPProgress,
} from "../GameScreen/OverlayScreens/ModalGameOver.jsx";

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
            <AwardChooser />
            <Heading
                as="h2"
                color="gray.0"
                fontSize={["2.4rem", "2.4rem", "3rem"]}
                fontWeight={"600"}
            >
                Complete the Challenges
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

function AwardChooser({}) {
    let award = useBucket(btAchievementAward);

    if (award?.type == "award_xp") {
        return <AwardXP xp={award} />;
    }
}

function AwardXP({ xp }) {
    return (
        <OverlayFrame
            title={"Experience"}
            bgColor="gray.900"
            onActionClick={() => {
                // gamepanel.showGameover = false;
                // gamepanel.closeOverlay = true;
                // updateGamePanel(gamepanel);
                btAchievementAward.set(null);
            }}
            actionTitle={"Close"}
            // duration={6}
        >
            <VStack my="4rem" mx="0rem">
                <XPProgress {...xp} />
                <XPLineItems
                    hideTotal={true}
                    experience={xp.experience}
                    points={xp.points}
                    level={xp.level}
                />
            </VStack>
        </OverlayFrame>
    );
}
