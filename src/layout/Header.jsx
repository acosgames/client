import { Box, HStack, Heading, Image, Text } from "@chakra-ui/react";

import config from "../config";
import {
    Link,
    useLocation,
    //Link,
    useParams,
} from "react-router-dom";
import Searching from "../components/queue/Searching";
// import NavForUser from "../components/login/NavForUser";
// import NavForGuest from "../components/login/NavForGuest";

/*
background: linear-gradient(153.32deg, rgba(255, 255, 255, 0.3) -65.62%, rgba(255, 255, 255, 0.1) 83.28%);
    box-shadow: 0px 4px 24px -1px rgba(0,0,0,.2);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    */
function Header({}) {
    let loggedIn = true;

    return (
        <HStack
            // position="fixed"
            top="0"
            left="0"
            w="100%"
            height={["6.4rem", "6.4rem", "7rem"]}
            // width={["100%", "calc(100% - 27rem)", "calc(100% - 30rem)"]}
            zIndex={"99"}
            // background={[
            //   "transparent",
            //   "linear-gradient(153.32deg, rgba(255, 255, 255, 0.3) -65.62%, rgba(255, 255, 255, 0.1) 83.28%)",
            // ]}
            bgColor={"gray.975"}
            boxShadow={[
                "initial",
                "0px 4px 24px -1px rgba(0,0,0,.2)",
                "0 1px 2px black, 0 2px 20px black",
            ]}
            // backdropFilter={["initial", "blur(15px)"]}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <HStack
                px={["1rem", "1rem", "1rem", "3rem"]}
                w={["100%", "100%", "100%", "100%", "1000px"]}
                width={["100%"]}
            >
                {/* <HStack
                    //pl={["24rem", "23rem"]}
                    pr={["2rem", "2rem", "2rem"]}
                    pl="0"
                >
                    <Box
                        w={["2rem", "2rem", "3rem"]}
                        h={["2rem", "2rem", "3rem"]}
                        transition="transform 0.4s ease"
                        transformOrigin={"center"}
                        _hover={{ transform: "rotate(8deg)" }}
                    >
                        <Link to="/" className="" onClick={(e) => {}}>
                            <Image
                                alt={"A cup of skill logo"}
                                src={`${config.https.cdn}acos-logo-2025.png`}
                                h={["2rem", "2rem", "3rem"]}
                                maxHeight={"100%"}
                            />
                        </Link>
                    </Box>
                </HStack> */}
                <HStack
                    w="100%"
                    pl="1rem"
                    justifyContent={"space-between"}
                    display={["flex", "flex"]}
                >
                    <HStack spacing={["2rem", "2rem", "3rem"]}>
                        <Link to="/games" className="">
                            <Heading
                                as="h4"
                                color="gray.0"
                                fontWeight="bold"
                                fontSize={["1.2rem", "1.6rem", "2rem"]}
                                transition={"all 0.3s ease"}
                                _hover={{ color: "brand.300" }}
                            >
                                Games
                            </Heading>
                        </Link>
                        <Link to="/dev" className="">
                            <Heading
                                as="h4"
                                color="gray.0"
                                fontWeight="bold"
                                fontSize={["1.2rem", "1.6rem", "2rem"]}
                                transition={"all 0.3s ease"}
                                _hover={{ color: "brand.300" }}
                            >
                                Develop
                            </Heading>
                        </Link>
                    </HStack>
                    {/* <Searching isHeader={true} /> */}
                </HStack>
            </HStack>
        </HStack>
    );
}

export default Header;
