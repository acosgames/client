import {
    Button,
    Heading,
    VStack,
    Text,
    HStack,
    Card,
    CardBody,
    Box,
} from "@chakra-ui/react";
import config from "../../config/index.js";
import AchievementIcon from "./AchievementIcon.jsx";
import AchievementExperienceBar from "./AchievementExperienceBar.jsx";

export default function AchievementPanel({
    achievement,
    progress,
    // name,
    // desc,
    // index,
    // value,
    // maxValue,
    interval,
}) {
    let {
        achievement_name,
        achievement_description,
        achievement_icon,
        award_item,
        award_xp,
        award_gamepoints,
        award_badge,
    } = achievement;

    // let value = 1;
    // let maxValue = 1;

    let color = "gray.20";

    let { value, maxValue, percent } = calculateAchievementProgress(
        achievement,
        progress
    );

    // let percent = (value / maxValue) * 100;

    if (percent >= 100) color = "brand.300";
    else if (percent > 0) color = "brand.900";

    return (
        <Card w="100%" mt="0" height="250px">
            <CardBody pt="1.5rem" display="flex" flexDir={"column"}>
                <VStack spacing="0" pr="0.5rem">
                    <AchievementIcon
                        index={achievement_icon}
                        percent={percent}
                    />
                    <VStack alignItems={"center"} mb="0.5rem">
                        <Heading
                            as="h4"
                            fontSize="1.4rem"
                            fontWeight="500"
                            color={"gray.0"}
                            textAlign={"center"}
                        >
                            {achievement_name}
                        </Heading>
                        <Heading
                            as="h5"
                            fontSize="1.2rem"
                            fontWeight={"normal"}
                            color={"gray.10"}
                            textAlign={"center"}
                            // whiteSpace={"nowrap"}
                            overflow={"hidden"}
                            textOverflow={"ellipsis"}
                            maxHeight="3.6rem"
                        >
                            {achievement_description}
                        </Heading>
                    </VStack>
                </VStack>
                <VStack
                    flex="1"
                    px="0rem"
                    mt="0.5rem"
                    w="100%"
                    spacing="0"
                    justifyContent={"flex-end"}
                >
                    <AmountRemaining
                        achievement={achievement}
                        progress={progress}
                        value={value}
                        maxValue={maxValue}
                        percent={percent}
                    />
                    <Box h="1rem"></Box>
                    <AchievementExperienceBar percent={percent} />
                </VStack>
            </CardBody>
        </Card>
    );
}

function calculateAchievementProgress(achievement, progress) {
    let {
        stat_slug1,
        goal1_valueTYPE,
        goal1_valueINT,
        goal1_valueFLOAT,
        goal1_valueSTRING,
        stat_slug2,
        goal2_valueTYPE,
        goal2_valueINT,
        goal2_valueFLOAT,
        goal2_valueSTRING,
        stat_slug3,
        goal3_valueTYPE,
        goal3_valueINT,
        goal3_valueFLOAT,
        goal3_valueSTRING,
        all_required,
        times_in_a_row,
    } = achievement;

    let {
        stat1_valueINT,
        stat1_valueFLOAT,
        stat1_valueSTRING,
        stat2_valueINT,
        stat2_valueFLOAT,
        stat2_valueSTRING,
        stat3_valueINT,
        stat3_valueFLOAT,
        stat3_valueSTRING,
        played,
    } = progress;

    // use cases:
    // 1) All stats required, in one match
    // 2) All stats required, repeated multiple matches
    // 3) Any stats required, in one match
    // 4) Any stats required, repeated multiple matches

    let status = [];

    if (Number.isInteger(times_in_a_row) && times_in_a_row > 0) {
        let value = played || 0;
        let maxValue = times_in_a_row;
        let percent = (value / maxValue) * 100;
        return { value, maxValue, percent };
    }

    if (stat_slug1) {
        let stat1progress = calculateStatProgress(
            stat_slug1,
            goal1_valueTYPE,
            goal1_valueINT,
            goal1_valueFLOAT,
            goal1_valueSTRING,
            stat1_valueINT,
            stat1_valueFLOAT,
            stat1_valueSTRING,
            times_in_a_row,
            played
        );
        if (stat1progress) status.push(stat1progress);
    }
    if (stat_slug2) {
        let stat2progress = calculateStatProgress(
            stat_slug2,
            goal2_valueTYPE,
            goal2_valueINT,
            goal2_valueFLOAT,
            goal2_valueSTRING,
            stat2_valueINT,
            stat2_valueFLOAT,
            stat2_valueSTRING,
            times_in_a_row,
            played
        );
        if (stat2progress) status.push(stat2progress);
    }
    if (stat_slug3) {
        let stat3progress = calculateStatProgress(
            stat_slug3,
            goal3_valueTYPE,
            goal3_valueINT,
            goal3_valueFLOAT,
            goal3_valueSTRING,
            stat3_valueINT,
            stat3_valueFLOAT,
            stat3_valueSTRING,
            times_in_a_row,
            played
        );
        if (stat3progress) status.push(stat3progress);
    }

    let value = 0;
    let maxValue = 0;
    let percent = 0;

    if (!all_required) {
        //sum all the stat values, they should be of same type
        value = status.reduce(
            (total, curr) => (curr === false ? total : total + curr.value),
            0
        );
        //use the largest max goal of the stats
        maxValue = status.reduce(
            (total, curr) => (curr.maxValue >= total ? curr.maxValue : total),
            0
        );
        if (Number.isNaN(value)) value = 0;
        if (Number.isNaN(maxValue)) maxValue = 1;
        percent = (value / maxValue) * 100;
    } else {
        //only percentage matters here
        //value and maxValue will be displayed for each stat individually in achievement panel
        status = status.filter((s) => s !== false);
        percent = status.reduce((total, curr) => total + curr.percent, 0);
        // percent = percent / status.length;
        value = 0;
        maxValue = 1;
    }

    // let maxValue = status.length;
    // let value = status.reduce((total, s) => (s == true ? total + 1 : total), 0);
    // let percent = (value / maxValue) * 100;
    return { value, maxValue, percent };
}

function calculateStatProgress(
    stat_slug,
    goal_valueTYPE,
    goal_valueINT,
    goal_valueFLOAT,
    goal_valueSTRING,
    stat_valueINT,
    stat_valueFLOAT,
    stat_valueSTRING,
    times_in_a_row,
    played
) {
    //no negative numbers
    //0 = infinite matches to reach goal
    //1+ = must repeat goal for X matches
    times_in_a_row = Math.max(0, times_in_a_row);

    //player must reach the target for X matches, so just count how many times they've reached it
    if (Number.isInteger(times_in_a_row) && times_in_a_row > 0) {
        let value = played || 0;
        let maxValue = times_in_a_row;
        let percent = (value / maxValue) * 100;
        return { value, maxValue, percent };
    }

    //player has to accumilate over 1 or more matches, calculate percentage of goal reached
    switch (goal_valueTYPE) {
        case 0: //integer
        case 4: {
            //string count
            let value = stat_valueINT || 0;
            let maxValue = goal_valueINT;
            let percent = (value / maxValue) * 100;
            return { value, maxValue, percent };
        }
        case 1: //float
        case 2: //average
        case 3: {
            //time
            let value = stat_valueFLOAT || 0;
            let maxValue = goal_valueFLOAT;
            let percent = (value / maxValue) * 100;
            return { value, maxValue, percent };
        }
    }
    return false;
}

function AmountRemaining({ value, maxValue, percent, achievement, progress }) {
    if (percent >= 100) {
        return (
            <Heading
                as="h6"
                fontSize="1.2rem"
                fontWeight="300"
                color={"gray.20"}
            >
                Completed
            </Heading>
        );
    }

    if (
        achievement.all_required &&
        Number.isInteger(achievement.times_in_a_row) &&
        achievement.times_in_a_row == 0
    ) {
        return (
            <>
                {achievement.stat_slug1 && (
                    <Heading
                        as="h6"
                        fontSize="1.2rem"
                        fontWeight="300"
                        color={"gray.50"}
                    >
                        <Text as="span" pr="0.5rem">
                            {achievement.stat_name1}
                        </Text>{" "}
                        {achievement.goal1_valueTYPE == 4 && (
                            <>({achievement.goal1_valueSTRING}) </>
                        )}
                        <Text as="span" fontWeight="500" color="gray.30">
                            {achievement.goal1_valueTYPE == 0 ||
                            achievement.goal1_valueTYPE == 4
                                ? progress.stat1_valueINT || 0
                                : progress.stat1_valueFLOAT || 0}
                        </Text>{" "}
                        of{" "}
                        {achievement.goal1_valueTYPE == 0 ||
                        achievement.goal1_valueTYPE == 4
                            ? achievement.goal1_valueINT || 0
                            : achievement.goal1_valueFLOAT || 0}
                    </Heading>
                )}

                {achievement.stat_slug2 && (
                    <Heading
                        as="h6"
                        fontSize="1.2rem"
                        fontWeight="300"
                        color={"gray.50"}
                    >
                        <Text as="span" pr="0.5rem">
                            {achievement.stat_name2}
                        </Text>{" "}
                        {achievement.goal2_valueTYPE == 4 && (
                            <>({achievement.goal2_valueSTRING}) </>
                        )}
                        <Text as="span" fontWeight="500" color="gray.30">
                            {achievement.goal2_valueTYPE == 0 ||
                            achievement.goal2_valueTYPE == 4
                                ? progress.stat2_valueINT || 0
                                : progress.stat2_valueFLOAT || 0}
                        </Text>{" "}
                        of{" "}
                        {achievement.goal2_valueTYPE == 0 ||
                        achievement.goal2_valueTYPE == 4
                            ? achievement.goal2_valueINT || 0
                            : achievement.goal2_valueFLOAT || 0}
                    </Heading>
                )}

                {achievement.stat_slug3 && (
                    <Heading
                        as="h6"
                        fontSize="1.2rem"
                        fontWeight="300"
                        color={"gray.50"}
                    >
                        <Text as="span" pr="0.5rem">
                            {achievement.stat_name3}
                        </Text>{" "}
                        {achievement.goal3_valueTYPE == 4 && (
                            <>({achievement.goal3_valueSTRING}) </>
                        )}
                        <Text as="span" fontWeight="500" color="gray.30">
                            {achievement.goal3_valueTYPE == 0 ||
                            achievement.goal3_valueTYPE == 4
                                ? progress.stat3_valueINT || 0
                                : progress.stat3_valueFLOAT || 0}
                        </Text>{" "}
                        of{" "}
                        {achievement.goal3_valueTYPE == 0 ||
                        achievement.goal3_valueTYPE == 4
                            ? achievement.goal3_valueINT || 0
                            : achievement.goal3_valueFLOAT || 0}
                    </Heading>
                )}
            </>
        );
    }

    value = Math.min(value, maxValue);

    if (achievement.goal1_valueTYPE == 2) {
        return (
            <>
                <Heading
                    as="h6"
                    fontSize="1.2rem"
                    fontWeight="300"
                    color={"gray.50"}
                >
                    <Text as="span">Best: </Text>
                    <Text as="span" fontWeight="500" color="gray.20">
                        {value}
                    </Text>
                </Heading>
                <Heading
                    as="h6"
                    fontSize="1.2rem"
                    fontWeight="300"
                    color={"gray.50"}
                >
                    <Text as="span">Goal: </Text>
                    <Text as="span" fontWeight="500">
                        {maxValue}
                    </Text>
                </Heading>
            </>
        );
    }

    return (
        <Heading as="h6" fontSize="1.2rem" fontWeight="300" color={"gray.50"}>
            <Text as="span" fontWeight="500" color="gray.20">
                {value}
            </Text>{" "}
            of {maxValue}
        </Heading>
    );
}

function chooseValueAndMax(
    goal_valueTYPE,
    goal_valueINT,
    goal_valueFLOAT,
    stat_valueINT,
    stat_valueFLOAT
) {
    switch (goal_valueTYPE) {
        case 0:
        case 4:
            return { value: stat_valueINT, maxValue: goal_valueINT };
        case 1:
        case 2:
        case 3:
            return { value: stat_valueFLOAT, maxValue: goal_valueFLOAT };
    }
}
