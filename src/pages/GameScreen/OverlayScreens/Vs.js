import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import config from '../../../config';

const MotionBox = motion(Box);
export function TopHalf() {
    return (
        <Box
            position="absolute"
            w="300%"
            h="300%"
            top="-250%"
            // transform="skewY(-30deg)"
            overflow="hidden"
            bgColor="gray.900"
            bg={`url("${config.https.cdn}acos-logo-background-repeat6.png") bottom 10px left, linear-gradient(to bottom, var(--chakra-colors-gray-750) 90%, var(--chakra-colors-gray-900))`}
            transform={"translate(-300vw, 0) skewY(-30deg)"}

            // opacity="0.5"
            animation={"fromLeft 0.6s forwards 0s"}
        >
            {/* <LineSpawner direction={"left"} bgColor="gray.1000" /> */}
        </Box>
    );
}

export function BottomHalf() {
    return (
        <Box
            position="absolute"
            w="300%"
            h="300%"
            top="50.5%"
            right="0"
            // transform="skewY(-30deg)"
            transform={"translate(300vw, 0) skewY(-30deg)"}
            animation={"fromRight 0.6s forwards 0s"}
            bgColor="gray.1000"
            // opacity="0.5"

            bg={`url("${config.https.cdn}acos-logo-background-repeat7.png") top 10px left, var(--chakra-colors-gray-1000)`}
        >
            {" "}
            {/* <LineSpawner direction={"right"} bgColor="gray.900" /> */}
        </Box>
    );
}

function VsLine({ status }) {
    return (
        <MotionBox
            w="120vw"
            position="absolute"
            top="50%"
            left="50%"
            h="3px"
            // transform="rotate(-30deg)"
            initial={{ x: '-50%', y: '-50%', rotate: -30, width: '0vw' }}
            animate={{ x: '-50%', y: '-50%', rotate: -30, width: '120vw' }}
            transition={{ delay: 0.6 }}
            // transform="translate(-50%,-50%) rotate(330deg)"
            // bgColor="gray.50"
            bg="linear-gradient(to right, var(--chakra-colors-gray-1200),  var(--chakra-colors-gray-10), var(--chakra-colors-gray-1200))"
        // boxShadow={status != 'starting' ? "0 0 20px var(--chakra-colors-brand-900)" : "0 0 40px var(--chakra-colors-red-500)"}
        ></MotionBox>
    )
}
export function Vs({ status }) {
    return (
        <Heading
            filter="opacity(0)"
            animation="fadeIn 0.3s forwards 0.5s"
            transition="all 0.3s ease"
            zIndex="1"
            textAlign={"center"}
            as="h3"
            fontWeight="900"
            // color="brand.600"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            // textShadow={"2px 2px 0px var(--chakra-colors-gray-0)"}
            // background="linear-gradient(to top, #eee, #333)"
            fontSize={["4rem", "4rem", "5rem"]}
            //   bgColor="gray.900"
            borderRadius={"8px"}
            h="15rem"
            w="10rem"
            lineHeight={"15rem"}
        >
            <VsLine status={status} />

            <Box
                animation="scaleVs 1s forwards 0s"
                // filter="opacity(0)"
                transition="transform 0.3s ease"
                transform="scale(0)"
            >
                <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%,-50%)"
                    w={["8rem", "9rem", "10rem"]}
                    h={["8rem", "9rem", "10rem"]}
                    borderRadius={'50%'}
                    bgColor="gray.900"
                    border="3px solid"
                    borderColor="gray.50"
                    bg="linear-gradient(to bottom right, var(--chakra-colors-gray-800), #111)"
                    boxShadow="0px 0px 50px var(--chakra-colors-gray-500)"
                ></Box>
                <Text
                    as="span"
                    position="relative"
                    top="-1rem"
                    left="0rem"
                    // background="linear-gradient(to top, var(--chakra-colors-gray-10), var(--chakra-colors-gray-200))"
                    // backgroundClip="text"
                    // textFillColor="transparent"
                    // className="versusText"
                    // color="brand.600"
                    fontWeight="bold"
                    color="gray.10"
                // textShadow="0px 0px 40px var(--chakra-colors-gray-0), 0px 0px 40px var(--chakra-colors-gray-0), 0px 0px 10px var(--chakra-colors-gray-0)"
                >
                    V
                </Text>
                <Text
                    as="span"
                    position="relative"
                    top="1rem"
                    left="rem"
                    fontWeight="bold"
                    color="gray.10"
                // textShadow="0px 0px 40px var(--chakra-colors-gray-0), 0px 0px 40px var(--chakra-colors-gray-0), 0px 0px 10px var(--chakra-colors-gray-0)"
                // background="linear-gradient(to bottom, var(--chakra-colors-gray-10), var(--chakra-colors-gray-200))"
                // backgroundClip="text"
                // textFillColor="transparent"
                // className="versusText"
                // color="brand.600"
                // textShadow="0px 0px 3px var(--chakra-colors-brand-600), 0px 0px 50px var(--chakra-colors-brand-600)"
                >
                    S
                </Text>
            </Box>
        </Heading>
    );
}