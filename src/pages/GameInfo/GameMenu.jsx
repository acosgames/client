import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "@react-icons";

import {
  FaThumbsUp,
  FaThumbsDown,
  FaGithub,
  IoWarningSharp,
  IoShareSocial,
} from "@react-icons";

export default function GameMenu({}) {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BsThreeDotsVertical fontSize="2rem" color="white" />}
        variant="unstyled"
        filter={
          "drop-shadow(1px 1px 2px var(--chakra-colors-gray-1200)) drop-shadow(1px 1px 2px var(--chakra-colors-gray-1200))"
        }
      />
      <MenuList borderColor="gray.900" bgColor="gray.975" fontSize="1.2rem">
        <MenuOptionGroup
          color="gray.0"
          fontWeight={"500"}
          title="Social"
          type="checkbox"
        >
          <MenuItem
            fontSize="1.4rem"
            icon={<IoShareSocial />}
            color="gray.10"
            bgColor="gray.975"
            _hover={{ bgColor: "gray.800" }}
          >
            Share
          </MenuItem>
          <MenuItem
            fontSize="1.4rem"
            icon={<FaGithub />}
            color="gray.10"
            bgColor="gray.975"
            _hover={{ bgColor: "gray.800" }}
          >
            Discuss on Github
          </MenuItem>
        </MenuOptionGroup>
        <MenuDivider />
        <MenuOptionGroup
          color="gray.0"
          fontWeight={"500"}
          title="Report"
          type="checkbox"
        >
          <MenuItemOption
            value="0"
            color="gray.10"
            bgColor="gray.975"
            _hover={{ bgColor: "gray.800" }}
          >
            Does not work
          </MenuItemOption>
          <MenuItemOption
            value="1"
            color="gray.10"
            bgColor="gray.975"
            _hover={{ bgColor: "gray.800" }}
          >
            Inappropriate
          </MenuItemOption>
          <MenuItemOption
            value="2"
            color="gray.10"
            bgColor="gray.975"
            _hover={{ bgColor: "gray.800" }}
          >
            Spam
          </MenuItemOption>
        </MenuOptionGroup>

        {/* <MenuItem>Report...</MenuItem> */}
      </MenuList>
    </Menu>
  );
}
