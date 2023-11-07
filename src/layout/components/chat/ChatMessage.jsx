import { Box, HStack, Image, Text, VStack, chakra } from "@chakra-ui/react";
import config from "../../../config";
import { Link } from "react-router-dom";

const ChakraLink = chakra(Link);

export default function ChatMessage({ flagCode, username, msgTime, msg }) {
  let filename = "assorted-1-original.webp";

  return (
    <VStack
      w="100%"
      spacing="0.5rem"
      bgColor="gray.1000"
      borderRadius={"4px"}
      mx={["0.125rem", "0.25rem"]}
      px={["0.25rem", "0.5rem"]}
      py="0.75rem"
      justifyContent={"flex-start"}
      alignItems={"flex-start"}
    >
      <HStack w="100%" justifyContent={"flex-start"} alignItems={"flex-start"}>
        <Box
          w="100%"
          justifyContent={"flex-start"}
          alignItems={"flex-start"}
          flex="1"
        >
          <ChakraLink to={"/profile/" + username}>
            <Image
              display="inline-block"
              src={`${config.https.cdn}images/portraits/${filename}`}
              loading="lazy"
              verticalAlign={"middle"}
              borderRadius={"5px"}
              width={["2rem"]}
            />
            <Image
              ml="0.25rem"
              display="inline-block"
              src={flagCode}
              verticalAlign={"middle"}
              borderRadius="5px"
              w="2rem"
            />
            <Text
              pl="0.5rem"
              display="inline"
              as="span"
              fontSize="1.2rem"
              fontWeight="500"
              color="gray.10"
              pr="0.5rem"
              lineHeight="1.6rem"
            >
              {username}
            </Text>
          </ChakraLink>
          <Text
            display="inline"
            as="span"
            fontSize="1.2rem"
            fontWeight="medium"
            lineHeight="1.6rem"
            color="gray.50"

            // width="100%"
          >
            {msg}
          </Text>
        </Box>
        {/* <Text fontSize="1rem" fontWeight="bold" color="gray.200">
          {msgTime}
        </Text> */}
      </HStack>
    </VStack>
  );
}
