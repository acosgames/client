import { HStack, Input, Text } from '@chakra-ui/react'
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/form-control";
import { updateGameField } from '../../../actions/devgame';
import { useEffect, useRef } from 'react';

import { SketchPicker } from 'react-color';

function FSGColorPicker(props) {

    // const inputChange = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;

    //     updateGameField(name, value);
    // }

    // const inputRef = useRef();

    useEffect(() => {

        // if (props.focus) {
        //     setTimeout(() => {
        //         inputRef?.current?.focus();
        //     }, props.focusDelay || 300)
        // }

    }, [])

    return (
        <FormControl as='fieldset' mb="0">
            <FormLabel as='legend' color="gray.300" fontWeight="bold">
                <HStack>
                    <Text>{props.title}</Text>
                    {props.required && (
                        <Text display="inline-block" color="red.800">*</Text>
                    )}
                </HStack>
            </FormLabel>
            <SketchPicker
                color={props.value || '#f00'}
                onChange={props.onChange}
            />

            <FormHelperText>{props.helpText}</FormHelperText>


        </FormControl>
    )

}

export default FSGColorPicker;