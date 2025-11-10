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
import schema from 'shared/model/schema.json';
import { useBucket } from "../../../actions/bucket";
import { btDevGame } from "../../../actions/buckets";
import FSGNumberInput from "../../../components/widgets/inputs/FSGNumberInput";
import { updateGameField } from "../../../actions/devgame";
import SettingRow from "./SettingRow";

export default function TeamSettings({}) {
    const group = "update-game_info";
    const rules = schema[group];

    let devgame = useBucket(btDevGame);

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        updateGameField(name, value, group);
    };

    return (
        <Card w="100%" mb="0">
            <CardHeader>
                <Heading as="h3" fontSize="1.8rem">
                    Team Settings
                </Heading>
            </CardHeader>
            <CardBody>
                <Box borderTop="1px dotted var(--chakra-colors-gray-700)"></Box>
                <SettingRow title={"Min Teams"} value={devgame?.minteams} />
                <SettingRow title={"Max Teams"} value={devgame?.maxteams} />
            </CardBody>
        </Card>
    );
}
