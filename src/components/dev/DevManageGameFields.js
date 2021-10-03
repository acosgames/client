import { Component, Fragment } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevImageUpload from "./DevImageUpload";
import { updateGameField, updateGame, uploadGameImages } from '../../actions/devgame';
import fs from 'flatstore';


import errorMessage from 'fsg-shared/model/errorcodes';

class DevManageGameFields extends Component {
    constructor(props) {
        super(props);
        this.state = {}
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
            <div id="devmanagegamefields" className="inputform">
                <h3>Finish up, so you can publish.</h3>

                <DevImageUpload
                    imgstore='devgameimages'
                    uploadFunc={uploadGameImages} />

                {hasError && this.displayError()}

                <input
                    type="text"
                    name="name"
                    placeholder="Game Name"
                    maxLength="60"
                    value={this.props.devgame.name || ''}
                    onChange={this.inputChange.bind(this)} />
                <br />
                <input
                    type="text"
                    name="game_slug"
                    placeholder="Slug Name (lower a-z and - only)"
                    maxLength="32"
                    value={this.props.devgame.game_slug || ''}
                    onChange={this.inputChange.bind(this)} />
                <br />
                <label htmlFor="version">Version</label>
                <input
                    type="text"
                    disabled
                    name="version"
                    id="version"
                    placeholder="Version"
                    maxLength="12"
                    value={this.props.devgame.version || '1'} />
                <br />
                <label htmlFor="maxplayers">Max players</label>
                <input
                    type="number"
                    name="maxplayers"
                    id="maxplayers"
                    placeholder="Max Players"
                    min="1"
                    max="100"
                    value={this.props.devgame.maxplayers || '2'}
                    onChange={this.inputChange.bind(this)} />
                <br />

                <label htmlFor="minplayers">Min players</label>
                <input
                    type="number"
                    name="minplayers"
                    id="minplayers"
                    placeholder="Min Players"
                    min="1"
                    max="100"
                    value={this.props.devgame.minplayers || '2'}
                    onChange={this.inputChange.bind(this)} />
                <br />
                <label htmlFor="teams">Team names</label>
                <input
                    type="text"
                    name="teams"
                    id="teams"
                    placeholder="i.e. Red, Blue"
                    maxLength="80"
                    value={this.props.devgame.teams || ''}
                    onChange={this.inputChange.bind(this)} />
                <br />
                <input
                    type="text"
                    name="shortdesc"
                    placeholder="Short Description"
                    maxLength="80"
                    value={this.props.devgame.shortdesc || ''}
                    onChange={this.inputChange.bind(this)} />
                <br />
                <textarea
                    type="text"
                    name="longdesc"
                    placeholder="Long Description"
                    maxLength="1200"
                    value={this.props.devgame.longdesc || ''}
                    onChange={this.inputChange.bind(this)}></textarea>
                <br />
                <input
                    type="text"
                    name="git"
                    placeholder="Git URL for this project"
                    maxLength="255"
                    value={this.props.devgame.git || ''}
                    onChange={this.inputChange.bind(this)} />
                <br />


                <button onClick={this.onSubmit.bind(this)}>Save</button>
                {
                    hasError && (
                        <div>
                            <span>{this.state.error}</span>
                        </div>
                    )
                }

                <div className="deploy-info">
                    <div className="deploy-cmd">
                        <h5>Ready to deploy? Simply run this command from your development environment.</h5>
                        <pre>npm run deploy {this.props.devgame.apikey}</pre>
                    </div>
                </div>
            </div>


        )
    }
}

export default withRouter(fs.connect(['devgame', 'devgameerror', 'devgameimages'])(DevManageGameFields));