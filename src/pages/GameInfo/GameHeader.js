import fs from 'flatstore';
import config from "../../config";
import { Box, HStack, Heading, Icon, IconButton, Image, Text, VStack, Wrap, Link as ChLink } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { FaRegHeart, FaHeart } from "@react-icons";
import GameInfoJoinButton from './GameInfoJoinButton';
import GameMenu from './GameMenu.jsx';

export default function GameHeader({ }) {
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
        <HStack alignItems="center" spacing="2rem" w="100%" pb={["4rem", "4rem", '0']}>
            <HStack
                spacing="1rem"
                alignItems={"center"}
                justifyContent={"center"}
                w={["100%", "100%", "60%"]}
            >
                <VStack
                    w="100%"
                    justifySelf="flex-start"
                    spacing={["2rem", "2rem", "2rem", "2rem"]}
                    pt="3rem"
                    // pl={['0', '0', '3rem', '6rem', '12rem']}
                    alignItems={["center", "center", "center", "center"]}
                >
                    <HStack
                        w={["100%", "100%", "40%"]}
                        display={["flex", "flex", "none"]}
                        justifyContent={"center"}
                        pt="3rem"
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
                            {/* <VStack
                                spacing="0"
                                position="absolute"
                                top={["0"]}
                                left="-4rem"
                            >
                                <GameMenu />
                            </VStack> */}
                        </Box>
                    </HStack>

                    <VStack
                        alignItems={["center", "center", "flex-start"]}
                        spacing={["1rem", "1rem"]}
                        mb="1rem"
                    >
                        <VStack alignItems={["center", "center", "flex-start"]} spacing={["0rem", "0rem", "0rem", "1rem"]}>
                            <Heading
                                color="gray.0"
                                fontSize={["3rem", "3rem", "3rem", "4rem", "5rem"]}
                                lineHeight={["4rem", "3rem", "3rem", "4rem"]}
                                textTransform={"uppercase"}
                                letterSpacing={"1px"}
                            >
                                {game.name}
                            </Heading>

                            <Box>
                                <Text
                                    color="gray.0"
                                    as="span"
                                    fontSize={["1.2rem", "1.2rem", "1.2rem", "1.4rem"]}
                                    pt="0"
                                    fontWeight={"700"}
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
                                        fontWeight={"700"}
                                    >
                                        {game.displayname}
                                    </Text>
                                </Link>
                            </Box>
                        </VStack>
                        <Wrap
                            flex="1"
                            justify={"center"}
                            align={"center"}
                        >
                            {hasOpenSource && (
                                <GameInfoTag
                                    to={"https://github.com/acosgames/" + game.game_slug}
                                    title="open source"
                                />
                            )}
                            {hasMultiplayerTopScore && <GameInfoTag title="highscore" />}
                            {hasTeams && <GameInfoTag title="teams" />}
                            <GameInfoTag title="replay" />

                            <Box ml="1rem">

                                <IconButton color="brand.300" icon={<FaHeart />} />
                            </Box>
                            <VStack
                                spacing="0"
                                ml="1rem"
                            >
                                <GameMenu game={game} />
                            </VStack>
                        </Wrap>

                        <GameInfoJoinButton />
                    </VStack>
                </VStack>
            </HStack>
            <HStack
                w={["100%", "100%", "40%"]}
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
                    {/* <VStack
                        spacing="0"
                        position="absolute"
                        top={["0"]}
                        left="-4rem"
                    >
                        <GameMenu />
                    </VStack> */}
                </Box>
            </HStack>
        </HStack>
    );
}


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
                        borderRadius="4px"
                        background="gray.200"
                        borderLeft="0.5rem solid"
                        borderLeftColor="gray.100"
                        color="gray.0"
                        textShadow="1px 1px 3px var(--chakra-colors-gray-1200)"
                        fontWeight="600"
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
                borderRadius="4px"
                background="gray.200"

                textShadow="1px 1px 3px var(--chakra-colors-gray-1200)"
                // borderLeft="1rem solid"
                // borderLeftColor="transparent"
                color="gray.0"
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
