import { Box, HStack, Image, Text } from "@chakra-ui/react";
import fs from "flatstore";
import config from "../config";
import {
  Link,
  useLocation,
  //Link,
  useParams,
} from "react-router-dom";

/*
background: linear-gradient(153.32deg, rgba(255, 255, 255, 0.3) -65.62%, rgba(255, 255, 255, 0.1) 83.28%);
    box-shadow: 0px 4px 24px -1px rgba(0,0,0,.2);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    */
function Header({}) {
  return (
    <HStack
      position="fixed"
      top="0"
      left="0"
      width="100%"
      zIndex={"999"}
      background="linear-gradient(153.32deg, rgba(255, 255, 255, 0.3) -65.62%, rgba(255, 255, 255, 0.1) 83.28%)"
      boxShadow={"0px 4px 24px -1px rgba(0,0,0,.2)"}
      backdropFilter={"blur(15px)"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <HStack
        py="2.4rem"
        px={"1.2rem"}
        width={["100%", "90%", "70rem", "90rem", "120rem"]}
      >
        <HStack
          //pl={["24rem", "23rem"]}
          pr="3rem"
        >
          <Box>
            <Link to="/" className="" onClick={(e) => {}}>
              <Image
                alt={"A cup of skill logo"}
                src={`${config.https.cdn}acos-logo-standalone4.png`}
                h={["1.8rem", "1.8rem", "3rem"]}
                maxHeight={"90%"}
              />
            </Link>
          </Box>
        </HStack>
        <HStack>
          <HStack spacing={"3rem"}>
            <Link to="/games" className="">
              <Text
                as="span"
                color="gray.0"
                transition={"all 0.3s ease"}
                _hover={{ color: "brand.300" }}
              >
                Games
              </Text>
            </Link>
            <Link to="/dev" className="">
              <Text
                as="span"
                color="gray.0"
                transition={"all 0.3s ease"}
                _hover={{ color: "brand.300" }}
              >
                Develop
              </Text>
            </Link>
          </HStack>
        </HStack>
      </HStack>
    </HStack>
  );
}

export default Header;
