import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Grid,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import LeaderboardSettings from "./LeaderboardSettings";
import PlayerSettings from "./PlayerSettings";
import TeamSettings from "./TeamSettings";
import TeamListSettings from "./TeamListSettings";
import { btDevGame } from "../../../actions/buckets";
import SettingRow from "./SettingRow";
import { useBucket } from "../../../actions/bucket";

export default function TabGameSettings({}) {
    return (
        <Grid gap="24px">
            <Grid
                templateColumns={{ sm: "1fr", md: "1fr", lg: "1fr 3fr " }}
                // templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
                gap="2rem"
                // mb={{ lg: "26px" }}
            >
                <LeaderboardSettings />
                <VStack spacing="0" w="100%">
                    <Card w="100%" mb="0">
                        <CardBody>
                            <Text
                                fontWeight="400"
                                as="p"
                                w="100%"
                                color="gray.50"
                            >
                                Note: These settings are configured in{" "}
                                <Text
                                    as="span"
                                    fontWeight="500"
                                    color="gray.20"
                                >
                                    game-settings.json
                                </Text>
                            </Text>
                        </CardBody>
                    </Card>
                    <GameSettings />
                    <PlayerSettings />
                    <TeamSettings />
                    <TeamListSettings />
                </VStack>
            </Grid>
            <Grid
                templateColumns={{ sm: "1fr", md: "1fr", lg: "1fr" }}
                templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
                gap="24px"
                // mb={{ lg: "26px" }}
            ></Grid>
        </Grid>
    );
}
/**
 * <option value="1">(1) Full Screen</option>
<option value="2">(2) Fixed Resolution</option>
<option value="3">(3) Scaled Resolution</option>
<Box id="viewportResolution" display={gameSettings?.screentype == 1 ? 'none' : 'block'} pt="2rem">
                        <HStack>
                            <Text as="label" display={'inline-block'} pr="0.5rem" fontSize="xs">Resolution</Text>
                            <SettingNumberInput id="resow" title="" placeholder="4" />
                            <Text>:</Text>
                            <SettingNumberInput id="resoh" title="" placeholder="3" />
                        </HStack>
                    </Box>
                    <Box id="viewportSize" display={gameSettings?.screentype != 3 ? 'none' : 'block'}>
                        <HStack>
                            <Text as="label" display={'inline-block'} pr="0.5rem" fontSize="xs">Screen</Text>
                            <SettingNumberInput id="screenwidth" title="Width (px)" placeholder="800" />
                            <Text>:</Text>
                            <SettingNumberInput id="screenheight" title="Height" placeholder="600" readOnly={true} />
                        </HStack>


                    </Box>
 * @param {*} param0 
 * @returns 
 */

function GameSettings({}) {
    let devgame = useBucket(btDevGame);

    if (!devgame) return <></>;
    let screenTypeName = "";
    switch (devgame?.screentype) {
        case 1:
            screenTypeName = "Full Screen";
            break;
        case 2:
            screenTypeName = "Fixed Resolution";
            break;
        case 3:
            screenTypeName = "Scaled Resolution";
            break;
    }

    let showResolution = devgame?.screentype != 1;
    let showScreenSize = devgame?.screentype == 3;
    let screenheight = (devgame?.resoh / devgame?.resow) * devgame?.screenwidth;
    return (
        <Card w="100%" mb="0">
            <CardHeader>
                <Heading as="h3" fontSize="1.8rem">
                    Screen Settings
                </Heading>
            </CardHeader>
            <CardBody>
                <Box borderTop="1px dotted var(--chakra-colors-gray-700)"></Box>
                <SettingRow title={"Screen Type"} value={screenTypeName} />
                {showResolution && (
                    <>
                        <SettingRow
                            title={"Resolution Width"}
                            value={devgame?.resow}
                        />
                        <SettingRow
                            title={"Resolution Height"}
                            value={devgame?.resoh}
                        />
                    </>
                )}
                {showScreenSize && (
                    <>
                        <SettingRow
                            title={"Screen Width"}
                            value={devgame?.screenwidth}
                        />
                        <SettingRow
                            title={"Screen Height (auto)"}
                            value={screenheight}
                        />
                    </>
                )}
            </CardBody>
        </Card>
    );
}
