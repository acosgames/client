import {
    Box,
    HStack,
    Heading,
    Icon,
    IconButton,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    Text,
    useToast,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";

import { FiLogOut } from "react-icons/fi";
import config from "../../config";
import { useState } from "react";
import { reportGame } from "../../actions/game";
import { Link } from "react-router-dom";
import { logout } from "../../actions/person";
import { btIsCreateDisplayName, btUser } from "../../actions/buckets";
import { useBucket } from "../../actions/bucket";
import { FaSave } from "react-icons/fa";
import { RiProfileFill } from "react-icons/ri";

export default function UserMenu({ game }) {
    // let player_stat = player_stats[game.game_slug];

    let user = useBucket(btUser);

    //   player_stat = player_stat || { report: 0 };
    // const [report, setReport] = useState(player_stat.report);
    const toast = useToast();

    const signIn = () => {
        btIsCreateDisplayName.set(true);
    };

    const toProfile = () => {};

    return (
        <Menu placement="bottom">
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<BsThreeDotsVertical fontSize="2rem" color="white" />}
                variant="unstyled"
                filter={
                    "drop-shadow(1px 1px 2px var(--chakra-colors-gray-1200)) drop-shadow(1px 1px 2px var(--chakra-colors-gray-1200))"
                }
            />
            <MenuList
                zIndex={3}
                borderColor="gray.600"
                bgColor="gray.700"
                bg="linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-800))"
                fontSize="1.2rem"
                pb="0"
                pt="0"
                py="2rem"
            >
                <MenuItem
                    display={user && !user.email ? "block" : "none"}
                    fontSize="1.4rem"
                    icon={<Icon as={RiProfileFill} fontSize="1.4rem" color="brand.100" />}
                    color="gray.0"
                    px="2rem"
                    bgColor="transparent"
                    _hover={{ bgColor: "gray.300" }}
                    onClick={toProfile}
                >
                    Profile
                </MenuItem>

                <MenuItem
                    display={user && !user.email ? "block" : "none"}
                    fontSize="1.4rem"
                    icon={<Icon as={FaSave} fontSize="1.4rem" color="brand.100" />}
                    color="gray.0"
                    px="2rem"
                    bgColor="transparent"
                    _hover={{ bgColor: "gray.300" }}
                    onClick={signIn}
                >
                    Save Profile
                </MenuItem>

                <MenuItem
                    fontSize="1.4rem"
                    icon={<Icon as={FiLogOut} fontSize="1.4rem" color="brand.100" />}
                    color="gray.0"
                    px="2rem"
                    bgColor="transparent"
                    _hover={{ bgColor: "gray.300" }}
                    onClick={logout}
                >
                    Logout
                </MenuItem>
                {/* <MenuItem
          fontSize="1.4rem"
          icon={<Icon as={FaGithub} fontSize="2rem" color="brand.300" />}
          color="gray.0"
          bgColor="transparent"
          _hover={{ bgColor: "gray.300" }}
          as="a"
          href={`https://github.com/acosgames//issues`}
          target="_blank"
        >
          Discuss on Github
        </MenuItem> */}
                {/* <MenuItem>Report...</MenuItem> */}
            </MenuList>
        </Menu>
    );
}
