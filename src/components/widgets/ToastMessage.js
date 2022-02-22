

import { useToast } from '@chakra-ui/react';
import fs from 'flatstore';
import { useEffect } from 'react';


function ToastMessage(props) {

    const toast = useToast();

    useEffect(() => {

        let msg = props.successMessage;

        if (!msg)
            return;
        let title = msg?.title;
        let description = msg?.description;
        let status = msg?.status || 'success';
        let isClosable = (typeof msg.isClosable !== 'undefined') ? msg.isClosable : true;
        if (!title && !description)
            return;

        toast({
            title, description, status, isClosable, position: "top-right"
        })
    })

    return (
        <></>
    )
}

export default fs.connect(['successMessage'])(ToastMessage);