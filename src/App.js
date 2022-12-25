// import '@fontsource/roboto/100.css'
// import '@fontsource/roboto/300.css'
// import '@fontsource/roboto/500.css'
// import '@fontsource/roboto/700.css'
// import '@fontsource/roboto/900.css'

import React, { Component, useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import MainMenuChakra from './components/MainMenuChakra'


// import { getUser } from './actions/person';
// import QueuePanel from "./components/games/QueuePanel";
import fs from 'flatstore';
import Sidebar from './components/widgets/Sidebar';
import { Box, Flex, HStack, VStack, Divider } from "@chakra-ui/layout";
// import AcosFooter from "./components/AcosFooter";
import VersionControl from "./components/widgets/VersionControl";
import GameInfoCreateDisplayName from "./components/login/GameInfoCreateDisplayName";
import { useColorModeValue, chakra, useDisclosure } from "@chakra-ui/react";
import ActivateUserProfile from "./components/widgets/ActivateUserProfile";
import ToastMessage from "./components/widgets/ToastMessage";
// import ChatPanel from "./components/chat/ChatPanel";
import AllContent from './components/AllContent';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// import { Scrollbars } from 'react-custom-scrollbars-2';
// import GamePanelSpawner from "./components/games/GameDisplay/GamePanelSpawner";
import GamePanelDraggables from "./components/games/GameDisplay/GamePanelDraggables";
import RoomPanel from "./components/room/RoomPanel";
import LobbyPanel from "./components/lobby/LobbyPanel";
// import PerfectScrollbar from 'react-perfect-scrollbar'

fs.delimiter('>');
fs.set("isMobile", false);
fs.set('layoutMode', 'right');
fs.set('layoutBottomMode', 'none');
fs.set('layoutRightMode', 'none');
fs.set('scoreboardExpanded', true);
fs.set('chatExpanded', true);

function App(props) {

  const disclosure = useDisclosure()
  const primaryCanvasRef = useRef();

  let [layoutMode] = fs.useWatch('layoutMode');
  let [displayMode] = fs.useWatch('displayMode');
  // let [isMobile, setIsMobile] = useState(false);

  const onResize = () => {
    // let screenWidth = window.screen.width;
    let screenWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    let screenHeight = window.screen.height;
    let isMobileCheck = screenWidth < 500;
    fs.set("isMobile", isMobileCheck);

    let layoutMode = fs.get('layoutMode');
    if (layoutMode != 'bottom' && isMobileCheck)
      fs.set('layoutMode', 'bottom');
    if (layoutMode != 'right' && !isMobileCheck)
      fs.set('layoutMode', 'right');
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

  const ChakraSimpleBar = chakra(SimpleBar)


  return (
    <BrowserRouter>
      <ActivateUserProfile />
      <VersionControl />
      <GameInfoCreateDisplayName {...disclosure} />

      {/* <GamePanelSpawner primaryCanvasRef={primaryCanvasRef} /> */}

      <ToastMessage />

      <HStack overflow="hidden" className="wrapper" spacing="0" width="100%" height="100%" m="0" p="0" justifyContent={'center'}>
        <VStack bgColor={'gray.900'} height="100%" className="panel-navigation" spacing="0" alignContent={'flex-start'} >
          {/* <HStack
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
          </HStack> */}
          <Box
            w="100%"
            h="100%"
          // pt="2rem"
          >
            <Routes>
              {/* <Route path="/dev/login">
                <></>
              </Route> */}
              <Route
                path="/dev/*" element={<Sidebar />}>

              </Route>
            </Routes>
          </Box>
        </VStack>
        <VStack className="panel-main" height="100%" width="100%" spacing="0" justifyContent={'center'} >

          <MainMenuChakra />
          <Box w="100%" h={["100%"]} position="relative" ref={primaryCanvasRef} height="auto" flex="1">
            <GamePanelDraggables primaryCanvasRef={primaryCanvasRef} />

            <ChakraSimpleBar
              boxSizing='border-box'
              className="main-scrollbars"
              style={{
                width: '100%',
                position: 'absolute',
                inset: '0px',

                // height: '100%', 
                // flex: '1',
                overflow: 'hidden scroll', boxSizing: 'border-box',
              }} scrollableNodeProps={{}}>

              {/* <Scrollbars
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
            > */}
              <VStack px={['0.5rem', '1rem', '5rem']} pt={'2.5rem'} spacing="0" justifyContent={'center'} w="100%" height="100%" >
                <AllContent />
              </VStack>
              {/* </Scrollbars> */}
            </ChakraSimpleBar>
          </Box>
          {layoutMode == 'bottom' && (
            <ActionPanelWrapper />
          )}
        </VStack>
        {
          layoutMode == 'right' && (
            <ActionPanelWrapper />
          )
        }
      </HStack >

    </BrowserRouter >
  );
}

function ActionPanelWrapper() {

  let [primaryGamePanelId] = fs.useWatch('primaryGamePanel');
  if (typeof primaryGamePanelId === 'undefined' || primaryGamePanelId == null)
    return <LobbyPanel></LobbyPanel>

  return (<RoomPanel></RoomPanel>)
}

export default App;
