import { Box, Button, Image } from "@chakra-ui/react";
import config from "../../../config/index.js";
export default function AchievementIcon({ index, percent }) {
  // <Image
  //                 display={'inline-block'}
  //                 src=
  //                 loading="lazy"
  //                 title={''}
  //                 height="7rem"
  //                 position="relative"
  //                 top="1rem"
  //             />

  let color = "black";
  if (percent >= 100) color = "green";
  else if (percent > 0) color = "orange";

  return (
    <Box w="9rem" h="9rem" position="relative" zIndex="1">
      <Image
        w="9rem"
        h="9rem"
        minW="9rem"
        position="absolute"
        // transition="all 1s ease"
        // animation="grow_shrink11 3s ease infinite"
        top="0"
        left="0"
        zIndex="-1"
        src={`${config.https.cdn}icons/achievements/panel-${color}-medium.webp`}
      />
      <Image
        position="relative"
        top="1rem"
        left="1rem"
        w="7rem"
        h="7rem"
        minW="7rem"
        transition="all 0.3s ease"
        transform="scale(1)"
        _groupHover={{
          transform: "scale(1.1)",
        }}
        // animation="grow_shrink13 3s ease infinite 0.2s"
        src={`${config.https.cdn}icons/achievements/${
          index || 1
        }-white-medium.webp`}
      />
    </Box>
  );
}
