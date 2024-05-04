import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useBucket } from "../../actions/bucket";
import { btSuccess } from "../../actions/buckets";

function ToastMessage(props) {
  let successMessage = useBucket(btSuccess);
  const toast = useToast();

  useEffect(() => {
    let msg = successMessage;

    if (!msg) return;
    let title = msg?.title;
    let description = msg?.description;
    let status = msg?.status || "success";
    let isClosable =
      typeof msg.isClosable !== "undefined" ? msg.isClosable : true;
    if (!title && !description) return;

    toast({
      title,
      description,
      status,
      isClosable,
      position: "top-right",
    });
  });

  return <></>;
}

export default ToastMessage;
