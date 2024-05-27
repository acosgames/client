import { Box, useToast, VStack, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import config from "../../../config";
import { useBucketSelector } from "../../../actions/bucket";
import { btShowLoadingBox } from "../../../actions/buckets";

function LoadingBox(props) {
  let showLoadingBox = useBucketSelector(
    btShowLoadingBox,
    (bucket) => bucket[props.id]
  );

  const toast = useToast();
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!showLoadingBox) {
      toast.closeAll();
      setTimeout(() => {
        setShow(false);
      }, 400);
    } else {
      setShow(true);
    }
  });

  const [activeClass, setActiveClass] = useState("");
  useEffect(() => {
    setActiveClass("active");
  }, []);

  // return <></>
  if (!showLoadingBox) return <></>;

  return (
    <Box
      // className="loader"
      position={"absolute"}
      left="0"
      top="0"
      w="100%"
      h="100%"
      zIndex={1000}
      bgColor={"gray.900"}
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      // transition={'filter 0.4s ease-in'}
      // filter={props.isDoneLoading ? 'opacity(0)' : 'opacity(1)'}
    >
      <div className={"loader" + " " + activeClass}></div>
    </Box>
  );
}

export default LoadingBox;
