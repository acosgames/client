import { Box, HStack, Heading, Text, VStack, Image } from "@chakra-ui/react";
import config from "../../config/index.js";
import PlayerRankInfo from "./PlayerRankInfo.js";
import fs from "flatstore";
import ActionBarItem from "./ActionBarItem.jsx";

export default function GameStats({}) {
  let [game] = fs.useWatch("game");
  let [player_stat] = fs.useWatch("player_stats/" + game.game_slug);

  if (!game || !player_stat) {
    return <></>;
  }
  // let stats = player_stats[game.game_slug];

  let index = 2;

  return (
    <VStack pt="2rem" pb="5rem" height="100%" alignItems={"center"}>
      <VStack
        w="100%"
        alignItems={"center"}
        pb="1rem"
        // _after={{
        //   content: '""',
        //   display: "block",
        //   clipPath: "polygon(0% 0%, 100% 0%, 93.846% 100%, 6.154% 100%, 0% 0%)",
        //   width: "65px",
        //   height: "5px",
        //   margin: "0.5rem 0 0",
        //   background: "brand.300",
        // }}
      >
        <Text
          as="span"
          color="brand.300"
          //   letterSpacing={"2px"}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          fontSize={["1.2rem", "1.2rem", "1.4rem"]}
        >
          Season 1
        </Text>
        <Heading
          as="h2"
          color="gray.0"
          fontSize={["2.4rem", "2.4rem", "3rem"]}
          fontWeight={"600"}
        >
          Career Stats
        </Heading>
      </VStack>
      <HStack
        justifyContent={"center"}
        spacing={["6rem", "6rem"]}
        position="relative"
        flexWrap="wrap"
        h="19rem"
        px="3rem"
        bgColor="gray.875"
        borderRadius="12px"
        border="1px solid #27313f"
        overflow="hidden"
        zIndex="1"
        clipPath="polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)"
      >
        <PlayerRankInfo />
        <ActionBarItem title={"WINS"} value={player_stat.win || 0}>
          <Box
            // bgColor="gray.1200"
            //  border="3px solid"
            //   borderColor="gray.700"
            //    borderRadius="50%"
            height="4rem"
            w="4rem"
            position="relative"
          >
            <Image
              display={"inline-block"}
              src={`${config.https.cdn}icons/achievements/72-white-thumbnail.webp`}
              loading="lazy"
              title={"BATTLES"}
              height="5rem"
              w="5rem"
              minW="5rem"
              position="relative"
              // filter="brightness(70%) hue-rotate(50deg)"
              top="0rem"
              left="-0.5rem"
            />
          </Box>
        </ActionBarItem>

        <ActionBarItem title={"BATTLES"} value={player_stat.played || 0}>
          <Box
            // bgColor="gray.1200"
            // border="3px solid"
            // borderColor="gray.700"
            // borderRadius="50%"
            height="4rem"
            w="4rem"
            position="relative"
          >
            <Image
              display={"inline-block"}
              src={`${config.https.cdn}icons/achievements/5-white-thumbnail.webp`}
              loading="lazy"
              title={"BATTLES"}
              height="5rem"
              w="5rem"
              // filter="brightness(70%) hue-rotate(50deg)"
              minW="5rem"
              position="relative"
              top="0.25rem"
              left="-0.8rem"
            />
          </Box>
        </ActionBarItem>
      </HStack>
    </VStack>
  );
}
