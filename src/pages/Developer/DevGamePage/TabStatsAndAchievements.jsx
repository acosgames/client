import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Checkbox,
    Grid,
    Heading,
    HStack,
    Icon,
    IconButton,
    Image,
    Spinner,
    Text,
    Tooltip,
    VStack,
} from "@chakra-ui/react";
import { useBucket } from "../../../actions/bucket";
import {
    btAchievementForm,
    btAchievementIconId,
    btDevGame,
    btEditAchievement,
    btFormFields,
    btIsChooseAchievementIcon,
    btShowCreateAchievement,
} from "../../../actions/buckets";
import FSGTextInput from "../../../components/widgets/inputs/FSGTextInput";

import config from "../../../config";

import schema from "shared/model/schema.json";
import { MdEdit } from "react-icons/md";
import { FaCopy, FaRandom } from "react-icons/fa";
import { useEffect } from "react";
import AchievementPanel from "../../../components/achievement/AchievementPanel";

export default function TabStatsAndAchievements({}) {
    // let devgame = useBucket(btDevGame);
    let devgame = btDevGame.get();
    let achievements = devgame.achievements || [];

    let stats = devgame?.stats;
    if (!stats) {
        return <></>;
    }

    const onSubmit = () => {};
    return (
        <Grid
            templateColumns={{ sm: "1fr", md: "1fr", lg: "0.3fr 0.7fr " }}
            // templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
            gap="2rem"
            mb={{ lg: "26px" }}
        >
            <Card w="100%" pb="2rem">
                <CardHeader>
                    <Heading as="h3" fontSize="1.8rem">
                        Stats
                    </Heading>
                </CardHeader>
                <CardBody>
                    <VStack gap="2rem">
                        {stats.map((stat) => (
                            <StatDisplay key={"stat-display-" + stat.stat_slug} {...stat} />
                        ))}
                    </VStack>
                </CardBody>
            </Card>
            <Box w="100%">
                <Card w="100%" pb="0rem">
                    <CardHeader>
                        <Heading as="h3" fontSize="1.8rem">
                            Achievements
                        </Heading>
                    </CardHeader>
                    <CardBody>
                        <VStack gap="2rem">
                            <Button
                                bgColor="blue.500"
                                color="gray.0"
                                fontWeight="500"
                                fontSize="1.6rem"
                                p="2rem"
                                onClick={() => {
                                    btShowCreateAchievement.set(true);
                                    btAchievementIconId.set(null);
                                }}
                            >
                                Create New
                            </Button>
                        </VStack>
                    </CardBody>
                </Card>
                <Grid
                    width="100%"
                    templateColumns={{
                        // sm: "repeat(2, 0.25fr)",
                        // lg: "0.333fr  0.333fr 0.333fr",
                        lg: "1fr",
                    }}
                    gap="0rem"
                    mb={{ lg: "26px" }}
                >
                    {achievements.map((a, i) => (
                        <Box
                            key={"dev-achievement-panel-" + a.achievement_slug}
                            w="auto"
                            position="relative"
                        >
                            <Tooltip label="Edit" placement="top">
                                <IconButton
                                    position="absolute"
                                    w="2rem"
                                    h="2rem"
                                    top="0rem"
                                    right="-1rem"
                                    zIndex="3"
                                    color="gray.20"
                                    icon={<MdEdit color="gray.20" />}
                                    onClick={() => {
                                        btAchievementForm.set({});
                                        btShowCreateAchievement.set(true);
                                        btEditAchievement.set(a);
                                        btAchievementIconId.set(a?.achievement_icon);
                                    }}
                                ></IconButton>
                            </Tooltip>
                            <Tooltip label="Duplicate" placement="top">
                                <IconButton
                                    position="absolute"
                                    w="2rem"
                                    h="2rem"
                                    top="2.5rem"
                                    right="-1rem"
                                    zIndex="3"
                                    color="gray.20"
                                    icon={<FaCopy color="gray.20" fontSize="1.4rem" />}
                                    onClick={() => {
                                        btAchievementForm.set({});
                                        btShowCreateAchievement.set(true);
                                        let newForm = { ...a };
                                        if (newForm?.achievement_slug) {
                                            delete newForm.achievement_slug;
                                        }
                                        btAchievementForm.assign(newForm);
                                        btAchievementIconId.set(a?.achievement_icon);
                                    }}
                                ></IconButton>
                            </Tooltip>
                            <AchievementPanel
                                key={"achievement-" + i}
                                index={i}
                                achievement={a}
                                progress={{}}
                                // name={a.achievement_name}
                                // desc={a.achievement_description}
                                // value={Math.floor(Math.random() * 6)}
                                // maxValue={5}
                            />
                        </Box>
                    ))}
                </Grid>
            </Box>
        </Grid>
    );
}

function StatDisplay({
    stat_slug,
    stat_name,
    stat_desc,
    stat_abbreviation,
    isactive,
    scoreboard,
    stat_order,
    valueTYPE,
}) {
    let typeName = "n/a";
    switch (valueTYPE) {
        case 0:
            typeName = "Integer";
            break;
        case 1:
            typeName = "Float";
            break;
        case 2:
            typeName = "Average";
            break;
        case 3:
            typeName = "Time";
            break;
        // case 4:
        //     typeName = "String Count";
        //     break;
    }
    return (
        <VStack
            alignItems={"flex-start"}
            w="100%"
            pb="1rem"
            spacing="0.rem"
            borderBottom="1px solid"
            borderBottomColor={"gray.600"}
        >
            <HStack spacing="0">
                <Text as="span" w="5rem" fontWeight="600" textAlign={"center"}>
                    {stat_abbreviation}
                </Text>
                <Text as="span" fontWeight="600">
                    {stat_name}
                </Text>
            </HStack>
            <VStack alignItems={"flex-start"} ml="5rem" spacing="0">
                <Text py="0.25rem" as="span" fontWeight="300" color="gray.10">
                    {stat_desc}
                </Text>
                <Text as="span" fontSize="1.3rem" fontWeight="400" color="gray.50">
                    {typeName}
                </Text>
                <HStack>
                    <Checkbox
                        size="lg"
                        disabled={true}
                        defaultChecked={isactive ? true : false}
                    ></Checkbox>
                    <Text as="span" color="gray.50" fontSize="1.2rem" fontWeight="400">
                        Active
                    </Text>
                </HStack>
                <HStack>
                    <Checkbox
                        size="lg"
                        isDisabled={true}
                        defaultChecked={scoreboard == 1 ? true : false}
                    ></Checkbox>
                    <Text as="span" color="gray.50" fontSize="1.2rem" fontWeight="400">
                        Scoreboard
                    </Text>
                </HStack>
            </VStack>
        </VStack>
    );
}
