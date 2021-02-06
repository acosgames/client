import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";
import ImageUpload from "./ImageUpload";

import { updateGame, createGame } from '../actions/devgame';
import fs from 'flatstore';

class CreateGame extends Component {
    constructor(props) {
        super(props);


        this.state = {
        }
    }

    async onSubmit(e) {
        //console.log(e);
        createGame();

    }

    inputChange(e) {
        let name = e.target.name;
        let value = e.target.value;

        updateGame(name, value);
    }

    onChange(key, value, group) {
        console.log(key, value, group);
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
        let hasError = (this.state.error && this.state.error.length > 0);
        return (
            <div id="creategame" className="inputform">
                <h3>Alright, lets set up your game.</h3>

                <ImageUpload></ImageUpload>

                <input type="text" name="name" placeholder="Game Name" maxLength="60" onChange={this.inputChange.bind(this)} /><br />
                <input type="text" disabled name="version" placeholder="Version" maxLenght="12" value={this.props.devgame.version || '1'} /><br />
                <input type="text" name="shortdesc" placeholder="Short Description" maxLength="80" onChange={this.inputChange.bind(this)} /><br />
                <textarea type="text" name="longdesc" placeholder="Long Description" maxLength="1200" onChange={this.inputChange.bind(this)}></textarea><br />
                <input type="text" name="clientgit" placeholder="Client Git URL" maxLength="255" onChange={this.inputChange.bind(this)} /><br />
                <input type="text" name="servergit" placeholder="Server Git URL (optional)" maxLength="255" onChange={this.inputChange.bind(this)} /><br />

                <button onClick={this.onSubmit.bind(this)}>Submit</button>
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

export default withRouter(fs.connect(['devgame'])(CreateGame));