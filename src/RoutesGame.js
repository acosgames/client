import {
    Route,
    useHistory,
    Switch
} from "react-router-dom";


// import history from "./actions/history";
import fs from 'flatstore';

import GameInfo from './components/games/GameInfo';
import GameScreen from './components/games/GameScreen';


var RoutesGame = () => {

    const history = useHistory();

    fs.set('history', history);


    return (
        <>
            <Switch>


                <Route
                    exact
                    path="/g/:game_slug"
                    component={GameInfo}
                />
                <Route
                    exact
                    path="/g/:game_slug/:room_slug"
                    component={GameScreen}
                />
                <Route
                    exact
                    path="/g/:game_slug/:mode/:room_slug"
                    component={GameScreen}
                />
            </Switch>
        </>
    )
}

export default RoutesGame;