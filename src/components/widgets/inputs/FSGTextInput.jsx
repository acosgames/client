import { HStack, Input, Text } from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormHelperText,
} from "@chakra-ui/form-control";
// import { updateGameField } from '../../../actions/devgame';
import { useEffect, useRef } from "react";
import { useBucket, useBucketSelector } from "../../../actions/bucket";
import { btFormFields } from "../../../actions/buckets";

function FSGTextInput(props) {
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
            }, props.focusDelay || 300);
        }
    }, []);

    let formValue = useBucketSelector(btFormFields, (form) =>
        form[props.group] && form[props.group][props.name]
            ? form[props.group][props.name]
            : null
    );
    let value =
        typeof formValue !== "undefined" ? formValue : props.value || "";

    return (
        <FormControl as="fieldset" mb="0">
            <FormLabel as="legend" display={props.title ? "block" : "none"}>
                <HStack>
                    <Text
                        color={props.titleColor || "gray.10"}
                        fontSize="1.4rem"
                        fontWeight="500"
                    >
                        {props.title}
                    </Text>
                    {props.required && (
                        <Text display="inline-block" color="red.500">
                            *
                        </Text>
                    )}
                </HStack>
            </FormLabel>
            <Input
                name={props.name}
                id={props.id}
                ref={props.ref || inputRef}
                placeholder={props.placeholder}
                fontWeight={props.fontWeight || "light"}
                fontSize={props.fontSize || "1.4rem"}
                color={props.color || "gray.10"}
                // pr={props.pr || 0}
                p={props.p || "1.5rem"}
                maxLength={props.maxLength}
                value={value || ""}
                size={props.size}
                width={props.width}
                border={props.border}
                height={props.height}
                onKeyPress={props.onKeyPress}
                onKeyUp={props.onKeyUp}
                boxShadow={props.boxShadow}
                borderRadius={props.borderRadius || "8px"}
                onKeyDown={props.onKeyDown}
                onChange={(e) => {
                    if (props.rules && props.group) {
                        // updateGameField(props.name, e.target.value, props.rules, props.group, props.error);
                    }
                    props.onChange(e);
                }}
                onFocus={props.onFocus}
                disabled={props.disabled}
                autoComplete={props.autoComplete}
                _focus={{ ...props._focus }}
                _focusVisible={{ ...props._focusVisible }}
                _placeholder={{ ...props._placeholder }}
                bgColor={props.bgColor || "gray.950"}
            />

            <FormHelperText display={props.helpText ? "block" : "none"}>
                {props.helpText}
            </FormHelperText>
        </FormControl>
    );
}

let onCustomWatched = (ownProps) => {
    if (ownProps.group) return [ownProps.group];
    return [];
};
let onCustomProps = (key, value, store, ownProps) => {
    // if (key == (ownProps.group + '>' + ownProps.name))
    //     return { [key]: value }
    return { value: value };
};

export default FSGTextInput;
// export default fs.connect([], onCustomWatched, onCustomProps)(FSGTextInput);
