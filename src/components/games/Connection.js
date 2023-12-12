import { useEffect } from "react";


import fs from 'flatstore';
import { wsConnect, attachToFrame, detachFromFrame, reconnect } from "../../actions/connection";

function Connection({ }) {

    useEffect(() => {
        reconnect();
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