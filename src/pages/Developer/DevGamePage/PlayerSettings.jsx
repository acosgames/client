import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Heading,
    HStack,
    Text,
    VStack,
} from "@chakra-ui/react";
import FSGSwitch from "../../../components/widgets/inputs/FSGSwitch";
import schema from 'shared/model/schema.json';
import { useBucket } from "../../../actions/bucket";
import { btDevGame } from "../../../actions/buckets";
import FSGNumberInput from "../../../components/widgets/inputs/FSGNumberInput";
import SettingRow from "./SettingRow";

export default function PlayerSettings({}) {
    const group = "update-game_info";
    const rules = schema[group];

    let devgame = useBucket(btDevGame);

    return (
        <Card w="100%" mb="0">
            <CardHeader>
                <Heading as="h3" fontSize="1.8rem">
                    Player Settings
                </Heading>
            </CardHeader>
            <CardBody>
                <Box borderTop="1px dotted var(--chakra-colors-gray-700)"></Box>
                <SettingRow title={"Min Players"} value={devgame?.minplayers} />
                <SettingRow title={"Max Players"} value={devgame?.maxplayers} />
            </CardBody>
        </Card>
    );
}
