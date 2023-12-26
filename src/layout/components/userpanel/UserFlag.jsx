import { Image } from "@chakra-ui/react";

import USAFlag from "../../../assets/images/flags/USA.svg";
import fs from "flatstore";
import config from "../../../config";

export default function UserFlag({ flag }) {
  let [user] = fs.useWatch("user");
  return (
    <Image
      src={`${config.https.cdn}images/country/${user.countrycode}.svg`}
      // border="2px solid"
      // borderColor="gray.100"
      // borderRadius="0px"
      height={["1.2rem"]}
      mb="0.25rem"
    />
  );
}
