import { useEffect } from "react";

import {
  wsConnect,
  attachToFrame,
  detachFromFrame,
  reconnect,
} from "../../actions/connection";
import { useBucket } from "../../actions/bucket";
import { btLoggedIn } from "../../actions/buckets";

function Connection({}) {
  let loggedIn = useBucket(btLoggedIn);

  useEffect(() => {
    if (loggedIn != "CHECKING") reconnect();
  }, [loggedIn]);

  useEffect(() => {
    attachToFrame();
    return () => {
      detachFromFrame();
    };
  }, []);

  return <></>;
}
export default Connection;
