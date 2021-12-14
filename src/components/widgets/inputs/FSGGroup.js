
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/form-control";
import { useColorModeValue, VStack, Heading, StackDivider } from "@chakra-ui/react";

function FSGGroup(props) {

    const borderColor = useColorModeValue('red.500', 'red.200')

    return (
        <VStack align='stretch' width="100%">
            <Heading
                as='h2'
                // ml="0rem"
                // pl="0.4rem"
                // pr="0.4rem"

                pt="4"
                pb="0.5rem"
                fontSize="2xl"
                fontWeight="800"
                color={props.color || "gray.100"}>
                {props.title}
            </Heading>
            <VStack
                // as='fieldset'
                pl={['0.5rem', '2rem', "3rem"]}
                pr={['0.5rem', '2rem', "3rem"]}
                pt="1rem"
                pb="1rem"
                // divider={<StackDivider borderColor='gray.700' ml="-3rem" mr="-3rem" mt="2rem" mb="`2rem" />}
                border={`1px solid #000`}
                // borderColor="#171c26"
                spacing="2rem"
                bgColor="gray.900"
                color="gray.100"
                borderRadius="14px">

                {props.children}
                {
                    props.helpText &&
                    <FormHelperText>
                        {props.helpText}
                    </FormHelperText>
                }



            </VStack >
        </VStack>
    )

}

export default FSGGroup;