import {
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import FSGSwitch from "../../../components/widgets/inputs/FSGSwitch";
import schema from "shared/model/schema.json";
import { useBucket } from "../../../actions/bucket";
import { btDevGame } from "../../../actions/buckets";

export default function LeaderboardSettings({}) {
    const group = "update-game_info";
    const rules = schema[group];

    let devgame = useBucket(btDevGame);

    return (
        <Card w="auto">
            <CardHeader>
                <Heading as="h3" fontSize="1.8rem">
                    Leaderboard
                </Heading>
            </CardHeader>
            <CardBody>
                <VStack alignItems={"left"} w="100%" spacing="0rem">
                    <FSGSwitch
                        type="boolean"
                        name="lbscore"
                        id="lbscore"
                        rules="update-game_info"
                        group={"update-game_info"}
                        title="Enable Highscore?"
                        min="0"
                        max="1"
                        required={rules["lbscore"].required}
                        checked={devgame.lbscore ? true : false}
                        onChange={(e) => {
                            console.log("onChange lbscore:", e.target.checked);
                            // onChangeByName("lbscore", e.target.checked ? true : false);
                        }}
                    />
                </VStack>
            </CardBody>
        </Card>
    );
}
