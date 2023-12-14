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
  useHistory,
  useNavigate,
  useLocation
} from "react-router-dom";

// import MainMenuChakra from './components/MainMenuChakra'


// import { getUser } from './actions/person';
// import QueuePanel from "./components/games/QueuePanel";
import fs from 'flatstore';
import Sidebar from './components/widgets/Sidebar';
import { Box, Center, HStack, VStack, Divider, Text } from "@chakra-ui/layout";
// import AcosFooter from "./components/AcosFooter";
import VersionControl from "./components/widgets/VersionControl";
import GameInfoCreateDisplayName from "./components/login/GameInfoCreateDisplayName";
import { useColorModeValue, chakra, useDisclosure } from "@chakra-ui/react";
import ActivateUserProfile from "./components/widgets/ActivateUserProfile";
import ToastMessage from "./components/widgets/ToastMessage";
// import ChatPanel from "./components/chat/ChatPanel";
// import AllContent from './components/AllContent';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

// import { Scrollbars } from 'react-custom-scrollbars-2';
// import GamePanelSpawner from "./components/games/GameDisplay/GamePanelSpawner";
import GamePanelDraggables from "./components/games/GameDisplay/GamePanelDraggables";
import RoomPanel from "./components/room/RoomPanel";
import LobbyPanel from "./components/lobby/LobbyPanel";
// import PerfectScrollbar from 'react-perfect-scrollbar'

import IndexPage from './pages/IndexPage.jsx';
import GamesPage from "./pages/GamesPage.jsx";
import GamePage from "./pages/GameInfo/GamePage.jsx";
import Connection from "./components/games/Connection";


import CreateDisplayName from "./components/login/CreateDisplayName";
import Layout from "./layout/Layout.jsx";

fs.delimiter('>');
fs.set("isMobile", false);
fs.set('layoutMode', 'right');
fs.set('layoutBottomMode', 'none');
fs.set('layoutRightMode', 'none');
fs.set('scoreboardExpanded', true);
fs.set('lobbyExpanded', false);
fs.set('chatExpanded', true);
fs.set('loggedIn', 'LURKER');
function App(props) {


  const primaryCanvasRef = useRef();

  // let [layoutMode] = fs.useWatch('layoutMode');
  // let [displayMode] = fs.useWatch('displayMode');
  // let [isMobile, setIsMobile] = useState(false);

  const onResize = () => {
    // let screenWidth = window.screen.width;
    let screenWidth = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    let screenHeight = window.screen.height;
    let isMobileCheck = screenWidth < 500;
    // fs.set("isMobile", isMobileCheck);

    let layoutMode = fs.get('layoutMode');
    if (layoutMode != 'bottom' && isMobileCheck) {
      fs.set('layoutMode', 'bottom');
      fs.set('lobbyExpanded', false);
    } else {
      fs.set('lobbyExpanded', true);
    }

    if (layoutMode != 'right' && !isMobileCheck)
      fs.set('layoutMode', 'right');
  }

  useEffect(() => {
    // fs.set("history", history);
  })

  useEffect(() => {
    // window.addEventListener('resize', onResize);
    // onResize();
    var hasTouchScreen = false;

    if ("maxTouchPoints" in navigator) {
      hasTouchScreen = navigator.maxTouchPoints > 0;
    } else if ("msMaxTouchPoints" in navigator) {
      hasTouchScreen = navigator.msMaxTouchPoints > 0;
    } else {
      var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
      if (mQ && mQ.media === "(pointer:coarse)") {
        hasTouchScreen = !!mQ.matches;
      } else if ('orientation' in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen = (
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
        );
      }
    }

    if (hasTouchScreen) {
      // fs.set('isMobile', true);
      // Do something here. 
    }

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

      <Layout>
        {/* <GamePlayNow {...game} {...player_stats} /> */}
        <Center w="100%">
          <Box
            w="100%"
            // w={["100%", "800px", "800px", "800px", "1200px"]}
            className="gameeinfo-container"
          // pt={["3rem", "3rem", "4rem"]}
          >
            <Box
              //   px={["1rem", "1.5rem", "3rem"]}
              w="100%"
              m={"0 auto"}
              // maxWidth={["100%", "100%", "100%", "100%", "100%", "1200px"]}
              // py={["1rem", "1rem", "1rem"]}
              position="relative"
            >
              {/* <EggDoodad /> */}
              <VStack
                spacing="1rem"
                alignItems={"flex-start"}
                position="relative"
              >
                <PageRoutes />

              </VStack>
            </Box>
          </Box>
        </Center>
      </Layout>
    </BrowserRouter>
  )

}


function PageRoutes() {

  const history = useNavigate();
  useEffect(() => {
    fs.set('history', history);
  }, [])
  return (<Routes>
    {/* <Route path="/player/create" element={<CreateDisplayName />} /> */}
    <Route path="/" element={<GamesPage />} />
    <Route path="/games" element={<GamesPage />} />
    <Route path="/g/:game_slug" element={<GamePage />} />
    <Route path="/about" element={<IndexPage />} />
  </Routes>)
}

export default App;
