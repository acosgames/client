import {
    Button,
    Heading,
    VStack,
    Text,
    HStack,
    Card,
    CardBody,
    Box,
    Spinner,
} from "@chakra-ui/react";
import config from "../../config/index.js";
import AchievementIcon from "./AchievementIcon.jsx";
import AchievementExperienceBar from "./AchievementExperienceBar.jsx";

function AchievementReward({ achievement, percent }) {
    let opacity = 0.3;
    let color = "gray.400";
    if (percent >= 100) {
        color = "gray.0";
        opacity = 1;
    } else if (percent > 0) {
        color = "gray.100";
        opacity = 0.5;
    }

    const renderReward = () => {
        if (typeof achievement.award_xp !== "undefined") {
            return (
                <VStack
                    spacing="0"
                    justifyContent={"center"}
                    alignItems={"center"}
                    w="100%"
                    pt="0.5rem"
                >
                    <Text
                        as="span"
                        fontWeight="bold"
                        fontSize="1.8rem"
                        lineHeight="1rem"
                        color="yellow.100"
                        pl="0.25rem"
                    >
                        XP
                    </Text>
                    <Text
                        as="span"
                        fontWeight="600"
                        fontSize="1.4rem"
                        color="gray.0"
                    >
                        {achievement.award_xp}
                    </Text>
                </VStack>
            );
        }
        return <></>;
    };

    return (
        <VStack
            // w="6rem"
            // h="6rem"
            mr="1rem"
            position="relative"
            zIndex="1"
            borderRadius={"8px"}
            bgColor="gray.1000"
            border="2px solid"
            borderColor={"gray.300"}
            spacing="0"
            justifyContent={"center"}
            alignItems={"center"}
            p="0.5rem"
        >
            <VStack opacity={opacity}>
                <Text
                    as="span"
                    // position="absolute"
                    // top="-0.5rem"
                    fontSize="1.2rem"
                    color={color}
                    fontWeight="500"
                    lineHeight="1rem"
                    // bgColor="gray.1000"
                    // borderRadius={"8px"}
                    pb="0.5rem"
                    borderBottom="1px solid"
                    borderBottomColor="gray.700"
                    // textShadow="0 0 5px black"
                >
                    REWARD
                </Text>
                {renderReward()}
            </VStack>
        </VStack>
    );
}

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
    // percent = 100;

    if (percent >= 100) color = "brand.300";
    else if (percent > 0) color = "brand.900";

    return (
        <Card w="100%" mt="0">
            <CardBody p="1rem" display="flex" flexDir={"row"}>
                <HStack
                    spacing="0"
                    w="100%"
                    className="hstack-all"
                    alignItems={"flex-start"}
                >
                    {/* <AchievementIcon
                        index={achievement_icon}
                        percent={percent}
                    /> */}

                    <VStack w="100%" justifyContent={"flex-start"} h="100%">
                        <HStack
                            className="hstack-content"
                            w="100%"
                            alignItems={"flex-end"}
                            justifyContent={"flex-end"}
                            height="100%"
                        >
                            <VStack
                                pl="1rem"
                                spacing="0.1rem"
                                alignItems={"flex-start"}
                                maxW={percent < 100 ? "60%" : "100%"}
                                alignSelf={"flex-start"}
                                justifySelf={"flex-start"}
                            >
                                <Heading
                                    as="h4"
                                    fontSize="1.6rem"
                                    fontWeight="600"
                                    color={"gray.0"}
                                    textAlign={"left"}
                                >
                                    {achievement_name}
                                </Heading>
                                <Heading
                                    as="h5"
                                    fontSize="1.2rem"
                                    fontWeight={"normal"}
                                    color={"gray.40"}
                                    textAlign={"left"}
                                    // whiteSpace={"nowrap"}
                                    overflow={"hidden"}
                                    textOverflow={"ellipsis"}
                                    maxHeight="3.6rem"
                                >
                                    {achievement_description}
                                </Heading>
                            </VStack>
                            <VStack
                                flex="1"
                                alignItems={"flex-end"}
                                position="relative"
                                top="0.5rem"
                                px="0rem"
                                pr="1rem"
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
                            </VStack>
                        </HStack>
                        <Box flex="1"></Box>
                        <Box pl="1rem" pr="1rem" w="100%">
                            <AchievementExperienceBar
                                achievement={achievement}
                                percent={percent}
                            />
                        </Box>
                    </VStack>
                    <AchievementReward
                        achievement={achievement}
                        percent={percent}
                    />
                </HStack>
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
        //sum all the stat values, they should be of same type
        value = status.reduce(
            (total, curr) =>
                curr === false
                    ? total
                    : total + Math.min(curr.value, curr.maxValue),
            0
        );
        //use the largest max goal of the stats
        maxValue = status.reduce(
            (total, curr) => (curr === false ? total : total + curr.maxValue),
            0
        );
        if (Number.isNaN(value)) value = 0;
        if (Number.isNaN(maxValue)) maxValue = 1;
        percent = (value / maxValue) * 100;
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
        case 3:
        case 4: {
            //string count
            let maxValue = goal_valueINT;
            let value = Math.min(stat_valueINT || 0, maxValue);
            let percent = (value / maxValue) * 100;
            return { value, maxValue, percent };
        }
        case 1: //float
        case 2: {
            //average
            //time
            let maxValue = goal_valueFLOAT;
            let value = Math.min(stat_valueFLOAT || 0, maxValue);
            let percent = (value / maxValue) * 100;
            return { value, maxValue, percent };
        }
    }
    return false;
}

function AmountRemaining({ value, maxValue, percent, achievement, progress }) {
    if (percent >= 100) {
        return <></>;
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
                        <Text as="span">{achievement.stat_name1}</Text>{" "}
                        {achievement.goal1_valueTYPE == 4 && (
                            <>({achievement.goal1_valueSTRING}) </>
                        )}
                        <Text
                            pl="0.5rem"
                            as="span"
                            fontWeight="500"
                            color="gray.20"
                        >
                            {achievement.goal1_valueTYPE == 0 ||
                            achievement.goal1_valueTYPE == 4
                                ? Math.min(
                                      progress.stat1_valueINT || 0,
                                      achievement.goal1_valueINT
                                  )
                                : achievement.goal1_valueTYPE == 3
                                ? Math.min(
                                      progress.stat1_valueINT || 0,
                                      achievement.goal1_valueINT
                                  ) + "s"
                                : Math.min(
                                      progress.stat1_valueFLOAT || 0,
                                      achievement.goal1_valueFLOAT
                                  )}
                        </Text>{" "}
                        /{" "}
                        {achievement.goal1_valueTYPE == 0 ||
                        achievement.goal1_valueTYPE == 4
                            ? achievement.goal1_valueINT || 0
                            : achievement.goal1_valueTYPE == 3
                            ? achievement.goal1_valueINT + "s"
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
                        <Text as="span">{achievement.stat_name2}</Text>{" "}
                        {achievement.goal2_valueTYPE == 4 && (
                            <>({achievement.goal2_valueSTRING}) </>
                        )}
                        <Text
                            pl="0.5rem"
                            as="span"
                            fontWeight="500"
                            color="gray.20"
                        >
                            {achievement.goal2_valueTYPE == 0 ||
                            achievement.goal2_valueTYPE == 4
                                ? Math.min(
                                      progress.stat2_valueINT || 0,
                                      achievement.goal2_valueINT
                                  )
                                : achievement.goal2_valueTYPE == 3
                                ? Math.min(
                                      progress.stat2_valueINT || 0,
                                      achievement.goal2_valueINT
                                  ) + "s"
                                : Math.min(
                                      progress.stat2_valueFLOAT || 0,
                                      achievement.goal2_valueFLOAT
                                  )}
                        </Text>{" "}
                        /{" "}
                        {achievement.goal2_valueTYPE == 0 ||
                        achievement.goal2_valueTYPE == 4
                            ? achievement.goal2_valueINT || 0
                            : achievement.goal2_valueTYPE == 3
                            ? achievement.goal2_valueINT + "s"
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
                        <Text as="span">{achievement.stat_name3}</Text>{" "}
                        {achievement.goal3_valueTYPE == 4 && (
                            <>({achievement.goal3_valueSTRING}) </>
                        )}
                        <Text
                            pl="0.5rem"
                            as="span"
                            fontWeight="500"
                            color="gray.20"
                        >
                            {achievement.goal3_valueTYPE == 0 ||
                            achievement.goal3_valueTYPE == 4
                                ? Math.min(
                                      progress.stat3_valueINT || 0,
                                      achievement.goal3_valueINT
                                  )
                                : achievement.goal3_valueTYPE == 3
                                ? Math.min(
                                      progress.stat3_valueINT || 0,
                                      achievement.goal3_valueINT
                                  ) + "s"
                                : Math.min(
                                      progress.stat3_valueFLOAT || 0,
                                      achievement.goal3_valueFLOAT
                                  )}
                        </Text>{" "}
                        /{" "}
                        {achievement.goal3_valueTYPE == 0 ||
                        achievement.goal3_valueTYPE == 4
                            ? achievement.goal3_valueINT || 0
                            : achievement.goal3_valueTYPE == 3
                            ? achievement.goal3_valueINT + "s"
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

    if (achievement.goal1_valueTYPE == 3) {
        return (
            <Heading
                as="h6"
                fontSize="1.2rem"
                fontWeight="300"
                color={"gray.50"}
            >
                <Text as="span" fontWeight="500" color="gray.20">
                    {Math.min(value, maxValue) + "s"}
                </Text>{" "}
                / {maxValue + "s"}
            </Heading>
        );
    }

    return (
        <Heading as="h6" fontSize="1.2rem" fontWeight="300" color={"gray.50"}>
            <Text as="span" fontWeight="500" color="gray.20">
                {Math.min(value, maxValue)}
            </Text>{" "}
            / {maxValue}
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
        case 3:
        case 4:
            return { value: stat_valueINT, maxValue: goal_valueINT };
        case 1:
        case 2:
            return { value: stat_valueFLOAT, maxValue: goal_valueFLOAT };
    }
}
