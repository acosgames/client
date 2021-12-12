import { HStack, Input, Text } from '@chakra-ui/react'
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/form-control";
import { updateGameField } from '../../../actions/devgame';


function FSGTextInput(props) {

    // const inputChange = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;

    //     updateGameField(name, value);
    // }

    return (
        <FormControl as='fieldset' mb="0">
            <FormLabel as='legend' color="gray.400" fontWeight="bold">
                <HStack>
                    <Text>{props.title}</Text>
                    {props.required && (
                        <Text display="inline-block" color="red.800">*</Text>
                    )}
                </HStack>
            </FormLabel>
            <Input
                name={props.name}
                id={props.id}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                value={props.value || ''}
                size={props.size || 'md'}
                onChange={props.onChange}
                disabled={props.disabled}
                bgColor="gray.800"
            />

            <FormHelperText>{props.helpText}</FormHelperText>


        </FormControl>
    )

}

export default FSGTextInput;