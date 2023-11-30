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
import { BsThreeDotsVertical } from "@react-icons";

import {
  FaThumbsUp,
  FaChevronRight,
  FaGithub,
  FiLogOut,
  IoShareSocial,
} from "@react-icons";
import config from "../../../config";
import { useState } from "react";
import { reportGame } from "../../../actions/game";
import fs from "flatstore";
import { Link } from "react-router-dom";
import { logout } from "../../../actions/person";

export default function UserMenu({ game }) {
  //   let [player_stat] = fs.useWatch("player_stats/" + game.game_slug);
  // let player_stat = player_stats[game.game_slug];

  //   player_stat = player_stat || { report: 0 };
  // const [report, setReport] = useState(player_stat.report);
  const toast = useToast();

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
        borderColor="gray.300"
        bgColor="gray.700"
        bg="linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-800))"
        fontSize="1.2rem"
        pb="0"
      >
        <MenuOptionGroup
          color="gray.0"
          fontWeight={"800"}
          fontFamily="'Barlow', sans-serif;"
          fontSize="1.8rem"
          letterSpacing={"1px"}
          pb="0.5rem"
          title="Get Involved"
          type="checkbox"
        >
          <MenuItem
            fontSize="1.4rem"
            icon={<Icon as={FiLogOut} fontSize="2rem" color="brand.300" />}
            color="gray.0"
            bgColor="transparent"
            _hover={{ bgColor: "gray.300" }}
            onClick={logout}
          >
            Logout
          </MenuItem>
          <MenuItem
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
          </MenuItem>
        </MenuOptionGroup>
        {/* <MenuItem>Report...</MenuItem> */}
      </MenuList>
    </Menu>
  );
}
