import React, { Component, Fragment } from "react";
import fs from 'flatstore';

import {
    Link,
    withRouter,
    Redirect,
} from "react-router-dom";
import Logout from "./Logout";

class SocialLogin extends Component {
    constructor(props) {
        super(props);
    }
    render() {

        if (!this.props.userCheckedLogin) {
            return <React.Fragment></React.Fragment>
        }
        let user = this.props.user;
        if (user && user.apikey && user.apikey.length > 0 && user.apikey != 'undefined') {
            return <Logout></Logout>
            return <Redirect to="/games"></Redirect>
        }
        return (
            <div id="social">
                <h4>Login to Play!</h4>
                <ul>
                    <li><a href="http://localhost:8080/login/google">with Google</a></li>
                    <li><a href="http://localhost:8080/login/microsoft">with Microsft</a></li>
                    <li><a href="http://localhost:8080/login/github">with GitHub as Developer</a></li>
                </ul>
            </div>
        )
    }
}

export default withRouter(fs.connect(['userCheckedLogin'])(SocialLogin));