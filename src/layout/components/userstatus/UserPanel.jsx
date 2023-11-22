import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Icon,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";

import ExperienceBar from "./ExperienceBar.jsx";
import BadgeLevel from "./BadgeLevel.jsx";
import BadgePoints from "./BadgePoints.jsx";
import ConnectionStatus from "./ConnectionStatus.jsx";
import UserName from "./UserName.jsx";
import PlayersOnlineStatus from "./PlayersOnlineStatus.jsx";
import UserFlag from "./UserFlag.jsx";
import { BiLogIn } from "@react-icons";
import UserAvatar from "./UserAvatar.jsx";
import UserLevelIcon from "./UserLevelIcon.jsx";

import { BsThreeDotsVertical } from "@react-icons";

function UserLogin() {
  return (
    <Box w="100%" height="6rem" position="relative">
      <Heading as="h4" fontWeight={"bold"} fontSize="1.6rem" color="gray.0">
        Enter Player Name
      </Heading>
      <Center mt="1rem">
        <Button
          border="3px solid"
          height="3rem"
          borderColor="brand.400"
          color="brand.400"
          w="100%"
          borderRadius={"0"}
          transition={"all 0.2s ease"}
          _hover={{
            borderColor: "brand.300",
            color: "gray.900",
            bgColor: "brand.300",
          }}
          rightIcon={<Icon as={BiLogIn} />}
        >
          Login
        </Button>
      </Center>
    </Box>
  );
}

function UserFrame() {
  return (
    <VStack
      w="100%"
      spacing="0"
      //  p="1rem"
      px={["0", "0", "1rem"]}
      pt={["0", "0", "0.5rem"]}
    >
      <VStack bgColor="gray.975" borderRadius={"8px"} w="100%">
        <HStack
          w="100%"
          spacing="0.5rem"
          p="0"
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box pl="1rem" pt="0.5rem">
            <UserAvatar />
          </Box>
          <VStack w="100%" pr="0.5rem" spacing="1rem">
            <HStack
              w="100%"
              alignItems={"flex-start"}
              spacing="1rem"
              justifyContent={"flex-start"}
            >
              <VStack
                alignItems={"flex-start"}
                flex={["1", ""]}
                spacing="0.25rem"
              >
                <HStack alignItems={"center"} spacing="0.5rem" w="100%">
                  <UserName />
                  <UserFlag />
                </HStack>

                <HStack spacing="0.5rem">
                  <BadgeLevel level={3} />
                  <BadgePoints points={1000} />
                </HStack>
                {/* {loggedIn != "LURKER" && <NavForUser />}
                {loggedIn == "LURKER" && <NavForGuest />} */}
              </VStack>

              <VStack
                alignSelf={"center"}
                display={["flex", "flex", "none"]}
                spacing="0.5rem"
                h="100%"
              >
                <ConnectionStatus />
                <PlayersOnlineStatus />
              </VStack>
              <VStack spacing="0" alignItems={"flex-start"}>
                {/* <UserLevelIcon /> */}
                <IconButton
                  icon={
                    <Icon
                      as={BsThreeDotsVertical}
                      color={"gray.0"}
                      fontSize={["xs", "xs", "md"]}
                      position="relative"
                      top="-0.5rem"
                    />
                  }
                  color="gray.0"
                />
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <VStack
          justifyContent={"center"}
          h="100%"
          w="100%"
          px={["1rem"]}
          pt="0"
          position="relative"
          top="-0.5rem"
        >
          <ExperienceBar percent={25} />
        </VStack>
      </VStack>
      <HStack
        display={["none", "none", "flex"]}
        justifyContent={"center"}
        spacing="2rem"
        w="100%"
        my="1rem"
      >
        <ConnectionStatus />
        <PlayersOnlineStatus />
      </HStack>
    </VStack>
  );
}

export default function UserPanel() {
  return (
    <VStack spacing="0" w="100%" px={["0rem"]} mt="0">
      {/* <UserLogin /> */}
      <UserFrame />
    </VStack>
  );
}
