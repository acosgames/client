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
        h={["auto", "100%"]}
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
  // if (isMobile) {
  // return <MobileLayout gameResizer={gameResizer}>{children}</MobileLayout>;
  // }

  return <DesktopLayout gameResizer={gameResizer}>{children}</DesktopLayout>;
}

function MobileLayout({ children, gameResizer }) {
  const ChakraSimpleBar = chakra(SimpleBar);

  const [isQueue, setIsQueue] = useBoolean();
  const [isChat, setIsChat] = useBoolean();

  return (
    <>
      {/* <Header /> */}
      <VStack
        className="layout-content"
        w={["100%"]}
        overflow="hidden"
        height="100%"
        // pb={["1rem", "1rem"]}
        // mt={["7rem", "7rem", "0"]}
      >
        <UserPanel key="mobile-userpanel" />

        <ChakraSimpleBar
          boxSizing="border-box"
          autoHide={true}
          forceVisible={false}
          // pt={["7.5rem", "7.5rem", "0"]}
          style={{
            position: "absolute",
            top: "8rem",
            // top: "0",
            left: "0",
            width: "100%",
            height: "calc(100vh - 8rem)",
            flex: "1",
            overflow: "hidden scroll",
            boxSizing: "border-box",
            // marginTop: "7.5rem",
          }}
          //   scrollableNodeProps={{ ref: scrollRef }}
        >
          <HStack
            spacing="0"
            w="100%"
            h="100%"
            position={"relative"}
            alignItems={"flex-start"}
            scrollSnapType="y mandatory"
          >
            <Box key="content" w="100%">
              {children}
            </Box>
            {/* <RightBar /> */}
          </HStack>

          <Footer />
        </ChakraSimpleBar>
      </VStack>
    </>
  );
}
function DesktopLayout({ children }) {
  const ChakraSimpleBar = chakra(SimpleBar);
  // let [hideDrawer] = fs.useWatch("hideDrawer");

  let scrollRef = useRef();
  let layoutRef = useRef();

  const scrollX = window.scrollX;
  const scrollY = window.scrollY;

  useLayoutEffect(() => {
    let windowScrollPos = fs.get("windowScrollPos");
    if (windowScrollPos)
      setTimeout(() => {
        // scrollRef.current.scrollTop = windowScrollPos;
      }, 0);
  });

  return (
    <Box w={"100%"} h={"100%"}>
      <HStack
        w={["100%"]}
        overflow="hidden"
        display="relative"
        height="100%"
        spacing="0"
        pr={["0", "0", "30rem", "30rem"]}
        transition="all 0.2s ease"
        ref={layoutRef}
      >
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
          <GameScreen layoutRef={layoutRef} />
          <Header />

          <HStack
            spacing="0"
            w="100%"
            h="100%"
            position={"relative"}
            alignItems={"flex-start"}
          >
            <Box key="content" w="100%">
              {children}
            </Box>
            {/* <RightBar /> */}
          </HStack>

          <Footer />
        </ChakraSimpleBar>
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

// Layout.propTypes = {
//   children: PropTypes.element | PropTypes.array,
// };

export default Layout;
