import versions from "shared/model/versions.json";

import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useBucket } from "../../actions/bucket";
import { btVersion } from "../../actions/buckets";

function VersionControl(props) {
  let version = useBucket(btVersion);
  const toast = useToast();

  useEffect(() => {
    let clientVersion = versions?.client?.version || 1;
    let serverVersion = btVersion.get();

    if (clientVersion < serverVersion) {
      toast({
        description: "A new version is available, reload the page to update.",
        status: "warning",
        duration: 30000,
        isClosable: true,
      });

      localStorage.setItem("clientVersion", serverVersion);
    }
  });

  return <></>;
}

export default VersionControl;
