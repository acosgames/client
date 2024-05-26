import {
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Text,
    HStack,
} from "@chakra-ui/react";
import {
    FormControl,
    FormLabel,
    FormHelperText,
} from "@chakra-ui/form-control";
import { updateGameField } from "../../../actions/devgame";
import { useBucketSelector } from "../../../actions/bucket";
import { btFormFields } from "../../../actions/buckets";
// import fs from 'flatstore';

export default function FSGNumberInput(props) {
    // let value = useBucketSelector(btFormFields, (form) =>
    //     form[props.group] && form[props.group][props.name]
    //         ? form[props.group][props.name]
    //         : null
    // );
    // value = value == null || typeof value === "undefined" ? 0 : value;

    let formValue = props.useValue
        ? props.useValue(props.name)
        : useBucketSelector(btFormFields, (form) =>
              form[props.group] && form[props.group][props.name]
                  ? form[props.group][props.name]
                  : null
          );

    return (
        <FormControl as="fieldset" mb="0">
            <FormLabel
                as="legend"
                fontSize="xs"
                color="gray.100"
                fontWeight="bold"
            >
                <HStack>
                    <Text
                        color={props.titleColor || "gray.10"}
                        fontSize="1.4rem"
                        fontWeight="500"
                    >
                        {props.title}
                    </Text>
                    {props.required && (
                        <Text display="inline-block" color="red.800">
                            *
                        </Text>
                    )}
                </HStack>
            </FormLabel>

            <NumberInput
                allowMouseWheel
                // defaultValue={2}
                min={props.min || Number.MIN_SAFE_INTEGER}
                max={props.max || Number.MAX_SAFE_INTEGER}
                name={props.name}
                id={props.id}
                placeholder={props.placeholder}
                // maxLength={props.maxLength}
                step={props.step}
                value={formValue}
                size={props.size || "md"}
                onChange={(e) => {
                    // if (props.rules && props.group) {
                    //     updateGameField(
                    //         props.name,
                    //         Number.parseInt(e),
                    //         props.rules,
                    //         props.group,
                    //         props.error
                    //     );
                    // }
                    if (props.integer) {
                        e = e
                            .replace("e", "")
                            .replace(".", "")
                            .replace("+", "")
                            .replace(/([0-9]+)(\-)/g, "$1")
                            .replace(/(\-)+\-/g, "$1");
                    }

                    if (props.float) {
                        e = e
                            .replace("e", "")
                            // .replace(".", "")
                            .replace("+", "")
                            .replace(/([0-9]+)(\-)/g, "$1")
                            .replace(/(\-)+\-/g, "$1");

                        let parts = e.split(".");
                        if (parts.length > 1) {
                            e = parts[0];
                            parts.shift();
                            e += "." + parts.join("");
                        }
                    }
                    // props.onChange({ target: { name: props.name, value: e } });
                    if (props.onChange) props.onChange(e);
                    if (props.useTarget) props.useTarget(props.name, e);
                }}
                disabled={props.disabled}
                bgColor={props.bgColor || "gray.950"}
                borderRadius={props.borderRadius || "8px"}
                color={props.color || "gray.10"}
            >
                <NumberInputField
                    color={props.color || "gray.10"}
                    p={props.p || "1.5rem"}
                    fontSize={props.fontSize || "1.4rem"}
                    borderRadius={props.borderRadius || "8px"}
                />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>

            <FormHelperText>{props.helpText}</FormHelperText>
        </FormControl>
    );
}

// let onCustomWatched = ownProps => {
//     if (ownProps.group)
//         return [ownProps.group];
//     return [];
// };
// let onCustomProps = (key, value, store, ownProps) => {
//     // if (key == (ownProps.group + '>' + ownProps.name))
//     //     return { [key]: value }
//     return { [ownProps.id]: value };
// };

// export default fs.connect([], onCustomWatched, onCustomProps)(FSGNumberInput);
