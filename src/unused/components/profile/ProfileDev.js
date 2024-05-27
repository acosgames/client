import { HStack, Image, VStack, Text, Heading, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import config from '../../config'


function ProfileDevGame(props) {

    var imgUrl = config.https.cdn + 'placeholder.png';
    if (props.preview_images && props.preview_images.length > 0)
        imgUrl = `${config.https.cdn}g/${props.game_slug}/preview/${props.preview_images}`;

    return (
        <Link to={'/g/' + props.game_slug}>
            <VStack>

                <Image
                    w="64px" h="64px"
                    src={imgUrl}
                    fallbackSrc={config.https.cdn + 'placeholder.png'} />

                <Text fontSize="xs" fontWeight={'bold'} as="span">{props.name}</Text>

            </VStack>
        </Link>
    )
}

function ProfileDev(props) {

    let devgames = props.devgames;

    if (!devgames || devgames.length == 0) {
        return <></>
    }

    let devElems = devgames.map(game => <ProfileDevGame key={'profile-dev-' + game.game_slug} {...game} />)


    return (
        <VStack align='left' w="100%" spacing="1rem">
            <Heading size="md" as="h4">Games Developed</Heading>
            <Wrap spacing="2rem" w="100%">
                {devElems}
            </Wrap>
        </VStack>

    )
}

export default ProfileDev;