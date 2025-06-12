import { Box, Image } from "@chakra-ui/react";

// import USAFlag from "../../../assets/images/flags/USA.svg";
import config from "../../config";
import { useBucket } from "../../actions/bucket";
import { btDuplicateTabs, btLatency, btUser, btWebsocketConnected } from "../../actions/buckets";
export default function UserAvatar({}) {
    let user = useBucket(btUser);
    let latency = useBucket(btLatency);
    let wsConnected = useBucket(btWebsocketConnected);
    let duplicatetabs = useBucket(btDuplicateTabs);

    let latencyColor = "alt.300";
    if (latency > 400) {
        latencyColor = "orange.300";
    } else if (latency > 200) {
        latencyColor = "yellow.300";
    }

    if (!wsConnected || duplicatetabs) {
        latencyColor = "red.500";
    }

    let filename = "assorted-" + user.portraitid + "-original.webp";
    return (
        <>
            <Image
                display="inline-block"
                src={`${config.https.cdn}images/portraits/${filename}`}
                loading="lazy"
                borderRadius={"50%"}
                width={["6rem"]}
            />
            <Image
                src={`${config.https.cdn}images/country/${user.countrycode}.svg`}
                // mt="0.5rem"
                borderColor="gray.100"
                borderRadius="3px"
                width="1.75rem"
                // height="1.75rem"
                filter="opacity(0.9)"
                position="absolute"
                top="0.1rem"
                right="-0.6rem"
                zIndex="3"
            />
            <Box
                position="absolute"
                bottom="0.5rem"
                right="0rem"
                w="1rem"
                borderRadius="50%"
                h="1rem"
                bgColor={latencyColor}
                boxShadow={"0 0 2px black,0 0 3px black,0 0 4px black,0 0 6px black"}
            ></Box>
        </>
    );
}
