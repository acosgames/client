import React, { Component, Fragment } from "react";
import fs from 'flatstore';

import { logout } from '../../actions/person';

import {
    Link,
    withRouter,
    Redirect,
} from "react-router-dom";
import SLink from "../widgets/SLink";

class Logout extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user;

        if (!this.props.user) {
            return (<SLink to="/login">Login</SLink>)
        }

        return (
            <a onClick={() => {
                logout();
            }}>
                Logout
            </a>
        );
    }
}

export default withRouter(fs.connect(['user'])(Logout));