import { useEffect } from "react";


import fs from 'flatstore';
import { wsConnect, attachToFrame, detachFromFrame, reconnect } from "../../actions/connection";

function Connection({ }) {

    let [loggedIn] = fs.useWatch('loggedIn');

    useEffect(() => {
        if (loggedIn != 'CHECKING')
            reconnect();

    }, [loggedIn])

    useEffect(() => {
        attachToFrame();
        return () => {
            detachFromFrame();
        }
    }, [])

    return (
        <></>
    )

}
export default Connection;