import fs from "flatstore";
import Layout from "../../layout/Layout.jsx";
import { useEffect } from "react";
import { findGame } from "../../actions/game.js";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Wrap,
  Tooltip,
  Button,
  Image,
  Center,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import { loadUserGameData } from "../../actions/person.js";
import GameTag from "../../layout/components/game/GameTag.jsx";

import config from "../../config";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import GameInfoReplay from "./GameInfoReplay.js";
import PlayerRankInfo from "./PlayerRankInfo.js";
import GameInfoJoinButton from "./GameInfoJoinButton.js";

import PlayNowBG from "../../assets/images/dark-green-2790337_640.png";
import GameInfoTop10 from "./GameInfoTop10.js";

import { BsThreeDotsVertical } from "@react-icons";

export default function GamePage({}) {
  let [player_stats] = fs.useWatch("player_stats");

  let { game_slug, room_slug, mode } = useParams();

  mode = mode || "rank";

  useEffect(() => {
    // findGame();
    loadUserGameData(game_slug);
  }, []);

  return (
    <Layout>
      {/* <GamePlayNow {...game} {...player_stats} /> */}
      <Center w="100%">
        <Box
          w="100%"
          // w={["100%", "800px", "800px", "800px", "1200px"]}
          className="gameeinfo-container"
          // pt={["3rem", "3rem", "4rem"]}
        >
          <Box
            //   px={["1rem", "1.5rem", "3rem"]}
            w="100%"
            m={"0 auto"}
            // maxWidth={["100%", "100%", "100%", "100%", "100%", "1200px"]}
            py={["1rem", "1rem", "1rem"]}
            position="relative"
          >
            {/* <EggDoodad /> */}
            <VStack
              spacing="1rem"
              alignItems={"flex-start"}
              position="relative"
            >
              <GameInfo />
            </VStack>
          </Box>
        </Box>
      </Center>
    </Layout>
  );
}

function GameInfo({}) {
  let [loadingGameInfo] = fs.useWatch("loadingGameInfo");

  if (loadingGameInfo) {
    return <Box h="1000rem"></Box>;
  }
  let { game_slug, room_slug, mode } = useParams();
  return (
    <VStack w="100%">
      <GameHeader />
      <GameActionBar />

      <VStack
        w="100%"
        maxW={["100%", "100%", "100%", "100%"]}
        px={["0.5rem", "0.5rem", "1rem"]}
      >
        <Box w="100%" h="100%">
          <GameInfoReplay game_slug={game_slug} />
        </Box>

        <GameInfoTop10 />
        <Box>
          <GameDescription />
        </Box>
      </VStack>
    </VStack>
  );
}

function GameActionBar({}) {
  return (
    <HStack
      w="100%"
      py="2rem"
      bgColor="gray.925"
      justifyContent={"center"}
      spacing="6rem"
    >
      <HStack spacing="1rem">
        <HStack color="gray.0">
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            focusable="false"
            class="chakra-icon"
            style={{
              height: "6rem",
              width: "6rem",
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="none"
              stroke="#fff"
              stroke-width="1.25"
              d="M6,3 L18,3 L22,9 L12,21 L2,9 L6,3 Z M2,9 L22,9 M11,3 L7,9 L12,20 M13,3 L17,9 L12,20"
            ></path>
          </svg>
        </HStack>
        <VStack spacing="0">
          <Text
            as="span"
            color="brand.300"
            fontWeight="700"
            fontSize="1.2rem"
            letterSpacing={"1px"}
          >
            WINS
          </Text>
          <Text as="span" color="gray.0" fontWeight="700" fontSize="2.2rem">
            10
          </Text>
        </VStack>
      </HStack>

      <HStack spacing="1rem">
        <HStack color="gray.0">
          <svg
            stroke="currentColor"
            fill="white"
            stroke-width="1.25"
            viewBox="0 0 511.983 511.983"
            stroke-linecap="round"
            stroke-linejoin="round"
            style={{
              height: "5rem",
              width: "5rem",
            }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M125.491,267.021c-3.337-3.337-8.73-3.337-12.066,0c-25.301,25.293-25.813,53.094-1.707,78.507l-53.896,53.888
				l-8.866-8.798c-6.647-6.656-17.468-6.673-24.098-0.043L4.992,410.449c-6.656,6.647-6.656,17.476,0,24.132l72.397,72.405
				c3.328,3.328,7.706,4.992,12.075,4.992c4.369,0,8.747-1.664,12.066-4.992l19.866-19.857c3.482-3.482,5.163-8.346,4.625-13.346
				c-0.495-4.582-2.756-8.994-6.536-12.774l-6.912-6.878l53.837-53.828c25.762,24.525,52.873,23.927,78.549-1.749
				c3.337-3.337,3.337-8.73,0-12.066L125.491,267.021z M176.649,386.445l-4.301-4.241c-3.336-3.285-8.695-3.268-12.023,0.043
				l-59.836,59.844L87.04,428.702c-3.336-3.328-8.73-3.311-12.075,0.026c-3.328,3.337-3.311,8.738,0.026,12.066l32.435,32.299
				c1.263,1.254,1.587,2.236,1.86,2.014l-19.831,19.814l-72.397-72.405l19.857-19.806l14.925,14.814
				c3.328,3.302,8.721,3.294,12.041-0.026l59.827-59.836l15.317,15.352c3.337,3.337,8.73,3.337,12.066,0.017
				c3.345-3.328,3.345-8.738,0.017-12.075l-25.617-25.668c-9.591-9.6-14.473-19.021-14.498-28.023
				c-0.017-7.049,2.935-14.362,8.798-21.803l106.752,106.743C209.604,405.679,193.971,403.785,176.649,386.445z"
            />
            <path
              d="M287.625,176.687L430.933,33.378l45.773-10.172L305.425,194.487c-3.337,3.337-3.337,8.73,0,12.066
				c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5L488.764,35.281l-10.163,45.764L335.292,224.354
				c-3.337,3.337-3.337,8.73,0,12.066c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5L492.425,91.354
				c1.152-1.143,1.946-2.594,2.304-4.181l17.067-76.8c0.111-0.521,0.12-1.05,0.137-1.57c0.009-0.128,0.043-0.256,0.043-0.384
				c-0.017-0.973-0.213-1.911-0.546-2.816c-0.077-0.205-0.171-0.393-0.265-0.589c-0.418-0.922-0.939-1.792-1.673-2.526
				c-0.734-0.734-1.604-1.254-2.517-1.673c-0.205-0.094-0.393-0.188-0.597-0.265c-0.904-0.324-1.843-0.529-2.807-0.546
				c-0.145,0-0.273,0.034-0.418,0.043c-0.521,0.017-1.033,0.034-1.544,0.145l-76.8,17.067c-1.579,0.35-3.029,1.143-4.181,2.295
				L275.558,164.621c-3.337,3.337-3.337,8.73,0,12.066S284.288,180.023,287.625,176.687z"
            />
            <path
              d="M506.991,410.449l-19.857-19.866c-6.007-6.016-16.922-7.296-26.129,1.92l-6.861,6.895l-53.837-53.828
				c24.516-25.754,23.936-52.864-1.749-78.549c-3.337-3.337-8.73-3.337-12.066,0L267.025,386.487c-3.337,3.337-3.337,8.73,0,12.066
				c25.301,25.301,53.111,25.813,78.507,1.707l53.897,53.897l-8.806,8.866c-6.656,6.656-6.673,17.468-0.034,24.098l19.866,19.866
				c3.319,3.328,7.697,4.992,12.066,4.992s8.747-1.664,12.075-4.992l72.397-72.397C513.647,427.934,513.647,417.097,506.991,410.449
				z M422.519,494.921l-19.806-19.857l14.814-14.925c3.302-3.337,3.294-8.721-0.026-12.041l-59.836-59.836l15.352-15.309
				c3.345-3.328,3.345-8.73,0.017-12.075c-3.336-3.328-8.738-3.337-12.066-0.009l-25.677,25.617
				c-9.6,9.591-19.029,14.473-28.023,14.498h-0.077c-7.023,0-14.31-2.953-21.726-8.806l106.743-106.735
				c13.483,16.922,11.563,32.555-5.769,49.886l-4.233,4.301c-3.285,3.345-3.268,8.713,0.051,12.023l59.836,59.836l-13.397,13.449
				c-3.319,3.336-3.302,8.747,0.026,12.066c3.354,3.337,8.747,3.319,12.075-0.026l32.29-32.427c1.263-1.254,2.219-1.587,2.022-1.86
				l19.814,19.831L422.519,494.921z"
            />
            <path
              d="M281.591,349.854c2.185,0,4.369-0.836,6.033-2.5c3.336-3.337,3.336-8.73,0-12.066L33.382,81.045L23.219,35.281
				l282.206,282.206c1.664,1.664,3.849,2.5,6.033,2.5c2.185,0,4.369-0.836,6.033-2.5c3.337-3.337,3.337-8.73,0-12.066L35.277,23.206
				L81.05,33.378L335.292,287.62c3.337,3.337,8.73,3.337,12.066,0c3.336-3.337,3.336-8.73,0-12.066l-256-256
				c-1.152-1.152-2.603-1.946-4.181-2.295l-76.8-17.067C9.865,0.081,9.353,0.064,8.832,0.047C8.687,0.038,8.559,0.004,8.414,0.004
				C7.441,0.021,6.511,0.226,5.606,0.55C5.402,0.627,5.214,0.721,5.018,0.815c-0.922,0.41-1.792,0.939-2.526,1.673
				C1.758,3.221,1.229,4.092,0.819,5.013C0.725,5.21,0.631,5.397,0.555,5.602C0.222,6.507,0.026,7.445,0.009,8.418
				c0,0.128,0.034,0.256,0.043,0.384c0.017,0.521,0.026,1.05,0.137,1.57l17.067,76.8c0.358,1.587,1.152,3.038,2.304,4.181
				l164.634,164.634l-19.567,19.567c-3.337,3.337-3.337,8.73,0,12.066c1.664,1.664,3.849,2.5,6.033,2.5s4.369-0.836,6.033-2.5
				l19.567-19.567l17.8,17.801l-19.567,19.567c-3.337,3.336-3.337,8.73,0,12.066c1.664,1.664,3.849,2.5,6.033,2.5
				c2.185,0,4.369-0.836,6.033-2.5l19.567-19.567l17.801,17.801l-19.567,19.567c-3.337,3.337-3.337,8.73,0,12.066
				c1.664,1.664,3.849,2.5,6.033,2.5s4.369-0.836,6.033-2.5l19.567-19.567l19.567,19.567
				C277.222,349.018,279.407,349.854,281.591,349.854z"
            />
          </svg>
        </HStack>
        <VStack spacing="0">
          <Text
            as="span"
            color="brand.300"
            fontWeight="700"
            fontSize="1.2rem"
            letterSpacing={"1px"}
          >
            BATTLES
          </Text>
          <Text as="span" color="gray.0" fontWeight="700" fontSize="2.2rem">
            22
          </Text>
        </VStack>
      </HStack>
    </HStack>
  );
}

function GameHeader({}) {
  let [game] = fs.useWatch("game");
  let [isMobile] = fs.useWatch("isMobile");

  if (!game) {
    return <></>;
  }

  let imgUrl = config.https.cdn + "placeholder.png";
  if (game.preview_images && game.preview_images.length > 0)
    imgUrl = `${config.https.cdn}g/${game.game_slug}/preview/${game.preview_images}`;

  let bgImgUrl = config.https.cdn + "images/bg/gamepage-bg1.jpg";
  return (
    <VStack
      position="relative"
      // className="section-clip"
      bgColor="gray.1000"
      transformOrigin={"center"}
      minH={["31rem", "31rem", "40rem", "48rem", "48rem"]}
      w={["100%"]}
      backgroundImage={`url(${bgImgUrl})`}
      backgroundPosition={"center"}
      backgroundSize={"cover"}
      justifyContent={"center"}
      alignItems={"center"}
      _before={{
        content: '""',
        position: "absolute",
        left: "0",
        bottom: "0",
        width: "50%",
        clipPath: "polygon(0 0, 100% 100%, 0 100%)",
        backgroundColor: "brand.300",
        height: ["20px", "20px", "20px"],
      }}
      _after={{
        content: '""',
        left: "auto",
        bottom: "0",
        right: "0",
        position: "absolute",
        width: "50%",
        clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        backgroundColor: "brand.300",
        height: ["20px", "20px", "20px"],
      }}
    >
      <VStack
        spacing="0"
        position="absolute"
        top={["1rem", "4rem", "7rem"]}
        right="2rem"
      >
        {/* <UserLevelIcon /> */}
        <IconButton
          icon={
            <Icon
              as={BsThreeDotsVertical}
              color={"brand.600"}
              fontSize={["xs", "xs", "md"]}
            />
          }
          color="gray.0"
        />
      </VStack>
      <GameHeaderDesktop imgUrl={imgUrl} game={game} />
      {/* {isMobile && <GameHeaderMobile imgUrl={imgUrl} game={game} />} */}
    </VStack>
  );
}

function GameHeaderDesktop({ game, imgUrl, bgImgUrl }) {
  let hasOpenSource = game.opensource == 1;
  let hasTeams = game.minteams > 0;
  let hasMultiplayerTopScore = game.lbscore == 1 && game.maxplayers > 1;
  return (
    <HStack alignItems="center" spacing="2rem" w="100%" pt={["0", "2rem"]}>
      <HStack
        spacing="1rem"
        alignItems={"center"}
        justifyContent={"center"}
        w={["100%", "100%", "60%"]}
      >
        <VStack
          spacing={["1rem", "1rem", "0rem"]}
          justifySelf="flex-start"
          alignItems={"center"}
        >
          <HStack
            w={["100%", "100%", "50%"]}
            display={["flex", "flex", "none"]}
            justifyContent={"center"}
          >
            <Box
              position="relative"
              w={["12rem", "12rem", "24rem"]}
              h={["12rem", "12rem", "24rem"]}
              className="gameinfo-image"
            >
              <Image
                position="absolute"
                right="0"
                borderRadius={"12px"}
                objectFit={"cover"}
                src={imgUrl}
              />
            </Box>
          </HStack>
          <VStack
            alignItems={["center", "center", "flex-start"]}
            spacing="0rem"
          >
            <Heading
              color="gray.0"
              fontSize={["3rem", "3rem", "3rem", "4rem", "6rem"]}
              lineHeight={["4rem", "4rem", "5rem"]}
              textTransform={"uppercase"}
              letterSpacing={"3px"}
            >
              {game.name}
            </Heading>

            <Box my={["0.5rem", "0rem", "0rem", "1.5rem"]}>
              <Text
                color="gray.50"
                as="span"
                fontSize={["1.2rem", "1.2rem", "1.2rem", "1.6rem"]}
                pt="0"
                fontWeight={"700"}
                mr="0.25rem"
              >
                Created by{" "}
              </Text>
              <Link to={"/profile/" + game.displayname}>
                <Text
                  as="span"
                  fontSize={["1.2rem", "1.2rem", "1.6rem"]}
                  color="brand.300"
                  letterSpacing={"1px"}
                  pt="0"
                  fontWeight={"700"}
                >
                  {game.displayname}
                </Text>
              </Link>
            </Box>
            <Wrap
              flex="1"
              justifyContent={"flex-start"}
              alignItems={"flex-end"}
            >
              {hasOpenSource && (
                <GameInfoTag
                  to={"https://github.com/acosgames/" + game.game_slug}
                  title="opensource"
                />
              )}
              {hasMultiplayerTopScore && <GameInfoTag title="topscore" />}
              {hasTeams && <GameInfoTag title="teams" />}
              <GameInfoTag title="replays" />
            </Wrap>
          </VStack>
        </VStack>
      </HStack>
      <HStack
        w={["100%", "100%", "50%"]}
        display={["none", "none", "flex"]}
        justifyContent={"center"}
      >
        <Box
          position="relative"
          w={["8rem", "12rem", "16rem", "24rem"]}
          h={["8rem", "12rem", "16rem", "24rem"]}
          className="gameinfo-image"
        >
          <Image
            position="absolute"
            right="0"
            borderRadius={"12px"}
            objectFit={"cover"}
            src={imgUrl}
          />
        </Box>
      </HStack>
    </HStack>
  );
}

function GamePlayNow({ name, game_slug, maxplayers, preview_images }) {
  let imgUrl = config.https.cdn + "placeholder.png";
  if (preview_images && preview_images.length > 0)
    imgUrl = `${config.https.cdn}g/${game_slug}/preview/${preview_images}`;

  return (
    <Box
      w="100%"
      bgColor="gray.1000"
      background={`rgba(0, 0, 0, 0.5)  no-repeat center center`}
      // backgroundImage={PlayNowBG}
      // backgroundColor={`linear-gradient(rgba(0, 0, 0, 0.7),rgba(0, 0, 0, 0.7))`}
      // backgroundBlendMode={"darken"}
      backgroundImage={`url(${imgUrl})`}
      backgroundSize={"cover"}
    >
      <Center
        w="100%"
        backdropFilter="auto"
        backdropBlur="10px"
        backdropBrightness={"0.4"}
        py="3rem"
      >
        <VStack spacing={"2rem"}>
          {/* <Heading>Play Now</Heading> */}
          <Heading
            w="100%"
            color="gray.0"
            fontSize={["xl", "2xl"]}
            lineHeight={["2rem", "2rem", "3rem"]}
            filter="drop-shadow(0 2px 8px var(--chakra-colors-gray-1000)) drop-shadow(0 2px 2px var(--chakra-colors-gray-1000)) "
          >
            {name}
          </Heading>

          <Box>
            <PlayerRankInfo game_slug={game_slug} maxplayers={maxplayers} />
          </Box>
          <GameInfoJoinButton />
        </VStack>
      </Center>
    </Box>
  );
}

function GameDescription({ longdesc }) {
  let [game] = fs.useWatch("game");

  if (!game) {
    return <></>;
  }

  return (
    <ReactMarkdown
      allowed
      allowedElements={[
        "strong",
        "span",
        "blockquote",
        "emphasis",
        "img",
        "a",
        "i",
        "b",
        "p",
        "strike",
        "s",
        "del",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "div",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
      ]}
      children={longdesc}
      remarkPlugins={[remarkGfm]}
    ></ReactMarkdown>
  );
}

function GameInfoTag(props) {
  if (props.to) {
    return (
      <Box>
        <Link href={props.to} target="_blank">
          <Text
            display="inline-block"
            // borderRadius='3px'
            py=".3rem"
            px="0.5rem"
            borderRadius="4px"
            background="gray.900"
            borderLeft="0.5rem solid"
            borderLeftColor="gray.300"
            color="gray.20"
            fontWeight="600"
            margin=".25em .1em"
            fontSize={["1rem", "1rem", "1.2rem"]}
            position="relative"
            _hover={{
              borderLeftColor: "brand.300",
            }}
          >
            {props.title}
          </Text>
        </Link>
      </Box>
    );
  }

  return (
    <Box>
      <Text
        display="inline-block"
        // borderRadius='3px'
        py=".3rem"
        px="0.5rem"
        borderRadius="4px"
        background="gray.900"
        // borderLeft="1rem solid"
        // borderLeftColor="transparent"
        color="gray.20"
        fontWeight="600"
        margin=".25em .1em"
        fontSize={["1rem", "1rem", "1.1rem"]}
        position="relative"
      >
        {props.title}
      </Text>
    </Box>
  );
}
