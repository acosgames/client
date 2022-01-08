import {
    Route,
    useHistory,
    Switch
} from "react-router-dom";


// import history from "./actions/history";
import fs from 'flatstore';

import GameInfo from '../components/games/GameInfo';
import GameScreen from '../components/games/GameScreen';
import { useEffect } from "react";


var RoutesGame = () => {

    const history = useHistory();

    const refPath = history.location.pathname;
    if (refPath.indexOf("/login") == -1) {
        let curPath = localStorage.getItem("refPath");
        console.log("current", curPath);
        localStorage.setItem('refPath', refPath);
        console.log("next", refPath);
    }



    useEffect(() => {
        fs.set('history', history);

    }, [])

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