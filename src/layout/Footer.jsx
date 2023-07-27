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
import { Link } from "react-router-dom";

import { FaGithub, FaTwitter, FaDiscord, FaChevronRight } from "@react-icons";

import FooterImage1 from "../assets/images/footer-image-1.png";
import FooterImage2 from "../assets/images/footer-image-2.png";

function Footer({}) {
  return (
    <VStack
      w="100%"
      alignItems={"center"}
      pt="15rem"
      pb="4rem"
      position="relative"
    >
      <Image
        src={FooterImage1}
        position="absolute"
        content='""'
        left={["-5rem", "-10rem", "0"]}
        bottom="15rem"
        width="40rem"
        height="auto"
      />

      <Image
        src={FooterImage2}
        position="absolute"
        content='""'
        right={["-5rem", "-10rem", "0"]}
        bottom="0"
        width="20rem"
        height="auto"
      />

      <VStack alignItems={"flex-start"} spacing="1rem" color="gray.0" pb="4rem">
        <Text
          as="span"
          transition={"all 0.5s ease"}
          _hover={{ transform: "translateX(1rem)", color: "brand.300" }}
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
            />
            Play Games
          </Link>
        </Text>

        <Text
          as="span"
          transition={"all 0.5s ease"}
          _hover={{ transform: "translateX(1rem)", color: "brand.300" }}
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
            />
            Developer Zone
          </Link>
        </Text>

        <Text
          as="span"
          transition={"all 0.5s ease"}
          _hover={{ transform: "translateX(1rem)", color: "brand.300" }}
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
            />
            About ACOS
          </Link>
        </Text>

        <Text
          as="span"
          transition={"all 0.5s ease"}
          _hover={{ transform: "translateX(1rem)", color: "brand.300" }}
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
            />
            Documentation
          </Link>
        </Text>

        <Text
          as="span"
          transition={"all 0.5s ease"}
          _hover={{ transform: "translateX(1rem)", color: "brand.300" }}
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
            />
            Privacy Policy
          </Link>
        </Text>

        <Text
          as="span"
          transition={"all 0.5s ease"}
          _hover={{ transform: "translateX(1rem)", color: "brand.300" }}
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
            />
            Terms &amp; Conditions
          </Link>
        </Text>
      </VStack>

      <VStack display={["flex", "flex"]} spacing="5rem" color="gray.0">
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
            w="9rem"
            h="9rem"
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
              fontSize="1.6rem"
              fontWeight="medium"
            >
              GitHub
            </Text>
          </ChLink>
          {/* <ChLink isExternal href="https://twitter.com/acosgames"><Icon as={FaTwitter} /></ChLink> */}
          <ChLink
            isExternal
            href="https://discord.gg/ydHkCcNgHD"
            position="relative"
            w="9rem"
            h="9rem"
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
              top="1.5rem"
              left="3rem"
              bgColor="gray.0"
              width="2.75rem"
              height="2.5rem"
              zIndex="1"
            ></Box>
            <Text
              as="span"
              fontSize="1.6rem"
              fontWeight="medium"
              color="gray.0"
            >
              Discord
            </Text>
          </ChLink>
        </HStack>
        <Text color="gray.0" as="span" fontWeight="medium" fontSize="xs">
          Copyright © 2023 ACOS
        </Text>
      </VStack>
    </VStack>
  );
}

export default Footer;
