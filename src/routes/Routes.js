import {
    Route,
    useHistory,
    Switch
} from "react-router-dom";

import ProtectedRoute from '../components/login/ProtectedRoute';

import MainPage from '../components/MainPage';
import SocialLogin from '../components/login/SocialLogin';
import DevLogin from '../components/dev/DevLogin';
import CreateDisplayName from "../components/login/CreateDisplayName";
import DevMyGames from "../components/dev/DevMyGames";
import DevCreateGame from "../components/dev/DevCreateGame";
import DevManageGame from "../components/dev/DevManageGame";

import GamePanel from '../components/games/GamePanel';
import GameInfo from "../components/games/GameInfo";
import LoginSuccess from '../components/login/LoginSuccess';

import RoutesDev from './RoutesDev';
import fs from 'flatstore';
// import history from "./actions/history";
import GameScreen from "../components/games/GameScreen";
import { Box } from "@chakra-ui/react";

var Routes = () => {

    const history = useHistory();
    fs.set('history', history);


    const refPath = history.location.pathname;
    if (refPath.indexOf("/login") == -1) {
        let curPath = localStorage.getItem("refPath");
        console.log("current", curPath);
        localStorage.setItem('refPath', refPath);
        console.log("next", refPath);
    }

    let iframe = fs.get('iframe');

    return (
        <Box display="inline-block" width="100%" pl={iframe ? 0 : [3, 4, 12]} pr={iframe ? 0 : [3, 4, 12]} pt={6}>
            <Switch>
                <ProtectedRoute
                    exact
                    path="/player/create"
                    verify={(user) => !user.displayname}
                    component={CreateDisplayName}
                />
                <Route
                    exact
                    path="/"
                    component={MainPage}
                />
                <Route
                    exact
                    path="/g"
                    component={MainPage}
                />

                <Route

                    path="/login/success"
                    component={LoginSuccess}
                />

                <Route

                    path="/login"
                    component={SocialLogin}
                />

                <Route
                    exact
                    path="/dev/login"
                    component={DevLogin}
                />

                <ProtectedRoute

                    path="/dev*"
                    component={RoutesDev}
                    verify={
                        (user) => {
                            return user.isdev || user.github
                        }}
                    redirectTo="/dev/login"
                />

                {/* <Route
                exact
                path="/dev/login"
                component={DevLogin}
            /> */}
                {/* <ProtectedRoute

                path="/dev/game/create"
                component={DevCreateGame}
                verify={(user) => true}
                redirectTo="/dev/login"
            />
            <ProtectedRoute

                path="/dev/game/:gameid"
                component={DevManageGame}
                verify={(user) => 'github' in user}
                redirectTo="/dev/login"
            />
            <ProtectedRoute
                exact
                path="/dev/:id?"
                component={DevMyGames}
                verify={(user) => 'github' in user}
                redirectTo="/dev/login"
            /> */}

                <Route
                    exact
                    path="/games"
                    component={MainPage}
                />
            </Switch>
        </Box>
    )
}

export default Routes;