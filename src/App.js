import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MainMenu from './components/MainMenu'
import Routes from './Routes';

import { getUserProfile } from './actions/person';
import QueuePanel from "./components/games/QueuePanel";
import fs from 'flatstore';

fs.delimiter('>');


class App extends Component {
  constructor(props) {
    super(props);

    getUserProfile();

  }

  render() {
    return (
      <div id="app">
        <BrowserRouter>
          <div id="wrapper">

            <div id="wrapper-header">
              <MainMenu />
            </div>


            <div id="wrapper-content">

              <Switch>
                <Routes></Routes>
              </Switch>
              <QueuePanel />
            </div>

          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
