import {
    Route,
    useHistory
} from "react-router-dom";

import ProtectedRoute from './components/login/ProtectedRoute';

import MainPage from './components/MainPage';
import SocialLogin from './components/login/SocialLogin';
import DevLogin from './components/dev/DevLogin';
import CreateDisplayName from "./components/login/CreateDisplayName";
import DevDashboard from "./components/dev/DevDashboard";
import DevCreateGame from "./components/dev/DevCreateGame";
import DevManageGame from "./components/dev/DevManageGame";

import GamePanel from './components/games/GamePanel';
import GameInfo from "./components/games/GameInfo";

// import history from "./actions/history";
import flatstore from 'flatstore';

var Routes = () => {


    const history = useHistory();

    flatstore.set('history', history);

    return (
        <>
            <ProtectedRoute
                exact
                path="/player/create"
                component={CreateDisplayName}
            />
            <Route
                exact
                path="/"
                component={MainPage}
            />
            <Route
                exact
                path="/game/:game_slug"
                component={GameInfo}
            />
            <Route
                exact
                path="/game/:game_slug/:room_slug"
                component={GamePanel}
            />
            <Route
                exact
                path="/game/:game_slug/:mode/:room_slug"
                component={GamePanel}
            />
            <Route
                exact
                path="/login"
                component={SocialLogin}
            />
            <Route
                exact
                path="/dev/login"
                component={DevLogin}
            />
            <ProtectedRoute
                exact
                path="/dev/game/create"
                component={DevCreateGame}
                verify={(user) => true}
                redirectTo="/dev/login"
            />
            <ProtectedRoute
                exact
                path="/dev/game/:gameid"
                component={DevManageGame}
                verify={(user) => 'github' in user}
                redirectTo="/dev/login"
            />
            <ProtectedRoute
                exact
                path="/dev/:id?"
                component={DevDashboard}
                verify={(user) => 'github' in user}
                redirectTo="/dev/login"
            />

            <Route
                exact
                path="/games"
                component={MainPage}
            />
        </>
    )
}

export default Routes;