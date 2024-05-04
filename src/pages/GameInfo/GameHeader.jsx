import config from "../../config";
import {
  Box,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Text,
  VStack,
  Wrap,
  Link as ChLink,
  Grid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";

import { FaRegClock, FaHeart, FaUsers } from "react-icons/fa";
import GameInfoJoinButton from "./GameInfoJoinButton";
import GameMenu from "./GameMenu.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { memo } from "react";
import { useBucket } from "../../actions/bucket";
import { btGame, btQueues } from "../../actions/buckets";

export default function GameHeader({}) {
  let game = useBucket(btGame);

  let { game_slug } = useParams();
  let queues = useBucket(btQueues);
  if (!game) {
    return <Box minH={["31rem", "31rem", "40rem", "42rem", "42rem"]}></Box>;
  }

  if (game_slug != game.game_slug)
    return <Box minH={["31rem", "31rem", "40rem", "42rem", "42rem"]}></Box>;

  let imgUrl = config.https.cdn + "placeholder.png";
  if (game.preview_images && game.preview_images.length > 0)
    imgUrl = `${config.https.cdn}g/${game.game_slug}/preview/${game.preview_images}`;

  let bgImgUrl = config.https.cdn + "images/bg/gamepage-bg1.jpg";

  let queue = {};
  for (let i = 0; i < queues.length; i++) {
    let q = queues[i];
    if (q.game_slug == game.game_slug) {
      queue = q;
      break;
    }
  }

  return (
    <VStack
      position="relative"
      // className="section-clip"
      bgColor="gray.1000"
      transformOrigin={"center"}
      minH={["31rem", "31rem", "40rem", "42rem", "42rem"]}
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
        bottom: "-1px",
        width: "50%",
        clipPath: "polygon(0 0, 100% 100%, 0 100%)",
        backgroundColor: queue.game_slug ? "gray.1200" : "gray.1200",
        height: ["16px", "16px", "16px"],
      }}
      _after={{
        content: '""',
        left: "auto",
        bottom: "-1px",
        right: "0",
        position: "absolute",
        width: "50%",
        clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        backgroundColor: queue.game_slug ? "gray.1200" : "gray.1200",
        height: ["16px", "16px", "16px"],
      }}
    >
      <AnimatePresence>
        <GameHeaderDesktop imgUrl={imgUrl} game={game} />
      </AnimatePresence>
      {/* {isMobile && <GameHeaderMobile imgUrl={imgUrl} game={game} />} */}
    </VStack>
  );
}

function GameHeaderDesktop({ game, imgUrl }) {
  let hasOpenSource = game.opensource == 1;
  let hasTeams = game.minteams > 0;
  let hasMultiplayerTopScore = game.lbscore == 1 && game.maxplayers > 1;

  const MotionHeading = motion(Heading);
  const MotionBox = motion(Box);
  return (
    <HStack
      alignItems="center"
      spacing="2rem"
      w="100%"
      pb={["4rem", "4rem", "4rem", "0"]}
    >
      <HStack
        spacing="1rem"
        alignItems={"center"}
        justifyContent={"center"}
        w={["100%", "100%", "100%", "100%"]}
      >
        <Grid
          w="100%"
          justifySelf="flex-start"
          // spacing={["2rem", "2rem", "2rem", "2rem"]}
          // pt="3rem"
          // pl={['0', '0', '3rem', '6rem', '12rem']}
          alignItems={["center", "center", "center", "center"]}
          templateColumns={[
            "100%",
            "100%",
            "100%",
            "10% 60% 20%",
            "18% 50% 20%",
          ]}
        >
          <GridItem></GridItem>
          <GridItem
            w={["100%"]}
            display={["flex", "flex", "flex", "none"]}
            justifyContent={"center"}
            pt="3rem"
            pb="1rem"
          >
            <Box
              position="relative"
              w={["12rem", "12rem", "12rem"]}
              h={["12rem", "12rem", "12rem"]}
              className="gameinfo-image"
            >
              <MemoImage imgUrl={imgUrl} />
            </Box>
          </GridItem>

          <GridItem
            alignItems={["center", "center", "center", "flex-start"]}
            justifyContent={"flex-start"}
            // spacing={["1rem", "1rem"]}
            mb="1rem"
            className="game-info-header"
            w={["auto", "auto", "auto", "100%", "100%"]}
          >
            <VStack
              alignItems={["center", "center", "center", "flex-start"]}
              spacing={["0rem", "0rem", "0rem", "0rem"]}
            >
              <Heading
                color="gray.0"
                fontSize={["3rem", "3rem", "3rem", "3.4rem", "4rem"]}
                lineHeight={["4rem", "3rem", "3rem", "4rem"]}
                textTransform={"uppercase"}
                letterSpacing={"1px"}
                whiteSpace={"nowrap"}
                overflow="hidden"
                position="relative"
                textOverflow={"ellipsis"}
                w="100%"
                h={["4rem", "3rem", "3rem", "4rem"]}
                pr="1rem"
                title={game.name}
                textAlign={["center", "center", "center", "left"]}
                transformOrigin="center"
              >
                {game.name || "    "}
              </Heading>

              <Box>
                <Text
                  color="gray.20"
                  as="span"
                  fontSize={["1.2rem", "1.2rem", "1.2rem", "1.4rem"]}
                  pt="0"
                  fontWeight={"400"}
                  mr="0.25rem"
                >
                  Developed by{" "}
                </Text>
                <Link to={"/profile/" + game.displayname}>
                  <Text
                    as="span"
                    fontSize={["1.2rem", "1.2rem", "1.2rem", "1.4rem"]}
                    color="brand.200"
                    letterSpacing={"1px"}
                    pt="0"
                    fontWeight={"500"}
                  >
                    {game.displayname || "Loading..."}
                  </Text>
                </Link>
              </Box>
            </VStack>
            <Wrap
              pt="1rem"
              w="100%"
              flex="1"
              justify={["center", "center", "center", "flex-start"]}
              align={"center"}
            >
              {hasOpenSource && (
                <GameInfoTag
                  to={"https://github.com/acosgames/" + game.game_slug}
                  title="view code"
                />
              )}
              {hasMultiplayerTopScore && <GameInfoTag title="highscore" />}
              {hasTeams && <GameInfoTag title="teams" />}
              <GameInfoTag title="replays" />

              <Box ml="1rem">
                <IconButton color="brand.300" icon={<FaHeart />} />
              </Box>
              <VStack spacing="0" ml="1rem">
                <GameMenu game={game} />
              </VStack>
            </Wrap>

            <GameInfoJoinButton />

            <HStack
              px={["1rem", "1rem", "1rem", 0]}
              w="100%"
              mt="4rem"
              gap="4rem"
              justifyContent={["center", "center", "center", "flex-start"]}
            >
              <HStack
                borderRadius="8px"
                p="1rem"
                gap="1rem"
                bgColor="rgba(0,0,0,0.5)"
              >
                <Icon
                  as={FaRegClock}
                  color="gray.10"
                  width="3rem"
                  height="3rem"
                />
                <VStack alignItems={"flex-start"} gap="0">
                  <Heading
                    as="span"
                    fontSize="1.4rem"
                    fontWeight="400"
                    color="gray.50"
                  >
                    Season {game?.season || 0}
                  </Heading>
                  <Heading
                    as="span"
                    fontSize="1.6rem"
                    fontWeight="300"
                    color="gray.10"
                  >
                    Ends in:{" "}
                    <Text as="span" fontWeight="600">
                      TBD
                    </Text>
                  </Heading>
                </VStack>
              </HStack>

              <HStack
                borderRadius="8px"
                p="1rem"
                gap="1rem"
                bgColor="rgba(0,0,0,0.5)"
              >
                <Icon as={FaUsers} color="gray.10" width="3rem" height="3rem" />
                <VStack alignItems={"flex-start"} gap="0">
                  <Heading
                    as="span"
                    fontSize="1.4rem"
                    fontWeight="400"
                    color="gray.50"
                  >
                    Last Hour
                  </Heading>
                  <Heading
                    as="span"
                    fontSize="1.6rem"
                    fontWeight="300"
                    color="gray.10"
                  >
                    Games Played:{" "}
                    <Text as="span" fontWeight="600">
                      0
                    </Text>
                  </Heading>
                </VStack>
              </HStack>
            </HStack>
          </GridItem>
          <GridItem>
            <HStack
              w={["100%", "100%", "100%", "100%"]}
              display={["none", "none", "none", "flex"]}
              justifyContent={"center"}
            >
              <Box
                position="relative"
                w={["12rem", "12rem", "12rem", "20rem", "24rem"]}
                h={["12rem", "12rem", "12rem", "20rem", "24rem"]}
                className="gameinfo-image"
              >
                <MemoImage imgUrl={imgUrl} />
              </Box>
            </HStack>
          </GridItem>
        </Grid>
      </HStack>
    </HStack>
  );
}

const MemoImage = memo(
  ({ imgUrl }) => {
    const MotionImage = motion(Image);
    return (
      <MotionImage
        position="absolute"
        right="0"
        borderRadius={"8px"}
        objectFit={"cover"}
        src={imgUrl}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{
          duration: 0.2,
          ease: [0, 0.71, 0.2, 1.01],
          scale: {
            type: "spring",
            damping: 10,
            stiffness: 90,
            restDelta: 0.01,
          },
        }}
      />
    );
  },
  (next, prev) => next.imgUrl == prev.imgUrl
);
function GameInfoTag(props) {
  if (props.to) {
    return (
      <Box>
        <ChLink href={props.to} target="_blank">
          <Text
            display="inline-block"
            // borderRadius='3px'
            // py=".3rem"
            px="0.5rem"
            borderRadius="8px"
            background="gray.200"
            borderLeft="0.5rem solid"
            borderLeftColor="gray.100"
            color="gray.0"
            textShadow="1px 1px 3px var(--chakra-colors-gray-1200)"
            fontWeight="500"
            margin=".25em .1em"
            fontSize={["1rem", "1rem", "1.2rem"]}
            position="relative"
            _hover={{
              borderLeftColor: "gray.0",
            }}
          >
            {props.title}
          </Text>
        </ChLink>
      </Box>
    );
  }

  return (
    <Box>
      <Text
        display="inline-block"
        // borderRadius='3px'
        // py=".3rem"
        px="0.5rem"
        borderRadius="8px"
        background="gray.200"
        textShadow="1px 1px 3px var(--chakra-colors-gray-1200)"
        // borderLeft="1rem solid"
        // borderLeftColor="transparent"
        color="gray.0"
        fontWeight="500"
        margin=".25em .1em"
        fontSize={["1rem", "1rem", "1.1rem"]}
        position="relative"
      >
        {props.title}
      </Text>
    </Box>
  );
}
