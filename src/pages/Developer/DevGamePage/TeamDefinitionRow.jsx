import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useBucket, useBucketSelector } from "../../../actions/bucket";
import { btDevGame } from "../../../actions/buckets";
import SettingRow from "./SettingRow";

export default function TeamDefinitionRow({ index, team_slug, isOdd }) {
    let devgame = useBucket(btDevGame);
    let team = useBucketSelector(btDevGame, (game) =>
        game?.teams?.find((team) => team.team_slug == team_slug)
    );

    return (
        <HStack
            w="100%"
            p="1rem"
            spacing="1rem"
            bgColor={isOdd ? "" : "gray.850"}
        >
            <VStack>
                <Text
                    as="span"
                    fontSize="1.4rem"
                    fontWeight="700"
                    bgColor="gray.700"
                    w="3rem"
                    h="3rem"
                    borderRadius={"8rem"}
                    lineHeight="3rem"
                    textAlign={"center"}
                >
                    {team?.team_order}
                </Text>
            </VStack>
            <VStack spacing="0">
                <Box
                    w="6rem"
                    h="3rem"
                    bgColor={team?.color}
                    textAlign={"center"}
                ></Box>
                <Text as="span" fontSize="1rem">
                    {team?.color}
                </Text>
            </VStack>
            <VStack spacing={"0"}>
                <Text as="span" fontSize="1.6rem" fontWeight="500">
                    {team?.team_name}
                </Text>
                <Text
                    as="span"
                    fontSize="1.4rem"
                    fontWeight="400"
                    color="gray.50"
                >
                    {team?.team_slug}
                </Text>
            </VStack>
            <Box flex="1"></Box>
            <VStack spacing="">
                <SettingRow
                    fontSize="1.4rem"
                    title={"Min Players"}
                    value={team?.minplayers}
                    hideBorder={true}
                />
                <SettingRow
                    fontSize="1.4rem"
                    title={"Max Players"}
                    value={team?.maxplayers}
                    hideBorder={true}
                />
            </VStack>
        </HStack>
    );
}
