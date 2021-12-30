import { Component, Fragment, useEffect, useRef, useState } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevImageUpload from "./DevImageUpload";


import { updateGameField, createGame, clearGameFields } from '../../actions/devgame';
import fs from 'flatstore';

import errorMessage from 'shared/model/errorcodes';
import FSGTextInput from "../widgets/inputs/FSGTextInput";
import FSGSubmit from "../widgets/inputs/FSGSubmit";
import { Divider, Heading } from "@chakra-ui/layout";
import schema from 'shared/model/schema.json';
import { Text, VStack, useToast, Box, Spacer } from "@chakra-ui/react";
import FSGGroup from "../widgets/inputs/FSGGroup";

function DevCreateGame(props) {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        clearGameFields();
        setLoaded(true);
    }, [loaded])

    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()
    const toast = useToast();
    const rules = schema['create-game_info'];

    const onSubmit = async (e) => {
        //console.log(e);



        try {
            let game = await createGame();
            if (!game) {

                toast({
                    title: "Fix errors to continue",
                    status: 'error',
                    isClosable: true,
                    duration: 1200
                })

                executeScroll();

                return;
            }

            toast({
                title: "Successfully created game " + game.name,
                status: 'success',
                isClosable: true,
                duration: 1200
            })

            props.history.replace('/dev/game/' + game.gameid);
            // props.history.replace('/dev/game/' + props.devgame.gameid);
        }
        catch (e) {
            console.error(e);
        }




    }

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        updateGameField(name, value, 'create-game_info', 'devgame', 'devgameerror');
    }

    const onChange = (key, value, group) => {
        console.log(key, value, group);
    }

    const displayError = () => {
        let errors = props.devgameerror;
        if (!errors)
            return <Fragment></Fragment>

        let errorElems = [];
        errors.forEach((error, id) => {
            errorElems.push((<Text key={id} color="red.600">{errorMessage(error)}</Text>))
        })

        return errorElems;
    }
    /*
        Create Game Fields
        - Game Name
        - Version
        - Short Desc
        - Long Desc
        - Promo Image(s)
        - link client git repo
        - link server git repo
        - uploaded client build
        - uploaded server build
        - uploaded game rules and private fields
        - Save, Publish, Cancel
        - Withdrawn (reason) //could be done by admin or by owner
    */

    let hasError = (props.devgameerror && props.devgameerror.length > 0);
    return (
        <div id="creategame" className="inputform">
            <Heading>Alright, lets set up your game.</Heading>
            <Divider mt="2" mb="30" />
            {
                hasError && (
                    <>
                        <a ref={myRef} name="errors"></a>
                        <FSGGroup title="Errors" color="red.600">
                            <VStack align="left" pl={['0']}>
                                {displayError()}
                            </VStack>
                        </FSGGroup>
                    </>
                )
            }

            <FSGGroup title="Game Details">
                <FSGTextInput
                    name="name"
                    id="name"
                    title="Game Name"
                    maxLength="60"
                    value={props.devgame.name || ''}
                    helpText="The advertised name on the website"
                    required={rules['name'].required}
                    onChange={inputChange}
                />
                <FSGTextInput
                    name="game_slug"
                    id="game_slug"
                    title="Slug Name (lower a-z and - only)"
                    maxLength="32"
                    value={props.devgame.game_slug || ''}
                    helpText="Note: This value does not change once created!  It is used in the URL for your game."
                    required={rules['name'].required}
                    onChange={inputChange}
                />
                <FSGTextInput
                    name="shortdesc"
                    id="shortdesc"
                    title="Short Description (120 characters)"
                    maxLength="120"
                    value={props.devgame.shortdesc || ''}
                    required={rules['name'].required}
                    onChange={inputChange}
                />


            </FSGGroup>
            <Box pb="2rem" pt="3rem" width="100%" align="right">
                <FSGSubmit
                    title="Create"
                    loadingTitle="Creating"
                    onClick={onSubmit} />
            </Box>
        </div >
    )

}

export default withRouter(fs.connect(['devgame', 'devgameerror'])(DevCreateGame));