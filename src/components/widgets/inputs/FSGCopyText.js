import { HStack, Input, Text } from '@chakra-ui/react'
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/form-control";
import { updateGameField } from '../../../actions/devgame';


function FSGCopyText(props) {

    // const inputChange = (e) => {
    //     let name = e.target.name;
    //     let value = e.target.value;

    //     updateGameField(name, value);
    // }

    return (

        <Input
            name={props.name}
            id={props.id}
            ref={props.copyRef}
            value={props.value || ''}
            width={props.width}
            onFocus={props.onFocus}
            fontSize="8px"
            readOnly
            size="xs"
            bgColor="gray.800"
        />


    )

}

export default FSGCopyText;