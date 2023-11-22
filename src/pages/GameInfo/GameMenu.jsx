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
  IoWarningSharp,
  IoShareSocial,
} from "@react-icons";
import config from "../../config";
import { useState } from "react";
import { reportGame } from "../../actions/game";
import fs from "flatstore";
import { Link } from "react-router-dom";

export default function GameMenu({ game }) {
  const [player_stats] = fs.useWatch("player_stats");
  let gameStats = player_stats[game.game_slug];

  // const [report, setReport] = useState(gameStats.report);
  const toast = useToast();

  const onShareClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Play " + game.name + " on acos.games!",
          text: game.shortdesc,
          url: config.https.api + "/g/" + game.game_slug,
        })
        .then(() => {
          gtag("event", "gameshare", { game_slug: game.game_slug });
          console.log("Thanks for sharing!");
        })
        .catch(console.error);
    } else {
      // shareDialog.classList.add('is-open');
    }
  };

  const onReport = async (type) => {
    if (type == gameStats.report) {
      type = 0;
    }
    let result = await reportGame(game.game_slug, type);
    if (result.ecode) {
      toast({
        title: "[" + result.ecode + "] Disliking failed, please try again.",
        duration: "3000",
        status: "error",
      });
      return;
    }

    if (type >= 1 && type <= 3) {
      toast({
        title: "Report received.  Investigation will follow.  Thank you.",
        duration: "3000",
        status: "success",
      });
    } else {
      toast({
        title: "Report undone.",
        duration: "3000",
        status: "success",
      });
    }

    gameStats.report = type;
    player_stats[game.game_slug] = gameStats;
    fs.set("player_stats", player_stats);
    // setReport(type);
  };

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
            icon={<Icon as={IoShareSocial} fontSize="2rem" color="brand.300" />}
            color="gray.0"
            bgColor="transparent"
            _hover={{ bgColor: "gray.300" }}
            onClick={onShareClick}
          >
            Invite Friends
          </MenuItem>
          <MenuItem
            fontSize="1.4rem"
            icon={<Icon as={FaGithub} fontSize="2rem" color="brand.300" />}
            color="gray.0"
            bgColor="transparent"
            _hover={{ bgColor: "gray.300" }}
            as="a"
            href={`https://github.com/acosgames/${game.game_slug}/issues`}
            target="_blank"
          >
            Discuss on Github
          </MenuItem>
        </MenuOptionGroup>
        <MenuDivider mb="0" mt="1rem" />
        <Menu placement="right">
          <MenuButton
            pl="0.25rem"
            w="100%"
            as={IconButton}
            _hover={{
              bgColor: "gray.300",
            }}
            aria-label="Options"
            // icon={<IoWarningSharp fontSize="2rem" color="white" />}
            variant="unstyled"
            // filter={
            //   "drop-shadow(1px 1px 2px var(--chakra-colors-gray-1200)) drop-shadow(1px 1px 2px var(--chakra-colors-gray-1200))"
            // }
          >
            <HStack w="100%" justifyContent={"center"} alignItems={"center"}>
              <HStack w="100%" justifyContent={"center"} alignItems={"center"}>
                <Icon as={IoWarningSharp} fontSize="1.4rem" color="gray.20" />
                <Heading as="span" color="gray.20" fontSize="1.2rem">
                  Report
                </Heading>
              </HStack>
              <HStack flex="1" justifyContent={"flex-end"} pr="0.5rem">
                <Icon as={FaChevronRight} color="gray.20" />
              </HStack>
            </HStack>
          </MenuButton>
          <MenuList pt="0" mt="0" bgColor="gray.700">
            <MenuOptionGroup
              height="3rem"
              color="brand.600"
              m="0"
              p="0"
              fontWeight={"500"}
              title={""}
              type="radio"
              value={"" + (gameStats.report || 0)}
            >
              <MenuItemOption
                value="1"
                color={gameStats.report == 1 ? "red.300" : "gray.10"}
                bgColor="gray.700"
                _hover={{ bgColor: "gray.800" }}
                onClick={() => {
                  onReport(1);
                }}
              >
                Does not work
              </MenuItemOption>
              <MenuItemOption
                value="2"
                color={gameStats.report == 2 ? "red.300" : "gray.10"}
                bgColor="gray.700"
                _hover={{ bgColor: "gray.800" }}
                onClick={() => {
                  onReport(2);
                }}
              >
                Inappropriate
              </MenuItemOption>
              <MenuItemOption
                value="3"
                color={gameStats.report == 3 ? "red.300" : "gray.10"}
                bgColor="gray.700"
                _hover={{ bgColor: "gray.800" }}
                onClick={() => {
                  onReport(3);
                }}
              >
                Spam
              </MenuItemOption>
            </MenuOptionGroup>
          </MenuList>
        </Menu>
        {/* <MenuItem>Report...</MenuItem> */}
      </MenuList>
    </Menu>
  );
}
