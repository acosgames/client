import { Box, HStack, IconButton, Input } from "@chakra-ui/react";
import { IoSend } from "@react-icons";
import { useState } from "react";

export default function ChatSend({}) {
  let [message, setMessage] = useState("");
  //   let emojiRef = useRef();
  return (
    // <Box w="100%" ref={emojiRef}>
    //   <HStack w="100%">
    //     <Icon as={HiOutlineEmojiHappy} color="white" />
    //     <Input placeholder="Type a message" value={message} />

    //   </HStack>
    // </Box>

    <Box position={"relative"} width={"100%"} spacing="0" m="0">
      <Input
        name="name"
        id="name"
        title=""
        // borderRadius="4px"
        maxLength="120"
        lineHeight={"3rem"}
        pr={"3rem"}
        height={["3rem", "3rem", "3rem"]}
        border="0"
        bgColor="gray.900"
        color="gray.50"
        fontSize="1.2rem"
        placeholder="Type a message..."
        autoComplete="off"
        shadow={""}
        _focusVisible={{
          outline: "1px solid",
          outlineColor: "gray.700",
          //   borderTop: "1px solid",
          //   borderTopColor: "gray.700",
          bgColor: "gray.900",
        }}
        _placeholder={{ color: "gray.200" }}
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
      <HStack
        alignItems={"center"}
        justifyContent="center"
        width="3rem"
        height={["3rem", "3rem", "3rem"]}
        position="absolute"
        top="0"
        right="0"
        spacing="0"
        zIndex={10}
      >
        <IconButton
          // onClick={onSubmit}

          icon={<IoSend size="1.6rem" />}
          width="2.8rem"
          isRound="true"
          color="gray.50"
        />
      </HStack>
    </Box>
  );
}
