import React, { useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { Box, Center, VStack } from "@chakra-ui/layout";
import { chakra } from "@chakra-ui/react";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

import IndexPage from "./pages/IndexPage.jsx";
import GamesPage from "./pages/GamesPage.jsx";
import GamePage from "./pages/GameInfo/GamePage.jsx";

import Layout from "./layout/Layout.jsx";
import LoginSuccess from "./components/login/LoginSuccess.jsx";
import GameScreen from "./pages/GameScreen/GameScreen.jsx";
// import { getGamePanel } from "./actions/room.js";
import { useBucket } from "./actions/bucket.js";
import {
  btHistory,
  btLayoutMode,
  btLobbyExpanded,
  btLocationPath,
  btPrimaryCanvasRef,
  btUser,
} from "./actions/buckets.js";
import DevLogin from "./pages/Developer/DevLogin.jsx";
import DevManager from "./pages/Developer/index.jsx";
import DevGamePage from "./pages/Developer/DevGamePage.jsx";

function PageRoutes() {
  const history = useNavigate();
  const location = useLocation();
  const user = useBucket(btUser);

  useEffect(() => {
    btHistory.set(history);
    btLocationPath.set(location.pathname);
    localStorage.setItem("location/pathname", location.pathname);
  }, []);

  return (
    <Routes>
      <Route path="/login/success" element={<LoginSuccess />} />
      <Route path="/" element={<GamesPage />} />
      <Route path="/games" element={<GamesPage />} />
      <Route path="/g/:game_slug/:mode/:room_slug" element={<GameScreen />} />
      <Route path="/g/:game_slug" element={<GamePage />} />
      <Route path="/about" element={<IndexPage />} />
      <Route exact path="/dev/login" element={<DevLogin />} />
      <Route exact path="/dev" element={<DevManager />} />
      <Route exact path="/dev/game/:game_slug" element={<DevGamePage />} />
    </Routes>
  );
}

function App({}) {
  // const primary = getGamePanel(primaryId);

  const primaryCanvasRef = useRef();

  const onResize = () => {
    // let screenWidth = window.screen.width;
    let screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    let screenHeight = window.screen.height;
    let isMobileCheck = screenWidth < 500;

    let layoutMode = btLayoutMode.get();
    if (layoutMode != "bottom" && isMobileCheck) {
      btLayoutMode.set("bottom");
      btLobbyExpanded.set(false);
    } else {
      btLobbyExpanded.set(true);
    }

    if (layoutMode != "right" && !isMobileCheck) btLayoutMode.set("right");
  };

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
      } else if ("orientation" in window) {
        hasTouchScreen = true; // deprecated, but good fallback
      } else {
        // Only as a last resort, fall back to user agent sniffing
        var UA = navigator.userAgent;
        hasTouchScreen =
          /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
          /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
      }
    }

    if (hasTouchScreen) {
      // Do something here.
    }

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    btPrimaryCanvasRef.set(primaryCanvasRef);
  });

  const ChakraSimpleBar = chakra(SimpleBar);

  // if (primary) {
  //   return <GameScreen />
  // }

  return (
    <BrowserRouter>
      <Layout>
        <Center w="100%">
          <Box w="100%" className="gameeinfo-container">
            <Box w="100%" m={"0 auto"} position="relative">
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
  );
}

export default App;
