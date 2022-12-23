import React, { Component } from "react";



import fs from 'flatstore';

import Logout from "./login/Logout";
import LeaveGame from "./games/LeaveGame";

fs.set('pagehistory', []);

import SLink from './widgets/SLink';


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

        let history = fs.get('history');

        return (
            <div id="mainmenu">
                <ul id="menu-nav">
                    <li>
                        <SLink to="/g" className={classFindGames}>
                            <span className="logo-txt">ACOS</span>
                            {/* <span className="material-icons">
                                home
                            </span> */}
                        </SLink>
                    </li>
                </ul>
                <ul id="menu-actions">
                    <li className="actions">
                        <SLink to="">
                            <span className="material-icons">
                                vibration
                            </span>
                        </SLink>
                    </li>
                    {
                        this.props.user && (
                            <ProfileMenu
                                user={this.props.user}
                                menuActive={this.state.menuActive}
                                onClick={this.clickMenu}
                                urlPath={urlPath} />
                        )
                    }
                    {
                        !this.props.user && (
                            <li className="actions">
                                <SLink to="/login">
                                    <span className="material-icons">
                                        login
                                    </span>
                                </SLink>
                            </li>
                        )
                    }

                </ul>
            </div>
        )
    }
}

function ProfileMenu({ user, menuActive, onClick, urlPath }) {
    let classDevelopers = '';
    if (urlPath.includes('/dev')) {
        classDevelopers = 'active';
    }

    return (
        <li className="actions hasmenu">
            <a onClick={onClick}>
                <span className="material-icons">
                    account_circle
                </span>
                <span className="indicator-down">▼</span>
            </a>
            {
                menuActive && (
                    <ul className="submenu">
                        {
                            user && user.github && (
                                <li>
                                    <SLink to="/dev" className={classDevelopers}>Developers</SLink>
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
    )
}

export default (fs.connect(['user'])(MainMenu));

