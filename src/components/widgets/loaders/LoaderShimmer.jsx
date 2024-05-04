import { Box, Text } from '@chakra-ui/react'

export default function LoaderShimmer(props) {

    return (
        <Text bg="gray.900" p="0.3rem" borderRadius="7px" as="span" lineHeight={'1rem'} color="white" fontWeight={'bolder'}>
            {props.title}
        </Text>
    )
}