const { useEffect } = require("react");
const { getUser } = require("../../actions/person");


function ActivateUserProfile(props) {

    useEffect(() => {
        getUser();
    }, []);
    return (
        <></>
    )
}

export default ActivateUserProfile;