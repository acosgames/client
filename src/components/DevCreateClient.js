import { Component, Fragment } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevImageUpload from "./DevImageUpload";

import { updateClientField, createClient } from '../actions/devgame';
import fs from 'flatstore';

import errorMessage from 'forkoff-shared/model/errorcodes';

fs.set('devclient', {});

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
        let hasError = (this.props.devclienterror && this.props.devclienterror.length > 0);
        return (
            <div id="createclient" className="inputform">
                <h3>Add your client bundle.</h3>

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
                    name="git_client"
                    placeholder="Client Git URL"
                    maxLength="255"
                    onChange={this.inputChange.bind(this)} />
                <br />

                <button
                    onClick={this.onSubmit.bind(this)}>
                    Submit
                </button>
            </div>
        )
    }
}

export default withRouter(fs.connect(['devclient', 'devclienterror'])(DevCreateClient));