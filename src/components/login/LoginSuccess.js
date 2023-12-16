
import {
    Navigate,
    Route,
    useLocation,
    useNavigate
} from "react-router-dom";
import fs from 'flatstore';
import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";


function LoginSuccess(props) {

    const history = useNavigate();
    const location = useLocation();

    let [refPath] = fs.useWatch('refPath');

    useEffect(() => {
        if (localStorage.getItem('refPath')) {
            fs.set('refPath', localStorage.getItem('refPath'));
            localStorage.removeItem('refPath');
        }
    })

    // let urlpath = history.location.pathname


    fs.set('success', 'Logged in.  Enjoy the games!');

    // let toast = useToast();
    // toast({
    //     description: 'Logged in.  Enjoy the games!',
    //     status: 'success'
    // })

    return (
        <Navigate to={refPath} />
    )
}

export default LoginSuccess;