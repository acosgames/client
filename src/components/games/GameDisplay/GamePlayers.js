import { VStack } from "@chakra-ui/react";


function GamePlayers(props) {

    let gamepanel = getPrimaryGamePanel();
    if (!gamepanel)
        return <></>

    let gamestate = gamepanel.gamestate;

    let state = gamestate.state;
    let players = gamestate.players;
    let teams = gamestate.teams;
    let next = gamestate.nexxt;



    let elements = [];

    const renderTeam = (teamid) => {

        let teamElems = [];
        for (const shortid in teams[teamid]) {

            return (
                <></>
            )

            teamElems.push(renderPlayer(shortid));
        }
    }

    const renderPlayer = (shortid) => {
        let player = players[shortid];
    }

    const renderPlayers = () => {
        if (typeof teams !== 'undefined') {
            for (const teamid in teams) {

            }
        }
        else {
            for (const shortid in players) {
                groups.push([players[shortid]]);
            }
        }
    }




    return (
        <VStack>

        </VStack>
    )
}


function GameTimer(props) {

}

export default GamePlayers;
