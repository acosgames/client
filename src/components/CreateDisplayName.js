import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";

import { createDisplayName } from '../actions/person';
import fs from 'flatstore';

class CreateDisplayName extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayname: ""
        }
    }

    async onSubmit(e) {
        console.log(e);
        let displayname = this.state.displayname;
        let user = await createDisplayName(displayname);
        if (user.ecode == 'E_EXISTS_DISPLAYNAME') {
            this.setState({ error: `The name '${displayname}' already exists.` })
        }
        else if (user.ecode == 'E_PERSON_DUPENAME') {
            this.setState({ error: `The name '${displayname}' already exists.` })
        }
        else {

            this.redirect();
        }
    }

    redirect() {
        let history = fs.get('pagehistory');

        let previous = history[history.length - 2] || history[history.length - 1];
        if (previous.pathname.indexOf('/player/create') > -1) {
            this.props.history.push('/games');
            return;
        }

        this.props.history.goBack();
        history.pop();
        fs.set('pagehistory', history);
    }

    onChange(e) {
        console.log(e.target.value);
        let name = e.target.value;
        name = name.replace(/[^A-Za-z0-9\_]/ig, '');
        this.setState({ displayname: name });
    }

    render() {
        let hasError = (this.state.error && this.state.error.length > 0);
        return (
            <div>
                <h3>Choose Display Name</h3>

                <input type="text" onChange={this.onChange.bind(this)} value={this.state.displayname} />

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

export default withRouter(CreateDisplayName);