import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";



class GameList extends Component {
    constructor(props) {
        super(props);

        this.iframe = null;
        this.state = {
        }

        this.onMessage = this.onMessage.bind(this);
    }

    componentDidMount() {
        window.addEventListener(
            'message',
            this.onMessage,
            false
        );
    }

    componentWillUnmount() {
        window.removeEventListener('message', this.onMessage, false);
    }
    onMessage(evt) {
        let data = evt.data;
        let origin = evt.origin;
        let source = evt.source;
        if (!data.payload || !data.action) return;
        console.log('Received from origin:' + origin, data);
        let msg = data.payload;
        if (msg.indexOf("Hello") > -1) {
            this.send('connected', 'Welcome to 5SG!');
        }
    }

    send(action, payload) {
        if (this.iframe)
            this.iframe.contentWindow.postMessage({ action, payload }, '*');
    }

    render() {
        return (
            <div id="gamepanel">
                <h3>Let's Play</h3>
                <button onClick={() => {
                    this.send('ping', 'ping');
                }}>
                    Parent Button
                    </button>
                <iframe ref={(c) => {
                    this.iframe = c;
                }}
                    src="http://localhost:8080/iframe"
                    sandbox="allow-scripts" >

                </iframe>
            </div>
        )
    }
}

export default withRouter(GameList);