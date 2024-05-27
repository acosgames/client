import { MdEdit } from "react-icons/md";
import config from "../../../config";

import schema from "shared/model/schema.json";
import {
    btAchievementIconId,
    btDevGame,
    btAchievementForm,
    btIsChooseAchievementIcon,
    btShowCreateAchievement,
    btAchievements,
    btEditAchievement,
} from "../../../actions/buckets";
import { FaRandom } from "react-icons/fa";
import { useBucket, useBucketSelector } from "../../../actions/bucket";
import {
    Box,
    Button,
    Grid,
    HStack,
    Icon,
    IconButton,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";
import FSGTextInput from "../../../components/widgets/inputs/FSGTextInput";
import { useEffect } from "react";
import ChooseAchievementIcon from "../../../components/user/ChooseAchievementIcon";
import FSGSelect from "../../../components/widgets/inputs/FSGSelect";
import FSGNumberInput from "../../../components/widgets/inputs/FSGNumberInput";
import {
    createOrEditAchievement,
    updateGameField,
} from "../../../actions/devgame";
import FSGSwitch from "../../../components/widgets/inputs/FSGSwitch";

export function EditAchievement({}) {
    const group = "manage-achievement";

    const rules = schema[group];
    let formGroup = useBucket(btAchievementForm);

    let editAchievement = useBucket(btEditAchievement);

    let isUpdate = editAchievement?.achievement_slug;

    let all_required = useBucketSelector(
        btAchievementForm,
        (form) => form["all_required"]
    );

    // let within_one_match = useBucketSelector(
    //     btAchievementForm,
    //     (form) => form["within_one_match"]
    // );
    let show = useBucket(btShowCreateAchievement);

    formGroup = formGroup || {};

    const useValue = (id) => {
        let value = btAchievementForm.get((form) => form[id]);
        return value;
    };

    const useTarget = (id, value) => {
        btAchievementForm.assign({ [id]: value });
    };

    useEffect(() => {
        if (editAchievement) {
            btAchievementForm.assign({ ...editAchievement });
        }
    }, [isUpdate]);

    useEffect(() => {
        let form = btAchievementForm.get();
        if (!Number.isInteger(Number.parseInt(form?.times_in_a_row))) {
            btAchievementForm.assign({ times_in_a_row: 0 });
        }

        let stats = btDevGame.get()?.stats || [];
        let statMap = {};
        stats.map((s) => (statMap[s.stat_slug] = s));

        let needsUpdate = false;
        if (
            form?.stat_slug1 &&
            form?.goal1_valueTYPE != statMap[form.stat_slug1]?.valueTYPE
        ) {
            form.goal1_valueTYPE = statMap[form.stat_slug1]?.valueTYPE;
            needsUpdate = true;
        }

        if (
            form?.stat_slug2 &&
            form?.goal2_valueTYPE != statMap[form.stat_slug2]?.valueTYPE
        ) {
            form.goal2_valueTYPE = statMap[form.stat_slug2]?.valueTYPE;
            needsUpdate = true;
        }

        if (
            form?.stat_slug3 &&
            form?.goal3_valueTYPE != statMap[form.stat_slug3]?.valueTYPE
        ) {
            form.goal3_valueTYPE = statMap[form.stat_slug3]?.valueTYPE;
            needsUpdate = true;
        }

        if (needsUpdate) {
            btAchievementForm.assign({
                goal1_valueTYPE: form.goal1_valueTYPE,
                goal2_valueTYPE: form.goal2_valueTYPE,
                goal3_valueTYPE: form.goal3_valueTYPE,
            });
        }

        if (!form?.achievement_award) {
            if (form?.award_xp) {
                btAchievementForm.assign({ achievement_award: "award_xp" });
            }
            if (form?.award_gamepoints) {
                btAchievementForm.assign({
                    achievement_award: "award_gamepoints",
                });
            }
            if (form?.award_badge) {
                btAchievementForm.assign({ achievement_award: "award_badge" });
            }
            if (form?.award_item) {
                btAchievementForm.assign({ achievement_award: "award_item" });
            }
        }
    });

    const onClose = () => {
        btShowCreateAchievement.set(false);
        btEditAchievement.set(null);
        btAchievementForm.set({});
    };
    const onSubmit = async () => {
        let gameFull = await createOrEditAchievement();

        if (gameFull?.achievements) {
            btAchievements.set(gameFull.achievements);
        }

        // onClose();
    };

    return (
        <Modal
            borderRadius="8px"
            size={"2xl"}
            width="100%"
            zIndex={15}
            isOpen={show}
            onClose={(e) => {
                onClose();
                // onClose(e);
            }}
        >
            <ModalOverlay zIndex={14} />
            <ModalContent
                bg="linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-800))"
                borderRadius="8px"
                maxWidth="50rem"
                bgColor="gray.800"
            >
                <ChooseAchievementIcon
                    id={
                        btAchievementForm?.achievement_icon
                            ? btAchievementForm?.achievement_icon
                            : null
                    }
                />
                <ModalHeader
                    color="gray.0"
                    fontWeight={"600"}
                    textAlign={"center"}
                    fontSize="1.6rem"
                    pb="0"
                    py="1rem"
                >
                    Create Achievement
                </ModalHeader>
                <ModalCloseButton top="1rem" right="1rem" />
                <ModalBody
                    overflow="hidden"
                    position="relative"
                    w="100%"
                    h="100%"
                >
                    <HStack w="100%" alignItems={"flex-start"} spacing="2rem">
                        <Box w="20%">
                            <EditAchievementIcon />
                        </Box>

                        <VStack gap="0.5rem" w="100%">
                            <FSGTextInput
                                rules={group}
                                group={group}
                                name="achievement_slug"
                                id="achievement_slug"
                                title="Slug"
                                disabled={isUpdate ? true : false}
                                maxLength="60"
                                uppercase={true}
                                required={rules["achievement_slug"].required}
                                useValue={useValue}
                                useTarget={useTarget}
                            />

                            <FSGTextInput
                                rules={group}
                                group={group}
                                name="achievement_name"
                                id="achievement_name"
                                title="Name"
                                maxLength="60"
                                required={rules["achievement_name"].required}
                                useValue={useValue}
                                useTarget={useTarget}
                            />

                            <FSGTextInput
                                type="text"
                                rules={group}
                                group={group}
                                name="achievement_description"
                                id="achievement_description"
                                title="Description"
                                maxLength="120"
                                required={
                                    rules["achievement_description"].required
                                }
                                useValue={useValue}
                                useTarget={useTarget}
                            />

                            <VStack
                                w="100%"
                                borderTop="1px solid"
                                borderTopColor="gray.500"
                                mt="0.5rem"
                                pt="1rem"
                                alignItems={"flex-start"}
                                spacing="2rem"
                            >
                                <Text
                                    as="span"
                                    display="block"
                                    fontSize="1.8rem"
                                    color="gray.0"
                                >
                                    Goals
                                </Text>

                                <StatGoalInput
                                    id={1}
                                    title="Stat #1"
                                    name="stat_slug1"
                                />
                                <StatGoalInput
                                    id={2}
                                    title="Stat #2"
                                    name="stat_slug2"
                                />
                                <StatGoalInput
                                    id={3}
                                    title="Stat #3"
                                    name="stat_slug3"
                                />
                            </VStack>
                            <Box mt="1rem">
                                <FSGSwitch
                                    type="boolean"
                                    name="all_required"
                                    id="all_required"
                                    rules={group}
                                    group={group}
                                    title={
                                        all_required
                                            ? "All Goals Required"
                                            : "Any of the Goals"
                                    }
                                    min="0"
                                    horizontal={true}
                                    max="1"
                                    required={rules["all_required"].required}
                                    useValue={useValue}
                                    useTarget={useTarget}
                                />

                                {/* <FSGSwitch
                                    type="boolean"
                                    name="within_one_match"
                                    id="within_one_match"
                                    rules={group}
                                    group={group}
                                    title={"In a single match?"}
                                    min="0"
                                    horizontal={true}
                                    max="1"
                                    required={
                                        rules["within_one_match"].required
                                    }
                                    useValue={useValue}
                                    useTarget={useTarget}
                                />
                                {within_one_match && ( */}
                                <FSGNumberInput
                                    rules={group}
                                    group={group}
                                    name={`times_in_a_row`}
                                    id={`times_in_a_row`}
                                    integer={true}
                                    min={0}
                                    max={1000}
                                    title={"Repeat for X matches in a row"}
                                    helperText={
                                        "0=infinite matches to reach goal"
                                    }
                                    maxLength="3"
                                    required={rules[`times_in_a_row`].required}
                                    useValue={useValue}
                                    useTarget={useTarget}
                                />
                                {/* )} */}
                            </Box>
                            <Box
                                w="100%"
                                borderBottom="1px solid"
                                borderBottomColor="gray.500"
                            ></Box>
                            <Box w="100%">
                                <StatAwardInput />
                            </Box>
                        </VStack>
                    </HStack>
                </ModalBody>

                <ModalFooter>
                    <Button
                        bgColor="blue.500"
                        color="gray.0"
                        fontWeight="500"
                        fontSize="1.6rem"
                        p="2rem"
                        onClick={() => {
                            onSubmit();
                        }}
                    >
                        {isUpdate ? "Update" : "Create"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

function StatAwardInput({}) {
    let achievement_award = useBucketSelector(
        btAchievementForm,
        (form) => form["achievement_award"]
    );

    const group = "manage-achievement";

    const rules = schema[group];

    const useValue = (id) => {
        let value = btAchievementForm.get((form) => form[id]);
        return value;
    };

    const useTarget = (id, value) => {
        btAchievementForm.assign({ [id]: value });
    };

    const renderAwardInput = () => {
        switch (achievement_award) {
            case "award_item":
                return <></>;
            case "award_xp":
                return (
                    <FSGNumberInput
                        rules={group}
                        group={group}
                        name={`award_xp`}
                        id={`award_xp`}
                        title={"XP Amount"}
                        titleFontSize="1.2rem"
                        titleColor="gray.20"
                        step={1}
                        integer={true}
                        required={rules[`award_xp`].required}
                        useValue={useValue}
                        useTarget={useTarget}
                    />
                );
            case "award_gamepoints":
                return (
                    <FSGNumberInput
                        rules={group}
                        group={group}
                        name={`award_gamepoints`}
                        id={`award_gamepoints`}
                        title={"Points Amount"}
                        titleFontSize="1.2rem"
                        titleColor="gray.20"
                        step={1}
                        integer={true}
                        required={rules[`award_gamepoints`].required}
                        useValue={useValue}
                        useTarget={useTarget}
                    />
                );
            case "award_badge":
                return <></>;
        }

        return <></>;
    };

    return (
        <>
            <FSGSelect
                title={"Awards"}
                rules={group}
                group={group}
                id={"achievement_award"}
                name={"achievement_award"}
                color="gray.100"
                placeholder={""}
                w="100%"
                // value={goalValue}
                options={[
                    <option value="-1"> -- </option>,
                    <option disabled value="award_item">
                        Item
                    </option>,
                    <option value="award_xp">XP</option>,
                    <option value="award_gamepoints">Game Points</option>,
                    <option disabled value="award_badge">
                        Badge
                    </option>,
                ]}
                useValue={useValue}
                useTarget={useTarget}
            />
            {renderAwardInput()}
        </>
    );
}

function StatGoalInput({ title, name, id }) {
    const group = "manage-achievement";

    const rules = schema[group];
    let stats = useBucketSelector(btDevGame, (game) => game?.stats);
    stats = stats || [];

    let goalValue = useBucketSelector(
        btAchievementForm,
        (form) => form[name],
        () => false
    );

    const useValue = (id) => {
        let value = btAchievementForm.get((form) => form[id]);
        return value;
    };

    const useTarget = (id, value) => {
        btAchievementForm.assign({ [id]: value });
    };

    const goalOptions = (index) => {
        let options = stats.map((stat) => (
            <option
                key={"statgoal-option-" + stat.stat_slug}
                value={stat.stat_slug}
            >
                {stat.stat_name}
            </option>
        ));

        let nullOption = [
            <option key="statgoal-option-none" value="-1">
                {" "}
                --{" "}
            </option>,
            <option key="statgoal-option-wins" value="ACOS_WINS">
                Match Wins
            </option>,
            <option key="statgoal-option-played" value="ACOS_PLAYED">
                Matches Played
            </option>,
        ];

        return [...nullOption, ...options];
    };

    const valueINT = (index, title) => {
        return (
            <FSGNumberInput
                rules={group}
                group={group}
                name={`goal${index}_valueINT`}
                id={`goal${index}_valueINT`}
                title={title || "Integer Value"}
                titleFontSize="1.2rem"
                titleColor="gray.20"
                step={1}
                integer={true}
                required={rules[`goal${index}_valueINT`].required}
                useValue={useValue}
                useTarget={useTarget}
            />
        );
    };

    const valueFLOAT = (index, title) => {
        return (
            <FSGNumberInput
                rules={group}
                group={group}
                name={`goal${index}_valueFLOAT`}
                id={`goal${index}_valueFLOAT`}
                title={title || "Float Value"}
                titleFontSize="1.2rem"
                step={1}
                titleColor="gray.20"
                maxLength="10"
                float={true}
                required={rules[`goal${index}_valueFLOAT`].required}
                useValue={useValue}
                useTarget={useTarget}
            />
        );
    };

    const valueSTRING = (index, title) => {
        return (
            <FSGTextInput
                rules={group}
                group={group}
                name={`goal${index}_valueSTRING`}
                id={`goal${index}_valueSTRING`}
                titleFontSize="1.2rem"
                titleColor="gray.20"
                title={title || "Match String"}
                maxLength="60"
                required={rules[`goal${index}_valueSTRING`].required}
                useValue={useValue}
                useTarget={useTarget}
            />
        );
    };

    const valueOptions = (index, type) => {
        switch (type) {
            case 0:
                return <>{valueINT(index)}</>;
            case 1:
                return <>{valueFLOAT(index)}</>;
            case 2:
                return <>{valueFLOAT(index)}</>;
            case 3:
                return <>{valueFLOAT(index)}</>;
            case 4:
                return (
                    <>
                        {valueSTRING(index)}
                        {valueINT(index, "Match Count")}
                    </>
                );
        }
    };

    const renderGoalValues = (index) => {
        if (goalValue == "-1") return <></>;
        let stat = stats.find((stat) => stat.stat_slug == goalValue);
        if (!stat && (goalValue == "ACOS_WINS" || goalValue == "ACOS_PLAYED")) {
            return valueOptions(index, 0);
        }
        return valueOptions(index, stat?.valueTYPE);
    };

    return (
        <HStack
            w="100%"
            alignItems={"flex-start"}
            borderBottom="1px solid"
            borderBottomColor="gray.300"
        >
            <FSGSelect
                title={title}
                rules={group}
                group={group}
                id={name}
                name={name}
                color="gray.100"
                placeholder={""}
                w="100%"
                value={goalValue}
                options={goalOptions(id)}
                useValue={useValue}
                useTarget={useTarget}
            />
            <Box ml="1rem" mb="1rem">
                {renderGoalValues(id)}
            </Box>
        </HStack>
    );
}

let achievementIcons = [];
for (let i = 1; i <= 100; i++) {
    achievementIcons.push(i);
}

function EditAchievementIcon({}) {
    let achievementIconId = useBucket(btAchievementIconId);
    const generateAchievementIcon = () => {
        achievementIcons.sort(() => 0.5 - Math.random());

        btAchievementIconId.set(achievementIcons[0]);
    };

    useEffect(() => {
        if (achievementIconId == null) generateAchievementIcon();
    }, []);
    return (
        <VStack spacing="0">
            <Box
                w="8rem"
                h="8rem"
                role="group"
                position="relative"
                transition="all 0.2s ease"
                cursor="pointer"
                _hover={{
                    transform: "scale(1.05)",
                    zIndex: "1",
                }}
            >
                <Box position="absolute" bottom="0" right="0">
                    <Icon
                        fontSize="2rem"
                        color="gray.0"
                        p="0.25rem"
                        as={MdEdit}
                        position="relative"
                        zIndex="2"
                        _groupHover={{
                            color: "gray.0",
                        }}
                        onClick={() => {
                            btIsChooseAchievementIcon.set(true);
                        }}
                    />
                </Box>
                <Image
                    onClick={() => {
                        btIsChooseAchievementIcon.set(true);
                    }}
                    fallback={
                        <VStack
                            w="100%"
                            h="100%"
                            alignItems={"center"}
                            justifyContent={"center"}
                        >
                            <Spinner
                                width="3rem"
                                height="3rem"
                                color="brand.50"
                                size={"sm"}
                            />
                        </VStack>
                    }
                    display="inline-block"
                    src={`${config.https.cdn}icons/achievements/${achievementIconId}-white-medium.webp`}
                    width={["100%"]}
                    transition="all 0.2s ease"
                />
            </Box>
            <IconButton
                icon={<FaRandom size="1.2rem" />}
                onClick={generateAchievementIcon}
                width="2rem"
                isRound="true"
                _hover={{
                    color: "brand.300",
                }}
            />
        </VStack>
    );
}
