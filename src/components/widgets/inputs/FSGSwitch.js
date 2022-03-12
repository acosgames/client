import { HStack, Input, Switch, Text } from '@chakra-ui/react'
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/form-control";
import { updateGameField } from '../../../actions/devgame';
import { useEffect, useRef } from 'react';


function FSGSwitch(props) {

    // const inputChange = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;

    //     updateGameField(name, value);
    // }

    const inputRef = useRef();

    useEffect(() => {

        if (props.focus) {
            setTimeout(() => {
                inputRef?.current?.focus();
            }, props.focusDelay || 300)
        }

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
            <Switch
                id={props.id}
                name={props.name}
                ref={props.ref || inputRef}
                placeholder={props.placeholder}
                value={props.value || ''}
                onChange={props.onChange}
                onFocus={props.onFocus}
                disabled={props.disabled}
            />
            {/* <Input
                name={props.name}
                id={props.id}
                ref={props.ref || inputRef}
                placeholder={props.placeholder}
                maxLength={props.maxLength}
                value={props.value || ''}
                size={props.size}
                width={props.width}
                onKeyDown={props.onKeyDown}
                onChange={props.onChange}
                onFocus={props.onFocus}
                disabled={props.disabled}
                bgColor="gray.800"
            /> */}

            <FormHelperText>{props.helpText}</FormHelperText>


        </FormControl>
    )

}

export default FSGSwitch;