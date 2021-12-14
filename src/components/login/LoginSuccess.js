
import {
    Redirect,
    useHistory
} from "react-router-dom";
import fs from 'flatstore';


function LoginSuccess(props) {

    const history = useHistory();

    let urlpath = history.location.pathname

    let refPath = localStorage.getItem("refPath");
    if (refPath) {
        history.push(refPath);
    }
    else {
        refPath = '/'
    }

    return (
        <Redirect to={refPath} />
    )
}

export default LoginSuccess;