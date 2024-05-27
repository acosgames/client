
import {
    Route, Navigate
} from "react-router-dom";
import fs from 'flatstore';


function LoginAccountExists(props) {

    fs.set('error', 'That account is already registered on ACOS.  Try a different account.');

    return (
        <Navigate to={'/login'} />
    )
}

export default LoginAccountExists;