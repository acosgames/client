
import {
    Redirect,
    useHistory
} from "react-router-dom";
import fs from 'flatstore';
import { useToast } from "@chakra-ui/react";


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

    fs.set('success', 'Logged in.  Enjoy the games!');

    let toast = useToast();
    // toast({
    //     description: 'Logged in.  Enjoy the games!',
    //     status: 'success'
    // })

    return (
        <Redirect to={refPath} />
    )
}

export default LoginSuccess;