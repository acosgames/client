import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import GameInfoTop10 from "./GameInfoTop10";

export default function GameLeaderboard({ game_slug }) {
  return (
    <Box w="100%" h="100%" p="0" pt="4rem"
      bgColor="gray.925">
      <Tabs variant="unstyled">
        <TabList border="0" justifyContent={"center"}>
          <Tab
            as="span"
            color="gray.200"
            cursor={"pointer"}
            _selected={{
              cursor: "auto",
              color: "brand.300",
            }}
            letterSpacing={"0px"}
            fontWeight={"bold"}
            textTransform={'uppercase'}
            fontSize={["1.2rem", "1.2rem", "1.4rem"]}
          >
            Global
          </Tab>
          <Tab
            color="gray.200"
            cursor={"pointer"}
            _selected={{
              cursor: "auto",
              color: "brand.300",
            }}
            as="span"
            letterSpacing={"0px"}
            fontWeight={"bold"}
            textTransform={'uppercase'}
            fontSize={["1.2rem", "1.2rem", "1.4rem"]}
          >
            National
          </Tab>

        </TabList>

        <TabPanels>
          <TabPanel p="0">
            <VStack
              w="100%"
              px="0"
              maxW="100%"
              alignItems={"center"}
            >
              <GameInfoTop10 />
            </VStack>
          </TabPanel>
          <TabPanel p="0">
            <VStack
              w="100%"
              px="0"
              bgColor="gray.925"
              maxW="100%"
              alignItems={"center"}
            >
              <GameInfoTop10 />
            </VStack>

          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
