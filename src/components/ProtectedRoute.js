import { Component } from "react";

import {
    Route,
    Redirect,
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
            return <Redirect to="/login"></Redirect>
        }

        if (this.props.verify && !this.props.verify(this.props.user)) {
            return <Redirect to={this.props.redirectTo || "/login"}></Redirect>
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

