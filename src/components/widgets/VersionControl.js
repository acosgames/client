
import versions from 'shared/model/versions.json';
import fs from 'flatstore';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

function VersionControl(props) {

    const toast = useToast();

    useEffect(() => {

        let clientVersion = versions?.client?.version || 1;
        let serverVersion = props.version;

        if (clientVersion < serverVersion) {
            toast({
                description: 'A new version is available, reload the page to update.',
                status: 'warning',
                duration: 30000,
                isClosable: true
            })

            localStorage.setItem('clientVersion', serverVersion);
        }

    });

    return (
        <></>
    )
}

export default fs.connect(['version'])(VersionControl);