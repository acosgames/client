import { Box, Heading, Text } from "@chakra-ui/react";


export default function Vs({ }) {
    return (
        <Heading
            filter="opacity(0)"
            animation="fadeIn 0.3s forwards 0.5s"
            transition="all 0.3s ease"
            zIndex="1"
            textAlign={"center"}
            as="h3"
            fontWeight="600"
            // color="brand.600"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%,-50%)"
            // textShadow={"2px 2px 0px var(--chakra-colors-gray-0)"}
            // background="linear-gradient(to top, #eee, #333)"
            fontSize={"5rem"}
            //   bgColor="gray.900"
            borderRadius={"8px"}
            h="15rem"
            w="10rem"
            lineHeight={"15rem"}
        >
            <Box
                w="1000rem"
                position="absolute"
                top="50%"
                left="50%"
                h="2px"
                transform="translate(-50%,-50%) rotate(-30deg)"
                bgColor="gray.30"
                boxShadow="0 0 20px white, 0 0 2px white, 0 0 1px white"
            ></Box>
            <Box
                animation="scaleVs 1s forwards 0s"
                // filter="opacity(0)"
                transition="transform 0.3s ease"
                transform="scale(0)"
            >
                <Text
                    as="span"
                    position="relative"
                    top="-1.5rem"
                    left="0.2rem"
                    background="linear-gradient(to top, var(--chakra-colors-gray-10), var(--chakra-colors-gray-200))"
                    backgroundClip="text"
                    // textFillColor="transparent"
                    className="versusText"
                // color="brand.600"
                // textShadow="0px 0px 3px var(--chakra-colors-brand-600), 0px 0px 50px var(--chakra-colors-brand-600)"
                >
                    V
                </Text>
                <Text
                    as="span"
                    position="relative"
                    top="1rem"
                    left="-0.2rem"
                    background="linear-gradient(to bottom, var(--chakra-colors-gray-10), var(--chakra-colors-gray-200))"
                    backgroundClip="text"
                    // textFillColor="transparent"
                    className="versusText"
                // color="brand.600"
                // textShadow="0px 0px 3px var(--chakra-colors-brand-600), 0px 0px 50px var(--chakra-colors-brand-600)"
                >
                    S
                </Text>
            </Box>
        </Heading>
    );
}