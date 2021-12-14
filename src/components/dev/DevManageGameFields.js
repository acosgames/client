import { Component, Fragment, useRef, useState, useEffect } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevImageUpload from "./DevImageUpload";
import { updateGameField, updateGame, uploadGameImages, clearGameFields } from '../../actions/devgame';
import fs from 'flatstore';


import errorMessage from 'fsg-shared/model/errorcodes';
import Markdown from "../widgets/inputs/Markdown";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import FSGTextInput from '../widgets/inputs/FSGTextInput'
import FSGNumberInput from '../widgets/inputs/FSGNumberInput'
import { StackDivider, Box, Heading, HStack, VStack, Center, Text } from "@chakra-ui/layout";
import FSGGroup from "../widgets/inputs/FSGGroup";
import FSGSubmit from "../widgets/inputs/FSGSubmit";
import { useToast } from "@chakra-ui/react";

import schema from 'fsg-shared/model/schema.json';

function DevManageGameFields(props) {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        clearGameFields();
        setLoaded(true);
    }, [loaded])

    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()
    const toast = useToast();


    const rules = schema['update-game_info'];

    const onSubmit = async (e) => {
        //console.log(e);
        try {
            let game = await updateGame();
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
                title: "Successfully saved",
                status: 'success',
                isClosable: true,
                duration: 1200
            })
            // props.history.replace('/dev/game/' + props.devgame.gameid);
        }
        catch (e) {
            console.error(e);
        }

    }

    const inputChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        updateGameField(name, value, 'update-game_info', 'devgame', 'devgameerror');
    }

    const onChangeByName = (name, value) => {
        updateGameField(name, value, 'update-game_info', 'devgame', 'devgameerror');
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
            errorElems.push((<Text color="red.600" key={id}>{errorMessage(error)}</Text>))
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
        <VStack align='left' w={["100%", '100%', '90%', '70%']} spacing="1rem">
            <HStack>
                <VStack align="left" width="80%">
                    <Heading>Manage Game </Heading>
                    <Heading as="h5" size="lg" color="gray.400">{props.devgame.game_slug}</Heading>
                    <HStack divider={<StackDivider />} color="gray.500">
                        <HStack>
                            <Text>Published:</Text><Text fontWeight="bold">v{props.devgame.version}</Text>
                        </HStack>
                        <HStack>
                            <Text>Beta:</Text><Text fontWeight="bold">v{props.devgame.latest_version}</Text>
                        </HStack>
                    </HStack>
                </VStack>

                <Box pb="0rem" pt="0rem" width="100%" align="right">
                    <FSGSubmit onClick={onSubmit}></FSGSubmit>
                </Box>
            </HStack>
            <FSGGroup title="Featured Image">
                <Center>
                    <DevImageUpload
                        imgstore='devgameimages'
                        uploadFunc={uploadGameImages} />
                </Center>
            </FSGGroup>

            {
                hasError && (
                    <>
                        <a ref={myRef} name="errors"></a>
                        <FSGGroup title="Errors" color="red.600">
                            <VStack textAlign="left" pl="0">
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
                    required={rules['name'].required}
                    value={props.devgame.name || ''}
                    onChange={inputChange}
                />

                <FSGTextInput
                    type="text"
                    name="shortdesc"
                    id="shortdesc"
                    title="Short Description"
                    maxLength="120"
                    required={rules['shortdesc'].required}
                    value={props.devgame.shortdesc || ''}
                    onChange={inputChange}
                />

                <Markdown
                    type="text"
                    name="longdesc"
                    id="longdesc"
                    title="Long Description"
                    maxLength="5000"
                    required={rules['longdesc'].required}
                    value={props.devgame.longdesc || ''}
                    onChange={(e) => {
                        onChangeByName('longdesc', e)
                    }}
                />
            </FSGGroup>

            <FSGGroup title="Game Configuration">
                <FSGNumberInput
                    type="number"
                    name="maxplayers"
                    id="maxplayers"
                    title="Max Players"
                    min="1"
                    max="100"
                    required={rules['maxplayers'].required}
                    value={props.devgame.maxplayers || '2'}
                    onChange={(e) => {
                        onChangeByName('maxplayers', e)
                    }} />
                <FSGNumberInput
                    type="number"
                    name="minplayers"
                    id="minplayers"
                    title="Min Players"
                    min="1"
                    max="100"
                    required={rules['minplayers'].required}
                    value={props.devgame.minplayers || '2'}
                    onChange={(e) => {
                        onChangeByName('minplayers', e)
                    }} />
                <FSGTextInput
                    type="text"
                    name="teams"
                    id="teams"
                    title="Teams (i.e. Red, Blue)"
                    maxLength="80"
                    required={rules['teams'].required}
                    value={props.devgame.teams || ''}
                    onChange={inputChange} />
            </FSGGroup>

            {/* <FSGGroup title="Game Support">
                <FSGTextInput
                    type="text"
                    name="git"
                    id="git"
                    title="Github Repo for Issues"
                    placeholder="https://github.com/myname/myrepo"
                    maxLength="255"
                    required={rules.git?.required}
                    value={props.devgame.git || ''}
                    onChange={inputChange} />
            </FSGGroup> */}

            <Box pb="3rem" pt="1rem" width="100%" align="right">
                <FSGSubmit onClick={onSubmit}></FSGSubmit>
            </Box>


        </VStack >

    )

}

export default withRouter(fs.connect(['devgame', 'devgameerror', 'devgameimages'])(DevManageGameFields));