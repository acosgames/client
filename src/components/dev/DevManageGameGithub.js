import { Icon, Link, Text, VStack } from "@chakra-ui/react";

import { FaExternalLinkAlt } from '@react-icons';

function DevManageGameGithub(props) {

    let acosgamesURL = "https://github.com/acosgames/";
    let githubURL = acosgamesURL + props.devgame?.game_slug
    return (
        <VStack>
            <Text as="span" fontSize="xs" fontWeight={'bold'}>Your GitHub repo in <Link fontSize="xs" href={acosgamesURL}>acosgames</Link> organization</Text>
            <Link target="_blank" fontWeight={'light'} color="yellow.100" fontSize="sm" href={githubURL}>{githubURL}</Link>
            <Text>
                <Link target="_blank" color="gray.300" fontSize="xs" href="https://docs.acos.games/#start-from-an-existing-game-template"><Icon as={FaExternalLinkAlt} color="white" fontSize="xs" /> Instructions to start from existing game template</Link>
            </Text>
        </VStack>
    )
}

export default DevManageGameGithub;
