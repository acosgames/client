
import { Box, Grid, HStack, Text, VStack, Wrap } from "@chakra-ui/react";
import { updateGameField } from "../../actions/devgame";
import FSGGroup from "../widgets/inputs/FSGGroup";
import FSGNumberInput from "../widgets/inputs/FSGNumberInput";
import FSGColorPicker from "../widgets/inputs/FSGColorPicker";
import { useEffect } from "react";


import schema from 'shared/model/schema.json';
import FSGTextInput from "../widgets/inputs/FSGTextInput";

import fs from 'flatstore';

function DevManageGameTeams(props) {

    const rulesGame = schema['update-game_info'];


    const onChangeByName = (name, value) => {
        updateGameField(name, value, 'update-game_info', 'devgame', 'devgameerror');
    }

    useEffect(() => {

    }, [])

    const renderTeamDefinitions = () => {

        let teamDefs = [];
        if (!props?.devgame?.teams)
            return <></>

        let index = 0;
        let maxteams = props?.devgame?.maxteams || 0;

        for (let i = 0; i < maxteams; i++) {
            let team = props.devgame.teams[i];
            teamDefs.push(<DevGameTeamDefinition isOdd={((index % 2) == 1)} key={'devgameteam-' + (index++)} devgame={props.devgame} team={team} />)
        }
        return teamDefs;
    }

    let prevMaxTeams = props.devgame.maxteams;

    useEffect(() => {

        let maxteams = props.devgame.maxteams;
        if (prevMaxTeams != maxteams) {

            if (maxteams < prevMaxTeams) {
                let teams = props.devgame.teams.slide(0, maxteams);
                let devgame = props.devgame;
                devgame.teams = teams;
                fs.set('devgame', devgame);
                fs.set('devgameteams', teams);
            } else if (maxteams > prevMaxTeams) {
                let lastTeam = props.devgame.teams[props.devgame.teams.length - 1];
                let devgame = props.devgame;


                let diff = maxteams - prevMaxTeams;
                for (let i = 0; i < diff; i++) {
                    let copy = JSON.stringify(JSON.parse(lastTeam));
                    copy.team_slug = 'team_' + maxteams + (i + 1);
                    devgame.teams.push(copy);
                }

                fs.set('devgame', devgame);
                fs.set('devgameteams', teams);
            }

        }
    })

    return (
        <FSGGroup hfontSize="md" title="Team(s) Configuration">
            <VStack w="100%">
                <HStack w="100%" pb="3rem">

                    <FSGNumberInput
                        type="number"
                        name="minteams"
                        id="minteams"
                        title="Min Teams"
                        min="1"
                        max="100"
                        required={rulesGame['minteams'].required}
                        value={props.devgame.minteams || '0'}
                        onChange={(e) => {
                            let count = Number.parseInt(e);
                            if (count > props.devgame.maxteams) {
                                onChangeByName('minteams', props.devgame.maxteams)
                            }
                            else if (count < 0) {
                                onChangeByName('minteams', 0)
                            }
                            else {
                                onChangeByName('minteams', parseInt(e))
                            }

                            // onChangeByName('minteams', parseInt(e))
                        }} />

                    <FSGNumberInput
                        type="number"
                        name="maxteams"
                        id="maxteams"
                        title="Max Teams"
                        min="1"
                        max="100"
                        required={rulesGame['maxteams'].required}
                        value={props.devgame.maxteams || '0'}
                        onChange={(e) => {
                            // onChangeByName('maxteams', parseInt(e))
                            let count = Number.parseInt(e);
                            if (count < props.devgame.minteams) {
                                onChangeByName('maxteams', props.devgame.minteams)
                            }
                            else if (count < 0) {
                                onChangeByName('maxteams', 0)
                            }
                            else {
                                onChangeByName('maxteams', parseInt(e))
                            }

                        }} />
                </HStack>
                <Box width="100%" >
                    {renderTeamDefinitions()}
                </Box>
                {/* <DevGameTeamDefinition devgame={} /> */}

            </VStack>

        </FSGGroup>
    )
}

function DevGameTeamDefinition(props) {

    const rulesTeam = schema['update-game_team'];


    const onChangeByName = (name, value) => {

        let teams = props.devgame.teams;
        let teamid = -1;
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].team_slug == props.team.team_slug) {
                teamid = i;
                break;
            }
        }

        if (teamid == -1)
            return;

        updateGameField(name, value, 'update-game_team', 'devgameteams>' + teamid, 'devgameerror');
    }

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        let teams = props.devgame.teams;
        let teamid = -1;
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].team_slug == props.team.team_slug) {
                teamid = i;
                break;
            }
        }

        if (teamid == -1)
            return;

        updateGameField(name, value, 'update-game_team', 'devgameteams>' + teamid, 'devgameerror');
    }

    return (
        <Box pt="2rem" pb="2rem">
            <Text as="h5" color={'white'}>{props?.team?.team_name}</Text>
            <Grid templateColumns='80% 20%' gap={'3rem'} bgColor={props.isOdd ? 'gray.900' : ''} w="100%" borderTop={'1px solid'} borderTopColor={'gray.600'}>
                {/* <HStack    > */}

                <Wrap pt="2rem" pb="2rem" width="100%" px="2rem">
                    <HStack w="100%">


                        <FSGTextInput
                            type="text"
                            name="team_name"
                            id="team_name"
                            title="Team Name"
                            maxLength="64"
                            required={rulesTeam['team_name'].required}
                            value={props.team.team_name || ''}
                            onChange={inputChange}
                        />

                        <FSGTextInput
                            type="text"
                            name="team_slug"
                            id="team_slug"
                            title="Team Slug"
                            maxLength="32"
                            required={rulesTeam['team_slug'].required}
                            value={props.team.team_slug || ''}
                            onChange={inputChange}
                        />
                    </HStack>
                    <HStack w="100%">

                        <FSGNumberInput
                            type="number"
                            name="minplayers"
                            id="minplayers"
                            title="Min Players"
                            min="1"
                            max="100"
                            required={rulesTeam['minplayers'].required}
                            value={props.team.minplayers || '1'}
                            onChange={(e) => {
                                let count = Number.parseInt(e);
                                if (count > props.team.maxplayers) {
                                    onChangeByName('minplayers', props.team.maxplayers)
                                }
                                else if (count < 0) {
                                    onChangeByName('minplayers', 0)
                                }
                                else {
                                    onChangeByName('minplayers', parseInt(e))
                                }
                                // onChangeByName('minplayers', parseInt(e))
                            }} />
                        <FSGNumberInput
                            type="number"
                            name="maxplayers"
                            id="maxplayers"
                            title="Max Players"
                            min="1"
                            max="100"
                            required={rulesTeam['maxplayers'].required}
                            value={props.team.maxplayers || '1'}
                            onChange={(e) => {
                                let count = Number.parseInt(e);
                                if (count < props.team.minplayers) {
                                    onChangeByName('maxplayers', props.team.minplayers)
                                }
                                else if (count < 0) {
                                    onChangeByName('maxplayers', 0)
                                }
                                else {
                                    onChangeByName('maxplayers', parseInt(e))
                                }
                                // onChangeByName('maxplayers', parseInt(e))
                            }} />
                    </HStack>
                </Wrap>
                <Box pt="3rem" pb="3rem">
                    <FSGColorPicker
                        type="color"
                        name="color"
                        id="color"
                        height="100%"
                        width="3rem"
                        fontSize="xxs"
                        //title="Team Color"
                        required={rulesTeam['color'].required}
                        value={props.team.color || '#f00'}
                        onChange={(color) => {
                            onChangeByName('color', color)
                        }}
                    />
                </Box>
                {/* </HStack> */}
            </Grid>
        </Box>
    )
}

DevGameTeamDefinition = fs.connect(['devgameteams'])(DevGameTeamDefinition);

export default fs.connect([])(DevManageGameTeams);
