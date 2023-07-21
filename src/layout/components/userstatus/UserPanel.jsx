import {
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Icon,
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

function UserLogin() {
  return (
    <Box w="100%" height="6rem" position="relative">
      <Heading as="h4" fontWeight={"bold"} fontSize="1.6rem" color="gray.0">
        Ready To Play?
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
    <>
      <HStack
        w="100%"
        alignItems={"flex-start"}
        spacing="1rem"
        justifyContent={"flex-start"}
      >
        <UserFlag />
        <VStack alignItems={"flex-start"} flex={["1", ""]}>
          <UserName />

          <HStack spacing="1rem">
            <BadgeLevel level={3} />
            <BadgePoints points={1000} />
          </HStack>
          {/* {loggedIn != "LURKER" && <NavForUser />}
                {loggedIn == "LURKER" && <NavForGuest />} */}
        </VStack>
        <VStack
          alignItems={"flex-end"}
          display={["flex", "none"]}
          spacing="0.5rem"
        >
          <ConnectionStatus />
          <PlayersOnlineStatus />
        </VStack>
      </HStack>
      <Box w="100%" px={["0", "0"]}>
        <ExperienceBar percent={25} />
      </Box>
      <HStack display={["none", "flex"]} spacing="2rem" mt="0.5rem">
        <ConnectionStatus />
        <PlayersOnlineStatus />
      </HStack>
    </>
  );
}

export default function UserPanel() {
  return (
    <VStack spacing="0.75rem" w="100%" px={["0.5rem", "2rem"]} mt="1rem">
      {/* <UserLogin /> */}
      <UserFrame />
    </VStack>
  );
}
