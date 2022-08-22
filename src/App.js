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

import SimpleBarReact from 'simplebar-react';

import { getUser } from './actions/person';
import QueuePanel from "./components/games/QueuePanel";
import fs from 'flatstore';
import Sidebar from './components/widgets/Sidebar';
import { Box, Flex, HStack, VStack, Divider } from "@chakra-ui/layout";
import AcosFooter from "./components/AcosFooter";
import VersionControl from "./components/widgets/VersionControl";
import GameInfoCreateDisplayName from "./components/login/GameInfoCreateDisplayName";
import { useDisclosure } from "@chakra-ui/react";
import ActivateUserProfile from "./components/widgets/ActivateUserProfile";
import ToastMessage from "./components/widgets/ToastMessage";
import ChatPanel from "./components/chat/ChatPanel";


fs.delimiter('>');
fs.set("isMobile", false);

function App(props) {

  const disclosure = useDisclosure()
  const scrollRef = useRef();

  let timeHandle = 0;
  const scrollBarHideDelay = 2000;

  const onScroll = () => {
    if (timeHandle > 0)
      clearTimeout(timeHandle);

    scrollRef.current.classList.add('showscroll');
    scrollRef.current.classList.remove("hidescroll")
    timeHandle = setTimeout(() => {
      scrollRef.current.classList.remove("showscroll")
      scrollRef.current.classList.add("hidescroll")
    }, scrollBarHideDelay)
  }


  let [isMobile, setIsMobile] = useState(false);

  const onResize = () => {
    let screenWidth = window.screen.width;
    let isMobile = screenWidth <= 600;
    setIsMobile(isMobile);
    fs.set("isMobile", isMobile)
  }

  useEffect(() => {
    scrollRef.current.addEventListener('scroll', onScroll);
    window.addEventListener('resize', onResize);
    onResize();

    return () => {
      if (scrollRef.current)
        scrollRef.current.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    }
  }, [])



  return (
    <BrowserRouter>
      <ActivateUserProfile />
      <VersionControl />
      <GameInfoCreateDisplayName {...disclosure} />

      <ToastMessage />
      <Box
        overflow='hidden !important'
        display='flex !important'
        flexFlow='column nowrap !important'
        position='absolute !important'
        inset='0px !important'
      >


        <Box display='flex !important'
          flexFlow='column nowrap !important'
          height='100% !important' position="relative" >

          <Box w="100%" h={['3rem', '3rem', '5rem']} zIndex="99">
            <MainMenuChakra />
          </Box>

          <Box display='flex !important'
            flexWrap='nowrap !important'
            position='relative !important'
            overflow='hidden !important'

            height='100% !important' >
            {/* <Flex id="wrapper" direction="row" w="100%"> */}
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
            <Box
              overflow='hidden scroll !important'
              position='relative !important'
              // _webkitBoxFlex='1 !important'
              flexGrow='1 !important'
              height='100% !important'
              width='100% !important'
              display='flex !important'
              flexDirection='column !important'

              // zIndex='10 !important'
              ref={scrollRef} className={'hidescroll'}>

              <Switch>
                <Route path="/g/*"
                  component={RoutesGame} />
                <Route path="*" component={Routes} />
              </Switch>
              <AcosFooter />
            </Box>
            {!isMobile && (<ChatPanel isMobile={isMobile} />)}
            {/* </Flex> */}
          </Box>

          {isMobile && (
            <Box width="100%" height="18rem">
              <ChatPanel isMobile={isMobile} />
            </Box>
          )}
        </Box>
      </Box>
      <QueuePanel />
    </BrowserRouter >
  );
}

export default App;
