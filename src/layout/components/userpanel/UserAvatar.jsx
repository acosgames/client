import { Box, Image } from "@chakra-ui/react";

// import USAFlag from "../../../assets/images/flags/USA.svg";
import config from "../../../config";
import { useBucket } from "../../../actions/bucket";
import {
  btDuplicateTabs,
  btLatency,
  btUser,
  btWebsocketConnected,
} from "../../../actions/buckets";
export default function UserAvatar({}) {
  let user = useBucket(btUser);
  let latency = useBucket(btLatency);
  let wsConnected = useBucket(btWebsocketConnected);
  let duplicatetabs = useBucket(btDuplicateTabs);

  let latencyColor = "brand.300";
  if (latency > 400) {
    latencyColor = "orange.300";
  } else if (latency > 200) {
    latencyColor = "yellow.300";
  }

  if (!wsConnected || duplicatetabs) {
    latencyColor = "red.500";
  }

  let filename = "assorted-" + user.portraitid + "-original.webp";
  return (
    <>
      <Image
        display="inline-block"
        src={`${config.https.cdn}images/portraits/${filename}`}
        loading="lazy"
        borderRadius={"8px"}
        width={["6rem"]}
      />
      <Box
        position="absolute"
        top="0"
        right="-0.5rem"
        w="1rem"
        borderRadius="8px"
        h="1rem"
        bgColor={latencyColor}
        boxShadow={"0 0 2px black,0 0 3px black,0 0 4px black,0 0 6px black"}
      ></Box>
    </>
  );
}
