import React, { Component } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import MainMenuChakra from './components/MainMenuChakra'
import Routes from './Routes';

import { getUserProfile } from './actions/person';
import QueuePanel from "./components/games/QueuePanel";
import fs from 'flatstore';
import Sidebar from './components/widgets/Sidebar';
import { Box, Flex, HStack } from "@chakra-ui/layout";



fs.delimiter('>');


class App extends Component {
  constructor(props) {
    super(props);

    getUserProfile();

  }

  render() {
    return (

      <BrowserRouter>

        <MainMenuChakra />

        <Flex id="wrapper" direction="row">
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


          <Box display="inline-block" width="100%" pl={[3, 4, 12]} pr={[3, 4, 12]} pt={6}>
            <Switch>
              <Routes></Routes>
            </Switch>
          </Box>


        </Flex>

      </BrowserRouter>
    );
  }
}

export default App;
