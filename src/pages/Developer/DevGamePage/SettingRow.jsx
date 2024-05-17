import { Box, HStack, Text } from "@chakra-ui/react";

export default function SettingRow({ title, value, fontSize, hideBorder }) {
    return (
        <HStack
            alignItems={"left"}
            w="100%"
            spacing="2rem"
            px="2rem"
            pr="3rem"
            pt="0.25rem"
            borderBottom={
                !hideBorder ? "1px dotted var(--chakra-colors-gray-700)" : ""
            }
        >
            <Text
                color={"gray.50"}
                fontSize={fontSize || "1.6rem"}
                fontWeight="400"
            >
                {title}
            </Text>
            <Box flex="1"></Box>
            <Text
                as="span"
                fontSize={fontSize || "1.6rem"}
                fontWeight="500"
                color={"gray.50"}
            >
                {value}
            </Text>
        </HStack>
    );
}
