import { useEffect, useLayoutEffect } from "react";
import { getUser } from "../../actions/person";

function ActivateUserProfile(props) {
    useLayoutEffect(() => {
        getUser();
    }, []);
    return <></>;
}

export default ActivateUserProfile;
