import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import GameBuildInfo from "./GameBuildInfo.jsx";
import { useBucket } from "../../actions/bucket.js";
import { btGame } from "../../actions/buckets.js";

export default function GameDescription({}) {
  let game = useBucket(btGame);

  if (!game) {
    return <></>;
  }

  return (
    <VStack
      w="100%"
      px="3rem"
      pt="2rem"
      bgColor="gray.925"
      // pt="0rem"
      boxShadow={"0px 3px 7px 0px rgba(0, 0, 0, 0.21)"}
      pb="10rem"
    >
      {/* <VStack pb="3rem" w="100%" alignItems={'center'} _after={{
                content: '""',
                display: 'block',
                clipPath: 'polygon(0% 0%, 100% 0%, 93.846% 100%, 6.154% 100%, 0% 0%)',
                width: '65px',
                height: '5px',
                margin: '0.5rem 0 0',
                background: 'brand.300',
            }
            }>
                <Text as="span" color="brand.300" letterSpacing={'2px'} fontWeight={'bold'} fontSize={['1.2rem', '1.2rem', "1.4rem"]}>GAME</Text>
                <Heading as="h2" color="gray.0" fontSize={['2.4rem', '2.4rem', "4rem"]} fontWeight={'600'}>Description</Heading>
            </VStack> */}
      <Box
        p="4rem"
        bgColor="gray.875"
        borderRadius={"8px"}
        w="100%"
        maxW={["100%", "100%", "100%", "95%", "70%", "60%"]}
        border="1px solid"
        borderColor="gray.800"
        mb="4rem"
        clipPath="polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)"
      >
        <Heading
          fontSize={["3.2rem", "2.4rem", "2.4rem", "3.2rem"]}
          fontWeight="700"
          color="gray.0"
          lineHeight={"3.2rem"}
        >
          GAME DESCRIPTION
        </Heading>
        <Box
          w="100%"
          my="2.5rem"
          borderTop={"2px solid"}
          borderTopColor={"brand.500"}
        ></Box>
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
      </Box>

      <GameBuildInfo game={game} />
    </VStack>
  );
}
