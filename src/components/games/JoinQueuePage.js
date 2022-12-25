
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import { wsJoinQueues } from "../../actions/connection";
import { joinGame } from "../../actions/game";
import GameList from "./GameList";
import fs from 'flatstore';

function JoinQueuePage(props) {

    const params = useParams();

    const paramOwner = params?.owner;
    const paramQueues = params?.queues;
    const parts = paramQueues.split('+') || [];

    let [queues] = fs.useWatch('queues');


    useEffect(() => {
        gtag('event', 'joinqueuepage');

        let requestQueues = [];

        for (var i = 0; i < parts.length; i += 2) {

            let game_slug = parts[i];
            if (!game_slug)
                break;

            let mode = parts[i + 1];
            if (!mode)
                mode = 'rank';

            requestQueues.push({ game_slug, mode });
        }

        // setTimeout(() => {
        wsJoinQueues(requestQueues, paramOwner);
        // }, 1000)

    }, [])

    if (queues && queues.length > 0) {
        return <Navigate to="/" />
    }

    return (
        <div id="mainpage">
            <GameList />
        </div>
    )

}

export default (JoinQueuePage);

