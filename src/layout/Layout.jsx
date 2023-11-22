import fs from "flatstore";

import PropTypes from "prop-types";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {
  Box,
  Button,
  HStack,
  Heading,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  VStack,
  chakra,
  useBoolean,
  useBreakpointValue,
} from "@chakra-ui/react";
import RightBar from "./RightBar.jsx";
import SimpleBar from "simplebar-react";
import UserPanel from "./components/userstatus/UserPanel.jsx";
import WaitingPanel from "./components/queue/WaitingPanel.jsx";
import ChatPanel from "./components/chat/ChatPanel.jsx";
import { useEffect, useRef, useState } from "react";

function Layout({ children }) {
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
      if (!currentIsMoble) fs.set("isMobile", true);
    } else {
      if (currentIsMoble) fs.set("isMobile", false);
    }
  };

  useEffect(() => {
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
      pr={["0", "0", "30rem", "30rem"]}
      h={["100%"]}
      position="relative"
    >
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
  if (isMobile) {
    return <MobileLayout gameResizer={gameResizer}>{children}</MobileLayout>;
  }

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
        <VStack
          w={["100%"]}
          // position="fixed"
          top={["0"]}
          right="0"
          h={["7.5rem"]}
          zIndex={1001}
          bgColor={["gray.900", "gray.900"]}
          pb="0rem"
          // borderBottom={["1px solid var(--chakra-colors-gray-800)"]}
        >
          <UserPanel key="mobile-userpanel" />
        </VStack>
        <ChakraSimpleBar
          boxSizing="border-box"
          autoHide={true}
          forceVisible={false}
          // pt={["6rem", "4rem", "7rem"]}
          style={{
            position: "absolute",
            top: "7.5rem",
            left: "0",
            width: "100%",
            height: "calc(100vh - 7rem)",
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

  return (
    <Box w={"100%"} h={"100%"}>
      <VStack w={["100%"]} overflow="hidden" height="100%">
        <ChakraSimpleBar
          boxSizing="border-box"
          autoHide={true}
          forceVisible={false}
          // pt={["4rem", "4rem", "7rem"]}
          style={{
            width: "100%",
            height: "auto",
            flex: "1",
            overflow: "hidden scroll",
            boxSizing: "border-box",
          }}
          //   scrollableNodeProps={{ ref: scrollRef }}
        >
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
          <RightBar />
          <Footer />
        </ChakraSimpleBar>
      </VStack>
    </Box>
  );
}

// Layout.propTypes = {
//   children: PropTypes.element | PropTypes.array,
// };

export default Layout;
