import { Image } from "@chakra-ui/react";

// import USAFlag from "../../../assets/images/flags/USA.svg";
import config from "../../../config";

export default function UserLevelIcon({ level }) {
  level = 32;
  return (
    <Image
      display="inline-block"
      src={`${config.https.cdn}icons/ranks/platform/${level}.webp`}
      loading="lazy"
      w={["6.4rem"]}
    />
  );
}
