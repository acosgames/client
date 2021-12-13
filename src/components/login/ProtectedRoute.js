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

        // if (!this.props.user && this.props.location.pathname.indexOf("/login") == -1) {
        //     return <Redirect to="/login"></Redirect>
        // }

        let needsPlayerName = (
            this.props.user &&
            !this.props.user.ecode &&
            !this.props.user.displayname &&
            this.props.location.pathname.indexOf("/player/create") == -1
        )

        if (!this.props.user)
            return <></>
        let validated = this.props.verify(this.props.user);

        if (this.props.user && !validated && this.props.location.pathname.indexOf(this.props.redirectTo || "/login") != 0) {
            return <Redirect to={this.props.redirectTo || "/login"}></Redirect>
        }

        if (needsPlayerName) {
            return <Redirect to="/player/create"></Redirect>
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

