import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Text,
    HStack,
} from '@chakra-ui/react'
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/form-control";
import { updateGameField } from '../../../actions/devgame';

function FSGNumberInput(props) {


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

            <NumberInput
                // defaultValue={2} 
                min={props.min}
                max={props.max}
                name={props.name}
                id={props.id}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                value={props.value || ''}
                size={props.size || 'md'}
                onChange={props.onChange}
                disabled={props.disabled}
                bgColor="gray.800"
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            <FormHelperText>{props.helpText}</FormHelperText>


        </FormControl>
    )

}

export default FSGNumberInput;