import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Heading,
    VStack,
} from "@chakra-ui/react";
import { useBucket, useBucketSelector } from "../../../actions/bucket";
import { btDevGame, btFormFields } from "../../../actions/buckets";
import schema from 'shared/model/schema.json';

import { AnimatePresence, motion } from "framer-motion";
import TeamDefinitionRow from "./TeamDefinitionRow";

const infoGroup = "update-game_info";
const teamdefGroup = "update-game_team";

export default function TeamListSettings({}) {
    let devgame = useBucket(btDevGame);
    let gameInfoForm = useBucketSelector(
        btFormFields,
        (form) => form[infoGroup]
    );
    let teams = devgame?.teams;

    let teamDefs = [];
    if (!teams) return <AnimatePresence></AnimatePresence>;

    let index = 0;
    let maxteams = gameInfoForm?.maxteams || 0;

    if (maxteams == 0) return <AnimatePresence></AnimatePresence>;

    teams.sort((a, b) => {
        return a.team_order - b.team_order;
    });
    for (let i = 0; i < maxteams; i++) {
        let team = teams[i];
        teamDefs.push(
            <TeamDefinitionRow
                isOdd={team.team_order % 2 == 1}
                index={team.team_order}
                key={"devgameteam-" + team.team_slug + team.team_order}
                team_slug={team.team_slug}
                // devgame={devgame}
                // {...team}
            />
        );
    }

    return (
        <AnimatePresence>
            <Card w="100%" clipPath={"none"}>
                <CardHeader>
                    <Heading as="h3" fontSize="1.8rem">
                        Team Definitions
                    </Heading>
                </CardHeader>
                <CardBody>
                    <VStack width="100%" spacing="0">
                        {teamDefs}
                    </VStack>
                </CardBody>
            </Card>
        </AnimatePresence>
    );
}
