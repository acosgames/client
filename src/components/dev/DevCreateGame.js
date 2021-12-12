import { Component, Fragment } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevImageUpload from "./DevImageUpload";


import { updateGameField, createGame, clearGameFields } from '../../actions/devgame';
import fs from 'flatstore';

import errorMessage from 'fsg-shared/model/errorcodes';
import FSGTextInput from "../widgets/inputs/FSGTextInput";
import FSGSubmit from "../widgets/inputs/FSGSubmit";
import { Divider, Heading } from "@chakra-ui/layout";

class DevCreateGame extends Component {
    constructor(props) {
        super(props);

        clearGameFields();

        this.state = {
        }
    }

    onSubmit = async (e) => {
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

        updateGameField(name, value, 'create-game_info', 'devgame', 'devgameerror');
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
                <Heading>Alright, lets set up your game.</Heading>
                <Divider mt="2" mb="30" />
                {hasError && this.displayError()}

                <FSGTextInput
                    name="name"
                    id="name"
                    title="Game Name"
                    maxLength="60"
                    value={this.props.devgame.name || ''}
                    onChange={this.inputChange.bind(this)}
                />
                <FSGTextInput
                    name="game_slug"
                    id="game_slug"
                    title="Slug Name (lower a-z and - only)"
                    maxLength="32"
                    value={this.props.devgame.game_slug || ''}
                    onChange={this.inputChange.bind(this)}
                />

                <FSGTextInput
                    name="shortdesc"
                    id="shortdesc"
                    title="Short Description"
                    maxLength="80"
                    value={this.props.devgame.shortdesc || ''}
                    onChange={this.inputChange.bind(this)}
                />


                <FSGSubmit
                    onClick={this.onSubmit} />

            </div>
        )
    }
}

export default withRouter(fs.connect(['devgame', 'devgameerror'])(DevCreateGame));