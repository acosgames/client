import {
  HStack,
  Image,
  Text,
  VStack,
  Icon,
  Box,
  Spinner,
} from "@chakra-ui/react";

import config from "../../../config";
import ratingconfig from "../../../actions/ratingconfig";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { useBucket } from "../../../actions/bucket";
import { btScreenRect } from "../../../actions/buckets";

export default function CompactPlayer({ player, index, delay }) {
  let screenRect = useBucket(btScreenRect);
  let filename = `assorted-${player.portraitid || 1}-thumbnail.webp`;

  let ratingClass = ratingconfig.ratingToRank(player.rating);
  delay = delay || 0;

  let HStackMotion = motion(HStack);
  return (
    <motion.div
      style={{ width: "100%" }}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{
        delay: delay + index * 0.1,
      }}
    >
      <HStack
        width="100%"
        //   maxHeight="15rem"
        flex="1"
        // pt="1rem"
        position="relative"
        transition="1s"
        //   py="2rem"
        justifyContent={"flex-start"}
        spacing="0.5rem"
        // transform={"translate(-100vw, 0)"}
        borderRadius="12px"
        // overflow="hidden"
        zIndex="1"
      >
        <VStack
          w="3rem"
          minW="3rem"
          h="5rem"
          mr="0.5rem"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Spinner
            display={player.ready ? "none" : "block"}
            color="brand.600"
            speed={"1.5s"}
          />
          <Icon
            alignSelf={"center"}
            display={player.ready ? "block" : "none"}
            as={FaCheck}
            fontSize="1.6rem"
            color={"brand.300"}
            mr="0rem"
            // mr="2rem"
            filter={
              "drop-shadow(0 0 4px var(--chakra-colors-brand-100)) drop-shadow(0 0 1px var(--chakra-colors-brand-100))"
            }
          />
        </VStack>
        <Box w="5rem" minW="5rem" h="5rem" overflow="hidden">
          <Image
            display="inline-block"
            src={`${config.https.cdn}images/portraits/${filename}`}
            loading="lazy"
            // borderRadius={"8px"}
            transform="scale(1.3)"
            maxHeight="100%"
            height={["5rem"]}
            // mb="1rem"
            position="relative"
            zIndex="2"
            // border="1px solid"
            // borderColor={player.ready ? "brand.100" : "brand.900"}
          />
        </Box>
        <VStack
          w="5rem"
          minW="5rem"
          h="5rem"
          mr="0rem"
          bgColor="gray.1000"
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text
            as="span"
            textTransform="uppercase"
            // display={played >= 10 ? 'block' : 'none'}
            fontSize="2.4rem"
            color="gray.10"
            // textShadow='0 8px 9px var(--chakra-colors-brand-300) 0px -2px 20px var(--chakra-colors-brand-600)'
            textShadow={`2px 2px 2px var(--chakra-colors-gray-200),
                        -2px 2px 2px var(--chakra-colors-gray-200),
                        2px -2px 2px var(--chakra-colors-gray-200),
                        -2px -2px 2px var(--chakra-colors-gray-200)`}
            fontWeight="bold"
            letterSpacing="0px"
            textAlign="center"
            lineHeight={"2.4rem"}
            position="relative"
            top="1rem"
            borderRadius="20px"
          >
            {ratingClass}
          </Text>
          <Text
            as="span"
            color="gray.100"
            // bgColor="gray.600"
            p="0.25rem"
            fontWeight="500"
            fontSize="1.2rem"
            //   textShadow={"0 2px 3px black,0 2px 6px var(--chakra-colors-gray-900)"}
          >
            {player.rating}
          </Text>
        </VStack>
        <HStack flex="1" h="5rem" w="25rem" pr="1rem" bgColor="gray.1100">
          <Text
            ml="0.5rem"
            pr="0.5rem"
            as="span"
            // pl="1rem"
            textAlign={"left"}
            color="gray.0"
            fontWeight="400"
            fontSize={["1.6rem", "2rem", "2rem", "2.6rem"]}
            letterSpacing={"-1px"}
            fontStyle="italic"
            maxW={["24rem"]}
            overflow="hidden"
            whiteSpace={"nowrap"}
            textOverflow={"ellipsis"}
            // textShadow={
            //     "0 2px 3px var(--chakra-colors-gray-900),0 2px 6px var(--chakra-colors-gray-900)"
            // }
          >
            {player.name}
          </Text>
          <HStack
            spacing="1rem"
            alignSelf={"flex-start"}
            // pl="0.5rem"
            justifyContent={"flex-start"}
            // w="20rem"
            // bgColor="gray.800"
            mt="1rem"
            width="2rem"
            minW="2rem"
            // ml="1rem"
          >
            <Image
              src={`${config.https.cdn}images/country/${player.countrycode}.svg`}
              // mt="0.5rem"
              borderColor="gray.100"
              borderRadius="0px"
              width="2rem"
              filter="opacity(0.8)"
            />
          </HStack>
        </HStack>
      </HStack>
    </motion.div>
  );
}
