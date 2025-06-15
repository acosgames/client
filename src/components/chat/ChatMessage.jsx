import {
    Box,
    HStack,
    Image,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    MenuOptionGroup,
    Text,
    VStack,
    IconButton,
    chakra,
    Flex,
} from "@chakra-ui/react";

import { BsThreeDotsVertical } from "react-icons/bs";
import config from "../../config";
import { Link } from "react-router-dom";
import timeAgo from "cc-time-ago";
import { useState } from "react";

const ChakraLink = chakra(Link);
import { motion } from "framer-motion";
export default function ChatMessage({ portraitid, countrycode, displayname, timestamp, message }) {
    let [showTime, setShowTime] = useState(false);

    let filename = `assorted-${portraitid || 1}-thumbnail.webp`;

    const onClick = () => {
        setShowTime(true);
        setTimeout(() => {
            setShowTime(false);
        }, 3000);
    };

    let ago = timeAgo(timestamp);
    ago = ago
        .replace("hour", "hr")
        .replace("minute", "min")
        .replace("second", "sec")
        .replace("ago", "");

    // return (
    //   <motion.div
    //     initial={{ opacity: 0 }}
    //     animate={{ opacity: 1 }}
    //     exit={{ opacity: 0 }}
    //     style={{ width: "100%" }}
    //     layout
    //   >
    //     <HStack w="100%" pb="1rem">
    //       <Box lineHeight={"1.8rem"}>
    //         <Box display="inline-block">
    //           <Image
    //             display="inline-block"
    //             src={`${config.https.cdn}images/portraits/${filename}`}
    //             loading="lazy"
    //             verticalAlign={"middle"}
    //             borderRadius={"4px"}
    //             width={["1.8rem"]}
    //             minWidth="1.8rem"
    //           />
    //           <Image
    //             src={`${config.https.cdn}images/country/${countrycode}.svg`}
    //             // mt="0.5rem"
    //             // ml="0.25rem"
    //             display="inline-block"
    //             verticalAlign={"middle"}
    //             borderColor="gray.100"
    //             borderRadius="4px"
    //             w="3rem"
    //             h="1.8rem"
    //             filter="opacity(0.8)"
    //             pr="0.5rem"
    //           />
    //           <Text
    //             as="span"
    //             fontSize="1.4rem"
    //             fontWeight="600"
    //             color="gray.30"
    //             // lineHeight="2rem"
    //             // overflow="hidden"
    //             // textOverflow={"ellipsis"}
    //             // whiteSpace={"nowrap"}
    //             wordBreak={"keep-all"}
    //             maxW={"17rem"}
    //           >
    //             {displayname}
    //           </Text>
    //           :
    //         </Box>
    //         <Box display="inline-block">
    //           <Text
    //             pl="1rem"
    //             // alignSelf={"flex-start"}
    //             as="span"
    //             fontSize="1.2rem"
    //             lineHeight={"1rem"}
    //             fontWeight="medium"
    //             color="gray.0"
    //             wordBreak={"break-all"}
    //             // width="100%"
    //           >
    //             {message}
    //           </Text>
    //         </Box>
    //       </Box>
    //     </HStack>
    //   </motion.div>
    // );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: "100%" }}
            layout
        >
            <VStack
                w="100%"
                spacing="0"
                // bgColor="gray.1000"
                // mx={["0.125rem", "0.25rem"]}
                // px={["0.25rem", "0.5rem"]}
                pt="0.5rem"
                mb="0.5rem"
                justifyContent={"flex-start"}
                alignItems={"flex-start"}
                onClick={onClick}
                // border="1px solid"
                // borderColor="gray.750"
                _hover={{
                    bgColor: "gray.900",
                }}
                // bgColor="gray.750"
                borderRadius={"8px"}
                // borderTopLeftRadius={"0"}
                // clipPath="polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)"
            >
                <HStack
                    w="100%"
                    justifyContent={"flex-start"}
                    alignItems={"flex-start"}
                    spacing="0"
                    pl="0.5rem"
                >
                    <VStack position="relative">
                        {/* <ChakraLink to={"/profile/" + username}> */}
                        <Image
                            display="inline-block"
                            src={`${config.https.cdn}images/portraits/${filename}`}
                            loading="lazy"
                            verticalAlign={"middle"}
                            borderRadius={"50%"}
                            width={["3rem"]}
                            minWidth="3rem"
                        />

                        <Image
                            src={`${config.https.cdn}images/country/${countrycode}.svg`}
                            // mt="0.5rem"
                            borderColor="gray.100"
                            borderRadius="3px"
                            w="1.5rem"
                            h="1.1rem"
                            filter="opacity(0.9)"
                            position="absolute"
                            top="-0.25rem"
                            right="-0.25rem"
                            zIndex="3"
                        />

                        {/* </ChakraLink> */}
                    </VStack>
                    <VStack
                        w="100%"
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                        flex="1"
                        spacing="0"
                        pl="1rem"
                    >
                        <HStack w="100%" spacing="0">
                            {/* <ChakraLink to={"/profile/" + username} h="2rem" flex="1"> */}
                            <Text
                                display="inline-block"
                                as="span"
                                fontSize="1.2rem"
                                fontWeight="500"
                                color="brand.200"
                                pr="0.5rem"
                                lineHeight="2rem"
                                overflow="hidden"
                                textOverflow={"ellipsis"}
                                whiteSpace={"nowrap"}
                                maxW={"17rem"}
                            >
                                {displayname}
                            </Text>

                            {/* <Image
                                src={`${config.https.cdn}images/country/${countrycode}.svg`}
                                // mt="0.5rem"
                                // ml="0.25rem"
                                display="inline-block"
                                verticalAlign={"middle"}
                                borderColor="gray.100"
                                borderRadius="2px"
                                w="1.8rem"
                                h="1.35rem"
                                filter="opacity(0.8)"
                            /> */}
                            <Box flex="1" h="2rem" w="0.1rem"></Box>
                            {/* </ChakraLink> */}
                            <Text
                                // pr="2rem"
                                as="span"
                                textAlign={"center"}
                                lineHeight={"2rem"}
                                display={"block"}
                                // alignSelf="flex-end"
                                // justifySelf={"flex-end"}
                                fontSize="1rem"
                                fontWeight="300"
                                color="gray.100"
                                // height="1rem"
                                // lineHeight={"1rem"}
                                position="relative"
                                // top="-1.25rem"
                            >
                                {ago}
                            </Text>
                            <ChatMessageMenu />
                        </HStack>
                        <VStack
                            w="100%"
                            // mt="0.5rem"
                            // p="1rem"
                            // py="0.5rem"
                            p="0"
                            pt="0rem"
                            // pb="1rem"
                            // bgColor="gray.900"
                            borderRadius={"8px"}
                        >
                            <Text
                                alignSelf={"flex-start"}
                                display="inline-block"
                                as="span"
                                fontSize="1.2rem"
                                fontWeight="medium"
                                lineHeight="1.5rem"
                                color="gray.10"
                                wordBreak={"break-word"}
                                pr="1.5rem"
                                pb="0.5rem"
                                // width="100%"
                            >
                                {message}
                            </Text>
                        </VStack>
                    </VStack>
                    {/* <Text fontSize="1rem" fontWeight="bold" color="gray.200">
          {msgTime}
        </Text> */}
                </HStack>
            </VStack>
        </motion.div>
    );
}

function ChatMessageMenu() {
    return (
        <Menu placement="bottom" isLazy>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                color="gray.100"
                icon={<BsThreeDotsVertical fontSize="1.5rem" />}
                variant="unstyled"
                height="2rem"
                minW="1rem"
                textAlign={"center"}
                p="0"
                px="0.25rem"
                // pl="0.5rem"
                _hover={{
                    color: "gray.0",
                }}
                // filter={
                //   "drop-shadow(1px 1px 2px var(--chakra-colors-gray-1200)) drop-shadow(1px 1px 2px var(--chakra-colors-gray-1200))"
                // }
            />
            <MenuList zIndex={3} borderColor="gray.900" bgColor="gray.975" fontSize="1.2rem">
                <MenuOptionGroup
                    color="gray.0"
                    fontWeight={"500"}
                    title="Get Involved"
                    type="checkbox"
                >
                    <MenuItem
                        fontSize="1.4rem"
                        // icon={
                        //   <Icon
                        //     as={IoShareSocial}
                        //     fontSize="2rem"
                        //     color="brand.300"
                        //   />
                        // }
                        color="gray.0"
                        bgColor="gray.975"
                        _hover={{ bgColor: "gray.800" }}
                        // onClick={onShareClick}
                    >
                        Invite Friends
                    </MenuItem>
                    <MenuItem
                        fontSize="1.4rem"
                        // icon={
                        //   <Icon as={FaGithub} fontSize="2rem" color="brand.300" />
                        // }
                        color="gray.0"
                        bgColor="gray.975"
                        _hover={{ bgColor: "gray.800" }}
                        as="a"
                        // href={`https://github.com/acosgames/${game.game_slug}/issues`}
                        target="_blank"
                    >
                        Discuss on Github
                    </MenuItem>
                </MenuOptionGroup>
            </MenuList>
        </Menu>
    );
}
