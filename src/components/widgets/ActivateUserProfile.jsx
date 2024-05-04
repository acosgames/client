import { useEffect } from "react";
import { getUser } from "../../actions/person";

function ActivateUserProfile(props) {
  useEffect(() => {
    getUser();
  }, []);
  return <></>;
}

export default ActivateUserProfile;
