import { HStack, Input, Text } from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/form-control";
// import { updateGameField } from '../../../actions/devgame';
import { useEffect, useRef } from "react";

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

  let value = (props.group && props[props.group]) || props.value;
  return (
    <FormControl as="fieldset" mb="0">
      <FormLabel
        as="legend"
        fontSize="xs"
        color="gray.100"
        fontWeight="bold"
        display={props.title ? "block" : "none"}
      >
        <HStack>
          <Text color={props.titleColor || "white"}>{props.title}</Text>
          {props.required && (
            <Text display="inline-block" color="red.800">
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
        fontSize={props.fontSize || "sm"}
        color={props.color}
        pr={props.pr || 0}
        maxLength={props.maxLength}
        value={value || ""}
        size={props.size}
        width={props.width}
        border={props.border}
        height={props.height}
        onKeyPress={props.onKeyPress}
        onKeyUp={props.onKeyUp}
        boxShadow={props.boxShadow}
        borderRadius={props.borderRadius}
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
        bgColor={props.bgColor || "gray.800"}
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
