

import Lottie from "lottie-react";
import { useEffect, useRef, useState } from "react";

import { GET } from '../../../actions/http'

import config from '../../../config'

export default function LottieAnimation(props) {

    let [json, setJSON] = useState(null);
    const lottieRef = useRef();
    const getSVG = async () => {
        let response = await GET(props.src);
        setJSON(response.data);
    }

    useEffect(() => {
        getSVG();

    }, [])

    useEffect(() => {
        lottieRef.current.setSpeed(props.speed || 1);
    })

    return (
        <Lottie lottieRef={lottieRef} animationData={json} />
    )
}