import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MainMenu from './components/MainMenu'
import MainPage from './components/MainPage';
import SocialLogin from './components/login/SocialLogin';
import DevLogin from './components/dev/DevLogin';
import CreateDisplayName from './components/login/CreateDisplayName';
import DevDashboard from "./components/dev/DevDashboard";
import DevCreateGame from "./components/dev/DevCreateGame";
import DevManageGame from "./components/dev/DevManageGame";
import ProtectedRoute from './components/login/ProtectedRoute';
import GamePanel from './components/games/GamePanel';
import './App.css';

import flatstore from 'flatstore';

import { getUserProfile } from './actions/person';
import history from "./actions/history";
import GameInfo from "./components/games/GameInfo";
flatstore.set('user', null);


class App extends Component {
  constructor(props) {
    super(props);

    getUserProfile();

  }

  render() {
    return (
      <div id="app">
        <Router history={history} >
          <div id="wrapper">

            <div id="wrapper-header">
              <MainMenu />
            </div>

            <div id="wrapper-content">
              <ProtectedRoute
                exact
                path="/player/create"
                component={CreateDisplayName}
              />
              <Switch>
                <Route
                  exact
                  path="/"
                  component={MainPage}
                />
                <Route
                  exact
                  path="/game/:game_slug"
                  component={GameInfo}
                />
                <Route
                  exact
                  path="/game/:game_slug/:room_slug"
                  component={GamePanel}
                />
                <Route
                  exact
                  path="/game/:game_slug/beta/:room_slug"
                  component={GamePanel}
                />
                <Route
                  exact
                  path="/login"
                  component={SocialLogin}
                />
                <Route
                  exact
                  path="/dev/login"
                  component={DevLogin}
                />
                <ProtectedRoute
                  exact
                  path="/dev/game/create"
                  component={DevCreateGame}
                  verify={(user) => user.isdev}
                  redirectTo="/dev/login"
                />
                <ProtectedRoute
                  exact
                  path="/dev/game/:gameid"
                  component={DevManageGame}
                  verify={(user) => 'github' in user}
                  redirectTo="/dev/login"
                />
                <ProtectedRoute
                  exact
                  path="/dev/:id?"
                  component={DevDashboard}
                  verify={(user) => 'github' in user}
                  redirectTo="/dev/login"
                />

                <Route
                  exact
                  path="/games"
                  component={MainPage}
                />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
