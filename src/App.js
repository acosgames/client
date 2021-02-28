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
import DevDashboard from "./components/DevDashboard";
import DevCreateGame from "./components/DevCreateGame";
import DevManageGame from "./components/DevManageGame";
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

import flatstore from 'flatstore';

import { getUser } from './actions/person';

flatstore.set('user', null);


class App extends Component {
  constructor(props) {
    super(props);

    getUser();
  }

  render() {
    return (
      <div id="app">
        <Router >
          <table id="wrapper">
            <tbody>
              <tr>
                <td>
                  <MainMenu />
                </td>
                <td>
                  <Switch>
                    <Route exact path="/" component={MainPage} />
                    <ProtectedRoute exact path="/dev/game/create" component={DevCreateGame} />
                    <ProtectedRoute exact path="/dev/game/:gameid" component={DevManageGame} />
                    <ProtectedRoute exact path="/dev/:id?" component={DevDashboard} />
                    <ProtectedRoute exact path="/player/create" component={CreateDisplayName} />
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

export default App;
