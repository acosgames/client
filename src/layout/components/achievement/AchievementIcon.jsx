import { Button, Image } from "@chakra-ui/react";
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

  let color = "white";
  if (percent >= 100) color = "green";
  else if (percent > 0) color = "yellow";

  return (
    <Image
      w="7rem"
      h="7rem"
      minW="7rem"
      src={`${config.https.cdn}icons/achievements/${
        index || 1
      }-${color}-thumbnail.webp`}
    />
  );
}
