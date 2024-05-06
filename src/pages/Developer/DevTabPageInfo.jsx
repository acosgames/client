import {
  Card,
  CardBody,
  CardHeader,
  Center,
  Grid,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import DevImageUpload from "./DevImageUpload";
import { updateGameField, uploadGameImages } from "../../actions/devgame";
import FSGGroup from "../../components/widgets/inputs/FSGGroup";
import FSGTextInput from "../../components/widgets/inputs/FSGTextInput";
import Markdown from "../../components/widgets/inputs/Markdown";
import schema from "shared/model/schema.json";
import { useBucket, useBucketSelector } from "../../actions/bucket";
import { btDevGame, btFormFields } from "../../actions/buckets";

export default function DevTabPageInfo({}) {
  return (
    <Grid
      templateColumns={{ sm: "1fr", md: "1fr", lg: "3fr 1.5fr" }}
      templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
      gap="24px"
      mb={{ lg: "26px" }}
    >
      <EditGameInfo />
      <FeaturedImage />
    </Grid>
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
    <Card>
      <CardHeader>
        <Heading as="h3" fontSize="1.8rem" fontWeight="500">
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
    <Card>
      <CardHeader>
        <Heading as="h3" fontSize="1.8rem" fontWeight="500">
          Featured Image
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing="1rem">
          <DevImageUpload uploadFunc={uploadGameImages} />
          <Text fontSize="1.2rem" lineHeight="1.6rem">
            Dimensions: 512x512 pixels
            <br />
            Image should be square
          </Text>
          <Text
            fontSize="1.2rem"
            color="gray.20"
            textAlign={"justify"}
            lineHeight="1.6rem"
          >
            This featured image will be used in your game page visible and
            everywhere the game is advertised on the platform.
          </Text>
        </VStack>
      </CardBody>
    </Card>
  );
}
