
import { VStack } from "@chakra-ui/react";
import { updateGameField } from "../../actions/devgame";
import FSGGroup from "../widgets/inputs/FSGGroup";
import FSGNumberInput from "../widgets/inputs/FSGNumberInput";
import FSGColorPicker from "../widgets/inputs/FSGColorPicker";
import { useEffect } from "react";


import schema from 'shared/model/schema.json';
import FSGTextInput from "../widgets/inputs/FSGTextInput";

function DevManageGameTeams(props) {

    const rulesGame = schema['update-game_info'];


    const onChangeByName = (name, value) => {
        updateGameField(name, value, 'update-game_info', 'devgame/' + props.team_slug, 'devgameerror');
    }

    useEffect(() => {

    }, [])


    return (
        <FSGGroup hfontSize="md" title="Team(s) Configuration">
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
                    onChangeByName('maxteams', parseInt(e))
                }} />
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
                    onChangeByName('minteams', parseInt(e))
                }} />

            {/* <DevGameTeamDefinition devgame={} /> */}

        </FSGGroup>
    )
}

function DevGameTeamDefinition(props) {

    const rulesTeam = schema['update-game_team'];

    const onChangeByName = (name, value) => {
        updateGameField(name, value, 'update-game_team', 'devgame/' + props.team_slug, 'devgameerror');
    }

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        updateGameField(name, value, 'update-game_team', 'devgame/' + props.team_slug, 'devgameerror');
    }

    return (
        <VStack>

            <FSGTextInput
                type="text"
                name="team_slug"
                id="team_slug"
                title="Team Slug"
                maxLength="32"
                required={rulesTeam['team_slug'].required}
                value={props.team_slug || ''}
                onChange={inputChange}
            />

            <FSGTextInput
                type="text"
                name="team_name"
                id="team_name"
                title="Team Name"
                maxLength="64"
                required={rulesTeam['team_name'].required}
                value={props.team_name || ''}
                onChange={inputChange}
            />


            <FSGNumberInput
                type="number"
                name="maxplayers"
                id="maxplayers"
                title="Max Players"
                min="1"
                max="100"
                required={rulesTeam['maxplayers'].required}
                value={props.devgame.maxplayers || '2'}
                onChange={(e) => {
                    onChangeByName('maxplayers', parseInt(e))
                }} />
            <FSGNumberInput
                type="number"
                name="minplayers"
                id="minplayers"
                title="Min Players"
                min="1"
                max="100"
                required={rulesTeam['minplayers'].required}
                value={props.devgame.minplayers || '2'}
                onChange={(e) => {
                    onChangeByName('minplayers', parseInt(e))
                }} />


            <FSGColorPicker
                type="color"
                name="color"
                id="color"
                title="Team Color"
                required={rulesTeam['color'].required}
                value={'#f00'}
                onChange={(color) => {
                    onChangeByName('minplayers', parseInt(e))
                }}
            />
        </VStack>
    )
}

export default DevManageGameTeams;
