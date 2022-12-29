import { Component } from "react";

import {
    Route,
    Navigate,
    Outlet,
    useLocation,
} from "react-router-dom";
import fs from 'flatstore';
import SocialLogin from "./SocialLogin";

function ProtectedRoute(props) {

    let [user] = fs.useWatch('user');
    let location = useLocation();
    let needsPlayerName = (
        user &&
        !user.ecode &&
        !user.displayname &&
        location.pathname.indexOf("/player/create") == -1
    )

    let loggedIn = fs.get('loggedIn');
    if (typeof loggedIn === 'undefined') {
        return <></>
    }

    if ((loggedIn == 'LURKER'))
        return <Navigate to={props.redirectTo || "/login"} replace={true}></Navigate>

    let validated = props.verify && props.verify(user);

    if (user && !validated && location.pathname.indexOf(props.redirectTo || "/login") != 0) {
        return <Navigate to={props.redirectTo || "/login"} replace={true}></Navigate>
    }

    if (needsPlayerName) {
        return <Navigate to="/player/create" replace={true}></Navigate>
    }

    let Child = props.component;

    return (
        <Child user={user} />

    )

}

export default ProtectedRoute;

