import React, { Component, Fragment } from 'react';
import fs from 'flatstore';

class DevClientListItem extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        if (!this.props.client) {
            return (
                <div className="devclient loading"></div>
            )
        }
        return (
            <div className="devclient">
                <h4>{this.props.client.name}</h4>
                <p>{this.props.client.description}</p>
                <p>
                    <a href={this.props.client.git_client}>{this.props.client.git_client}</a>
                </p>
            </div>
        );
    }
}

let onCustomWatched = ownProps => {
    return ['devClients-' + ownProps.id];
};
let onCustomProps = (key, value, store, ownProps) => {
    return {
        client: value
    };
};
export default fs.connect([], onCustomWatched, onCustomProps)(DevClientListItem);