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

        logout();
    }
    render() {


        return (
            <Redirect to="/" />
        );
    }
}

export default withRouter(Logout);