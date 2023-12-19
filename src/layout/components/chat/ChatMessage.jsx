import {
  Box,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  Text,
  VStack,
  IconButton,
  chakra,
} from "@chakra-ui/react";

import { BsThreeDotsVertical } from "@react-icons";
import config from "../../../config";
import { Link } from "react-router-dom";
import timeAgo from "cc-time-ago";
import { useState } from "react";

const ChakraLink = chakra(Link);

export default function ChatMessage({
  portraitid,
  countrycode,
  displayname,
  timestamp,
  message,
}) {
  let [showTime, setShowTime] = useState(false);

  let filename = `assorted-${portraitid || 1}-original.webp`;

  const onClick = () => {
    setShowTime(true);
    setTimeout(() => {
      setShowTime(false);
    }, 3000);
  };

  return (
    <VStack
      w="100%"
      spacing="0.5rem"
      // bgColor="gray.1000"
      borderRadius={"4px"}
      mx={["0.125rem", "0.25rem"]}
      px={["0.25rem", "0.5rem"]}
      py="0.6rem"
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
      onClick={onClick}
    >
      <HStack w="100%" justifyContent={"flex-start"} alignItems={"flex-start"}>
        <VStack>
          {/* <ChakraLink to={"/profile/" + username}> */}
          <Image
            display="inline-block"
            src={`${config.https.cdn}images/portraits/${filename}`}
            loading="lazy"
            verticalAlign={"middle"}
            borderRadius={"8px"}
            width={["4rem"]}
          />
          {/* </ChakraLink> */}
        </VStack>
        <VStack
          w="100%"
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          flex="1"
          spacing="0"
          pl="0.5rem"
        >
          <HStack w="100%" spacing="0">
            {/* <ChakraLink to={"/profile/" + username} h="2rem" flex="1"> */}
            <Text
              display="inline-block"
              as="span"
              fontSize="1.1rem"
              fontWeight="500"
              color="gray.50"
              pr="0.5rem"
              lineHeight="2rem"
              overflow="hidden"
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
            >
              {displayname}
            </Text>

            <Image
              src={`${config.https.cdn}images/country/${countrycode}.svg`}
              // mt="0.5rem"
              ml="0.25rem"
              display="inline-block"
              verticalAlign={"middle"}
              borderColor="gray.100"
              borderRadius="0px"
              w="1.8rem"
              h="1.35rem"
              filter="opacity(0.8)"
            />
            <Box flex="1" h="2rem" w="0.1rem"></Box>
            {/* </ChakraLink> */}
            <Text
              as="span"
              display={showTime ? "block" : "none"}
              alignSelf="flex-start"
              fontSize="1rem"
              color="gray.200"
              height="2rem"
              lineHeight={"2rem"}
              position="relative"
              // top="-1.25rem"
            >
              {timeAgo(timestamp)}
            </Text>

            <Menu placement="bottom" isLazy>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                color="gray.100"
                icon={<BsThreeDotsVertical fontSize="1.5rem" />}
                variant="unstyled"
                height="2rem"
                minW="1rem"
                textAlign={"center"}
                p="0"
                pl="0.5rem"
                filter={
                  "drop-shadow(1px 1px 2px var(--chakra-colors-gray-1200)) drop-shadow(1px 1px 2px var(--chakra-colors-gray-1200))"
                }
              />
              <MenuList
                zIndex={3}
                borderColor="gray.900"
                bgColor="gray.975"
                fontSize="1.2rem"
              >
                <MenuOptionGroup
                  color="gray.0"
                  fontWeight={"500"}
                  title="Get Involved"
                  type="checkbox"
                >
                  <MenuItem
                    fontSize="1.4rem"
                    // icon={
                    //   <Icon
                    //     as={IoShareSocial}
                    //     fontSize="2rem"
                    //     color="brand.300"
                    //   />
                    // }
                    color="gray.0"
                    bgColor="gray.975"
                    _hover={{ bgColor: "gray.800" }}
                    // onClick={onShareClick}
                  >
                    Invite Friends
                  </MenuItem>
                  <MenuItem
                    fontSize="1.4rem"
                    // icon={
                    //   <Icon as={FaGithub} fontSize="2rem" color="brand.300" />
                    // }
                    color="gray.0"
                    bgColor="gray.975"
                    _hover={{ bgColor: "gray.800" }}
                    as="a"
                    // href={`https://github.com/acosgames/${game.game_slug}/issues`}
                    target="_blank"
                  >
                    Discuss on Github
                  </MenuItem>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
          </HStack>
          <VStack
            w="100%"
            // mt="0.5rem"
            // p="1rem"
            // py="0.5rem"
            p="0"
            bgColor="gray.900"
            borderRadius={"8px"}
          >
            <Text
              alignSelf={"flex-start"}
              display="inline-block"
              as="span"
              fontSize="1.1rem"
              fontWeight="medium"
              lineHeight="1.5rem"
              color="gray.10"
              // width="100%"
            >
              {message}
            </Text>
          </VStack>
        </VStack>
        {/* <Text fontSize="1rem" fontWeight="bold" color="gray.200">
          {msgTime}
        </Text> */}
      </HStack>
    </VStack>
  );
}
