import { Box } from "@chakra-ui/react";
import FSGGroup from "../../widgets/inputs/FSGGroup";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'

function GameInfoDescription(props) {
    return (
        <Box p="0" m="0" pt="0" pb="3rem" width="100%">
            <FSGGroup fontSize="0.8rem" title="Description" hfontSize="sm">
                <Box width="100%" align="left" id="game-info-longdesc">
                    <ReactMarkdown
                        allowed
                        allowedElements={[
                            "strong",
                            "span",
                            "emphasis",
                            "i",
                            "b",
                            "p",
                            "strike",
                            "s",
                            "del",
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