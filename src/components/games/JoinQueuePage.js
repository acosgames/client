
import { useEffect } from "react";

import { wsJoinQueues } from "../../actions/connection";
import { joinGame } from "../../actions/game";
import GameList from "./GameList";


function JoinQueuePage(props) {


    const paramOwner = props?.match?.params?.owner;
    const paramQueues = props?.match?.params?.queues;
    const parts = paramQueues.split('+') || [];


    useEffect(() => {
        gtag('event', 'joinqueuepage');

        let queues = [];

        for (var i = 0; i < parts.length; i += 2) {

            let game_slug = parts[i];
            if (!game_slug)
                break;

            let mode = parts[i + 1];
            if (!mode)
                mode = 'rank';

            queues.push({ game_slug, mode });
        }

        setTimeout(() => {
            wsJoinQueues(queues, paramOwner);
        }, 1)

    }, [])


    return (
        <div id="mainpage">
            <GameList />
        </div>
    )

}

export default (JoinQueuePage);

