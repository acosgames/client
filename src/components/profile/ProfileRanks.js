import { HStack, Image, VStack, Text, Heading, Wrap } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import config from '../../config'


function ProfileRank(props) {


    var imgUrl = config.https.cdn + 'placeholder.png';
    if (props.preview_images && props.preview_images.length > 0)
        imgUrl = `${config.https.cdn}g/${props.game_slug}/preview/${props.preview_images}`;

    return (
        <HStack>
            <Link to={'/g/' + props.game_slug}>
                <Image
                    w="64px" h="64px"
                    src={imgUrl}
                    fallbackSrc={config.https.cdn + 'placeholder.png'} />
            </Link>
            <VStack spacing={'0.2rem'} align={'left'}>
                <Text fontSize="xs" fontWeight={'bold'} as="span">{props.name}</Text>
                <Text fontSize="xs" fontWeight={'300'} as="span">{props.played} games played</Text>
                <Text fontSize="xs" fontWeight={'300'} as="span">{props.win || 0}-{props.tie || 0}-{props.loss || 0}</Text>
            </VStack>
        </HStack>
    )
}


function ProfileRanks(props) {

    let ranks = props.ranks;
    let rankElems = ranks.map(rank => <ProfileRank key={'profile-rank-' + rank.game_slug} {...rank} />)

    if (!ranks || ranks.length == 0) {
        return <></>
    }
    return (
        <VStack align='left' w="100%" spacing="1rem">
            <Heading size="md" as="h4">Games Played</Heading>
            <Wrap spacing="2rem" w="100%">
                {rankElems}
            </Wrap>
        </VStack>

    )
}

export default ProfileRanks;