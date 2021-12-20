import {
    Route,
    useHistory,
    Switch
} from "react-router-dom";

import ProtectedRoute from './components/login/ProtectedRoute';

import MainPage from './components/MainPage';
import SocialLogin from './components/login/SocialLogin';
import DevLogin from './components/dev/DevLogin';
import CreateDisplayName from "./components/login/CreateDisplayName";
import DevMyGames from "./components/dev/DevMyGames";
import DevCreateGame from "./components/dev/DevCreateGame";
import DevManageGame from "./components/dev/DevManageGame";

import GamePanel from './components/games/GamePanel';
import GameInfo from "./components/games/GameInfo";
import LoginSuccess from './components/login/LoginSuccess';

import RoutesDev from './RoutesDev';
import fs from 'flatstore';
// import history from "./actions/history";
import flatstore from 'flatstore';
import GameScreen from "./components/games/GameScreen";

var Routes = () => {


    const history = useHistory();

    flatstore.set('history', history);

    const refPath = history.location.pathname;
    if (refPath.indexOf("/login") == -1) {
        let curPath = localStorage.getItem("refPath");
        console.log("current", curPath);
        localStorage.setItem('refPath', refPath);
        console.log("next", refPath);
    }

    return (
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
    )
}

export default Routes;