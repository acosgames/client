import { Component } from "react";

import {
    Route,
    withRouter,
} from "react-router-dom";
import fs from 'flatstore';
import SocialLogin from "./SocialLogin";

class ProtectedRoute extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        if (!this.props.user) {
            return <SocialLogin />
        }
        let Child = this.props.component;
        return (
            <Route exact={this.props.exact} path={this.props.path}>
                <Child user={this.props.user}></Child>
            </Route>
        )
    }
}

export default withRouter(fs.connect(['user'])(ProtectedRoute));

