import { Button, Heading, VStack, Text } from "@chakra-ui/react";
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

  let percent = (value / maxValue) * 100;

  if (percent >= 100) color = "brand.300";
  else if (percent > 0) color = "brand.900";

  return (
    <VStack
      p="2rem"
      minW="12rem"
      bgColor="gray.825"
      borderRadius="12px"
      border="1px solid #27313f"
    >
      <Heading as="h4" fontSize="1.4rem" fontWeight="bold" color={"gray.10"}>
        {name}
      </Heading>
      <AchievementIcon index={index} percent={percent} />
      <Heading as="h5" fontSize="1.2rem" fontWeight={"bold"} color={color}>
        {desc}
      </Heading>
      <AchievementExperienceBar percent={percent} />
      {maxValue && (
        <Heading as="h6" fontSize="1.2rem" fontWeight="500" color={"gray.20"}>
          <Text as="span" fontWeight="bold">
            {value}
          </Text>{" "}
          out of {maxValue}
        </Heading>
      )}
    </VStack>
  );
}
