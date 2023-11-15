import { Box, HStack, Heading, Text, VStack } from "@chakra-ui/react";

export default function GameBuildInfo({ game }) {
  const parseDate = (dt) => {
    if (!dt) return "";
    return dt.split(" ")[0];
  };

  let screentype = game.screentype;
  switch (screentype) {
    case 1:
      screentype = "Fullscreen";
      break;
    case 2:
      screentype = "Fixed Resolution";
      break;
    case 3:
      screentype = "Scaled Resolution";
      break;
  }

  let resow = game.resow;
  let resoh = game.resoh;
  let screenwidth = game.screenwidth;
  let resolution = resow + ":" + resoh;
  if (game.screentype == 3) {
    resolution += " @ " + screenwidth + "px";
  }

  return (
    <VStack
      w="100%"
      maxW={["100%", "100%", "100%", "95%", "70%", "60%"]}
      padding="4.5rem"
      bgColor="gray.825"
      borderRadius={"8px"}
      boxShadow={"0px 3px 7px 0px rgba(0, 0, 0, 0.21)"}
      clipPath="polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)"
      alignItems={"flex-start"}
    >
      <Heading
        textAlign={"left"}
        as="h4"
        fontSize={["3.2rem", "2.4rem", "2.4rem", "3.2rem"]}
        color="gray.0"
      >
        BUILD INFORMATION
      </Heading>
      <Box
        w="100%"
        my="2.5rem"
        borderTop={"2px solid"}
        borderTopColor={"brand.500"}
      ></Box>
      <VStack
        w="100%"
        spacing="0"
        justifyContent={"center"}
        alignItems={"center"}
      >
        <HStack
          spacing={["3rem", "4rem", "5rem", "6rem"]}
          // borderBottom="2px dashed"
          // borderBottomColor="gray.925"
        >
          <BuildInfoLine title="Released" value={parseDate(game.tsinsert)} />
          <BuildInfoLine
            title="Last Updated"
            value={parseDate(game.tsupdate)}
          />
        </HStack>
        <HStack
          spacing={["3rem", "4rem", "5rem", "6rem"]}
          // borderBottom="2px dashed"
          //  borderBottomColor="gray.925"
        >
          <BuildInfoLine title="Published" value={"v" + game.version} />
          <BuildInfoLine
            title="Experimental"
            value={"v" + game.latest_version}
          />
        </HStack>
        <HStack spacing={["3rem", "4rem", "5rem", "6rem"]}>
          <BuildInfoLine title="Screen Type" value={screentype} />
          {game.screentype != 1 && (
            <BuildInfoLine title="Resolution" value={resolution} />
          )}
        </HStack>
      </VStack>
    </VStack>
  );
}

function BuildInfoLine({ title, value }) {
  return (
    <VStack
      py="1rem"
      // px="4rem"
      alignItems={"flex-start"}
    >
      <Text
        fontSize={["1.4rem", "1.4rem", "1.6rem"]}
        as="span"
        color="gray.0"
        fontWeight={"600"}
        w={["10rem", "16rem", "16rem", "20rem"]}
      >
        {title}
      </Text>
      <Text
        as="span"
        color="gray.10"
        fontSize="1.6rem"
        fontWeight={"400"}
        w={["10rem", "16rem", "16rem", "20rem"]}
        // whiteSpace={"nowrap"}
      >
        {value}
      </Text>
    </VStack>
  );
}
