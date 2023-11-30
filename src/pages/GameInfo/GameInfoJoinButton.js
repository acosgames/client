import { Flex, Box, Text, Button, HStack, Icon, Menu, MenuButton, MenuList, MenuItem, Link, Tooltip, VStack, useDisclosure, Image, IconButton, Portal } from '@chakra-ui/react'
import { FaCaretDown, FaPlay, AiTwotoneExperiment, IoSunny } from '@react-icons';
import "./GamePage.scss";
import fs from 'flatstore';
import { useEffect, useRef } from 'react';

import { getUser, login } from '../../actions/person';
import { joinGame } from "../../actions/game";
import { getLastJoinType, setLastJoinType } from '../../actions/room';
import { validateLogin } from '../../actions/connection';

import config from '../../config'
import RatingText from 'shared/util/ratingtext';

import { useOnScreen, useVisibility2 } from '../../layout/Hooks';


fs.set('isCreateDisplayName', false);

function GameInfoJoinButton(props) {

    let user = fs.get('user');
    let game = fs.get('game');
    // let player_stat = fs.get('player_stats/' + game.game_slug);

    let [player_stat] = fs.useWatch('player_stats/' + game.game_slug)
    // const ref = useRef(null);
    // const [isVisible, currentElement] = useVisibility2();
    const handleJoin = async () => {
        setLastJoinType('rank');

        if (!(await validateLogin()))
            return;

        //let game_slug = props.match.params.game_slug;
        let game = fs.get('game');
        if (!game)
            return

        joinGame(game);
    }

    const handleJoinBeta = async () => {

        setLastJoinType('experimental');

        if (!(await validateLogin()))
            return;
        //let game_slug = props.match.params.game_slug;
        let game = fs.get('game');
        if (!game)
            return

        joinGame(game, true);
    }

    useEffect(() => {
        // if (!props.justCreatedName)
        //     return;

        // let lastJoin = getLastJoinType();
        // switch (lastJoin) {
        //     case 'rank':
        //         handleJoin();
        //         break;
        //     case 'experimental':
        //         handleJoinBeta();
        //         break;
        //     // default:
        //     //     handleJoin();
        //     //     break;
        // }
    })


    // let playerGameStats = player_stats[game.game_slug];

    let isValidUser = user && user.shortid;
    let hasRankLeaderboard = game.maxplayers > 1;

    let version = props.version || 0;
    let latest_version = props.latest_version || 0;
    let hasExtra = version < latest_version;

    let myrating = props.rating;
    // myrating = 1200;
    let myplayed = props.played;
    // myplayed = 12;

    let rating = myplayed >= 10 ? '' + myrating + '' : ' ';
    let ratingTxt = myplayed >= 10 ? RatingText.ratingToRank(rating) : 'UNRANKED';
    ratingTxt = ratingTxt.toUpperCase();

    // if (myplayed >= 10 && playerGameStats.ranking == 1)
    //     ratingTxt = 'YOU ARE KING';

    hasExtra = true;

    // if (!isVisible) {
    //     return (
    //         <>
    //             <Portal >
    //                 <Box w={["100%", "calc(100% - 27rem)", "calc(100% - 30rem)"]} h='100%' position="relative">
    //                     <Box
    //                         position="fixed"
    //                         zIndex={1000}
    //                         bottom="1rem"
    //                         left={['50%']}
    //                         transform='translate(-50%, 0)'
    //                     >
    //                         <JoinButton />
    //                     </Box>
    //                 </Box>
    //             </Portal>
    //             <Box h="6rem" ref={currentElement}></Box>
    //         </>
    //     )
    // }
    return (
        <Box>
            <JoinButton handleJoin={handleJoin} />
        </Box>
    )

    return (
        <VStack
            w="full"
            spacing="1rem"
        //pt={hasRankLeaderboard ? '0' : '1rem'}
        //p="1rem"
        //borderRadius="2rem"
        //bgColor="gray.900"
        //boxShadow={`inset 0 1px 2px 0 rgb(255 255 255 / 20%), inset 0 2px 2px 0 rgb(0 0 0 / 28%), inset 0 0 3px 5px rgb(0 0 0 / 5%), 2px 2px 4px 0 rgb(0 0 0 / 25%)`}
        >
            <Text pt={'0.5rem'} as="span" fontWeight={'light'} fontSize="xs" display={game.queueCount > 0 ? 'inline-block' : 'none'} color={'yellow.100'}>
                <strong>{game.queueCount}</strong> player(s) waiting
            </Text>
        </VStack >

    )
}

function JoinButton({ handleJoin }) {
    return (
        <Button
            role="group"
            onClick={handleJoin}
            // ref={ref}
            transform={['skewX(-15deg)']}
            className="cta"
            // h={["5rem", "5rem", "5rem", "6rem"]}
            zIndex={2}
            bgColor="gray.800"
            mt="1rem"
            // borderBottom="2px solid"
            // borderRight="2px solid"
            // borderBottomColor={'gray.600'}
            // borderRightColor={'gray.600'}
            // filter="drop-shadow(0px 0px 20px var(--chakra-colors-brand-300)) "
            boxShadow='3px 3px 0 var(--chakra-colors-brand-300)'
            px="3rem"
            pr="2rem"
            py="3rem"
            _hover={{
                filter: "none",
                // bgColor: 'gray.875',
                boxShadow: '7px 7px 0 var(--chakra-colors-brand-600)'
            }}
            _focus={{
                filter: '',
                // bgColor: 'gray.950',
                boxShadow: '10px 7px 0 var(--chakra-colors-brand-300)'
            }}
        >
            <VStack spacing="0" alignItems={'flex-start'}>
                <Text as="span" textAlign={'left'} fontSize={["1.6rem", "1.6rem", "1.6rem", "2rem"]}>Play Now</Text>
                <Text color="brand.300" _groupHover={{ color: 'brand.600' }} _groupFocus={{ color: 'brand.300' }} as="p" pl="0.5rem" textAlign={'left'} fontWeight={'bold'} fontSize="1.4rem">Ranked Match</Text>
            </VStack>
            <Text className="arrows" as="span" display="inline-block" >
                <svg width="40px" height="25.6px" viewBox="0 0 66 43" version="1.1" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink">
                    <g id="arrow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <path className="one" d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                        <path className="two" d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z" fill="#FFFFFF"></path>
                        <path className="three" d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z" fill="#FFFFFF"></path>
                    </g>
                </svg>
            </Text>
        </Button>
    )
}

export default GameInfoJoinButton;