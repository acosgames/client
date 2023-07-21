import { Box, HStack, Heading, Image, Text } from "@chakra-ui/react";
import fs from "flatstore";
import config from "../config";
import {
  Link,
  useLocation,
  //Link,
  useParams,
} from "react-router-dom";
import NavForUser from "../components/login/NavForUser";
import NavForGuest from "../components/login/NavForGuest";

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
      position="fixed"
      top="0"
      left="0"
      height={["4rem", "4rem", "7rem"]}
      width="100%"
      zIndex={"999"}
      background={[
        "transparent",
        "linear-gradient(153.32deg, rgba(255, 255, 255, 0.3) -65.62%, rgba(255, 255, 255, 0.1) 83.28%)",
      ]}
      boxShadow={["initial", "0px 4px 24px -1px rgba(0,0,0,.2)"]}
      backdropFilter={["initial", "blur(15px)"]}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <HStack
        // py="2.4rem"
        px={["0", "0", "1.2rem"]}
        width={["100%", "90%", "100%", "100%", "90%"]}
      >
        <HStack
          //pl={["24rem", "23rem"]}
          pr={["2rem", "1rem", "3rem"]}
        >
          <Box>
            <Link to="/" className="" onClick={(e) => {}}>
              <Image
                alt={"A cup of skill logo"}
                src={`${config.https.cdn}acos-logo-standalone4.png`}
                h={["1.5rem", "2rem", "3rem"]}
                maxHeight={"90%"}
              />
            </Link>
          </Box>
        </HStack>
        <HStack
          w="100%"
          justifyContent={"space-between"}
          display={["none", "flex"]}
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
        </HStack>
      </HStack>
    </HStack>
  );
}

export default Header;
