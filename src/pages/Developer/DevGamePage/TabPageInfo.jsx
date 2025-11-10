import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Center,
    Grid,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import DevImageUpload from "./ImageUpload";
import { updateGameField, uploadGameImages } from "../../../actions/devgame";
import FSGGroup from "../../../components/widgets/inputs/FSGGroup";
import FSGTextInput from "../../../components/widgets/inputs/FSGTextInput";
import {
    Markdown,
    MarkdownPreview,
} from "../../../components/widgets/inputs/Markdown";
import schema from 'shared/model/schema.json';
import { useBucket, useBucketSelector } from "../../../actions/bucket";
import { btDevGame, btFormFields } from "../../../actions/buckets";

export default function DevTabPageInfo({}) {
    return (
        <Grid
            templateColumns={{ sm: "1fr", md: "1fr", lg: "1.2fr 3fr " }}
            // templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
            gap="2rem"
            mb={{ lg: "26px" }}
        >
            <FeaturedImage />
            <Box>
                <EditGameInfo />
                <DescriptionPreview />
            </Box>
        </Grid>
    );
}

function DescriptionPreview({}) {
    const group = "update-game_info";

    const rules = schema[group];
    let form = useBucket(btFormFields, () => true);
    let formGroup = form[group] || {};

    return (
        <Card w="auto">
            <CardHeader>
                <Heading as="h3" fontSize="1.8rem">
                    Long Description Preview
                </Heading>
            </CardHeader>
            <CardBody pt="0">
                <MarkdownPreview
                    value={formGroup.longdesc}
                    title={"Description"}
                />
            </CardBody>
        </Card>
    );
}

function EditGameInfo({}) {
    const group = "update-game_info";

    const rules = schema[group];
    let form = useBucket(btFormFields, () => true);

    let formGroup = form[group] || {};

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        updateGameField(name, value, group);
    };

    const onChangeByName = (name, value) => {
        updateGameField(name, value, group);
    };

    return (
        <Card w="auto">
            <CardHeader>
                <Heading as="h3" fontSize="1.8rem">
                    Game Information
                </Heading>
            </CardHeader>
            <CardBody>
                <VStack gap="2rem">
                    {/* <FSGGroup hfontSize="md" title="Game Details" py="2rem"> */}
                    <FSGTextInput
                        rules={group}
                        group={group}
                        name="name"
                        id="name"
                        title="Game Name"
                        maxLength="60"
                        required={rules["name"].required}
                        value={formGroup.name || ""}
                        onChange={inputChange}
                    />

                    <FSGTextInput
                        type="text"
                        rules={group}
                        group={group}
                        name="shortdesc"
                        id="shortdesc"
                        title="Short Description"
                        maxLength="120"
                        required={rules["shortdesc"].required}
                        value={formGroup.shortdesc || ""}
                        onChange={inputChange}
                    />

                    <Markdown
                        type="text"
                        name="longdesc"
                        rules={group}
                        group={group}
                        id="longdesc"
                        title="Long Description"
                        maxLength="5000"
                        required={rules["longdesc"].required}
                        value={formGroup.longdesc || ""}
                        onChange={(e) => {
                            onChangeByName("longdesc", e);
                        }}
                    />
                </VStack>
                {/* </FSGGroup> */}
            </CardBody>
        </Card>
    );
}

function FeaturedImage({}) {
    return (
        <Card w="auto">
            <CardHeader>
                <Heading as="h3" fontSize="1.8rem">
                    Featured Image
                </Heading>
            </CardHeader>
            <CardBody>
                <VStack spacing="1rem">
                    <DevImageUpload uploadFunc={uploadGameImages} />
                    <Text fontSize="1.2rem" lineHeight="1.6rem" color="gray.50">
                        Dimensions: 512x512 pixels
                        <br />
                        Image should be square
                    </Text>
                    {/* <Text
                        fontSize="1.2rem"
                        color="gray.20"
                        textAlign={"left"}
                        // hyphens="auto"
                        // wordBreak={"break-all"}
                        // overflowX="hidden"
                        lineHeight="1.6rem"
                    >
                        This featured image will be used in your game page
                        visible and everywhere the game is advertised on the
                        platform.
                    </Text> */}
                </VStack>
            </CardBody>
        </Card>
    );
}
