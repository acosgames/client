import {
  HStack,
  VStack,
  Text,
  Image,
  Icon,
  Wrap,
  WrapItem,
  Box,
} from "@chakra-ui/react";
import config from "../../config/index.js";

import ratingconfig from "../../actions/ratingconfig.js";

import { AiOutlineCloseCircle } from "react-icons/ai";
import ActionBarItem from "./ActionBarItem.jsx";
import { useBucket, useBucketSelector } from "../../actions/bucket.js";
import {
  btGame,
  btLocalPlayerHighscores,
  btPlayerStats,
} from "../../actions/buckets.js";

function PlayerRankInfo({}) {
  let game = useBucket(btGame);
  let player_stat = useBucketSelector(
    btPlayerStats,
    (bucket) => bucket[game.game_slug]
  );
  let playerHighScore = useBucket(btLocalPlayerHighscores);
  // let stats = player_stats[game.game_slug];
  if (!player_stat) player_stat = { played: 0, rating: 2500 };
  console.log(player_stat);
  let played = Number.parseInt(player_stat.played);
  played = 10;
  // stats.rating = 3000;
  // played = 0
  let ratingTxt = ratingconfig.ratingToRank(
    Number.parseInt(player_stat.rating)
  );
  let ratingFormatted = played >= 10 ? ratingTxt.toUpperCase() : "UNRANKED";
  let ratingImageFile =
    played >= 10 ? ratingTxt.replace(/ /gi, "") : "Unranked";
  let rankNumber = ratingconfig.ratingToRankNumber(
    Number.parseInt(player_stat.rating)
  );

  // ratingFormatted = 'King';
  // rankNumber = 24;

  if (game.maxplayers <= 1) {
    return (
      <HStack>
        <Text color="yellow.200" fontWeight={"bold"}>
          Highscore:
        </Text>
        <Text fontWeight={"bold"}>{playerHighScore?.score || 0}</Text>
      </HStack>
    );
  }
  return (
    <ActionBarItem
      title={played >= 10 ? "CLASS" : "UNRANKED"}
      value={played < 10 ? `${played} / 10` : player_stat.rating}
      spacing="0"
      ml="0rem"
      mr="0"
    >
      <>
        {/* <Image
                    display={played >= 10 ? 'inline-block' : 'none'}
                    src={`${config.https.cdn}icons/ranks/platform/${rankNumber}.webp`}
                    loading="lazy"
                    title={ratingFormatted}
                    height="7rem"
                    position="relative"
                    top="1rem"
                /> */}

        <Box w="4rem" h="4rem" minH="4rem" position="relative" zIndex="1">
          {/* <Image
                        w="10rem"
                        h="10rem"
                        minW="10rem"
                        position="absolute"
                        // transition="all 1s ease"
                        // animation="grow_shrink11 3s ease infinite"
                        top="0"
                        left="0"
                        zIndex="-1"
                        src={`${config.https.cdn}icons/achievements/panel-black-medium.webp`}
                    /> */}
          <Text
            as="span"
            textTransform="uppercase"
            display={played >= 10 ? "block" : "none"}
            fontSize="3.6rem"
            color="gray.10"
            // textShadow='0 8px 9px var(--chakra-colors-brand-300) 0px -2px 20px var(--chakra-colors-brand-600)'
            textShadow={`2px 2px 2px var(--chakra-colors-gray-900),
                        -2px 2px 2px var(--chakra-colors-gray-900),
                        2px -2px 2px var(--chakra-colors-gray-900),
                        -2px -2px 2px var(--chakra-colors-gray-900)`}
            fontWeight="bold"
            letterSpacing="0px"
            textAlign="center"
            lineHeight={"3.5rem"}
            position="relative"
            top="1rem"
            borderRadius="20px"
          >
            {ratingFormatted.replace("CLASS ", "")}
          </Text>
        </Box>

        <Icon
          display={played < 10 ? "inline-block" : "none"}
          as={AiOutlineCloseCircle}
          width={"auto"}
          color="gray.10"
          height={["3rem"]}
        />
      </>
    </ActionBarItem>

    // <HStack spacing="1rem" h="100%" alignItems='center' justifyContent={'center'}>

    //     <VStack alignItems='center' justifyContent={'center'} h="100%">
    //         <Text
    //             color="yellow.200"
    //             fontSize={['xxs', 'xxs', 'xxs',]}
    //             fontWeight={'bolder'}
    //             lineHeight="1.2rem"
    //             align="center">{ratingFormatted}</Text>
    //         <HStack alignItems='center' justifyContent={'center'}>

    //             <Text
    //                 display={played >= 10 ? 'block' : 'none'}
    //                 color="gray.50"
    //                 fontSize={['xxs', 'xxs', 'xxs',]}
    //                 fontWeight="bold"
    //                 lineHeight={'1.6rem'}
    //                 pr={'1rem'}
    //                 align="center">{stats.rating} </Text>
    //             <Text
    //                 color="gray.50"
    //                 display={played < 10 ? 'block' : 'none'}
    //                 fontSize={['xxs', 'xxs', 'xxs']}
    //                 pl="0.5rem"
    //                 lineHeight="1.6rem">{played || 0} of 10 games remaining</Text>
    //         </HStack>
    //     </VStack>
    //     <Icon
    //         as={AiOutlineCloseCircle}
    //         width={'auto'}
    //         color="gray.200"
    //         height={["4.8rem", "4.8rem", "4.8rem"]}
    //     />
    //     {/* <Image
    //         src={`${config.https.cdn}icons/ranks/${ratingImageFile}.png`}
    //         width={'auto'}
    //         height={["4.8rem", "4.8rem", "4.8rem"]}
    //     /> */}
    // </HStack>
  );
}

export default PlayerRankInfo;
