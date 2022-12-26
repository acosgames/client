import { Box, useToast, VStack, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import fs from 'flatstore';
import config from '../../../config'

function LoadingBox(props) {

    let [showLoadingBox] = fs.useWatch('showLoadingBox/' + props.id);

    const toast = useToast();
    const [show, setShow] = useState(true);

    useEffect(() => {

        if (!showLoadingBox) {
            toast.closeAll()
            setTimeout(() => {
                setShow(false);

            }, 400)
        } else {
            setShow(true);
        }
    })

    // return <></>
    if (!showLoadingBox)
        return <></>

    return (
        <Box
            className="loading-screen"
            position={'absolute'}
            left="0"
            top="0"
            w="100%"
            h="100%"
            zIndex={1000}
            bgColor={'gray.900'}
        // transition={'filter 0.4s ease-in'}
        // filter={props.isDoneLoading ? 'opacity(0)' : 'opacity(1)'}
        >
            <VStack w="100%" h="100%" justifyItems={'center'} justifyContent="center" alignContent="center" alignItems={'center'}>
                {/* <Text>Loading...</Text> */}
                <Image
                    alt={'A cup of skill logo'}
                    src={`${config.https.cdn}acos-logo-large.png`}
                    w="300px" h="124.5px"
                />
                <div className="ldr-1"><div className="ball1"></div><div className="ball2"></div><div className="ball3"></div><div className="ball4"></div></div>
                {/* <br /><br />
                <Box className="factory-7"></Box> */}
            </VStack>
        </Box>
    )
}

export default LoadingBox;