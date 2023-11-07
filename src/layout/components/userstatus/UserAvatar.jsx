import { Image } from "@chakra-ui/react";

// import USAFlag from "../../../assets/images/flags/USA.svg";
import config from "../../../config";

export default function UserAvatar({ filename }) {
  filename = "assorted-1-original.webp";
  return (
    <Image
      display="inline-block"
      src={`${config.https.cdn}images/portraits/${filename}`}
      loading="lazy"
      borderRadius={"12px"}
      width={["6.4rem"]}
    />
  );
}
