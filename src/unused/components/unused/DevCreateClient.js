import { Component, Fragment } from "react";

import DevImageUpload from "./DevImageUpload";

import { updateClientField, createClient } from '../../actions/devgame';
import fs from 'flatstore';

import errorMessage from 'shared/model/errorcodes';

fs.set('devclient', {});
fs.set('showCreateClient', false);

class DevCreateClient extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    async onSubmit(e) {
        //console.log(e);
        let game = await createClient();
        if (!game) {
            return;
        }

        // this.props.history.replace('/dev/client/' + game.gameid);
    }

    async onAddClient(e) {
        fs.set('showCreateClient', true);
    }

    async onCancel(e) {
        fs.set('devclient', {});
        fs.set('showCreateClient', false);
    }

    inputChange(e) {
        let name = e.target.name;
        let value = e.target.value;

        updateClientField(name, value);
    }

    onChange(key, value, group) {
        console.log(key, value, group);
    }

    displayError() {
        let errors = this.props.devclienterror;
        if (!errors)
            return <Fragment></Fragment>

        let errorElems = [];
        errors.forEach((error, id) => {
            errorElems.push((<li key={id}>{errorMessage(error)}</li>))
        })

        return errorElems;
    }
    /*
        Create Game Fields
        - Game Name
        - Version
        - Short Desc
        - Long Desc
        - Promo Image(s)
        - link client git repo
        - link server git repo
        - uploaded client build
        - uploaded server build
        - uploaded game rules and private fields
        - Save, Publish, Cancel
        - Withdrawn (reason) //could be done by admin or by owner
    */
    render() {

        if (!this.props.showCreateClient) {
            return (
                <button
                    onClick={this.onAddClient.bind(this)}>
                    Add Client
                </button>
            )
        }

        let hasError = (this.props.devclienterror && this.props.devclienterror.length > 0);
        return (
            <div id="createclient" className="inputform">


                {hasError && this.displayError()}

                <input
                    type="text"
                    name="name"
                    placeholder="Theme Name"
                    maxLength="60"
                    onChange={this.inputChange.bind(this)} />
                <br />
                <textarea
                    type="text"
                    name="description"
                    placeholder="Theme Description"
                    maxLength="1200"
                    onChange={this.inputChange.bind(this)}>
                </textarea>
                <br />
                <input
                    type="text"
                    name="opensource"
                    placeholder="Will the project be open source?"
                    maxLength="3"
                    onChange={this.inputChange.bind(this)} />
                <br />

                <button
                    onClick={this.onCancel.bind(this)}>
                    Cancel
                </button>
                <button
                    onClick={this.onSubmit.bind(this)}>
                    Submit
                </button>

            </div>
        )
    }
}

export default (fs.connect(['devclient', 'devclienterror', 'showCreateClient'])(DevCreateClient));