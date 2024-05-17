import {
    Box,
    Card,
    CardBody,
    CardHeader,
    HStack,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";

export default function GameBuildInfo({ game }) {
    const parseDate = (dt) => {
        if (!dt) return "";
        return dt.split(" ")[0];
    };

    let screentype = game.screentype;
    switch (screentype) {
        case 1:
            screentype = "Fullscreen";
            break;
        case 2:
            screentype = "Fixed Resolution";
            break;
        case 3:
            screentype = "Scaled Resolution";
            break;
    }

    let resow = game.resow;
    let resoh = game.resoh;
    let screenwidth = game.screenwidth;
    let resolution = resow + ":" + resoh;
    if (game.screentype == 3) {
        resolution += " @ " + screenwidth + "px";
    }

    return (
        <Card>
            <CardHeader>
                <Heading
                    fontSize={["2.4rem"]}
                    fontWeight="700"
                    color="gray.0"
                    lineHeight={"3.2rem"}
                >
                    BUILD INFORMATION
                </Heading>
            </CardHeader>
            <CardBody>
                <VStack
                    w="100%"
                    spacing="0"
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <HStack
                        spacing={["1rem", "3rem", "5rem", "6rem"]}
                        // borderBottom="2px dashed"
                        // borderBottomColor="gray.925"
                    >
                        <BuildInfoLine
                            title="Released"
                            value={parseDate(game.tsinsert)}
                        />
                        <BuildInfoLine
                            title="Last Updated"
                            value={parseDate(game.tsupdate)}
                        />
                    </HStack>
                    <HStack
                        spacing={["1rem", "3rem", "5rem", "6rem"]}
                        // borderBottom="2px dashed"
                        //  borderBottomColor="gray.925"
                    >
                        <BuildInfoLine
                            title="Published Build"
                            value={"" + game.version}
                        />
                        <BuildInfoLine
                            title="Latest Build"
                            value={"" + game.latest_version}
                        />
                    </HStack>
                    <HStack spacing={["1rem", "3rem", "5rem", "6rem"]}>
                        <BuildInfoLine title="Screen Type" value={screentype} />
                        {game.screentype != 1 && (
                            <BuildInfoLine
                                title="Resolution"
                                value={resolution}
                            />
                        )}
                    </HStack>
                </VStack>
            </CardBody>
        </Card>
    );
}

function BuildInfoLine({ title, value }) {
    return (
        <VStack
            py="1rem"
            // px="4rem"
            alignItems={"flex-start"}
        >
            <Text
                fontSize={["1.4rem", "1.4rem", "1.6rem"]}
                as="span"
                color="gray.0"
                fontWeight={"600"}
                w={["10rem", "16rem", "16rem", "20rem"]}
            >
                {title}
            </Text>
            <Text
                as="span"
                color="gray.10"
                fontSize="1.6rem"
                fontWeight={"400"}
                w={["10rem", "16rem", "16rem", "20rem"]}
                // whiteSpace={"nowrap"}
            >
                {value}
            </Text>
        </VStack>
    );
}
