import React, { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";
import SocialLogin from "./login/SocialLogin";

import fs from 'flatstore';

import Logout from "./login/Logout";
import LeaveGame from "./games/LeaveGame";

fs.set('pagehistory', []);

class MainMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuActive: false
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

    clickMenu = () => {
        this.setState({ menuActive: !this.state.menuActive });
    }
    render() {

        this.updateHistory();
        let urlPath = this.props.location.pathname;
        let classFindGames = '';
        if (urlPath == '/' || urlPath.includes('/g')) {
            classFindGames = 'active';
        }
        let classDevelopers = '';
        if (urlPath.includes('/dev')) {
            classDevelopers = 'active';
        }

        return (
            <div id="mainmenu">
                <ul id="menu-nav">
                    <li>
                        <Link to="/g" className={classFindGames}>
                            <span className="logo-txt">FSG</span>
                            {/* <span className="material-icons">
                                home
                            </span> */}
                        </Link>
                    </li>
                </ul>
                <ul id="menu-actions">
                    <li className="actions">
                        <a href="">
                            <span className="material-icons">
                                vibration
                            </span>
                        </a>
                    </li>
                    <li className="actions hasmenu">
                        <a onClick={this.clickMenu}>
                            <span className="material-icons">
                                account_circle
                            </span>
                            <span className="indicator-down">▼</span>
                        </a>
                        {
                            this.state.menuActive && (
                                <ul className="submenu">
                                    {
                                        this.props.user && this.props.user.github && (
                                            <li>
                                                <Link to="/dev" className={classDevelopers}>Developers</Link>
                                            </li>
                                        )
                                    }
                                    <li><Logout></Logout></li>
                                    {/* {<SocialLogin user={this.props.user}></SocialLogin>} */}
                                    <li><LeaveGame></LeaveGame></li>
                                </ul>
                            )
                        }

                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(fs.connect(['user'])(MainMenu));

