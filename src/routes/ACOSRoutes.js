import {
    Route,
    useHistory,
    Routes,
    useNavigate,
    useLocation
} from "react-router-dom";

import ProtectedRoute from '../components/login/ProtectedRoute';

import MainPage from '../components/MainPage';
import SocialLogin from '../components/login/SocialLogin';
import DevLogin from '../components/dev/DevLogin';
import CreateDisplayName from "../components/login/CreateDisplayName";

import LoginSuccess from '../components/login/LoginSuccess';

import RoutesDev from './RoutesDev';
import fs from 'flatstore';;
import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsAndConditions from "../components/TermsAndConditions";
import Logout from "../components/login/Logout";
import Profile from "../components/profile/Profile";
import LoginAccountExists from "../components/login/LoginAccountExists";
import JoinQueuePage from "../components/games/JoinQueuePage";
import DevCreateGame from "../components/dev/DevCreateGame";
import DevManageGame from "../components/dev/DevManageGame";
import DevMyGames from "../components/dev/DevMyGames";

var ACOSRoutes = () => {

    const history = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fs.set('history', history);

    }, [])


    const refPath = location.pathname;
    if (refPath.indexOf("/login") == -1) {
        let curPath = localStorage.getItem("refPath");
        //console.log("current", curPath);
        localStorage.setItem('refPath', refPath);
        //console.log("next", refPath);
    }

    // let iframe = fs.get('iframe');

    return (
        // <Box display="inline-block" width="100%" pl={iframe ? 0 : [3, 4, 12]} pr={iframe ? 0 : [3, 4, 12]} pt={6}>
        <Routes>
            <Route path="/player/create" element={
                <ProtectedRoute
                    exact
                    path="/player/create"
                    verify={(user) => !user.displayname}
                    component={CreateDisplayName}
                />
            } />

            <Route
                exact
                path="/join/:queues"
                element={<JoinQueuePage />}
            />
            <Route
                exact
                path="/join/:owner/:queues"
                element={<JoinQueuePage />}
            />
            <Route
                exact
                path="/"
                element={<MainPage />}
            />
            <Route
                exact
                path="/g"
                element={<MainPage />}
            />


            <Route
                exact
                path="/profile"
                element={<Profile />}
            />

            <Route

                path="/profile/:displayname"
                element={<Profile />}
            />



            <Route

                path="/login/success"
                element={<LoginSuccess />}
            />

            <Route

                path="/login/accountexists"
                element={<LoginAccountExists />}
            />

            <Route

                path="/privacy"
                element={<PrivacyPolicy />}
            />
            <Route

                path="/terms"
                element={<TermsAndConditions />}
            />

            <Route

                path="/login"
                element={<SocialLogin />}
            />
            <Route

                path="/logout"
                element={<Logout />}
            />

            <Route
                exact
                path="/dev/login"
                element={<DevLogin />}
            />



            <Route path="/dev/game/create" element={<ProtectedRoute
                path="game/create"
                component={DevCreateGame}
                verify={(user) => {
                    return (user['isdev'])
                }}
                redirectTo="/dev/login"
            />}>

            </Route>
            <Route path="/dev/game/:gameid" element={<ProtectedRoute
                path="game/:gameid"
                component={DevManageGame}
                verify={(user) => {
                    return (user['isdev'])
                }}
                redirectTo="/dev/login"
            />}>

            </Route>
            <Route path="/dev/*" element={<ProtectedRoute
                path="*"
                component={DevMyGames}
                verify={(user) => {
                    return (user['isdev'])
                }}
                redirectTo="/dev/login"
            />}>

            </Route>


            <Route
                exact
                path="/games"
                component={<MainPage />}
            />
        </Routes>
        // </Box>
    )
}

export default ACOSRoutes;