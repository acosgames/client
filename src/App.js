import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import SocialLogin from './components/login/sociallogin';
import CreateDisplayName from './components/login/createdisplayname';
import MainPage from './components/main/mainpage';
import './App.css';

import flatstore from 'flatstore';
flatstore.set('user', {});

function App() {
  return (
    <div>
      <Router>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/dev/profile/:id?" component={CreateDisplayName} />
        <Route exact path="/dev/game/create" component={CreateDisplayName} />
        <Route exact path="/dev/game/:id" component={CreateDisplayName} />
        <Route exact path="/player/create" component={CreateDisplayName} />
        <Route exact path="/" component={SocialLogin} />
        <Route exact path="/games" component={MainPage} />
      </Router>
    </div>
  );
}

export default App;
