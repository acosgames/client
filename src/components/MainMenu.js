import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";

class MainMenu extends Component {
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
                        <td><a href="/games">Find Games</a></td>
                    </tr>
                    <tr>
                        <td><a href="/dev/dashboard">Developer Dashboard</a></td>
                    </tr>
                </table>

            </div>
        )
    }
}

export default withRouter(MainMenu);

