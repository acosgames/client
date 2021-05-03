import { Component } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";
import SocialLogin from "./login/SocialLogin";

import fs from 'flatstore';

import './styles/MainPage.css';

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

    render() {

        this.updateHistory();

        return (
            <div id="mainmenu">
                <ul>
                    <li><Link to="/games">Find Games</Link></li>
                    <li><Link to="/dev">Developer Dashboard</Link></li>
                    <li><Link to="/dev/game/create">Create Game</Link></li>
                </ul>
            </div>
        )
    }
}

export default withRouter(MainMenu);

