import { Box, HStack, IconButton, Input } from "@chakra-ui/react";
import { IoSend } from "@react-icons";
import { useState } from "react";
import QuickChat from "./QuickChat.jsx";
export default function ChatSend({ isOpen }) {
  let [message, setMessage] = useState("");
  //   let emojiRef = useRef();
  return (
    // <Box w="100%" ref={emojiRef}>
    //   <HStack w="100%">
    //     <Icon as={HiOutlineEmojiHappy} color="white" />
    //     <Input placeholder="Type a message" value={message} />

    //   </HStack>
    // </Box>

    <Box
      position={"relative"}
      width={"100%"}
      spacing="0"
      m="0"
      // bgColor="gray.950"
      // mt="0.25rem"
      // borderTop={["2px solid var(--chakra-colors-gray-800)"]}
    >
      <Input
        name="name"
        id="name"
        title=""
        borderBottomRadius="8px"
        maxLength="120"
        lineHeight={"3.5rem"}
        pr={"4rem"}
        pl="4rem"
        height={["3.5rem", "3.5rem", "3.5rem"]}
        border="0"
        bgColor="gray.975"
        color="gray.10"
        fontSize="1.2rem"
        placeholder="Send a message"
        autoComplete="off"
        shadow={""}
        _focusVisible={{
          outline: "0px solid",
          outlineColor: "gray.700",
          //   borderTop: "1px solid",
          //   borderTopColor: "gray.700",
          bgColor: "gray.800",
        }}
        _placeholder={{ color: "gray.40", fontSize: "1.2rem" }}
        value={message || ""}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            // onSubmit(e)
          }
        }}
      />

      <QuickChat />
      <HStack
        alignItems={"center"}
        justifyContent="center"
        width="3rem"
        height={["3rem", "3rem", "3rem"]}
        position="absolute"
        top="0.25rem"
        right="0"
        spacing="0"
        zIndex={10}
      >
        <IconButton
          // onClick={onSubmit}

          icon={<IoSend size="1.6rem" />}
          width="2.8rem"
          isRound="true"
          color="brand.300"
          _hover={{
            color: "brand.500",
          }}
        />
      </HStack>
    </Box>
  );
}
