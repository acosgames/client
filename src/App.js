// import '@fontsource/roboto/100.css'
// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'
// import '@fontsource/roboto/900.css'

import React, { Component, useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import MainMenuChakra from './components/MainMenuChakra'
import Routes from './routes/Routes';
import RoutesGame from './routes/RoutesGame';

import { getUser } from './actions/person';
import QueuePanel from "./components/games/QueuePanel";
import fs from 'flatstore';
import Sidebar from './components/widgets/Sidebar';
import { Box, Flex, HStack, VStack, Divider } from "@chakra-ui/layout";
import AcosFooter from "./components/AcosFooter";
import VersionControl from "./components/widgets/VersionControl";
import GameInfoCreateDisplayName from "./components/games/GameInfo/GameInfoCreateDisplayName";
import { useDisclosure } from "@chakra-ui/react";
import ActivateUserProfile from "./components/widgets/ActivateUserProfile";
import ToastMessage from "./components/widgets/ToastMessage";


fs.delimiter('>');

function App(props) {

  const disclosure = useDisclosure()

  useEffect(() => {

  }, [])

  return (
    <BrowserRouter>
      <ActivateUserProfile />
      <VersionControl />
      <GameInfoCreateDisplayName {...disclosure} />
      <ToastMessage />
      <Flex direction={'column'} minHeight={'100%'} w="100%" filter="blur(0)">
        <MainMenuChakra />
        <VStack w="100%" zIndex="5">
          <Flex id="wrapper" direction="row" w="100%">
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
        </VStack>

        <HStack flexGrow={'1'} alignItems={'flex-end'} w="100%">
          <AcosFooter />
        </HStack>
      </Flex>
      <QueuePanel />
    </BrowserRouter >
  );
}

export default App;
