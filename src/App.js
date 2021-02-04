import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MainPage from './components/MainPage';
import SocialLogin from './components/SocialLogin';
import CreateDisplayName from './components/CreateDisplayName';
import DeveloperDashboard from "./components/DeveloperDashboard";
import CreateGame from "./components/CreateGame";

import './App.css';

import flatstore from 'flatstore';


flatstore.set('user', {});

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/dev/game/create" component={CreateGame} />
          <Route exact path="/dev/game/:id" component={CreateDisplayName} />
          <Route exact path="/dev/:id?" component={DeveloperDashboard} />

          <Route exact path="/player/create" component={CreateDisplayName} />
          <Route exact path="/" component={SocialLogin} />
          <Route exact path="/games" component={MainPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
