import React, { Component, useEffect, useState } from "react";

import {
    Link,
    withRouter,
} from "react-router-dom";

import fs from 'flatstore';
import { wsLeaveGame, wsJoinRankedGame, wsJoinBetaGame } from "../../actions/connection";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { IconButton } from "@chakra-ui/react";
import { IoExitOutline } from '@react-icons';

var timeout = 0;
var longPressDelay = 3000;

function LeaveGame(props) {

    if (!props.room_slug) {
        return (<React.Fragment></React.Fragment>)
    }

    if (props.events && props.events.gameover) {
        let game = fs.get('game');
        console.log("LeaveGame: game is: ", game);
        return (
            <button onClick={() => { wsJoinBetaGame(props.room_slug) }}>Leave</button>
        )
    }

    // var percentage = 10;

    const [percentage, setPercentage] = useState(0);
    // var timeout;
    var preventClick = false;

    const onSuccess = () => {
        wsLeaveGame(props.game_slug, props.room_slug)
        setPercentage(100);
    }

    const onStart = () => {
        setPercentage(100);
        timeout = setTimeout(() => {
            preventClick = true;
            onSuccess();
        }, longPressDelay);
    }

    const onClear = () => {
        setPercentage(0);

        timeout && clearTimeout(timeout);
        preventClick = false;
    }

    const clickCaptureHandler = (e) => {
        if (preventClick) {
            e.stopPropagation();
            preventClick = false;
        }
    }

    return (
        <IconButton
            onClick={onSuccess}
            icon={<IoExitOutline />}
            size="sm"
        // className="btn-forfeit"
        // onMouseDown={onStart}
        // onTouchStart={onStart}
        // onMouseUp={onClear}
        // onMouseLeave={onClear}
        // onTouchMove={onClear}
        // onTouchEnd={onClear}
        // onClickCapture={clickCaptureHandler}
        >
            {/* <CircularProgressbar
                value={percentage}
                text={`Forfeit`}
                styles={buildStyles({
                    pathTransitionDuration: 1.5,
                    pathTransition: 'linear 1.5s',
                    textSize: '0.5rem'
                    // pathTransition:
                    //     percentage === 0 ? "none" : "stroke-dashoffset 3s"
                })}
            /> */}
        </IconButton>
    )

}

export default withRouter(fs.connect(['room_slug', 'events'])(LeaveGame));