import React, { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";

import fs from 'flatstore';
import { wsConnect, attachToFrame, detachFromFrame } from "../../actions/connection";

class Connection extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        attachToFrame();
    }

    componentWillUnmount() {
        detachFromFrame();
    }

    render() {


        return (
            <React.Fragment></React.Fragment>
        )
    }
}

export default Connection;