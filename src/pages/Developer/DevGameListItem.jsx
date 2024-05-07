import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
  Tooltip,
  VStack,
  Wrap,
  Link as ChLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import config from "../../config";
import { MdEdit } from "react-icons/md";

import {
  IoCode,
  IoCodeWorking,
  IoDocument,
  IoHelpCircleSharp,
} from "react-icons/io5";

import { FiCopy, FiHeart, FiUsers, FiExternalLink } from "react-icons/fi";

import { FaGithub } from "react-icons/fa";

export default function DevGameListItem({
  gameid,
  name,
  totalPlays,
  totalVotes,
  version,
  latest_version,
  game_slug,
  preview_images,
}) {
  let imgUrl = config.https.cdn + "placeholder.png";
  if (preview_images && preview_images.length > 0)
    imgUrl = `${config.https.cdn}g/${game_slug}/preview/${preview_images}`;

  return (
    <Card w={["100%", "100%", "100%", "45%"]}>
      <CardBody position="relative">
        <VStack
          position="absolute"
          bottom="1.25rem"
          right="1.25rem"
          height="100%"
          pt="3rem"
        >
          <Link to={"/dev/game/" + game_slug}>
            <Text
              as="span"
              display="flex"
              flexDir={"column"}
              alignItems={"center"}
              bgColor="gray.1000"
              p="0.75rem"
              borderRadius="2rem"
            >
              <Icon color="gray.10" w="1.5rem" h="1.5rem" as={MdEdit} />
            </Text>
          </Link>
          <Box flex="1"></Box>
          <ChLink
            target="_blank"
            href={`https://github.com/acosgames/${game_slug}/issues`}
            display="flex"
            flexDir={"column"}
            alignItems={"center"}
          >
            <Icon w="1.5rem" h="1.5rem" as={FaGithub} />
            <Text as="span" fontSize="1rem" color="gray.100">
              Github
            </Text>
          </ChLink>
          <ChLink
            target="_blank"
            href={`/g/${game_slug}`}
            display="flex"
            flexDir={"column"}
            alignItems={"center"}
          >
            <Icon w="1.5rem" h="1.5rem" as={FiExternalLink} />
            <Text as="span" fontSize="1rem" color="gray.100">
              Public
            </Text>
          </ChLink>
        </VStack>
        <Flex flexDir="column">
          <Wrap align="stretch" flexGrow={1}>
            <Flex justifyItems={["left", "left"]}>
              <Link to={"/dev/game/" + game_slug}>
                <Image
                  src={imgUrl}
                  alt={"Icon for " + name}
                  minWidth={["5rem"]}
                  maxW={["5rem"]}
                  h={["5rem"]}
                  fallbackSrc={config.https.cdn + "placeholder.png"}
                />
              </Link>

              <Box>
                <Link to={"/dev/game/" + game_slug}>
                  <Heading
                    pl={["1rem"]}
                    pr="2rem"
                    align={["left", "left"]}
                    fontSize="2rem"
                    fontWeight="500"
                    color="gray.10"
                  >
                    {name}
                  </Heading>
                  <Heading
                    pl={["1rem"]}
                    align={["left", "left"]}
                    fontSize="1.4rem"
                    fontWeight="500"
                    color="gray.50"
                  >
                    {game_slug}
                  </Heading>
                </Link>
              </Box>
            </Flex>
          </Wrap>
          <Flex
            mt="2rem"
            pl="1rem"
            fontSize="1.4rem"
            spacing="1rem"
            flexDir="column"
            color="gray.100"
          >
            <HStack>
              {/* <Icon as={FiUsers} /> */}
              <Text as="span" fontWeight="300">
                Plays:
              </Text>
              <Text as="span"> {totalPlays || 0}</Text>
            </HStack>
            <HStack>
              <Text as="span" fontWeight="300">
                Favorites:
              </Text>
              <Text as="span">{totalVotes || 0}</Text>
            </HStack>
            <HStack>
              <Tooltip label="Published Version">
                <HStack>
                  <Text as="span" fontWeight="300">
                    Current Version:
                  </Text>
                  <Text as="span">{version || 0}</Text>
                </HStack>
              </Tooltip>
            </HStack>
            <HStack>
              <Tooltip label="Latest Version">
                <HStack>
                  <Text as="span" fontWeight="300">
                    Latest Version:
                  </Text>
                  <Text as="span">{latest_version || 0}</Text>
                </HStack>
              </Tooltip>
            </HStack>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
