import { Component, Fragment } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevImageUpload from "./DevImageUpload";
import { updateGameField, updateGame, uploadGameImages } from '../../actions/devgame';
import fs from 'flatstore';


import errorMessage from 'fsg-shared/model/errorcodes';
import Markdown from "../widgets/Markdown";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

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
            <div id="devmanagegamefields" className="form">
                <h3>Finish up, so you can publish.</h3>
                <div className="form-row">
                    <DevImageUpload
                        imgstore='devgameimages'
                        uploadFunc={uploadGameImages} />
                </div>
                <div className="form-row">
                    {hasError && this.displayError()}
                </div>
                <div className="form-row">
                    <label htmlFor="name">Game Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Game Name"
                        maxLength="60"
                        value={this.props.devgame.name || ''}
                        onChange={this.inputChange.bind(this)} />
                </div>
                <div className="form-row">
                    <label htmlFor="game_slug">Game Slug</label>
                    <input
                        type="text"
                        name="game_slug"
                        id="game_slug"
                        placeholder="Slug Name (lower a-z and - only)"
                        maxLength="32"
                        value={this.props.devgame.game_slug || ''}
                        onChange={this.inputChange.bind(this)} />
                </div>
                <div className="form-row">
                    <label htmlFor="version">Version</label>
                    <input
                        type="text"
                        disabled
                        name="version"
                        id="version"
                        placeholder="Version"
                        maxLength="12"
                        value={this.props.devgame.version || '1'} />
                </div>
                <div className="form-row">
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
                </div>
                <div className="form-row">
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
                </div>
                <div className="form-row">
                    <label htmlFor="teams">Team names</label>
                    <input
                        type="text"
                        name="teams"
                        id="teams"
                        placeholder="i.e. Red, Blue"
                        maxLength="80"
                        value={this.props.devgame.teams || ''}
                        onChange={this.inputChange.bind(this)} />
                </div>
                <div className="form-row">
                    <label htmlFor="shortdesc">Short Description</label>
                    <input
                        type="text"
                        name="shortdesc"
                        id="shortdesc"
                        placeholder="Short Description"
                        maxLength="80"
                        value={this.props.devgame.shortdesc || ''}
                        onChange={this.inputChange.bind(this)} />
                </div>
                <div className="form-row">
                    <label htmlFor="longdesc">Long Description</label>
                    <div id="game-info-longdesc">
                        <Markdown
                            type="text"
                            name="longdesc"
                            id="longdesc"
                            placeholder="Long Description"
                            maxLength="5000"
                            value={this.props.devgame.longdesc || ''}
                        // onChange={this.inputChange.bind(this)}
                        ></Markdown>


                        {/* <ReactMarkdown children={this.props.devgame.longdesc} remarkPlugins={[remarkGfm]}></ReactMarkdown> */}

                    </div>
                </div>
                <div className="form-row">
                    <label htmlFor="git">Git URL for issues</label>
                    <input
                        type="text"
                        name="git"
                        id="git"
                        placeholder="https://github.com/myname/myrepo"
                        maxLength="255"
                        value={this.props.devgame.git || ''}
                        onChange={this.inputChange.bind(this)} />
                </div>
                <div className="form-row">
                    <button className="submit" onClick={this.onSubmit.bind(this)}>Save</button>
                </div>
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