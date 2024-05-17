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
    Wrap,
    WrapItem,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

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
        <>
            <TopSection />
            <Box width="100%">
                <Center>Hello</Center>
            </Box>
        </>
    );
}

function TopSection() {
    return (
        <Box w="100%" position="relative">
            <VStack
                className="banner-section"
                w="100%"
                overflow="hidden"
                position="relative"
                _before={{ width: ["100px", "150px", "250px", "395px"] }}
            >
                <Box className="shape-area">
                    <Image
                        src={PlanetImg}
                        className="shape-1"
                        alt="icon"
                        position="absolute"
                        width={["16%", "16%", "8%"]}
                        top={["15%"]}
                        right={["5%"]}
                        animation="rotate 35s linear infinite"
                    />
                    <Image
                        src={Console1Img}
                        className="shape-2"
                        alt="icon"
                        position="absolute"
                        width={["30%", "20%", "20%", "12%"]}
                        zIndex={1}
                        bottom={["0%", "5%", "0%"]}
                        left={["initial", "initial", "70%"]}
                        right={["0", "10%", "initial"]}
                    />
                    <Image
                        src={Console2Img}
                        className="shape-3"
                        alt="icon"
                        position="absolute"
                        width={["25%"]}
                        top={["8%", "10%", "7%", "4%", "0%"]}
                        left={["50%", "50%", "35%"]}
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
                        pb={["12rem", "18rem", "23rem"]}
                        pt={["6rem", "10rem", "16rem"]}
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
                        <HStack
                            // className="container position-relative cus-z1"
                            position="relative"
                            w="100%"
                            m={"0 auto"}
                            maxWidth={[
                                "100%",
                                "100%",
                                "100%",
                                "80%",
                                "80%",
                                "1000px",
                            ]}
                            p={["1rem", "1rem", "1rem"]}
                            //   margin="0 auto"
                        >
                            <VStack
                                justifyContent={"flex-start"}
                                alignItems={"flex-start"}
                                className="row justify-content-between justify-content-center align-items-center"
                                width={["100%", "100%", "100%"]}
                            >
                                <Heading
                                    as="h3"
                                    fontSize={["2.4rem", "3.2rem"]}
                                    lineHeight={["2.6rem", "3.98rem"]}
                                    marginBottom={"1.6rem"}
                                    className="visible-slowly-bottom"
                                >
                                    <Text as="span" color="brand.100">
                                        A Cup Of Skill
                                    </Text>
                                </Heading>
                                <Heading
                                    as="h1"
                                    fontSize={["3rem", "3rem", "4rem", "6rem"]}
                                    className="display-one"
                                >
                                    Crush The <Text as="span">Competition</Text>{" "}
                                    And Become <Text as="span">#1</Text>
                                </Heading>
                                <Text
                                    as="p"
                                    color={"gray.50"}
                                    fontSize={["1.6rem", "2rem", "2.4rem"]}
                                    fontWeight={"400"}
                                    lineHeight={"3.12rem"}
                                >
                                    Queue up for a ranked match and reach the
                                    top of the leaderboards. Or, are you
                                    learning to code? Try making your own game
                                    by becoming a developer.
                                </Text>
                                <Wrap spacing={"3rem"} mt="3.2rem">
                                    <WrapItem className="btn-area alt-bg">
                                        <Link href="game.html">
                                            <Text
                                                as="span"
                                                color="brand.300"
                                                borderRadius={"16px"}
                                                bgColor="transparent"
                                                border="2px solid"
                                                borderColor="brand.300"
                                                transition={"all 0.2s ease"}
                                                _hover={{
                                                    bgColor: "brand.300",
                                                    color: "gray.900",
                                                    borderColor: "brand.300",
                                                }}
                                                // border="1px solid"
                                                // borderColor={"gray.100"}
                                                display="inline-block"
                                                p={"13px 25px"}
                                            >
                                                Play Games
                                            </Text>
                                        </Link>
                                    </WrapItem>
                                    <WrapItem className="btn-area alt-bg">
                                        <Link href="game.html">
                                            <Text
                                                as="span"
                                                color="gray.20"
                                                borderRadius={"16px"}
                                                bgColor="transparent"
                                                border="2px solid"
                                                borderColor="gray.1000"
                                                transition={"all 0.2s ease"}
                                                // textShadow={
                                                //   "0.25rem 0.25rem 1rem var(--chakra-colors-gray-1000)"
                                                // }
                                                _hover={{
                                                    bgColor: "gray.1000",
                                                    color: "gray.0",
                                                    borderColor: "gray.1000",
                                                }}
                                                // border="1px solid"
                                                // borderColor={"gray.100"}
                                                display="inline-block"
                                                p={"13px 25px"}
                                            >
                                                Become a Developer
                                            </Text>
                                        </Link>
                                    </WrapItem>
                                </Wrap>
                            </VStack>
                            {/* <HStack pt="12rem">
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
              </HStack> */}
                        </HStack>
                    </Box>
                </Box>
            </VStack>
        </Box>
    );
}

export default IndexPage;
