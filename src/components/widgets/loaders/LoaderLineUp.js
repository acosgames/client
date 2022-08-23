import { Box } from '@chakra-ui/react'

export default function LoaderLineUp(props) {

    return (
        <Box transform={['scale(0.6)', 'scale(0.9)', 'scale(1)']}>
            <Box top="-1.2rem" className="loadersDots"  ></Box>
        </Box>
    )
}