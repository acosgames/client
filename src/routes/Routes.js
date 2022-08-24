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

var Routes = () => {

    const history = useHistory();


    useEffect(() => {
        fs.set('history', history);

    }, [])


    const refPath = history.location.pathname;
    if (refPath.indexOf("/login") == -1) {
        let curPath = localStorage.getItem("refPath");
        console.log("current", curPath);
        localStorage.setItem('refPath', refPath);
        console.log("next", refPath);
    }

    let iframe = fs.get('iframe');

    return (
        // <Box display="inline-block" width="100%" pl={iframe ? 0 : [3, 4, 12]} pr={iframe ? 0 : [3, 4, 12]} pt={6}>
        <Switch>
            <ProtectedRoute
                exact
                path="/player/create"
                verify={(user) => !user.displayname}
                component={CreateDisplayName}
            />
            <Route
                exact
                path="/join/:queues"
                component={JoinQueuePage}
            />
            <Route
                exact
                path="/join/:owner/:queues"
                component={JoinQueuePage}
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
                path="/profile"
                component={Profile}
            />

            <Route

                path="/profile/:displayname"
                component={Profile}
            />



            <Route

                path="/login/success"
                component={LoginSuccess}
            />

            <Route

                path="/login/accountexists"
                component={LoginAccountExists}
            />

            <Route

                path="/privacy"
                component={PrivacyPolicy}
            />
            <Route

                path="/terms"
                component={TermsAndConditions}
            />

            <Route

                path="/login"
                component={SocialLogin}
            />
            <Route

                path="/logout"
                component={Logout}
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
        // </Box>
    )
}

export default Routes;