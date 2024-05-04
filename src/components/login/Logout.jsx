import React, { Component, Fragment } from "react";
import fs from 'flatstore';

import { logout } from '../../actions/person';

import {
    Navigate,
} from "react-router-dom";
import SLink from "../widgets/SLink";

class Logout extends Component {
    constructor(props) {
        super(props);

        logout();
    }
    render() {


        return (
            <Route path="*"><Navigate to="/" /></Route>
        );
    }
}

export default (Logout);