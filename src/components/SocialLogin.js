import { Component, Fragment } from "react";
import fs from 'flatstore';

import {
    Link,
    withRouter,
} from "react-router-dom";

class SocialLogin extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user;
        if (user && user.apikey && user.apikey.length > 0 && user.apikey != 'undefined') {
            return <Fragment></Fragment>
        }
        return (
            <div id="social">
                <h4>Login to Play!</h4>
                <ul>
                    <li><Link to="http://localhost:8080/login/google">with Google</Link></li>
                    <li><Link to="http://localhost:8080/login/microsoft">with Microsft</Link></li>
                    <li><Link to="http://localhost:8080/login/github">with GitHub as Developer</Link></li>
                </ul>
            </div>
        )
    }
}

export default withRouter(fs.connect(['user'])(SocialLogin));