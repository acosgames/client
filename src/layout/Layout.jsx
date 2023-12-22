import fs from "flatstore";

import PropTypes from "prop-types";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {
  Box,
  Button,
  HStack,
  Heading,
  IconButton,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  VStack,
  chakra,
  useBoolean,
  useBreakpointValue,
  useDisclosure,
} from "@chakra-ui/react";
import RightBar from "./RightBar.jsx";
import SimpleBar from "simplebar-react";
import UserPanel from "./components/userpanel/UserPanel.jsx";
import WaitingPanel from "./components/queue/WaitingPanel.jsx";
import ChatPanel from "./components/chat/ChatPanel.jsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ActivateUserProfile from "../components/widgets/ActivateUserProfile.js";
import VersionControl from "../components/widgets/VersionControl.js";

import ChoosePortrait from "./components/user/ChoosePortrait.js";
import GameInfoCreateDisplayName from "./components/user/GameInfoCreateDisplayName.js";
import Connection from "../components/games/Connection.js";
import ToastMessage from "../components/widgets/ToastMessage.js";

import { BsLayoutSidebarInsetReverse } from "@react-icons";
import GameScreen from "../pages/GameScreen/GameScreen.jsx";
import { getGamePanel } from "../actions/room.js";
import GameBar from "../pages/GameScreen/GameBar.jsx";
function Layout({ children }) {
  // const history = useNavigate();
  // const location = useLocation();

  const disclosure = useDisclosure();
  let [isMobile] = fs.useChange("isMobile");
  const gameResizer = useRef();

  const myObserver = new ResizeObserver((entries) => {
    onResize();
  });

  const onResize = (e) => {
    var width =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;

    const currentIsMoble = fs.get("isMobile");

    fs.set("screenResized", true);

    if (width < 800) {
      if (!currentIsMoble) {
        fs.set("isMobile", true);
        fs.set("hideDrawer", true);
      }
    } else {
      if (currentIsMoble) {
        fs.set("isMobile", false);
        fs.set("hideDrawer", false);
      }
    }
  };

  useEffect(() => {
    // fs.set("history", history);
    window.addEventListener("resize", onResize);
    if (gameResizer?.current) myObserver.observe(gameResizer.current);

    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <VStack
      id="root-container"
      w={["100%"]}
      h={["100%"]}
      position="relative"
      spacing="0"
    >
      <ActivateUserProfile />
      <VersionControl />
      <ChoosePortrait />
      <GameInfoCreateDisplayName {...disclosure} />
      <Connection />
      {/* <GamePanelSpawner primaryCanvasRef={primaryCanvasRef} /> */}

      <ToastMessage />

      <Box
        className="layout"
        w={"100%"}
        h={["100%", "100%"]}
        overflow={["visible", "hidden"]}
        ref={gameResizer}
      >
        <LayoutChooser isMobile={isMobile} gameResizer={gameResizer}>
          {children}
        </LayoutChooser>
      </Box>
    </VStack>
  );
}

function LayoutChooser({ children, isMobile, gameResizer }) {
  return <DesktopLayout gameResizer={gameResizer}>{children}</DesktopLayout>;
}

function DesktopLayout({ children }) {
  // let [checkingUserLogin] = fs.useWatch("checkingUserLogin");

  const ChakraSimpleBar = chakra(SimpleBar);

  let scrollRef = useRef();
  let layoutRef = useRef();

  const myObserver = new ResizeObserver((entries) => {
    onResize();
  });

  const onResize = (e) => {
    if (layoutRef.current)
      fs.set("screenRect", [
        layoutRef.current.clientWidth,
        layoutRef.current.clientHeight,
      ]);
    fs.set("screenResized", true);
  };

  useEffect(() => {
    if (layoutRef?.current) myObserver.observe(layoutRef.current);
    onResize();
  }, []);

  // if (checkingUserLogin) return <></>;
  return (
    <Box w={"100%"} h={"100%"} transition={"all 0.3s ease"}>
      <HStack
        w={["100%"]}
        overflow="hidden"
        display="relative"
        height="100%"
        spacing="0"
        // pr={["0", "0", "30rem", "30rem"]}
        transition="all 0.3s ease"
      >
        <Box
          w={["100%"]}
          overflow="hidden"
          position="relative"
          height="100%"
          display="inline-block"
          spacing="0"
          // pr={["0", "0", "30rem", "30rem"]}
          transition="all 0.3s ease"
          ref={layoutRef}
        >
          <GameScreen layoutRef={layoutRef} />
          <ChakraSimpleBar
            key="layout-content"
            boxSizing="border-box"
            autoHide={true}
            forceVisible={false}
            // pt={["4rem", "4rem", "7rem"]}
            style={{
              width: "100%",
              height: "100%",
              flex: "1",
              overflow: "hidden scroll",
              boxSizing: "border-box",
              zIndex: "99",
            }}
            scrollableNodeProps={{ ref: scrollRef }}
          >
            <Header />

            {/* <HStack
              spacing="0"
              w="100%"
              h="100%"
              position={"relative"}
              alignItems={"flex-start"}
            > */}
            <Box key="content" w="100%" h="100%" possition="relative">
              {children}
            </Box>
            {/* <RightBar /> */}
            {/* </HStack> */}

            <Footer />
          </ChakraSimpleBar>
        </Box>
        <BarChooser layoutRef={layoutRef} />
      </HStack>
    </Box>
  );
}

function BarChooser({ layoutRef }) {
  let primaryId = fs.useWatch("primaryGamePanel");
  let primary = getGamePanel(primaryId);
  if (primary) {
    return <GameBar layoutRef={layoutRef} />;
  }
  return <RightBar layoutRef={layoutRef} />;
}

export default Layout;
