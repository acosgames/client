import React, { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";
import SocialLogin from "./login/SocialLogin";

import fs from 'flatstore';

import './styles/MainPage.css';
import Logout from "./login/Logout";

fs.set('pagehistory', []);

class MainMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    updateHistory() {
        let history = fs.get('pagehistory');
        history.push(Object.assign({}, this.props.location));

        if (history.length > 20) {
            history = history.splice(history.length - 21);
        }

        fs.set('pagehistory', history);
    }

    showLogout() {


    }
    render() {

        this.updateHistory();

        return (
            <div id="mainmenu">
                <ul>

                    <li><Link to="/games">Find Games</Link></li>
                    {
                        this.props.user && this.props.user.isdev && (
                            <React.Fragment>
                                <li><Link to="/dev">Developer Dashboard</Link></li>
                                <li><Link to="/dev/game/create">Create Game</Link></li>
                            </React.Fragment>
                        )
                    }

                </ul>
                {<SocialLogin user={this.props.user}></SocialLogin>}
            </div>
        )
    }
}

export default withRouter(fs.connect(['user'])(MainMenu));

