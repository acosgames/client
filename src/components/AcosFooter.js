import { Box, Divider, HStack, SimpleGrid, Text, VStack, Link as ChLink, Icon } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { FaGithub, FaTwitter } from '@react-icons';

function AcosFooter() {
    return (
        <VStack pb={'2rem'} w="100%" justifyContent={'center'}>
            <Divider mt={10} mb={8} />
            <HStack spacing="2rem">
                <Text as="span" fontWeight="100" fontSize="xs">Copyright © 2022 Acos</Text>
                <Text fontSize="xs"><Link to="/">Games</Link></Text>
                <Text fontSize="xs"><Link to="/dev">Dev Zone</Link></Text>
                <Text fontSize="xs"><ChLink isExternal href="https://docs.acos.games">Docs</ChLink></Text>
                <Text fontSize="xs"><Link to="/privacy">Privacy</Link></Text>
                <Text fontSize="xs"><Link to="/terms">Terms</Link></Text>
                <Text fontSize="md"><ChLink href="https://github.com/acosgames"><Icon as={FaGithub} /></ChLink></Text>
                <Text fontSize="md"><ChLink href="https://twitter.com/acosgames"><Icon as={FaTwitter} /></ChLink></Text>
            </HStack>

        </VStack>
    )
}

export default AcosFooter;