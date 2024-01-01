import { Box, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from "@chakra-ui/react";
import GameRankGlobal from "./GameRankGlobal";
import GameRankDivision from "./GameRankDivision";
import GameRankNational from "./GameRankNational";
import fs from 'flatstore';

export default function GameLeaderboard({ game_slug }) {

  let user = fs.get('user');

  return (
    <Box w="100%" h="100%" p="0" pt="1rem"
      bgColor="gray.925">
      <Tabs variant="unstyled" isLazy>
        <TabList border="0" justifyContent={"center"}>
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
            Division
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
        </TabList>

        <TabPanels>
          <TabPanel p="0">
            <VStack
              w="100%"
              px="0"
              maxW="100%"
              alignItems={"center"}
            >
              <GameRankDivision />
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

              <GameRankNational countrycode={user?.countrycode || 'US'} />
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

              <GameRankGlobal />
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}
