import fs from "flatstore";

import {
  Box,
  Wrap,
  WrapItem,
  HStack,
  Text,
  VStack,
  Link as ChLink,
  Icon,
  Flex,
  Image,
} from "@chakra-ui/react";
import { Link, useLocation, useParams } from "react-router-dom";

import { FaGithub, FaTwitter, FaDiscord, FaChevronRight } from "@react-icons";

import FooterImage1 from "../assets/images/footer-image-1.png";
import FooterImage2 from "../assets/images/footer-image-2.png";

function Footer({}) {
  let { game_slug, room_slug, mode } = useParams();
  let [queues] = fs.useWatch("queues");

  let queue = {};
  for (let i = 0; i < queues.length; i++) {
    let q = queues[i];
    if (q.game_slug == game_slug) {
      queue = q;
      break;
    }
  }

  let inQueue = queue.game_slug;

  return (
    <VStack
      w="100%"
      alignItems={"center"}
      pt={["7rem"]}
      position="relative"
      bgColor="gray.900"
      mt="0rem"
      _before={{
        // content: '""',
        // width: "300rem",
        // height: "100%",
        // position: "absolute",
        // top: "0",
        // left: "-100rem",
        // transform: "rotate(-2deg)",
        // bgColor: "gray.800",
        // pb: "-10rem",
        // zIndex: -1,
        // borderTop: "1rem solid var(--chakra-colors-gray-300)",
        // borderBottom: "1rem solid var(--chakra-colors-gray-300)",

        content: '""',
        position: "absolute",
        left: "0",
        top: "0",
        width: "50%",
        clipPath: "polygon(0 0, 100% 0, 0 100%)",
        backgroundColor: !game_slug || inQueue ? "brand.300" : "brand.600",
        height: ["20px", "20px", "20px"],
      }}
      _after={{
        content: '""',
        left: "auto",
        top: "0",
        right: "0",
        position: "absolute",
        width: "50%",
        clipPath: "polygon(100% 0, 0 0, 100% 100%)",
        backgroundColor: !game_slug || inQueue ? "brand.300" : "brand.600",
        height: ["20px", "20px", "20px"],
      }}
    >
      {/* <Image
        src={FooterImage1}
        position="absolute"
        content='""'
        left={["-50rem", "-10rem", "-5rem", "0rem", "5rem", "15rem"]}
        bottom={["35rem", "25rem", "25rem"]}
        width="40rem"
        height="auto"
      /> */}

      {/* <Image
        src={FooterImage2}
        position="absolute"
        content='""'
        right={["-55rem", "-10rem", "0"]}
        bottom="0"
        width={["10rem", "20rem", "20rem"]}
        height="auto"
      /> */}

      <VStack
        alignItems={"flex-start"}
        spacing="1rem"
        color="gray.0"
        pb="2rem"
        zIndex="2"
      >
        <Text
          as="span"
          role="group"
          transition={"all 0.5s ease"}
          _hover={{
            color: "brand.300",
          }}
        >
          <Link
            to="/games"
            style={{
              padding: "0 2rem",
              height: "3rem",
              display: "inline-block",
            }}
          >
            <Icon
              as={FaChevronRight}
              color="brand.50"
              fontSize="1.2rem"
              mr="1rem"
              transition={"all 0.5s ease"}
              _groupHover={{
                transform: "translateX(0.5rem)",
                color: "brand.300",
              }}
            />
            Play Games
          </Link>
        </Text>

        <Text
          as="span"
          role="group"
          transition={"all 0.5s ease"}
          _hover={{
            color: "brand.300",
          }}
        >
          <Link
            to="/dev"
            style={{
              padding: "0 2rem",
              height: "3rem",
              display: "inline-block",
            }}
          >
            <Icon
              as={FaChevronRight}
              color="brand.50"
              fontSize="1.2rem"
              mr="1rem"
              transition={"all 0.5s ease"}
              _groupHover={{
                transform: "translateX(0.5rem)",
                color: "brand.300",
              }}
            />
            Developer Zone
          </Link>
        </Text>

        <Text
          as="span"
          role="group"
          transition={"all 0.5s ease"}
          _hover={{
            color: "brand.300",
          }}
        >
          <Link
            to="/about"
            style={{
              padding: "0 2rem",
              height: "3rem",
              display: "inline-block",
            }}
          >
            <Icon
              as={FaChevronRight}
              color="brand.50"
              fontSize="1.2rem"
              mr="1rem"
              transition={"all 0.5s ease"}
              _groupHover={{
                transform: "translateX(0.5rem)",
                color: "brand.300",
              }}
            />
            About ACOS
          </Link>
        </Text>

        <Text
          as="span"
          role="group"
          transition={"all 0.5s ease"}
          _hover={{
            color: "brand.300",
          }}
        >
          <Link
            to="https://sdk.acos.games"
            style={{
              padding: "0 2rem",
              height: "3rem",
              display: "inline-block",
            }}
          >
            <Icon
              as={FaChevronRight}
              color="brand.50"
              fontSize="1.2rem"
              mr="1rem"
              transition={"all 0.5s ease"}
              _groupHover={{
                transform: "translateX(0.5rem)",
                color: "brand.300",
              }}
            />
            Documentation
          </Link>
        </Text>

        <Text
          as="span"
          role="group"
          transition={"all 0.5s ease"}
          _hover={{
            color: "brand.300",
          }}
        >
          <Link
            to="/privacy"
            style={{
              padding: "0 2rem",
              height: "3rem",
              display: "inline-block",
            }}
          >
            <Icon
              as={FaChevronRight}
              color="brand.50"
              fontSize="1.2rem"
              mr="1rem"
              transition={"all 0.5s ease"}
              _groupHover={{
                transform: "translateX(0.5rem)",
                color: "brand.300",
              }}
            />
            Privacy Policy
          </Link>
        </Text>

        <Text
          as="span"
          role="group"
          transition={"all 0.5s ease"}
          _hover={{
            color: "brand.300",
          }}
        >
          <Link
            to="/terms"
            style={{
              padding: "0 2rem",
              height: "3rem",
              display: "inline-block",
            }}
          >
            <Icon
              as={FaChevronRight}
              color="brand.50"
              fontSize="1.2rem"
              mr="1rem"
              transition={"all 0.5s ease"}
              _groupHover={{
                transform: "translateX(0.5rem)",
                color: "brand.300",
              }}
            />
            Terms &amp; Conditions
          </Link>
        </Text>
      </VStack>

      <VStack
        display={["flex", "flex"]}
        spacing="5rem"
        mb="2rem"
        color="gray.0"
      >
        <HStack
          w="100%"
          spacing="1.4rem"
          color="gray.100"
          alignItems={"center"}
          justifyContent="center"
        >
          <ChLink
            isExternal
            href="https://github.com/acosgames"
            w="12rem"
            h="12rem"
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius="50%"
            _hover={{
              border: "3px solid var(--chakra-colors-brand-300)",

              color: "brand.300",
              bgColor: "gray.1000",
              _before: { bgColor: "white" },
            }}
          >
            <Icon
              fontSize="4rem"
              color="gray.0"
              as={FaGithub}
              position="relative"
              _before={{
                position: "absolute",
                top: "2rem",
                left: "3rem",
                content: '""',
                bgColor: "gray.0",
                width: "3rem",
                height: "2.5rem",
                zIndex: 1,
              }}
            />
            <Text
              as="span"
              color="gray.0"
              fontSize="1.4rem"
              fontWeight="medium"
              pt="1rem"
            >
              GitHub
            </Text>
          </ChLink>
          {/* <ChLink isExternal href="https://twitter.com/acosgames"><Icon as={FaTwitter} /></ChLink> */}
          <ChLink
            isExternal
            href="https://discord.gg/ydHkCcNgHD"
            position="relative"
            w="12rem"
            h="12rem"
            display="flex"
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius="50%"
            _hover={{
              border: "3px solid var(--chakra-colors-brand-300)",
              bgColor: "gray.1000",
              //   _before: { bgColor: "white" },
            }}
          >
            <Icon
              fontSize="4rem"
              color="#6F86D4"
              as={FaDiscord}
              position="relative"
              zIndex="2"
            />
            <Box
              position="absolute"
              top="2.7rem"
              left="4.5rem"
              bgColor="gray.0"
              width="2.75rem"
              height="2.5rem"
              zIndex="1"
            ></Box>
            <Text
              as="span"
              fontSize="1.4rem"
              fontWeight="medium"
              color="gray.0"
              pt="1rem"
            >
              Discord
            </Text>
          </ChLink>
        </HStack>
      </VStack>
      <VStack
        w="100%"
        bgColor="gray.1000"
        py="3rem"
        // borderTop="2px solid"
        // borderTopColor="gray.900"
      >
        <Text
          color="gray.50"
          as="span"
          textAlign={"center"}
          fontWeight="medium"
          fontSize="xs"
        >
          COPYRIGHT © 2024
          <br />
          ALL RIGHTS RESERVED BY{" "}
          <Text as="span" color="brand.300">
            ACOS
          </Text>
        </Text>
      </VStack>
    </VStack>
  );
}

export default Footer;
