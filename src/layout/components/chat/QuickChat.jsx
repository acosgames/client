import {
  Box,
  Button,
  HStack,
  IconButton,
  Portal,
  VStack,
} from "@chakra-ui/react";
import {
  RiChatHeartFill,
  FaThumbsUp,
  FaThumbsDown,
  FaAngry,
} from "@react-icons";
import { useEffect, useState } from "react";
import { sendChatMessage } from "../../../actions/chat";
import fs from "flatstore";

export default function QuickChat({ degreeOffset, isOpen }) {
  let [show, setShow] = useState(false);

  let [category, setCategory] = useState(0);
  const onClickOut = () => {
    setShow(false);
    setCategory(0);
  };

  const onClickCategory = (e, catid) => {
    e.stopPropagation();
    if (category == catid) setCategory(0);
    else setCategory(catid);
  };

  const onClickChatMessage = async (e, msg) => {
    console.log("Sending message: ", msg);
    fs.set("chatMessage", msg);
    await sendChatMessage();
    // fs.set("chatMessage", "");
  };

  useEffect(() => {
    document.addEventListener("click", onClickOut);
  }, []);

  degreeOffset = degreeOffset || 0;

  return (
    // <Portal>
    <HStack
      width="3rem"
      height={"3rem"}
      position="absolute"
      bottom="0.25rem"
      right="25.5rem"
      zIndex={1001}
    >
      <IconButton
        // onClick={onSubmit}
        onClick={(e) => {
          setShow(!show);
          if (show) setCategory(0);
          e.stopPropagation();
          return false;
        }}
        icon={<RiChatHeartFill size="2rem" />}
        width="3.5rem"
        height="3.5rem"
        isRound="true"
        color="blue.400"
        _hover={{
          color: "blue.300",
        }}
        _focus={{
          color: "blue.300",
        }}
      />
      {category && (
        <ChatChoices
          category={category}
          onClickChatMessage={onClickChatMessage}
        />
      )}
      {show && (
        <Box w="auto" h="auto" position="absolute" top="0" left="0">
          <OrbitButton
            icon={
              <FaAngry
                filter="drop-shadow(1px 1px 1px var(--chakra-colors-brand.500))"
                size="2rem"
              />
            }
            onClickCategory={onClickCategory}
            category={1}
            degrees={-5 + degreeOffset}
            radius={35}
          />
          <OrbitButton
            icon={
              <FaThumbsDown
                filter="drop-shadow(1px 1px 1px var(--chakra-colors-brand.500))"
                size="2rem"
              />
            }
            onClickCategory={onClickCategory}
            category={2}
            degrees={45 + degreeOffset}
            radius={35}
          />
          <OrbitButton
            icon={
              <FaThumbsUp
                filter="drop-shadow(1px 1px 1px var(--chakra-colors-brand.500))"
                size="2rem"
              />
            }
            onClickCategory={onClickCategory}
            category={3}
            degrees={95 + degreeOffset}
            radius={35}
          />
        </Box>
      )}
    </HStack>
    // </Portal>
  );
}

const quickMessages = [
  ["none"],
  ["Nice Move!", "Wow!", "OMG!", "Awesome!"],
  ["Okay.", "Savage!", "%@#$!", "Noooo!"],
  ["GG", "Thanks!", "Passing!", "Sorry!"],
];
function ChatChoices({ category, onClickChatMessage }) {
  return (
    <VStack
      spacing="0"
      w="16rem"
      position="absolute"
      bottom="0"
      left="8rem"
      bgColor="gray.900"
      borderRadius="8px"
    >
      {quickMessages[category].map((msg) => (
        <ChatChoice
          key={"chatchoice-" + msg}
          msg={msg}
          onClickChatMessage={onClickChatMessage}
        />
      ))}
    </VStack>
  );
}

function ChatChoice({ msg, onClickChatMessage }) {
  return (
    <Button
      w="100%"
      textAlign={"center"}
      bg="linear-gradient(to right,var(--chakra-colors-gray-600) 50%, var(--chakra-colors-gray-800))"
      color="gray.0"
      borderRadius="8px"
      border="1px solid"
      borderColor="gray.825"
      p="1rem"
      py="2rem"
      //   transition="all 0.1s linear"
      //   letterSpacing={"-1px"}
      textShadow="1px 1px 3px var(--chakra-colors-gray-200)"
      justifyContent={"center"}
      _hover={{
        bg: "brand.300",
        color: "gray.0",
      }}
      onClick={(e) => onClickChatMessage(e, msg)}
    >
      {msg}
    </Button>
  );
}

function OrbitButton({ icon, degrees, radius, category, onClickCategory }) {
  let [curRadius, setRadius] = useState(0);

  let radians = (degrees * Math.PI) / 180;
  let width = 35;
  let height = 35;
  let x = Math.sin(radians) * curRadius;
  let y = -Math.cos(radians) * curRadius;

  useEffect(() => {
    setRadius(radius);
  }, []);

  return (
    <IconButton
      onClick={(e) => onClickCategory(e, category)}
      position="absolute"
      top="0"
      left="0"
      zIndex={10}
      transition="all 0.2s ease"
      icon={icon}
      transformOrigin="center"
      transform={`translate(${x}px, ${y}px)`}
      width={`${width}px`}
      height={`${height}px`}
      isRound="true"
      color="gray.0"
      bgColor="gray.60"
      bg="linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-800))"
      border="2px solid"
      borderColor="gray.600"
      _hover={{
        // bgColor: "brand.500",
        color: "brand.200",
        zIndex: 11,
        transform: `translate(${x}px, ${y}px) scale(1.2)`,
      }}
      _focus={{
        // bgColor: "brand.500",
        bg: "linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-800))",
        color: "brand.200",
        zIndex: 11,
        transform: `translate(${x}px, ${y}px) scale(1.2)`,
      }}
    />
  );
}
