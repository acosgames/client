import { Component } from "react";

import {
    withRouter,
} from "react-router-dom";


class CreateDisplayName extends Component {
    constructor(props) {
        super(props);

        let apikey = this.props.match.params['apikey'];

        if (apikey) {
            this.props.history.replace('/createplayer');
        }

        this.state = {
            displayname: ""
        }
    }

    onSubmit(e) {
        console.log(e);
    }
    onChange(e) {
        console.log(e.target.value);
        let name = e.target.value;
        name = name.replace(/[^A-Za-z0-9\_]/ig, '');
        this.setState({ displayname: name });
    }

    render() {
        return (
            <div>
                <h3>Choose Display Name</h3>
                <input type="text" onChange={this.onChange.bind(this)} value={this.state.displayname} />
                <button onClick={this.onSubmit.bind(this)}>Submit</button>
            </div>
        )
    }
}

export default withRouter(CreateDisplayName);