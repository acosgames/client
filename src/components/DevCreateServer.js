import { Component, Fragment } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevImageUpload from "./DevImageUpload";

import { updateServerField, createServer } from '../actions/devgame';
import fs from 'flatstore';

import errorMessage from 'fsg-shared/model/errorcodes';

class DevCreateServer extends Component {
    constructor(props) {
        super(props);


        this.state = {
        }
    }

    async onSubmit(e) {
        //console.log(e);
        let game = await createServer();
        if (!game) {
            return;
        }

        // this.props.history.replace('/dev/game/' + game.gameid);
    }

    inputChange(e) {
        let name = e.target.name;
        let value = e.target.value;

        updateServerField(name, value);
    }

    onChange(key, value, group) {
        console.log(key, value, group);
    }

    displayError() {
        let errors = this.props.devgameerror;
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
        let hasError = (this.props.devgameerror && this.props.devgameerror.length > 0);
        return (
            <div id="creategame" className="inputform">
                <h3>Add your server bundle.</h3>

                {hasError && this.displayError()}

                <button
                    onClick={this.onSubmit.bind(this)}>
                    Submit
                </button>
            </div>
        )
    }
}

export default withRouter(fs.connect(['devserver', 'devservererror'])(DevCreateServer));