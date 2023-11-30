import { Button, Heading, VStack, Text, HStack } from "@chakra-ui/react";
import config from "../../../config/index.js";
import AchievementIcon from "./AchievementIcon.jsx";
import AchievementExperienceBar from "./AchievementExperienceBar.jsx";

export default function AchievementPanel({
  name,
  desc,
  index,
  value,
  maxValue,
  interval,
}) {
  // <Image
  //                 display={'inline-block'}
  //                 src=
  //                 loading="lazy"
  //                 title={''}
  //                 height="7rem"
  //                 position="relative"
  //                 top="1rem"
  //             />

  let color = "gray.20";

  desc += "a sdlkfjaskdlf laskdfjlkadsfkladsf";
  let percent = (value / maxValue) * 100;

  if (percent >= 100) color = "brand.300";
  else if (percent > 0) color = "brand.900";

  return (
    <VStack
      p="1rem"
      // px="1rem"
      // pb="0.5rem"
      minW="15rem"
      w="30rem"
      role="group"
      bgColor="gray.875"
      borderRadius="12px"
      border="1px solid #27313f"
      position="relative"
      spacing="0.5rem"
      overflow="hidden"
      zIndex="1"
      clipPath="polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)"
      // _before={{
      //   content: "''",
      //   position: "absolute",
      //   left: "-3rem",
      //   top: "-30px",
      //   width: "30px",
      //   height: "20rem",
      //   bgColor: "gray.900",
      //   transform: "rotate(-55deg)",
      //   transition: "all 0.3s ease-out 0s",
      //   opacity: 0.55,
      //   zIndex: -1,
      // }}
      // _after={{
      //   content: "''",
      //   position: "absolute",
      //   left: "auto",
      //   right: "-3rem",
      //   top: "-30px",
      //   width: "30px",
      //   height: "20rem",
      //   bgColor: "gray.950",
      //   transform: "rotate(55deg)",
      //   transition: "all 0.3s ease-out 0s",
      //   opacity: 0.55,
      //   zIndex: -1,
      // }}
    >
      <HStack spacing="0" pr="0.5rem">
        <AchievementIcon index={index} percent={percent} />
        <VStack alignItems={"flex-start"}>
          <Heading
            as="h4"
            fontSize="1.4rem"
            fontWeight="bold"
            color={"gray.10"}
            textAlign={"left"}
          >
            {name}
          </Heading>
          <Heading
            as="h5"
            fontSize="1.4rem"
            fontWeight={"normal"}
            color={"gray.30"}
            title={desc}
            textAlign={"left"}
            // whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            w="20rem"
            maxHeight="3.6rem"
          >
            {desc}
          </Heading>
        </VStack>
      </HStack>
      <VStack px="0rem" w="100%" justifyContent={"flex-end"}>
        <AchievementExperienceBar percent={percent} />
        <AmountRemaining value={value} maxValue={maxValue} />
      </VStack>
    </VStack>
  );
}

function AmountRemaining({ value, maxValue }) {
  value = Math.min(value, maxValue);
  if (value == maxValue) {
    return (
      <Heading as="h6" fontSize="1.2rem" fontWeight="500" color={"gray.20"}>
        Completed
      </Heading>
    );
  }
  return (
    <Heading as="h6" fontSize="1.2rem" fontWeight="500" color={"gray.20"}>
      <Text as="span" fontWeight="bold">
        {value}
      </Text>{" "}
      of {maxValue}
    </Heading>
  );
}
