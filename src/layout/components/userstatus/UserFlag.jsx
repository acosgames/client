import { Image } from "@chakra-ui/react";

import USAFlag from "../../../assets/images/flags/USA.svg";

export default function UserFlag({ flag }) {
  return (
    <Image
      src={flag || USAFlag}
      border="2px solid"
      borderColor="gray.100"
      borderRadius="3px"
      height={["3.5rem", "90%"]}
    />
  );
}
