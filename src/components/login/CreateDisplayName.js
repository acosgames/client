import { Component, useEffect, useRef, useState } from "react";


import { createDisplayName } from '../../actions/person';
import fs from 'flatstore';
import { Heading, VStack, Text } from "@chakra-ui/react";
import FSGTextInput from "../widgets/inputs/FSGTextInput";
import FSGSubmit from "../widgets/inputs/FSGSubmit";
import FSGGroup from "../widgets/inputs/FSGGroup";
import { useLocation, useNavigate } from "react-router-dom";

function CreateDisplayName(props) {

    let defaultDisplayname = localStorage.getItem('displayname') || '';

    const [displayName, setDisplayName] = useState(defaultDisplayname);
    const [error, setError] = useState(null);

    let navigate = useNavigate();
    const inputRef = useRef();


    useEffect(() => {
        gtag('event', 'createdisplayname');

    }, [])

    const onSubmit = async (e) => {
        console.log(e);

        if (displayName.length < 3) {
            setError({ message: `The name '${displayName}' is too short.` });
            return;
        }

        let user = await createDisplayName(displayName);

        if (!user) {
            setError({ message: `Server not working. Please try again.` });
            return;
        }

        if (user.ecode) {

            switch (user.ecode) {
                case 'E_PERSON_EXISTSNAME':
                    setError({ message: `You already have a display name.` });

                    break;
                case 'E_EXISTS_DISPLAYNAME':
                    setError({ message: `The name '${displayName}' already exists.` });
                    break;
                case 'E_PERSON_DUPENAME':
                    setError({ message: `The name '${displayName}' already exists.` });
                    break;
                case 'E_MISSING_DISPLAYNAME':
                    setError({ message: `Please enter a display name.` });
                    break;
                case 'E_DISPLAYNAME_TOOSHORT':
                    setError({ message: `The name '${displayName}' is too short.` });
                    break;
                default:
                    setError({ message: `[${user.ecode}] Server not working. Please try again.` });
                    break;
            }
        }
        else {

            // fs.set('user')
            // setTimeout(redirect, 1000);
            redirect();
        }
    }

    const redirect = () => {

        let user = fs.get('user');

        if (user && (user.isdev || user.github)) {
            navigate('/dev');
        }
        else
            navigate('/g');

        // let previous = history[history.length - 2] || history[history.length - 1];
        // if (previous.pathname.indexOf('/player/create') > -1) {
        //     this.props.history.push('/games');
        //     return;
        // }

        // this.props.history.goBack();
        // history.pop();
        // fs.set('pagehistory', history);
    }

    const onChange = (e) => {
        console.log(e.target.value);
        let name = e.target.value;
        name = name.replace(/[^A-Za-z0-9\_]/ig, '');
        setDisplayName(name);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    }

    let hasError = (error);
    return (
        <VStack>
            <Heading>Choose a player name</Heading>
            <FSGGroup>
                <FSGTextInput
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    focus={true}
                    maxLength="32"
                    title="Display Name"
                    value={displayName} />
                <FSGSubmit onClick={onSubmit} title="Create" loadingText="Creating" />
                {
                    hasError && (
                        <Text color="red.600">
                            {error.message}
                        </Text>
                    )
                }
            </FSGGroup>
        </VStack>

    )

}

export default CreateDisplayName;