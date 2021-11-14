import React, { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";
import SocialLogin from "./login/SocialLogin";

import fs from 'flatstore';

import './styles/MainPage.scss';
import Logout from "./login/Logout";
import LeaveGame from "./games/LeaveGame";

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
        let urlPath = this.props.location.pathname;
        let classFindGames = '';
        if (urlPath.includes('/games') || urlPath == '/' || urlPath.includes('/g/')) {
            classFindGames = 'active';
        }
        let classDevelopers = '';
        if (urlPath.includes('/dev')) {
            classDevelopers = 'active';
        }

        return (
            <div id="mainmenu">
                <Link to="/games" className={classFindGames}>Find Games</Link>
                {
                    this.props.user && this.props.user.github && (
                        <React.Fragment>
                            <Link to="/dev" className={classDevelopers}>Developers</Link>

                        </React.Fragment>
                    )
                }

                <Logout></Logout>

                {/* {<SocialLogin user={this.props.user}></SocialLogin>} */}
                <LeaveGame></LeaveGame>
            </div>
        )
    }
}

export default withRouter(fs.connect(['user'])(MainMenu));

