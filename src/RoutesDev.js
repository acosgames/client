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

// import history from "./actions/history";
import flatstore from 'flatstore';

var RoutesDev = () => {



    return (
        <>
            <Switch>
                <Route

                    path="/dev/login"
                    component={DevLogin}
                />
                <ProtectedRoute

                    path="/dev/game/create"
                    component={DevCreateGame}
                    verify={(user) => {
                        return (user['isdev'])
                    }}
                    redirectTo="/dev/login"
                />
                <ProtectedRoute

                    path="/dev/game/:gameid"
                    component={DevManageGame}
                    verify={(user) => {
                        return (user['isdev'])
                    }}
                    redirectTo="/dev/login"
                />
                <ProtectedRoute
                    path="/dev*"
                    component={DevMyGames}
                    verify={(user) => {
                        return (user['isdev'])
                    }}
                    redirectTo="/dev/login"
                />

            </Switch>
        </>
    )
}

export default RoutesDev;