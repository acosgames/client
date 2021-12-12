import React, { Component, Fragment } from 'react';
import fs from 'flatstore';
import DevClientListItem from './DevClientListItem';
class DevClientList extends Component {
    constructor(props) {
        super(props);
    }

    renderList() {
        let elems = [];
        let game = fs.get('devgame');
        if (!game.clients || game.clients.length == 0)
            return [];
        for (var i = 0; i < game.clients.length; i++) {
            let client = game.clients[i];
            elems.push(
                <li key={client.id}>
                    <DevClientListItem id={client.id}></DevClientListItem>
                </li>
            )
        }
        return elems;
    }

    render() {
        return (
            <div id="devclientlist">
                <ul>{this.renderList()}</ul>
            </div>
        );
    }
}

export default fs.connect(['devClientsCnt'])(DevClientList);