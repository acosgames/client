import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";
import SocialLogin from "./SocialLogin";

import './styles/MainPage.css';

class MainMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div id="mainmenu">
                <ul>
                    <li><a href="/games">Find Games</a></li>
                    <li><a href="/dev">Developer Dashboard</a></li>
                    <li><a href="/dev/game/create">Create Game</a></li>
                </ul>

                <SocialLogin />
            </div>
        )
    }
}

export default withRouter(MainMenu);

