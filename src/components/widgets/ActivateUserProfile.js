import { useEffect } from "react"
import { getUser } from "../../actions/person"

import fs from 'flatstore';

fs.set('checkingUserLogin', true);
function ActivateUserProfile(props) {

    useEffect(() => {
        getUser();
    }, []);
    return (
        <></>
    )
}

export default ActivateUserProfile;