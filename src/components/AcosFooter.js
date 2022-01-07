import { Box, Divider, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";



function AcosFooter() {
    return (
        <VStack pb={'2rem'} w="100%" justifyContent={'center'}>
            <Divider mt={10} mb={8} />
            <HStack spacing="2rem">
                <Text as="span" fontWeight="100" fontSize="xs">Copyright © 2022 Acos</Text>
                <Text fontSize="xs"><Link to="/">Games</Link></Text>
                <Text fontSize="xs"><Link to="/dev">Developer Zone</Link></Text>
                <Text fontSize="xs"><Link to="/privacy">Privacy</Link></Text>
                <Text fontSize="xs"><Link to="/terms">Terms and Conditions</Link></Text>
            </HStack>

        </VStack>
    )
}

export default AcosFooter;