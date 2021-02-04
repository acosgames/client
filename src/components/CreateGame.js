import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";


class CreateGame extends Component {
    constructor(props) {
        super(props);


        this.state = {
        }
    }

    async onSubmit(e) {
        //console.log(e);

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
            <div>
                <h3>Alright, lets set up your game.</h3>

                <input type="text" name="" />
                <input type="text" name="" />
                <input type="text" name="" />
                <input type="text" name="" />
                <input type="text" name="" />
                <input type="text" name="" />


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

export default withRouter(CreateGame);