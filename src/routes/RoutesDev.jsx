import {
    // Route,
    // useHistory,
    Routes,
    useNavigate
} from "react-router-dom";

import ProtectedRoute from '../components/login/ProtectedRoute';

import MainPage from '../components/MainPage';
import SocialLogin from '../components/login/SocialLogin';
import DevLogin from '../components/dev/DevLogin';
import CreateDisplayName from "../components/login/CreateDisplayName";
import DevMyGames from "../components/dev/DevMyGames";
import DevCreateGame from "../components/dev/DevCreateGame";
import DevManageGame from "../components/dev/DevManageGame";

// import GameInfo from "../components/games/GameInfo";

// import history from "./actions/history";
import flatstore from 'flatstore';
import { useEffect } from "react";

var RoutesDev = () => {

    const history = useNavigate();
    // useEffect(() => {
    //     fs.set('history', history);
    // })

    return (
        <>

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
                path="/dev/*"
                component={DevMyGames}
                verify={(user) => {
                    return (user['isdev'])
                }}
                redirectTo="/dev/login"
            />

        </>
    )
}

export default RoutesDev;