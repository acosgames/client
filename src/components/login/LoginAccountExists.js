
import {
    Route, Navigate
} from "react-router-dom";
import fs from 'flatstore';


function LoginAccountExists(props) {

    fs.set('error', 'That account is already registered on Acos.  Try a different account.');

    return (
        <Route><Navigate to={'/login'} /></Route>
    )
}

export default LoginAccountExists;