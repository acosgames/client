import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MainMenu from './components/MainMenu'
import MainPage from './components/MainPage';
import SocialLogin from './components/SocialLogin';
import CreateDisplayName from './components/CreateDisplayName';
import DeveloperDashboard from "./components/DeveloperDashboard";
import CreateGame from "./components/CreateGame";
import ManageGame from "./components/ManageGame";

import './App.css';

import flatstore from 'flatstore';


flatstore.set('user', {});

class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div id="app">
        <Router>
          <table id="wrapper">
            <tbody>
              <tr>
                <td>
                  <MainMenu />
                </td>
                <td>
                  <Switch>
                    <Route exact path="/" component={MainPage} />
                    <Route exact path="/dev/game/create" component={CreateGame} />
                    <Route exact path="/dev/game/:gameid" component={ManageGame} />
                    <Route exact path="/dev/:id?" component={DeveloperDashboard} />
                    <Route exact path="/player/create" component={CreateDisplayName} />
                    <Route exact path="/games" component={MainPage} />
                  </Switch>
                </td>
              </tr>
            </tbody>
          </table>
        </Router>
      </div>
    );
  }
}

export default flatstore.connect(['user'])(App);
