import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import {
    Box,
    Card,
    CardBody,
    CardHeader,
    Heading,
    Text,
    VStack,
} from "@chakra-ui/react";
import GameBuildInfo from "./GameBuildInfo.jsx";
import { useBucket } from "../../actions/bucket.js";
import { btGame } from "../../actions/buckets.js";

export default function GameDescription({}) {
    let game = useBucket(btGame);

    if (!game) {
        return <></>;
    }

    return (
        <VStack p="1rem">
            <Card>
                <CardHeader>
                    <Heading
                        fontSize={["2.4rem"]}
                        fontWeight="700"
                        color="gray.0"
                        lineHeight={"3.2rem"}
                    >
                        GAME DESCRIPTION
                    </Heading>
                </CardHeader>
                <CardBody>
                    {/* <Box
                        w="100%"
                        my="2.5rem"
                        // borderTop={"2px solid"}
                        // borderTopColor={"brand.500"}
                    ></Box> */}
                    <Box className="game-desc">
                        <ReactMarkdown
                            allowed
                            allowedElements={[
                                "strong",
                                "span",
                                "blockquote",
                                "emphasis",
                                "img",
                                "a",
                                "em",
                                "i",
                                "b",
                                "p",
                                "strike",
                                "s",
                                "del",
                                "h1",
                                "h2",
                                "h3",
                                "h4",
                                "h5",
                                "h6",
                                "div",
                                "table",
                                "thead",
                                "tbody",
                                "tr",
                                "th",
                                "td",
                                "pre",
                                "code",
                            ]}
                            children={game.longdesc}
                            remarkPlugins={[remarkGfm]}
                        ></ReactMarkdown>
                    </Box>
                </CardBody>
            </Card>

            <GameBuildInfo game={game} />
        </VStack>
    );
}
