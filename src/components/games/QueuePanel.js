import React, { Component, useState } from "react";

import { useSpring, animated } from 'react-spring';
import fs from 'flatstore';
import { wsLeaveQueue } from "../../actions/connection";

function QueuePanel(props) {


    const [isOpen, setOpen] = useState(false);
    // const [dragging, setDragging] = useState(false);
    // const [relY, setRelY] = useState(0);
    // const [curY, setCurY] = useState(0);
    const [springProps, setSpringProps] = useSpring(() => ({
        config: { mass: 1, damping: 1, friction: 20, tension: 500 },
        from: { y: 160 }
    }));
    var myRef = React.createRef();

    const onClick = (e) => {
        setOpen(!isOpen);
        setSpringProps({ y: isOpen ? 100 : 160 })
    }

    const onCancel = (e) => {
        setOpen(false);
        setSpringProps({ y: 60 })
        wsLeaveQueue();

    }

    /*
    // calculate relative position to the mouse and set dragging=true
    const onMouseDown = (e) => {
        if (e.button !== 0) return;
        let pos = { left: myRef.current.offsetLeft, top: myRef.current.offsetTop }

        setDragging(true);
        setRelY(e.pageY - pos.top);
        setCurY(0);

        e.stopPropagation();
        e.preventDefault();
    }

    const onMouseUp = (e) => {

        if (curY <= 60) {
            setOpen(true);
        }

        setDragging(false);

        e.stopPropagation();
        e.preventDefault();
    }

    const onMouseMove = (e) => {
        if (!dragging) return;

        setCurY(e.pageY - relY);

        myRef.current.style.transform = `translate(0px, ${-curY}px)`
        e.stopPropagation();
        e.preventDefault();
    }
    */

    let queues = props.queues;

    // queues = queues || [];
    let panelClass = isOpen ? 'open' : '';

    if (!queues || queues.length == 0) {
        return (<React.Fragment></React.Fragment>)
    }

    var queueMap = {};
    var gameList = [];
    for (let i = 0; i < queues.length; i++) {
        let queue = queues[i];
        if (!queueMap[queue.game_slug]) {
            queueMap[queue.game_slug] = [];
            gameList.push(queue.game_slug);
        }
        queueMap[queue.game_slug].push(queue.mode);
    }

    return (
        <animated.div id="queue-panel" style={springProps} ref={myRef}>
            <div id="queue-header" >
                <div id="queue-header-content">

                    <div
                        id="queue-tab"

                        onClick={onClick}
                    // onMouseDown={onMouseDown}
                    // onMouseUp={onMouseUp}
                    // onMouseMove={onMouseMove}
                    // onMouseOut={onMouseUp}
                    >
                        {/* <div id="queue-tab-divet"></div> */}
                        <div id="queue-tab-cancel" onClick={onCancel}>&times;</div>
                        <div id="queue-searching">Searching</div>
                        <div id="queue-loader">
                            <div className="loader-inner line-scale-pulse-out-rapid">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="queue-content"
            // onClick={onClick}
            >
                <div id="queue-games">
                    <ul>
                        {
                            gameList.map(game_slug => {
                                let modes = queueMap[game_slug]
                                return (
                                    <li key={game_slug}>
                                        <span className="queue-game-title">{game_slug}</span>
                                        {
                                            modes.map(m => (
                                                <span key={game_slug + "-" + m + "-mode"} className="queue-game-mode">{m}</span>
                                            ))
                                        }
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>

        </animated.div>
    )

}

export default fs.connect(['queues'])(QueuePanel);