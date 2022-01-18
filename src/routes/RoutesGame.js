import {
    Route,
    useHistory,
    Switch
} from "react-router-dom";


// import history from "./actions/history";
import fs from 'flatstore';

// import GameInfo from '../components/games/GameInfo';
// import GameScreen from '../components/games/GameScreen';
import { useEffect } from "react";
import GameInfo2 from "../components/games/GameInfo/GameInfo2";


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

        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }, [])



    return (
        <>
            <Switch>


                <Route
                    exact
                    path="/g/:game_slug"
                    component={GameInfo2}
                />
                <Route
                    exact
                    path="/g/:game_slug/:room_slug"
                    component={GameInfo2}
                />
                <Route
                    exact
                    path="/g/:game_slug/:mode/:room_slug"
                    component={GameInfo2}
                />
            </Switch>
        </>
    )
}

export default RoutesGame;