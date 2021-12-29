import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MainMenuChakra from './components/MainMenuChakra'
import Routes from './Routes';
import RoutesGame from './RoutesGame';

import { getUser, getUserProfile } from './actions/person';
import QueuePanel from "./components/games/QueuePanel";
import fs from 'flatstore';
import Sidebar from './components/widgets/Sidebar';
import { Box, Flex, HStack } from "@chakra-ui/layout";



fs.delimiter('>');


class App extends Component {
  constructor(props) {
    super(props);

    getUser();

  }

  render() {
    return (

      <BrowserRouter>

        <MainMenuChakra />

        <Flex id="wrapper" direction="row" height="100%">
          <Switch>
            <Route path="/dev/login"
              component={() => (
                <></>
              )} />
            <Route
              path="/dev*"
              component={() => (
                <Sidebar />
              )}
            />
          </Switch>



          <Switch>
            <Route path="/g/*"
              component={RoutesGame} />
            <Route path="*" component={Routes} />
          </Switch>



        </Flex>

      </BrowserRouter>
    );
  }
}

export default App;
