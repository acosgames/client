import { Box, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import config from "../../../config";

const MotionBox = motion(Box);
export function TopHalf() {
    return (
        <Box
            position="absolute"
            w="100%"
            h="50%"
            top="0"
            right="-33%"
            // top="-50%"
            // transform="skewY(45deg)"
            // overflow="hidden"
            // bgColor="gray.950"
            // bg={`url("${config.https.cdn}acos-logo-2025-transparent.png") bottom 10px left, linear-gradient(to bottom, var(--chakra-colors-gray-750) 90%, var(--chakra-colors-gray-900))`}
            // transform={"translate(-300vw, 0) skewY(-30deg)"}
            // opacity="0.5"
            animation={"fromLeft 0.6s forwards 0s"}
            _before={{
                w: "1000px",
                h: "1000px",
                bgColor: "gray.700",
                borderRadius: "50%",
                content: "''",
                position: "absolute",
                // bottom: "150px",
                transform: "translate(-33%, 0)",
                bottom: "150px",
                left: "-250px",
                // left: "50%",
            }}
        >
            {/* <LineSpawner direction={"left"} bgColor="gray.1000" /> */}
        </Box>
    );
}

export function BottomHalf() {
    return (
        <Box
            position="absolute"
            w="100%"
            h="50%"
            bottom="0"
            left="-33%"
            // transform="skewY(-30deg)"
            // transform={"translate(300vw, 0) skewY(-30deg)"}
            animation={"fromRight 0.6s forwards 0s"}
            // bgColor="gray.1000"
            // opacity="0.5"

            // overflow="hidden"
            // bgColor={`var(--chakra-colors-gray-1000)`}
            _before={{
                w: "1000px",
                h: "1000px",
                bgColor: "gray.600",
                borderRadius: "50%",
                content: "''",
                position: "absolute",
                transform: "translate(33%, 0)",
                top: "150px",
                right: "-250px",
                // left: "50%",
            }}
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
            initial={{ x: "-50%", y: "-50%", rotate: -30, width: "0vw" }}
            animate={{ x: "-50%", y: "-50%", rotate: -30, width: "120vw" }}
            transition={{ delay: 0.6 }}
            // transform="translate(-50%,-50%) rotate(330deg)"
            // bgColor="gray.50"
            bg="linear-gradient(to right, var(--chakra-colors-gray-150),  var(--chakra-colors-gray-10), var(--chakra-colors-gray-150))"
            // boxShadow={status != 'starting' ? "0 0 20px var(--chakra-colors-brand-900)" : "0 0 40px var(--chakra-colors-red-500)"}
        ></MotionBox>
    );
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
            fontWeight="500"
            // color="brand.600"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            // textShadow={"2px 2px 0px var(--chakra-colors-gray-0)"}
            // background="linear-gradient(to top, #eee, #333)"
            fontSize={["3rem", "3rem", "4rem"]}
            //   bgColor="gray.900"
            borderRadius={"8px"}
            h="15rem"
            w="10rem"
            lineHeight={"15rem"}
        >
            {/* <VsLine status={status} /> */}

            <Box
                animation="scaleVs 1s forwards 0s"
                // filter="opacity(0)"
                transition="transform 0.3s ease"
                transform="scale(0)"
            >
                {/* <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%,-50%)"
                    w={["8rem", "8rem", "8rem"]}
                    h={["8rem", "8rem", "8rem"]}
                    borderRadius={"50%"}
                    bgColor="gray.50"
                    border="1px solid"
                    borderColor="gray.600"
                    bg="linear-gradient(to top right, #999, #ddd, #fff)"
                    // boxShadow="0px 0px 10px var(--chakra-colors-gray-100)"
                ></Box> */}
                <Text
                    as="span"
                    position="relative"
                    top="0"
                    left="0rem"
                    // background="linear-gradient(to top, var(--chakra-colors-gray-10), var(--chakra-colors-gray-200))"
                    // backgroundClip="text"
                    // textFillColor="transparent"
                    // className="versusText"
                    // color="brand.600"
                    fontWeight="500"
                    color="gray.100"
                    // textShadow="0px 0px 40px var(--chakra-colors-gray-0), 0px 0px 40px var(--chakra-colors-gray-0), 0px 0px 10px var(--chakra-colors-gray-0)"
                >
                    V
                </Text>
                <Text
                    as="span"
                    position="relative"
                    top="0"
                    left="0rem"
                    fontWeight="500"
                    color="gray.100"
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
