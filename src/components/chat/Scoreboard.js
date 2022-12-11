import { Box, chakra, HStack, Image, Text, VStack } from '@chakra-ui/react';
import fs from 'flatstore'
import { useEffect, useRef } from 'react';
import { getPrimaryGamePanel, isNextTeam, isUserNext } from '../../actions/room';
import Timeleft from '../games/GameDisplay/Timeleft';

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import ratingtext from 'shared/util/ratingtext';
import config from '../../config'


const ModeFromID = [
    'experimental', 'rank', 'public', 'private'
]
const ModeFromName = {
    'experimental': 0,
    'rank': 1,
    'public': 2,
    'private': 3
}

function getGameModeID(name) {
    return ModeFromName[name];
}

function getGameModeName(id) {
    return ModeFromID[id];
}

function Scoreboard(props) {
    let [scoreboardExpanded] = fs.useWatch('scoreboardExpanded');
    let [chatExpanded] = fs.useWatch('chatExpanded');
    let [chatViewRef] = fs.useWatch('chatViewRef');

    let scoreboardRef = useRef();
    let [layoutRightMode] = fs.useWatch('layoutRightMode');

    useEffect(() => {
        fs.set('scoreboardRef', scoreboardRef);
    }, [])
    useEffect(() => {

        setTimeout(() => {

            if (props.layoutMode == 'right') {
                if (layoutRightMode != 'flex') {
                    if (scoreboardRef?.current?.clientHeight > 0) {
                        fs.set('layoutRightMode', 'flex');
                    }
                    else if (layoutRightMode != 'none') {
                        fs.set('layoutRightMode', 'none');
                    }
                }

            }

        }, 10)
    })


    let [primaryGamePanelId] = fs.useWatch('primaryGamePanel');
    if (typeof primaryGamePanelId === 'undefined' || primaryGamePanelId == null)
        return <></>
    let gamepanel = getPrimaryGamePanel();
    let mode = Number.isInteger(gamepanel.room.mode) ? getGameModeName(gamepanel.room.mode) : gamepanel.room.mode;


    let layoutFlex = '1';
    let layoutHeight = 'auto';

    if (props.layoutMode == 'right') {

    }
    else if (props.layoutMode == 'bottom') {

    }

    if (scoreboardExpanded && chatExpanded) {
        let height = chatViewRef?.current?.clientHeight || window.innerHeight;
        if (height < 300) {
            layoutHeight = '50%';
            layoutFlex = '0';
        } else {
            layoutFlex = '1';
            layoutHeight = 'auto';
        }
    } else if (scoreboardExpanded) {
        layoutFlex = '1';
        layoutHeight = 'auto';
    } else if (!scoreboardExpanded) {
        layoutFlex = '';
        layoutHeight = 'auto';
    }



    return (
        // <Accordion defaultIndex={[0, 1]} allowMultiple w="100%">
        <VStack spacing="0" w="100%" height={layoutHeight} flex={layoutFlex} ref={scoreboardRef}>
            <ScoreboardTimer isBottomLayout={props.layoutMode == 'bottom'} />
            <HStack px="0.25rem" spacing="1rem" bgColor="gray.1000" w="100%" height={scoreboardExpanded ? "3rem" : '0'} overflow="hidden" justifyContent={'center'} alignItems='center'>
                <Text as="h5" fontWeight={'bold'} color={'white'} p="0" m="0" lineHeight="1.2rem" height="1.2rem" overflow="hidden">{gamepanel.room.name || gamepanel.room.game_slug}</Text>
                <Text as="h5" fontWeight={'bold'} color={'gray.150'} fontSize={'2xs'} textTransform={'uppercase'}>{mode}</Text>
            </HStack>
            <ScoreboardBody expanded={scoreboardExpanded} id={primaryGamePanelId} />
        </VStack>
    )
}


function ScoreboardTimer(props) {
    let [primaryGamePanelId] = fs.useWatch('primaryGamePanel');

    if (typeof primaryGamePanelId === 'undefined' || primaryGamePanelId == null)
        return <></>

    let gamepanel = getPrimaryGamePanel();
    let isNext = isUserNext(gamepanel);

    return (
        <VStack
            bgColor="gray.900"
            width={props.isBottomLayout ? '100%' : ['24.0rem', '24rem', '28.0rem']}
            height={['4rem']}
            spacing="0"
            justifyContent={'center'}
            alignItems="center"
            alignContent={'center'}
            position="relative"
            onClick={() => {

            }}
        >
            <Timeleft id={primaryGamePanelId} />

        </VStack>
    )
}

function ScoreboardPlayerStats(props) {
    let player = props.player;
    let rank = player.rank + "";
    // if (rank.length < 2) {
    //     rank = "0" + rank;
    // }

    let user = fs.get('user');
    let ratingTxt = ratingtext.ratingToRank(Number.parseInt(player.rating));
    let ratingImageFile = ratingTxt.replace(/ /ig, '');

    return (
        <HStack bgColor="gray.1000" width="100%" justifyContent={'center'} alignItems={'center'} fontWeight={props.isNext ? 'bold' : ''}
            borderRight={'0.5rem solid ' + props?.team?.color}
            borderLeft={'0.5rem solid'}
            borderLeftColor={props.isNext ? 'gray.100' : 'transparent'}>
            {/* <Text w='3rem' align="center" fontSize="xxs" color="gray.100"></Text> */}
            <HStack width="3rem" justifyContent={'center'} alignItems={'center'}>
                <Image
                    src={`${config.https.cdn}icons/ranks/${ratingImageFile}.png`}
                    width={'2.4rem'}
                    height={'auto'}
                />
            </HStack>
            <Text w={props.team ? '13rem' : '13rem'} align="left" fontSize="xxs" color={player.ingame === false ? 'gray.175' : "white"}>{player.name}</Text>
            <Text w='6rem' align="center" fontSize="xxs" color={player.ingame === false ? 'gray.175' : "gray.100"}>{player.score}</Text>
        </HStack>
    )
}


function ScoreboardBody(props) {
    const scrollRef = useRef();
    let [gamepanel] = fs.useWatch('gamepanel/' + props.id);
    if (!gamepanel)
        return <></>



    let gamestate = gamepanel?.gamestate;
    let players = gamestate?.players;
    let room = gamepanel?.room;

    if (!players || !room)
        return <></>




    let playerElems = [];


    let teams = gamestate?.teams || {};
    let teamCount = Object.keys(teams).length;
    let teamElems = [];


    let isTeamNext = isNextTeam(gamepanel);
    if (teamCount > 1) {

        for (const teamid in teams) {
            let team = teams[teamid];

            // teamElems.push(
            //     <HStack bgColor="gray.1000" spacing="0" width="100%" justifyContent={'center'} alignItems={'center'} pt="1rem"
            //         key={'team-' + team.name}
            //         borderRight={'0.5rem solid ' + team.color}
            //         borderLeft={'0.5rem solid'}
            //         borderLeftColor={isTeamNext ? 'gray.300' : 'transparent'}
            //     >
            //         <Text as="span" w='4rem' align="center" fontSize="xxs" fontWeight={'bold'} color={'gray.125'}>{team.score}</Text>
            //         <Text as="span" w='15rem' align="left" fontSize="sm" fontWeight={'bold'} color={'gray.125'}>{team.name}</Text>
            //         <Text as="span" w='4rem' align="left" fontSize="xs" fontWeight={'bold'} color={'gray.125'}></Text>
            //     </HStack>
            // )
            teamElems.push(
                <HStack bgColor="gray.1000" spacing="0" width="100%" justifyContent={'center'} alignItems={'center'} key={'teamplayerheader-' + team.name} borderRight={'0.5rem solid ' + team.color}
                    borderLeft={'0.5rem solid'}
                    borderLeftColor={isTeamNext ? 'gray.500' : 'transparent'}
                >
                    <Text as="span" w='4rem' align="center" fontSize="sm" fontWeight={'bold'} color={'gray.125'}>{team.score}</Text>
                    <Text as="span" w='13rem' align="left" fontSize="sm" fontWeight={'bold'} color={'gray.125'}>{team.name}</Text>
                    <Text as="span" w='6rem' align="center" fontSize="3xs" color="gray.500">Score</Text>
                </HStack>
            )
            let playersSorted = [];
            for (const id of team.players) {
                playersSorted.push(players[id]);
            }

            playersSorted.sort((a, b) => {
                if (a.rank != b.rank)
                    return b.rank - a.rank;
                if (a.score != b.score)
                    return b.score - a.score;
                return a.name.localeCompare(b.name);
            })
            for (const player of playersSorted) {
                // let player = team.players[id];
                let isNext = isUserNext(gamepanel, player.id);

                teamElems.push(<ScoreboardPlayerStats isNext={isNext} player={player} key={"player-" + player.name} team={team} />);
            }
            teamElems.push(<Box w="100%" bgColor="gray.1000" key={'teamspacer-' + team.name} pb="1rem" borderRight={'0.5rem solid ' + team.color}
                borderLeft={'0.5rem solid'}
                borderLeftColor={isTeamNext ? 'gray.500' : 'transparent'}
            ></Box>)
            teamElems.push(<Box w="100%" bgColor="gray.900" key={'teamspacer2-' + team.name} pb="0.5rem"></Box>)
        }

        teamElems.pop();
    } else {
        teamElems.push(
            <HStack spacing="0" width="100%" justifyContent={'center'} alignItems={'center'} key={'playerheader'}>
                <Text as="span" w='4rem' align="center" fontSize="3xs" color="gray.500">#</Text>
                <Text as="span" w='13rem' align="left" fontSize="3xs" color="gray.500">Name</Text>
                <Text as="span" w='6rem' align="center" fontSize="3xs" color="gray.500">Score</Text>
            </HStack>
        );

        let playersSorted = [];
        for (const id in players) {
            playersSorted.push(players[id]);
        }

        playersSorted.sort((a, b) => {
            if (a.rank != b.rank)
                return b.rank - a.rank;
            if (a.score != b.score)
                return b.score - a.score;
            return a.name.localeCompare(b.name);
        })

        for (const player of playersSorted) {
            let isNext = isUserNext(gamepanel, player.id);
            teamElems.push(<ScoreboardPlayerStats isNext={isNext} player={player} key={"player-" + player.name} />);
        }

    }
    const ChakraSimpleBar = chakra(SimpleBar)


    return (
        <VStack w="100%" spacing="0" justifyContent={'center'} alignItems="center" height={props.expanded ? "" : '0'} boxSizing='border-box' overflow='hidden'>

            <ChakraSimpleBar
                boxSizing='border-box'
                style={{
                    width: '100%',
                    height: 'auto', flex: '1', overflow: 'hidden scroll', boxSizing: 'border-box',
                }} scrollableNodeProps={{ ref: scrollRef }}>

                <VStack
                    className="chat-message-panel"
                    // bgColor="gray.700"
                    // borderRadius="2rem"
                    height="100%"

                    width="100%"
                    spacing={'0'}

                    justifyContent={'flex-end'} >


                    {teamElems}
                </VStack>
            </ChakraSimpleBar>
        </VStack>
    )
}

export default Scoreboard;