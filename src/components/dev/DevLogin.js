import { Component, Fragment } from "react";
import fs from 'flatstore';

import {
    Link,
    withRouter,
} from "react-router-dom";

class DevLogin extends Component {
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
                <h4>Login to Create a Game!</h4>
                <p>
                    Join our GitHub Organization at <a href="">fivesecondgames</a> and start creating and publishing games instantly.
                    All teams and repositories are created under this organization, but the code is yours.
                    This setup will allow game mods and variations to be created by other developers in a clean and organized way.
                </p>
                <ul>
                    <li><a href="http://localhost:8080/login/github">Login using GitHub</a></li>
                </ul>
            </div>
        )
    }
}

export default withRouter(fs.connect(['user'])(DevLogin));