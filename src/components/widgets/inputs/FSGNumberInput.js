import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
} from '@chakra-ui/react'
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/form-control";
import { updateGameField } from '../../../actions/devgame';

function FSGNumberInput(props) {

    const inputChange = (value) => {
        let name = props.name;

        updateGameField(name, value, 'create-game_info', 'devgame', 'devgameerror');
    }

    return (
        <FormControl as='fieldset' mb="0">
            <FormLabel as='legend' color="gray.400">{props.title}</FormLabel>

            <NumberInput defaultValue={2} min={props.min} max={props.max}
                name={props.name}
                id={props.id}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                value={props.value || ''}
                size={props.size || 'md'}
                onChange={props.onChange}
                disabled={props.disabled}
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