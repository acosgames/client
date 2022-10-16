// import '@fontsource/roboto/100.css'
// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'
// import '@fontsource/roboto/900.css'

import React, { Component, useEffect, useRef, useState } from "react";
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
import GameInfoCreateDisplayName from "./components/login/GameInfoCreateDisplayName";
import { useColorModeValue, useDisclosure } from "@chakra-ui/react";
import ActivateUserProfile from "./components/widgets/ActivateUserProfile";
import ToastMessage from "./components/widgets/ToastMessage";
import ChatPanel from "./components/chat/ChatPanel";
import AllContent from './components/AllContent';

import { Scrollbars } from 'react-custom-scrollbars-2';
import GamePanelSpawner from "./components/games/GameDisplay/GamePanelSpawner";
import GamePanelDraggables from "./components/games/GameDisplay/GamePanelDraggables";
// import PerfectScrollbar from 'react-perfect-scrollbar'

fs.delimiter('>');
fs.set("isMobile", false);

function App(props) {

  const disclosure = useDisclosure()
  const primaryCanvasRef = useRef();

  let [isMobile, setIsMobile] = useState(false);

  const onResize = () => {
    let screenWidth = window.screen.width;
    let isMobile = screenWidth <= 600;
    setIsMobile(isMobile);
    fs.set("isMobile", isMobile)
  }

  useEffect(() => {
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, [])

  useEffect(() => {
    fs.set('primaryCanvasRef', primaryCanvasRef);
  })




  return (
    <BrowserRouter>
      <ActivateUserProfile />
      <VersionControl />
      <GameInfoCreateDisplayName {...disclosure} />

      <GamePanelSpawner primaryCanvasRef={primaryCanvasRef} />

      <ToastMessage />

      <HStack overflow="hidden" className="wrapper" spacing="0" width="100%" height="100%" m="0" p="0" justifyContent={'center'}>
        <VStack bgColor={'gray.800'} height="100%" className="panel-navigation" spacing="0" alignContent={'flex-start'} >
          <HStack
            boxShadow={'#0003 0 4px 6px -1px, #0000001f 0 2px 4px -1px'}
            spacing="0"
            w="100%"
            // overflow="hidden"
            h={['3rem', '4rem', '5rem']}
            minHeight={['3rem', '4rem', '5rem']}
            zIndex="21"
            justifyContent={'center'}

          // bg={'blacks.300'}
          >
          </HStack>
          <Box
            w="100%"
            h="100%"
          // pt="2rem"
          >
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
          </Box>
        </VStack>
        <VStack className="panel-main" height="100%" width="100%" spacing="0" justifyContent={'center'} >
          <HStack
            boxShadow={'0 10px 15px -3px rgba(0, 0, 0, .2), 0 4px 6px -2px rgba(0, 0, 0, .1);'}
            // boxShadow={'#0003 0 4px 6px -1px, #0000001f 0 2px 4px -1px'}
            spacing="0"
            w="100%"
            h={['3rem', '4rem', '5rem']}
            position={props.displayMode == 'theatre' ? 'absolute' : "relative"}
            top={props.displayMode == 'theatre' ? '-100rem' : '0'}
            zIndex="20"
            justifyContent={'center'}
            // overflow="hidden"
            px={['0.5rem', '1rem', '5rem']}
            bg={'gray.800'}>
            <MainMenuChakra />
          </HStack>

          <Box w="100%" h={["100%"]} position="relative" ref={primaryCanvasRef}>
            <GamePanelDraggables primaryCanvasRef={primaryCanvasRef} />
            <Scrollbars
              renderView={(props) => (
                <div
                  className="main-scrollbars"
                  style={{
                    position: 'absolute',
                    inset: '0px',
                    overflow: 'hidden scroll',
                    width: '100%'
                    // marginRight: '-8px',
                    // marginBottom: '-8px'
                  }}
                />)}
              // renderThumbVertical={(style, props) => <Box  {...props} {...style} w="10px" bgColor={'blacks.700'} className="thumb-vertical" />}
              hideTracksWhenNotNeeded={true}
              autoHide
              autoHideTimeout={2000}
              autoHideDuration={200}
            >
              <VStack px={['0.5rem', '1rem', '5rem']} pt={'2.5rem'} spacing="0" justifyContent={'center'} w="100%" height="100%" >
                <AllContent />
              </VStack>
            </Scrollbars>
          </Box>
          {isMobile && (
            <ChatPanelWrapper />
          )}
        </VStack>
        {
          !isMobile && (
            <ChatPanelWrapper />
          )
        }
      </HStack >

    </BrowserRouter >
  );
}

function ChatPanelWrapper() {

  return (<Switch>

    <Route
      exact
      path="/g/:game_slug"
      component={ChatPanel}
    />
    <Route
      exact
      path="/g/:game_slug/:room_slug"
      component={ChatPanel}
    />
    <Route
      exact
      path="/g/:game_slug/:mode/:room_slug"
      component={ChatPanel}
    />
    <Route path="*" component={ChatPanel} />
  </Switch>)
}

export default fs.connect(['displayMode'])(App);
