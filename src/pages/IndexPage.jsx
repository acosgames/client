import fs from "flatstore";
import Layout from "../layout/Layout.jsx";
import "./IndexPage.scss";
import {
  Image,
  Box,
  Text,
  Heading,
  Flex,
  VStack,
  HStack,
  Center,
} from "@chakra-ui/react";

import PlanetImg from "../assets/images/abs-items/planet.png";
import Console1Img from "../assets/images/abs-items/console-1.png";
import Console2Img from "../assets/images/abs-items/console-2.png";
import BubbleImg from "../assets/images/abs-items/bubble.png";
import Ellipse1Img from "../assets/images/abs-items/ellipse-1.png";
import Ellipse2Img from "../assets/images/abs-items/ellipse-2.png";
import Ellipse3Img from "../assets/images/abs-items/ellipse-3.png";
import Ellipse4Img from "../assets/images/abs-items/ellipse-4.png";
import Ellipse5Img from "../assets/images/abs-items/ellipse-5.png";
import Ellipse6Img from "../assets/images/abs-items/ellipse-6.png";

function IndexPage({}) {
  return (
    <Layout>
      <TopSection />
      <Box width="100%">
        <Center>Hello</Center>
      </Box>
    </Layout>
  );
}

function TopSection() {
  return (
    <Box w="100%" position="relative" overflow="hidden">
      <Box
        className="banner-section"
        w="100%"
        //   overflow="hidden"
        position="relative"
      >
        <Box className="shape-area">
          <Image
            src={PlanetImg}
            className="shape-1"
            alt="icon"
            position="absolute"
            top="20%"
            left="5%"
            animation="rotate 35s linear infinite"
          />
          <Image
            src={Console1Img}
            className="shape-2"
            alt="icon"
            position="absolute"
            bottom="0%"
            left="calc(50% - 250px)"
          />
          <Image
            src={Console2Img}
            className="shape-3"
            alt="icon"
            position="absolute"
            top="5%"
            left="calc(50% - 250px)"
          />
        </Box>
        <Box className="ellipse-area ellipse-one position-absolute">
          <Image src={Ellipse6Img} className="ellipse-1" alt="icon" />
          <Image src={Ellipse4Img} className="ellipse-2" alt="icon" />
          <Image src={Ellipse5Img} className="ellipse-3" alt="icon" />
        </Box>
        <Box className="ellipse-area ellipse-two position-absolute">
          <Image src={Ellipse6Img} className="ellipse-1" alt="icon" />
          <Image src={Ellipse3Img} className="ellipse-3" alt="icon" />
          <Image src={Ellipse4Img} className="ellipse-4" alt="icon" />
          <Image src={Ellipse1Img} className="ellipse-2" alt="icon" />
          <Image src={Ellipse5Img} className="ellipse-5" alt="icon" />
        </Box>
        <Box className="ellipse-area ellipse-three position-absolute">
          <Image src={Ellipse6Img} className="ellipse-1" alt="icon" />
        </Box>
        <Box className="ellipse-area ellipse-four position-absolute">
          <Image src={Ellipse6Img} className="ellipse-1" alt="icon" />
          <Image src={Ellipse3Img} className="ellipse-2" alt="icon" />
          <Image src={Ellipse2Img} className="ellipse-3" alt="icon" />
        </Box>

        {/* <Box className="shape-area">
        <Image src={BubbleImg} className="shape-1" alt="icon" />
        <Image src={EllipseImg} className="shape-2" alt="icon" />
      </Box> */}
        <Box className="overlay overflow-hidden" overflow={"hidden"}>
          <Box
            className="banner-content position-relative"
            position="relative"
            pt={["rem", "23rem"]}
          >
            {/* <Box
            className="box-items d-inline-flex flex-wrap position-absolute"
            position="absolute"
            zIndex="0"
            top={["-3.5rem"]}
            flexWrap={"wrap"}
            display="inline-flex"
          >
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-50"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item active-item opacity-25"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
            <Box className="single-item"></Box>
          </Box> */}
            <Box
              // className="container position-relative cus-z1"
              position="relative"
              width={["100%", "54rem", "72rem", "96rem", "132rem"]}
              paddingRight={"0.75rem"}
              paddingLeft={"0.75rem"}
              margin="0 auto"
            >
              <VStack
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                className="row justify-content-between justify-content-center align-items-center"
                width={["100%", "100%", "58.3%"]}
              >
                <Heading
                  as="h3"
                  fontSize={"3.2rem"}
                  lineHeight={"3.98rem"}
                  marginBottom={"1.6rem"}
                  className="visible-slowly-bottom"
                >
                  <Text as="span" color="brand.100">
                    Gamers Developing Games
                  </Text>
                </Heading>
                <Heading as="h1" fontSize="8rem" className="display-one">
                  Challenge The World And Reach{" "}
                  <Text as="span">Next Level</Text>
                </Heading>
                <Text
                  as="p"
                  color={"gray.50"}
                  fontSize={"2.4rem"}
                  fontWeight={"400"}
                  lineHeight={"3.12rem"}
                >
                  We are a game development firm that focuses on making games
                  that are imaginative, fun, and colourful.
                </Text>
                <Box mt="3.2rem" className="btn-area alt-bg">
                  <a href="game.html" className="box-style btn-box d-center">
                    Explore Games
                  </a>
                </Box>
              </VStack>
              <HStack pt="12rem">
                <Box w="100%" className="btn-item">
                  <a
                    href="game.html"
                    className="d-center py-14 position-relative"
                  >
                    <Text as="span" className="d-center w-100">
                      Create a game
                      <i className="material-symbols-outlined position-absolute">
                        {" "}
                        straight{" "}
                      </i>
                    </Text>
                  </a>
                </Box>
                <Box w="100%" className="btn-item">
                  <a
                    href={""}
                    className="d-center second py-14 position-relative"
                  >
                    <Text as="span" className="d-center w-100">
                      Inquiry
                      <i className="material-symbols-outlined position-absolute">
                        {" "}
                        straight{" "}
                      </i>
                    </Text>
                  </a>
                </Box>
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default IndexPage;
