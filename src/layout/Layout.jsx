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
  let [isMobile] = fs.useWatch("isMobile");
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

    if (width <= 600) {
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
      pr={["0", "27rem", "30rem"]}
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
      <Header />
      <VStack
        className="layout-content"
        w={["100%"]}
        overflow="hidden"
        height="100%"
        pb={["8rem", "1rem"]}
      >
        <VStack
          w={["100%"]}
          position="fixed"
          top={["0"]}
          right="0"
          h={["6.5rem"]}
          zIndex={1001}
          bgColor={["gray.975", "gray.900"]}
          pb="0.5rem"
          borderBottom={["1px solid var(--chakra-colors-gray-800)"]}
          // boxShadow={[
          //   "0px 0 20px 0px var(--chakra-colors-gray-600)",
          //   "0px 0 20px 0px var(--chakra-colors-gray-600)",
          // ]}
          //   spacing="1.5rem"
        >
          <UserPanel key="mobile-userpanel" />
        </VStack>
        <ChakraSimpleBar
          boxSizing="border-box"
          pt={["4rem", "4rem", "7rem"]}
          style={{
            width: "100%",
            height: "auto",
            flex: "1",
            overflow: "hidden scroll",
            boxSizing: "border-box",
          }}
          //   scrollableNodeProps={{ ref: scrollRef }}
        >
          <HStack
            spacing="0"
            w="100%"
            h="100%"
            position={"relative"}
            alignItems={"flex-start"}
          >
            <Box w="100%">{children}</Box>
            {/* <RightBar /> */}
          </HStack>

          <Footer />
        </ChakraSimpleBar>
        <HStack
          w={["100%"]}
          position="fixed"
          bottom={["0"]}
          right="0"
          h={["5rem"]}
          zIndex={1001}
          bgColor={["gray.975", "gray.900"]}
          borderLeft={["0", "1px solid var(--chakra-colors-gray-600)"]}
          // boxShadow={[
          //   "0px 0 20px 0px var(--chakra-colors-gray-600)",
          //   "0px 0 20px 0px var(--chakra-colors-gray-600)",
          // ]}
          spacing="1.5rem"
        >
          <Popover
            isOpen={isQueue}
            onOpen={() => {
              setIsChat.off();
              setIsQueue.on();
            }}
            onClose={() => {
              setIsQueue.off();
            }}
            placement="top"
            closeOnBlur={true}
            bgColor="transparent"
            //   matchWidth={true}
            w="100vh"
            maxHeight="auto"
          >
            <PopoverTrigger>
              <Button
                w="25%"
                color={isQueue ? "brand.300" : "gray.0"}
                as={Heading}
                //   _active={{ color: "brand.300" }}
              >
                Queue
              </Button>
            </PopoverTrigger>
            <PopoverContent
              maxHeight="auto"
              w="100vw"
              overflow="hidden"
              bgColor="transparent"
              border="0"
              _focusVisible={{
                outline: "0px",
              }}
            >
              <PopoverBody w="100%" h="100%">
                <WaitingPanel />
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Popover
            placement="top"
            closeOnBlur={true}
            w="100vh"
            isOpen={isChat}
            onOpen={() => {
              setIsChat.on();
              setIsQueue.off();
            }}
            onClose={() => {
              setIsChat.off();
            }}
            // matchWidth={true}
          >
            <PopoverTrigger>
              <Button
                w="25%"
                color={isChat ? "brand.300" : "gray.0"}
                as={Heading}
                //   _active={{ color: "brand.300" }}
              >
                Chat
              </Button>
            </PopoverTrigger>
            <PopoverContent
              maxHeight="50%"
              w="100vw"
              bgColor="transparent"
              border="0"
              p="0"
              m="0"
              _focusVisible={{
                outline: "0px",
              }}
            >
              <PopoverArrow />
              <PopoverBody maxHeight="50%" w="100%">
                <ChatPanel />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </VStack>
    </>
  );
}
function DesktopLayout({ children }) {
  const ChakraSimpleBar = chakra(SimpleBar);

  return (
    <Box w={"100%"} h={"100%"} overflow="hidden">
      <Header />
      <VStack w={["100%"]} overflow="hidden" height="100%">
        <ChakraSimpleBar
          boxSizing="border-box"
          pt={["4rem", "4rem", "7rem"]}
          style={{
            width: "100%",
            height: "auto",
            flex: "1",
            overflow: "hidden scroll",
            boxSizing: "border-box",
          }}
          //   scrollableNodeProps={{ ref: scrollRef }}
        >
          <HStack
            spacing="0"
            w="100%"
            h="100%"
            position={"relative"}
            alignItems={"flex-start"}
          >
            <Box w="100%">{children}</Box>
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
