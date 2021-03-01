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
import DevLogin from './components/DevLogin';
import CreateDisplayName from './components/CreateDisplayName';
import DevDashboard from "./components/DevDashboard";
import DevCreateGame from "./components/DevCreateGame";
import DevManageGame from "./components/DevManageGame";
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

import flatstore from 'flatstore';

import { getUserProfile } from './actions/person';
import history from "./actions/history";
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
          <table id="wrapper">
            <tbody>
              <tr>
                <td>
                  <MainMenu />
                </td>
                <td>
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
