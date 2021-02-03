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
        <Switch>
          <Route path="/createplayer/:apikey?" component={CreateDisplayName} />
          <Route exactpath="/login" component={SocialLogin} />
          <Route exactpath="/success/:apikey?" component={MainPage} />
          <Route exactpath="/" component={MainPage} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
