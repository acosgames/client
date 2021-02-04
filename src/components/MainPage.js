import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";
import GameList from "./GameList";
import MainMenu from './MainMenu';
class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {
        return (
            <div>
                <table>
                    <tr>
                        <td><MainMenu /></td>
                        <td><GameList /></td>
                    </tr>
                </table>

            </div>
        )
    }
}

export default withRouter(MainPage);

