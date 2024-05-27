import {
    Box,
    Button,
    Center,
    HStack,
    Heading,
    Icon,
    IconButton,
    Link as ChLink,
    Text,
    VStack,
    chakra,
} from "@chakra-ui/react";

import ExperienceBar from "./ExperienceBar.jsx";
import BadgeLevel from "./BadgeLevel.jsx";
import BadgePoints from "./BadgePoints.jsx";
import ConnectionStatus from "./ConnectionStatus.jsx";
import UserName from "./UserName.jsx";
import PlayersOnlineStatus from "./PlayersOnlineStatus.jsx";
import UserFlag from "./UserFlag.jsx";
// import { BiLogIn } from "@react-icons";
import UserAvatar from "./UserAvatar.jsx";
import UserLevelIcon from "./UserLevelIcon.jsx";

import { GiGamepad } from "react-icons/gi";
import UserMenu from "../user/UserMenu.jsx";

import { validateLogin } from "../../actions/connection.js";
import { useLocation, Link, Routes, Route } from "react-router-dom";
import Searching from "../queue/Searching.jsx";
import { useEffect } from "react";
import PlayNowButton from "./PlayNowButton.jsx";
import { getGamePanel, isUserNext } from "../../actions/room.js";
import { useBucket } from "../../actions/bucket.js";
import {
    btGamePanels,
    btIsMobile,
    btLoggedIn,
    btPrimaryGamePanel,
    btUser,
} from "../../actions/buckets.js";

export default function UserPanel() {
    let loggedIn = useBucket(btLoggedIn);
    let isMobile = useBucket(btIsMobile);

    let user = useBucket(btUser) || {};

    useEffect(() => {}, []);
    if (loggedIn == "LURKER" || loggedIn == "CHECKING" || !user.displayname) {
        return <WebMenu />;
    }
    return (
        <>
            <UserFrame />
            {!isMobile && <Searching />}
            <Routes>
                <Route path="/g/:game_slug" element={<PlayNowButton />} />
                <Route path="/*" element={<></>} />
            </Routes>
        </>
    );
}

function UserLogin() {
    return (
        <Box w="100%" height="6rem" position="relative">
            {/* <Heading as="h4" fontWeight={"bold"} fontSize="1.6rem" color="gray.0">
        Enter Player Name
      </Heading> */}
            <Center mt="1rem">
                <Button
                    // border="2px solid"
                    height="3.5rem"
                    // bgColor="gray.825"
                    borderColor="gray.300"
                    color="gray.0"
                    w="50%"
                    // transition="all 0.2s ease"
                    // clipPath="polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)"
                    bgColor="gray.800"
                    bg="linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-800))"
                    borderRadius={"8px"}
                    transition={"all 0.2s ease"}
                    fontWeight={"500"}
                    fontSize="1.6rem"
                    onClick={async () => {
                        if (!(await validateLogin())) return false;
                    }}
                    _hover={{
                        // borderColor: "brand.300",
                        color: "gray.20",
                        bg: "gray.900",
                        // bgColor: "brand.300",
                    }}
                    _focus={{
                        bg: "gray.900",
                        // bg: "linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-800))",
                    }}
                    // rightIcon={<Icon as={BiLogIn} />}
                >
                    Sign in
                </Button>
            </Center>
        </Box>
    );
}

function UserFrame() {
    let primaryId = useBucket(btPrimaryGamePanel);

    return (
        <VStack
            w="100%"
            spacing="0"
            //  p="1rem"
            px={["0", "0", "0.5rem"]}
            pt={["0", "0", "0.5rem"]}
            pb="0.5rem"
            position="relative"
        >
            <IsNextIndicator gamepanelid={primaryId} />
            <VStack
                bgColor="gray.900"
                borderRadius={"8px"}
                w="100%"
                boxShadow="inset 0 0px 6px var(--chakra-colors-gray-1000), inset 0 0px 2px var(--chakra-colors-gray-1000), inset 0 0px 4px var(--chakra-colors-gray-1000)"
            >
                <HStack
                    w="100%"
                    spacing="0.5rem"
                    p="0"
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Box pl="1rem" pt="0.5rem" position="relative">
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
                                <HStack
                                    alignItems={"center"}
                                    spacing="0.5rem"
                                    w="100%"
                                    // justifyContent={"center"}
                                >
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

                            {/* <VStack
                alignSelf={"center"}
                display={["flex", "flex", "none"]}
                spacing="0.5rem"
                h="100%"
              >
                <ConnectionStatus />
                <PlayersOnlineStatus />
              </VStack> */}
                            <VStack spacing="0" alignItems={"flex-start"}>
                                {/* <UserLevelIcon /> */}
                                <UserMenu />
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
            {/* <HStack
        display={["none", "none", "flex"]}
        justifyContent={"center"}
        spacing="2rem"
        w="100%"
        mt="1rem"
      >
        <ConnectionStatus />
        <PlayersOnlineStatus />
      </HStack> */}
        </VStack>
    );
}

function IsNextIndicator({ gamepanelid }) {
    let gamepanel = useBucket(btGamePanels, (bucket) => bucket[gamepanelid]);
    let primary = getGamePanel(gamepanelid);

    let user = btUser.get();
    if (!primary || !user) return;
    let isNext = isUserNext(primary.gamestate, user.shortid);
    return (
        <Box
            display={isNext ? "block" : "none"}
            borderRadius="50%"
            position="absolute"
            left="3rem"
            bottom="0.5rem"
            transform="translate(0,0)"
            zIndex={99}
            color="brand.100"
        >
            <Text as="span" fontSize="1.2rem" color="red.500">
                Go!
            </Text>
        </Box>
    );
}

let menuButtons = {
    Games: { href: "/games" },
    Profile: { href: "/profile" },
};

let menuButtonPaths = {
    "/games": "Games",
    "/profile": "Profile",
};

function WebMenu({}) {
    const location = useLocation();

    const isActive = (currentpath) =>
        location.pathname.indexOf(currentpath) > -1;

    location.pathname.indexOf("/player/create");

    let RLink = chakra(Link);
    return (
        <HStack
            w="100%"
            position={["fixed", "relative"]}
            height="7.5rem"
            minHeight="7.5rem"
            bottom="0"
            left="0"
            justifyContent="center"
        >
            <Button
                color={"gray.0"}
                role="group"
                _hover={{ color: "brand.300" }}
            >
                <RLink
                    to={"/games"}
                    display="flex"
                    flexDirection={"column"}
                    alignItems={"center"}
                >
                    <Icon as={GiGamepad} fontSize="3rem" />
                    <Text
                        as="span"
                        fontSize={"1.2rem"}
                        _groupHover={{ color: "gray.0" }}
                    >
                        Sign In
                    </Text>
                </RLink>
            </Button>
            {/* 
      <Button
        color={isActive("/profile") ? "brand.100" : "gray.0"}
        role="group"
        _hover={{ color: "brand.300" }}
      >
        <RLink
          to={"/profile"}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
        >
          <Icon as={GiGamepad} fontSize="3rem" />
          <Text as="span" fontSize={"1.2rem"} _groupHover={{ color: "gray.0" }}>
            Profile
          </Text>
        </RLink>
      </Button> */}
        </HStack>
    );
}
