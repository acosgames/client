import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import { updateGameField } from "../../../actions/devgame";
import { useBucket } from "../../../actions/bucket";
import { btDevGame } from "../../../actions/buckets";
import FSGSelect from "../../../components/widgets/inputs/FSGSelect";

export default function Publishing({}) {
    let devgame = useBucket(btDevGame);

    const onUpdateVersion = async (e) => {
        let value = Number.parseInt(e.target.value);
        // console.log(value);
        if (!Number.isInteger(value)) return false;
        if (value < 0 || value > devgame.latest_version) return false;

        updateGameField("version", value, "update-game_info");
    };

    const onUpdateVisibility = async (e) => {
        let value = Number.parseInt(e.target.value);

        if (!Number.isInteger(value)) return false;
        if (value < 0 || value > devgame.version) return false;

        // value = Number.parseInt(value);

        if (value == 0) {
            updateGameField("visible", 0, "update-game_info");
        } else if (value == 1) {
            updateGameField("visible", 1, "update-game_info");
        } else if (value == 2) {
            updateGameField("visible", 2, "update-game_info");
        }
    };

    let versionOptions = [];
    if (devgame?.latest_version)
        for (var i = devgame.latest_version; i > 0; i--) {
            let option = (
                <option key={"published-v" + i} value={i}>
                    {i}
                </option>
            );
            versionOptions.push(option);
        }

    return (
        <Card>
            <CardHeader>
                <Heading as="h3" fontSize="1.8rem">
                    Publish
                </Heading>
            </CardHeader>
            <CardBody>
                <VStack alignItems={"left"} w="100%" spacing="2rem" pb="2rem">
                    <VStack alignItems={"left"} w="100%" spacing="0rem">
                        <Text
                            color={"gray.10"}
                            fontSize="1.4rem"
                            fontWeight="500"
                        >
                            Live Version:
                        </Text>
                        <FSGSelect
                            name="version"
                            rules="update-game_info"
                            group={"update-game_info"}
                            color="gray.100"
                            onChange={onUpdateVersion}
                            placeholder={""}
                            w="100%"
                            //defaultValue={props.devgame.version}
                            value={devgame.version}
                            options={versionOptions}
                        />
                        <Text
                            mt="0.5rem"
                            as="span"
                            color="gray.50"
                            fontWeight={"400"}
                            fontSize="1.2rem"
                        >
                            Latest Build:{" "}
                            <Text as="span" fontWeight="500">
                                {devgame.latest_version}
                            </Text>
                        </Text>
                    </VStack>

                    <VStack alignItems={"left"} w="100%" spacing="0rem">
                        <Text
                            color={"gray.10"}
                            fontSize="1.4rem"
                            fontWeight="500"
                        >
                            Visibility
                        </Text>
                        <FSGSelect
                            name="visible"
                            rules="update-game_info"
                            group={"update-game_info"}
                            color="gray.100"
                            onChange={onUpdateVisibility}
                            placeholder={""}
                            w="100%"
                            //defaultValue={props.devgame.visible}
                            // value={devgame.visible}
                            options={[
                                <option key="visible-unlisted" value={"0"}>
                                    {"Unlisted"}
                                </option>,
                                <option key="visible-public" value={"1"}>
                                    {"Public"}
                                </option>,
                                <option key="visible-hidden" value={"2"}>
                                    {"Hidden"}
                                </option>,
                            ]}
                        />
                    </VStack>
                </VStack>
            </CardBody>
        </Card>
    );
}
