import { Component, Fragment } from "react";
import fs from 'flatstore';
class SocialLogin extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let user = this.props.user;
        if (user && user.apikey && user.apikey.length > 0 && user.apikey != 'undefined') {
            return <Fragment></Fragment>
        }
        return (
            <div id="social">
                <h4>Login to Play!</h4>
                <ul>
                    <li><a href="http://localhost:8080/login/google">with Google</a></li>
                    <li><a href="http://localhost:8080/login/microsoft">with Microsft</a></li>
                    <li><a href="http://localhost:8080/login/github">with GitHub as Developer</a></li>
                </ul>
            </div>
        )
    }
}

export default fs.connect(['user'])(SocialLogin);