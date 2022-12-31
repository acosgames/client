import { Box } from "@chakra-ui/react";
import FSGGroup from "../../widgets/inputs/FSGGroup";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

function GameInfoDescription(props) {
    return (
        <Box p="0" m="0" pt="0" pb="3rem" width="100%">
            <FSGGroup fontSize="lg" title="Description" hfontSize="sm" pl="0" pr="0">
                <Box width="100%" align="left" id="game-info-longdesc">
                    <ReactMarkdown
                        allowed
                        allowedElements={[
                            "strong",
                            "span",
                            "emphasis",
                            "img",
                            "a",
                            "i",
                            "b",
                            "p",
                            "strike",
                            "s",
                            "del",
                            "h1", "h2", "h3", "h4", "h5", "h6",
                            "div",
                            "table", "thead", "tbody", "tr", "th", "td"
                        ]}
                        children={props.longdesc}
                        remarkPlugins={[remarkGfm]}></ReactMarkdown>
                </Box>
            </FSGGroup>
        </Box>
    )
}

export default GameInfoDescription;