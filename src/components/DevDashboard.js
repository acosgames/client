import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";

class DevDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    /*
        Dashboard
        - Published games with stats
        - beta games with stats
        - create new game
        - documentation
        - exmaple code
        - discord
    */
    render() {
        return (
            <div id="devdash">


            </div>
        )
    }
}

export default withRouter(DevDashboard);

