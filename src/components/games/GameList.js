import { Component } from "react";

import {
    Link,

} from "react-router-dom";
import { Redirect } from 'react-router';

import SimpleBarReact from "simplebar-react";
import { findGames } from '../../actions/game';
import fs from 'flatstore';
import GameListItem from "./GameListItem";
import { Box, Divider, Flex, Heading, HStack, Icon, Text, VStack, Wrap, chakra, Link as ChLink, Image, Grid, Button, Center } from "@chakra-ui/react";
import { FaDiscord, FaDev, FaGithub, TiDocumentText } from '@react-icons';

import SLink from "../widgets/SLink";

import LottieAnimation from './lottie/LottieAnimation';

import config from '../../config';

class GameList extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        findGames();

        gtag('event', 'gamelist');

    }

    render() {
        let gameLists = this.props.gameLists || {};
        let rankList = gameLists?.rankList || [];
        let experimentalList = gameLists?.experimentalList || [];
        let soloList = gameLists?.soloList || [];
        // let productionGames = games.filter(v => v.status == 3);
        // let betaGames = games.filter(v => v.status == 2);
        return (
            <VStack width="100%" align="left" spacing="4rem">
                <VStack align="left">
                    <Heading as="h1" size="md" pb="0rem" color="white">Ranked Games</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.175">You'll need skill to reach the top</Heading>
                    <Wrap w="100%" spacing={['1.2rem', '2rem', "1.4rem"]} overflow="visible">
                        {
                            rankList.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Wrap>
                </VStack>
                <Divider />
                <VStack align="left" display={soloList.length == 0 ? 'none' : undefined}>
                    <Heading as="h1" size="md" color="white">Solo Highscore</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.175">Play by yourself against the world</Heading>
                    <Flex w="100%" spacing={['0.6rem', '1rem', "1.4rem"]} overflow="visible">
                        {
                            soloList.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Flex>
                </VStack>
                <Divider display={experimentalList.length == 0 ? 'none' : undefined} />
                <VStack align="left" display={experimentalList.length == 0 ? 'none' : undefined}>
                    <Heading as="h1" size="md" color="white">Early Access</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.175">Not yet published, but the devs need your help!</Heading>
                    <Flex w="100%" spacing={['0.6rem', '1rem', "1.4rem"]} overflow="visible">
                        {
                            experimentalList.map(game => (<GameListItem key={"gamelistitem-" + game.game_slug} game={game}></GameListItem>))
                        }
                    </Flex>
                </VStack>
                <Divider />
                <VStack align="left" justify={"left"}>


                    <HStack mb="15rem" mt="">
                        <VStack w={[]} spacing={['3rem']}>
                            <Box display={['block', 'block', 'block', 'none']} w={'70%'} mb={'-5%'} mt={'-5%'}>
                                <LottieAnimation speed={0.1} src={config.https.cdn + 'gamedev-animation-1.json'} style={{ height: '100px' }} />
                            </Box>

                            <Heading textAlign={['', '', '']} as="h1" fontSize="36px" color="white" fontWeight={'light'} lineHeight={'5rem'} >Build games using our SDK to launch and play instantly against the world</Heading>
                            <Heading textAlign={['', '', '']} as="h2" size="md" color="gray.150" fontWeight={'light'} lineHeight={'3rem'}>Code your server gameplay and client user-interface, then deploy for free.  </Heading>

                            <HStack spacing="3rem" >
                                <ChLink href={"/dev"}>
                                    <Button
                                        // display={props.inQueue ? 'none' : 'flex'}

                                        bgColor="brand.500"
                                        _hover={{ bg: "brand.600" }}
                                        _active={{ bg: "brand.900" }}
                                        //boxShadow={`inset 0 1px 3px 0 rgb(255 255 255 / 60%), inset 0 0 3px 5px rgb(0 0 0 / 5%)`}
                                        size="md"
                                        color={'black'}
                                        mr="0"
                                        w="18rem"
                                        h="5rem"
                                        // p="0.5rem"
                                        // position="absolute"
                                        // top="-10px"
                                        // right="-10px"
                                        // icon={<FaPlay />}
                                        borderTopLeftRadius={"9999px"}
                                        borderBottomLeftRadius={"9999px"}

                                        borderTopRightRadius={'9999px'}
                                        borderBottomRightRadius={'9999px'}
                                    // onClick={props.handleJoin}
                                    >
                                        Get Started
                                    </Button>
                                </ChLink>
                                <ChLink isExternal href={"https://sdk.acos.games"}>
                                    <Heading as="h3" size="sm" fontWeight="light">Read the Docs</Heading>
                                </ChLink>
                            </HStack>
                        </VStack>
                        <Box width={'80%'} display={['none', 'none', 'none', 'block']}>
                            <LottieAnimation speed={0.1} src={config.https.cdn + 'gamedev-animation-1.json'} style={{ height: '100px' }} />
                        </Box>
                    </HStack>


                    <HStack mb="15rem" mt="" spacing="6rem" >
                        {/* <Box width={'60%'} display={['none', 'none', 'none', 'block']}>
                            <Box
                                width="100%"
                                height="100%"
                            >

                                <iframe
                                    style={{ aspectRatio: '16 / 9', width: '100%' }}
                                    src="https://www.youtube.com/embed/keGjP5ySqyg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

                            </Box>
                        </Box> */}
                        <VStack w={[]} spacing={['2rem']} alignItems={'flex-start'}>


                            <Heading as="h1" fontSize="36px" color="white" fontWeight={'light'} lineHeight={'5rem'} >ACOS Simulator helps guide your game development</Heading>
                            <Heading as="h2" size="md" color="gray.150" fontWeight={'light'} lineHeight={'3rem'}>Inspect the networked game state, simulate fake players, configure game settings, rewind and fast forward between states.</Heading>
                            <Box
                                mt="5rem"
                                // display={['block', 'block', 'block', 'none']} 
                                w={'100%'} >
                                <Box position="relative"
                                    width="100%"
                                    paddingBottom="56.75%" overflow="hidden">

                                    <iframe
                                        style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%' }}

                                        src="https://www.youtube.com/embed/keGjP5ySqyg" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>

                                </Box>
                            </Box>
                        </VStack>

                    </HStack>



                    <HStack mb="15rem" mt="" spacing="6rem" >

                        <VStack w={[]} spacing={['3rem']} alignItems={'flex-start'}>
                            <Box display={['block', 'block', 'block', 'none']} w={'70%'} mb={'-2%'} mt={'-5%'}>
                                <LottieAnimation src={config.https.cdn + 'collaborate-animation-1.json'} style={{ height: '100px' }} />
                            </Box>

                            <Heading textAlign={['', '', '']} as="h1" fontSize="36px" color="white" fontWeight={'light'} lineHeight={'5rem'} >Join our community and collaborate on open source games and projects</Heading>
                            <Heading textAlign={['', '', '']} as="h2" size="md" color="gray.150" fontWeight={'light'} lineHeight={'3rem'}>Learning to code?  We can help you build your first game.  Simply join us on Discord.  Games are built using ReactJS and JavaScript.</Heading>

                            <HStack spacing="10rem" alignContent={'center'}>
                                <ChLink isExternal href={"https://github.com/acosgames"}>
                                    <Center>
                                        <Icon alignSelf={'center'} as={FaGithub} fontSize="64px" color="white" />
                                        <Heading ml="1rem" as="h3" size="lg" fontWeight="light" color="white" >
                                            GitHub
                                        </Heading>
                                    </Center>
                                </ChLink>
                                <ChLink isExternal href={"https://discord.gg/ydHkCcNgHD"}>
                                    <Center>
                                        <Icon alignSelf={'center'} as={FaDiscord} fontSize="64px" color={'white'} />
                                        <Heading ml="1rem" as="h3" size="lg" fontWeight="hairline" color={'white'}>Discord</Heading>
                                    </Center>
                                </ChLink>
                            </HStack>
                        </VStack>
                        <Box width={'60%'} display={['none', 'none', 'none', 'block']}>
                            <LottieAnimation src={config.https.cdn + 'collaborate-animation-1.json'} style={{ height: '100px' }} />
                        </Box>
                    </HStack>


                    {/* <Heading mb="0.5rem" as="h1" size="md" color="white" >Join our community</Heading> */}
                    {/* <Text as="h3" fontWeight={'light'} fontSize="sm" color="gray.175"></Text>
                    <Text as="h3" fontWeight={'light'} fontSize="sm" color="gray.175" pb="2rem"></Text> */}
                    {/* <Grid
                        width="100%"
                        gap={'2rem'}
                        gridTemplateColumns={['repeat(1, minmax(0, 1fr))', 'repeat(2, minmax(0, 1fr))']}
                        rowGap={'1rem'}
                        fontWeight='400'
                        justifyContent="flex-start"
                        alignItems={'flex-start'}>
                        <ChLink isExternal
                            // _hover={{  }} 
                            textDecoration={"none"}
                            href={'https://sdk.acos.games'}
                            p="2rem"
                            // height="4.5rem"
                            display="flex"
                            w="100%"
                            h="100%"
                            flexDir={"column"}
                            bgColor="gray.1100"
                            borderRadius="2rem"
                            color="gray.100"
                            _hover={{ bgColor: 'gray.800', textDecoration: 'none' }}
                            _active={{ bgColor: 'gray.600' }}
                            boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 8px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                            justifyContent="flex-start" alignItems={'flex-start'}>
                            <HStack pb="1rem" >
                                <Text fontSize="sm" display="flex" fontWeight="bold" >
                                    <Icon
                                        alignSelf={'center'}
                                        as={TiDocumentText}
                                        fontSize="md" />
                                    &nbsp;Documentation
                                </Text>
                            </HStack>
                            <Text>
                                Create your own browser game using JavaScript frontend and backend with automatic multiplayer driven by JSON. The platform supports realtime online turn-based games.  Focus on gameplay, let the platform handle everything else for free.
                            </Text>
                        </ChLink>

                        <Box p="2rem"
                            // height="4.5rem"
                            display="flex"
                            w="100%"
                            h="100%"
                            flexDir={"column"}
                            bgColor="gray.1100"
                            borderRadius="2rem"
                            color="gray.100"
                            _hover={{ bgColor: 'gray.800' }}
                            _active={{ bgColor: 'gray.600' }}
                            boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                            justifyContent="flex-start" alignItems={'flex-start'} >
                            <Link to="/dev">
                                <HStack pb="1rem">

                                    <Text fontSize="sm" display="flex" fontWeight="bold">
                                        <Icon alignSelf={'center'} as={FaDev} fontSize="md" />&nbsp;Developer Zone</Text>

                                </HStack>
                                <Text>
                                    Become an ACOS Developer by signing up with your Github account and joining our acosgames organizatoin.
                                </Text>
                            </Link>
                        </Box>
                        <ChLink isExternal href={'https://discord.gg/ydHkCcNgHD'} p="2rem"
                            display="flex"
                            w="100%"
                            h="100%"
                            flexDir={"column"}
                            bgColor="gray.1100"
                            borderRadius="2rem"
                            color="gray.100"
                            _hover={{ bgColor: 'gray.800' }}
                            _active={{ bgColor: 'gray.600' }}
                            boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                            justifyContent="flex-start" alignItems={'flex-start'}
                        >
                            <Text fontSize="sm" display="flex" fontWeight="bold">
                                <Icon alignSelf={'center'} as={FaDiscord} fontSize="md" />&nbsp;Discord</Text>
                            <Text>
                                Have a suggestion?  Come join us on Discord to discuss games, features, and more.
                            </Text>
                        </ChLink>
                        <ChLink isExternal
                            textDecoration={"none"}
                            href={'https://github.com/acosgames'}
                            p="2rem"
                            display="flex"
                            w="100%"
                            h="100%"
                            flexDir={"column"}
                            bgColor="gray.1100"
                            borderRadius="2rem"
                            color="gray.100"
                            _hover={{ bgColor: 'gray.800', textDecoration: 'none' }}
                            _active={{ bgColor: 'gray.600' }}
                            boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                            justifyContent="flex-start" alignItems={'flex-start'}>
                            <Text fontSize="sm" display="flex" fontWeight="bold">
                                <Icon alignSelf={'center'} as={FaGithub} fontSize="md" />
                                &nbsp;GitHub
                            </Text>
                            <Text>
                                Many of our games are open source, including the Simulator, check out the code on GitHub.
                            </Text>
                        </ChLink>

                    </Grid> */}
                </VStack >
                {/* <Divider /> */}
                {/* <VStack align="left" justify={"left"}>
                    <Heading as="h1" size="md" color="white">Latest Blogs</Heading>
                    <Heading as="h3" size="sm" pb="2rem" fontWeight="light" color="gray.175">Read the latest news for ACOS.games</Heading>
                    <HStack>

                        <HStack w={['100%']} spacing="1rem"
                            p="2rem"
                            display="flex"
                            flexDir={"row"}
                            bgColor="gray.800"
                            borderRadius="2rem"
                            color="gray.100"
                            _hover={{ bgColor: 'gray.800', textDecoration: 'none' }}
                            _active={{ bgColor: 'gray.1000' }}
                            boxShadow={`inset 0 1px 1px 0 rgb(255 255 255 / 10%), inset 0 2px 2px 0 rgb(0 0 0 / 18%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
                            justifyContent="flex-start" alignItems={'flex-start'}
                        >

                            <Box position={'relative'}>
                                <Image
                                    borderRadius={'50%'}
                                    w={['5rem']}
                                    minW={['5rem']}
                                    h={['5rem']}
                                    minH={['5rem']}
                                    alt={'ACOS Logo'}
                                    src={'https://miro.medium.com/max/700/0*Jmxu0QcJ9STs3sji.png'}
                                    pb="0.3rem"
                                // fallbackSrc={config.https.cdn + 'placeholder.png'}
                                />

                            </Box>
                            <VStack justifyContent={'flex-start'} alignItems="flex-start">
                                <Text as="span" fontWeight={'light'} fontSize="2xs" display={'block'} lineHeight={'1rem'} color="gray.150">March 29, 2022</Text>

                                <ChLink isExternal textDecoration={"none"} href={'https://medium.com/@JoeOfTex/acos-web-developers-want-to-build-games-too-so-i-made-an-online-platform-to-make-it-easy-d225974fa2d8'} >
                                    <Heading as="h2" fontWeight="bold" fontSize="sm" color="white">Build web games using serverless code, persistent JSON state, and any JavaScript browser framework</Heading>

                                </ChLink>
                                <Text fontSize="xs">
                                    ACOS.games is a new type of serverless platform for simplifying the full-stack development of real-time, turn-based, competitive games.
                                </Text>
                                <Text fontSize="xs">
                                    I abstracted away all the networking, hosting, deployment, global rankings, and much more. ACOS platform has been finely crafted to give developers full-control of their game development and publish to the platform at scale and zero-cost.
                                </Text>
                                <ChLink isExternal href={'https://medium.com/@JoeOfTex/acos-web-developers-want-to-build-games-too-so-i-made-an-online-platform-to-make-it-easy-d225974fa2d8'}>
                                    <Text as="span" fontSize="xs">
                                        Read more
                                    </Text>
                                </ChLink>
                            </VStack>

                        </HStack>
                    </HStack>
                </VStack >*/}
            </VStack >
        )
    }
}

export default (fs.connect(['gameLists'])(GameList));