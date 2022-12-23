import { Component } from "react";


import GameList from "./games/GameList";


class MainPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        gtag('event', 'mainpage');

    }


    render() {
        return (
            // <div id="mainpage">

            <GameList />
            // </div>
        )
    }
}

export default (MainPage);

