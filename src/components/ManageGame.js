import { Component, Fragment } from "react";

import {
    withRouter,
} from "react-router-dom";
import ImageUpload from "./ImageUpload";

import { updateGameField, updateGame, findGame } from '../actions/devgame';
import fs from 'flatstore';

import errorMessage from 'forkoff-shared/model/errorcodes';

class ManageGame extends Component {
    constructor(props) {
        super(props);

        let gameid = props.match.params.gameid;
        findGame(gameid);
        this.state = {
        }
    }

    async onSubmit(e) {
        //console.log(e);
        let game = await updateGame();
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
                <h3>Finish up, so you can publish.</h3>

                <ImageUpload images={this.props.devgameimages}></ImageUpload>

                {hasError && this.displayError()}
                <input
                    type="text"
                    name="name"
                    placeholder="Game Name"
                    maxLength="60"
                    value={this.props.devgame.name || ''}
                    onChange={this.inputChange.bind(this)} /><br />
                <input
                    type="text"
                    disabled
                    name="version"
                    placeholder="Version"
                    maxLength="12"
                    value={this.props.devgame.version || '1'} /><br />
                <input
                    type="text"
                    name="shortdesc"
                    placeholder="Short Description"
                    maxLength="80"
                    value={this.props.devgame.shortdesc || ''}
                    onChange={this.inputChange.bind(this)} /><br />
                <textarea
                    type="text"
                    name="longdesc"
                    placeholder="Long Description"
                    maxLength="1200"
                    value={this.props.devgame.longdesc || ''}
                    onChange={this.inputChange.bind(this)}></textarea><br />
                <input
                    type="text"
                    name="clientgit"
                    placeholder="Client Git URL"
                    maxLength="255"
                    value={this.props.devgame.clientgit || ''}
                    onChange={this.inputChange.bind(this)} /><br />
                <input
                    type="text"
                    name="servergit"
                    placeholder="Server Git URL (optional)"
                    maxLength="255"
                    value={this.props.devgame.servergit || ''}
                    onChange={this.inputChange.bind(this)} /><br />

                <button onClick={this.onSubmit.bind(this)}>Save</button>
                {
                    hasError && (
                        <div>
                            <span>{this.state.error}</span>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default withRouter(fs.connect(['devgame', 'devgameerror', 'devgameimages'])(ManageGame));