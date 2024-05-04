import { Image } from "@chakra-ui/react";

import config from "../../../config";
import { btUser } from "../../../actions/buckets";
import { useBucket } from "../../../actions/bucket";

export default function UserFlag({ flag }) {
  let user = useBucket(btUser);
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
