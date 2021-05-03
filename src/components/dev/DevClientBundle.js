import React, { Component, Fragment } from 'react';
import fs from 'flatstore';
import DevImageUpload from './DevImageUpload'
import { updateGameField, updateGame, uploadClientBundle } from '../../actions/devgame';
import moment from 'moment-timezone';

class DevClientBundle extends Component {
    constructor(props) {
        super(props);

        this.fileRef = React.createRef();
    }

    onBundleChange(e) {
        console.log(e);
        let bundleFile = e.target.files[0];
        uploadClientBundle({ id: this.props.id, gameid: this.props.gameid }, bundleFile);
    }

    onFileSelect(e) {
        this.fileRef.current.click();
    }
    render() {
        if (this.props.build_client) {
            let currentTimeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;
            return (
                <div className="devclient">
                    <label>Build Version: </label>
                    <span>{this.props.clientversion || 1}</span>
                    <br />
                    <label>Target Server: </label>
                    <span>{this.props.serverversion || 1}</span>
                    <br />
                    <label>Updated: </label>
                    <span>{moment.utc(this.props.tsupdate).tz(moment.tz.guess()).format("MMM DD, YYYY - h:mm A")}</span>
                    <br />
                    <label><a href={this.props.build_client_url}>Download</a></label>

                    <div className="devclientbundle">
                        <input type="file" ref={this.fileRef} name="clientbundle" accept=".js" style={{ display: "none" }} onChange={this.onBundleChange.bind(this)} />
                        <button onClick={this.onFileSelect.bind(this)}>Update Bundle File</button>
                    </div>
                </div >
            )
        }
        return (
            <div className="devclientbundle">
                <input type="file" ref={this.fileRef} name="clientbundle" accept=".js" onChange={this.onBundleChange.bind(this)} />

            </div>
        );
    }
}

let onCustomWatched = ownProps => {
    return ['devClientBundle_' + ownProps.id];
};
let onCustomProps = (key, value, store, ownProps) => {
    return {
        build_client_url: value
    };
};
export default fs.connect([], onCustomWatched, onCustomProps)(DevClientBundle);