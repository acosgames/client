import fs from "flatstore";

import PropTypes from "prop-types";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Box, HStack, VStack, chakra } from "@chakra-ui/react";
import RightBar from "./RightBar.jsx";
import SimpleBar from "simplebar-react";
function Layout({ children }) {
  const ChakraSimpleBar = chakra(SimpleBar);

  return (
    <Box w={"100%"} h={"100%"} overflow="hidden">
      <Header />
      <VStack w={["100%"]} overflow="hidden" height="100%">
        <ChakraSimpleBar
          boxSizing="border-box"
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
        </ChakraSimpleBar>
      </VStack>
      <Footer />
    </Box>
  );
}

// Layout.propTypes = {
//   children: PropTypes.element | PropTypes.array,
// };

export default Layout;
