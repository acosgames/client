import React, { Component, Fragment } from 'react';
import fs from 'flatstore';
import DevImageUpload from './DevImageUpload'
import { updateGameField, updateGame, uploadClientBundle } from '../actions/devgame';

class DevClientBundle extends Component {
    constructor(props) {
        super(props);
    }

    onBundleChange(e) {
        console.log(e);
        let bundleFile = e.target.files[0];
        uploadClientBundle({ id: this.props.id, gameid: this.props.gameid }, bundleFile);
    }

    render() {
        if (!this.props.id) {
            return (
                <div className="devclient loading"></div>
            )
        }
        return (
            <div className="devclientbundle">
                <input type="file" name="clientbundle" accept=".js" onChange={this.onBundleChange.bind(this)} />

            </div>
        );
    }
}

let onCustomWatched = ownProps => {
    return ['devClientBundle' + ownProps.id];
};
let onCustomProps = (key, value, store, ownProps) => {
    return {
        client: value
    };
};
export default fs.connect([], onCustomWatched, onCustomProps)(DevClientBundle);