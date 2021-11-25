import { Component, Fragment } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevImageUpload from "./DevImageUpload";


import { updateGameField, createGame, clearGameFields } from '../../actions/devgame';
import fs from 'flatstore';

import errorMessage from 'fsg-shared/model/errorcodes';

class DevCreateGame extends Component {
    constructor(props) {
        super(props);

        clearGameFields();

        this.state = {
        }
    }

    async onSubmit(e) {
        //console.log(e);
        let game = await createGame();
        if (!game) {
            return;
        }

        this.props.history.replace('/dev/game/' + game.gameid);
    }

    inputChange(e) {
        let name = e.target.name;
        let value = e.target.value;

        updateGameField(name, value);
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
                <h3>Alright, lets set up your game.</h3>

                {hasError && this.displayError()}

                <input
                    type="text"
                    name="name"
                    placeholder="Game Name"
                    maxLength="60"
                    onChange={this.inputChange.bind(this)} />
                <br />
                <input
                    type="text"
                    name="game_slug"
                    placeholder="Slug Name (lower a-z and - only)"
                    maxLength="32"
                    onChange={this.inputChange.bind(this)} />
                <br />
                <input
                    type="text"
                    name="shortdesc"
                    placeholder="Short Description"
                    maxLength="80"
                    onChange={this.inputChange.bind(this)} />
                <br />
                <textarea
                    type="text"
                    name="longdesc"
                    placeholder="Long Description"
                    maxLength="1200"
                    onChange={this.inputChange.bind(this)}>
                </textarea>
                <br />
                {/* <input
                    type="text"
                    name="git_client"
                    placeholder="Client Git URL"
                    maxLength="255"
                    onChange={this.inputChange.bind(this)} />
                <br />
                <input
                    type="text"
                    name="git_server"
                    placeholder="Server Git URL (optional)"
                    maxLength="255"
                    onChange={this.inputChange.bind(this)} />
                <br /> */}

                <button
                    onClick={this.onSubmit.bind(this)}>
                    Submit
                </button>
            </div>
        )
    }
}

export default withRouter(fs.connect(['devgame', 'devgameerror'])(DevCreateGame));