import { useRef, useState, useEffect } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevImageUpload from "./DevImageUpload";
import { updateGameField, updateGame, uploadGameImages, clearGameFields, deleteGame } from '../../actions/devgame';
import fs from 'flatstore';


import errorMessage from 'shared/model/errorcodes';
import Markdown from "../widgets/inputs/Markdown";
// import ReactMarkdown from 'react-markdown';
// import remarkGfm from 'remark-gfm';

import FSGTextInput from '../widgets/inputs/FSGTextInput'
import FSGNumberInput from '../widgets/inputs/FSGNumberInput'
import { StackDivider, Box, Heading, HStack, VStack, Center, Text, Wrap } from "@chakra-ui/layout";
import FSGGroup from "../widgets/inputs/FSGGroup";
import FSGSubmit from "../widgets/inputs/FSGSubmit";
import { Select, useToast } from "@chakra-ui/react";
import DevManageGameEnvironment from "./DevManageGameEnvironment";

import schema from 'shared/model/schema.json';
import DevManageGameGithub from "./DevManageGameGithub";
import FSGDelete from "../widgets/inputs/FSGDelete";
import DevManageGameDelete from "./DevManageGameDelete";
import FSGButton from "../widgets/inputs/FSGButton.js";
import FSGSwitch from "../widgets/inputs/FSGSwitch";

function DevManageGameFields(props) {

    useEffect(() => {

    }, [])

    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView()
    const toast = useToast();


    const rules = schema['update-game_info'];

    const onUpdateVersion = async (e) => {
        let value = e.target.value;
        // console.log(value);
        if (!Number.isInteger)
            return false;
        if (value < 0 || value > props.devgame.latest_version)
            return false;

        updateGameField('version', Number.parseInt(value), 'update-game_info', 'devgame', 'devgameerror');
    }

    const onUpdateVisibility = async (e) => {
        let value = e.target.value;

        if (!Number.isInteger)
            return false;
        if (value < 0 || value > props.devgame.version)
            return false;

        value = Number.parseInt(value);

        if (value == 0) {
            updateGameField('visible', 0, 'update-game_info', 'devgame', 'devgameerror');
        }
        else if (value == 1) {
            updateGameField('visible', 1, 'update-game_info', 'devgame', 'devgameerror');
        }
        else if (value == 2) {
            updateGameField('visible', 2, 'update-game_info', 'devgame', 'devgameerror');
        }
    }

    const onUpdateStatus = async (e) => {

    }

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
            return <></>

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

    let versionOptions = [];
    for (var i = props.devgame.latest_version; i > 0; i--) {
        let option = <option key={'published-v' + i} value={i}>{'v' + i}</option>
        versionOptions.push(option);
    }

    let hasError = (props.devgameerror && props.devgameerror.length > 0);
    return (
        <VStack align='left' w={["100%", '100%', '90%', '70%']} spacing="1rem">
            <VStack w="100%">
                <Wrap w="100%">
                    <VStack align="left">
                        <Heading size="lg">Manage Game </Heading>
                        <Heading as="h5" size="md" color="gray.400">{props.devgame.game_slug}</Heading>
                        <HStack divider={<StackDivider />} color="gray.200" display={props.devgame.latest_version > 0 ? 'flex' : 'none'}>
                            <HStack>
                                <Text>Published:</Text>
                                {/* <Text fontWeight="bold">v{props.devgame.version}</Text> */}
                                <Select color="gray.100" onChange={onUpdateVersion} placeholder={''} w="90px" defaultValue={props.devgame.version}>
                                    {versionOptions}
                                </Select>
                            </HStack>
                            <HStack>
                                <Text>Latest:</Text><Text fontWeight="bold">v{props.devgame.latest_version}</Text>
                            </HStack>
                        </HStack>
                        <HStack color="gray.200" display={props.devgame.latest_version > 0 ? 'flex' : 'none'}>
                            <Text>Visibility</Text>
                            <Select color="gray.100" onChange={onUpdateVisibility} placeholder={''} w="150px" defaultValue={props.devgame.visible}>

                                <option value={'0'}>{'Unlisted'}</option>
                                <option value={'1'}>{'Public'}</option>
                                <option value={'2'}>{'Hidden'}</option>
                            </Select>
                        </HStack>
                    </VStack>

                    <Box flex="1" pb="0rem" pt="0rem" align="right">
                        <FSGSubmit onClick={onSubmit}></FSGSubmit>
                        {
                            props.devgame.status == 1 && (
                                <DevManageGameDelete devgame={props.devgame} />
                            )
                        }
                    </Box>

                </Wrap>


            </VStack>

            <FSGGroup hfontSize="md" title="Github">
                <DevManageGameGithub devgame={props.devgame} />
            </FSGGroup>

            <FSGGroup hfontSize="md" title="Deployment">
                <DevManageGameEnvironment devgame={props.devgame} />
            </FSGGroup>


            <FSGGroup hfontSize="md" title="Featured Image">
                <Center>
                    <DevImageUpload
                        uploadFunc={uploadGameImages} />
                </Center>
            </FSGGroup>

            {
                hasError && (
                    <>
                        <a ref={myRef} name="errors"></a>
                        <FSGGroup hfontSize="md" title="Errors" color="red.600">
                            <VStack textAlign="left" pl="0">
                                {displayError()}
                            </VStack>
                        </FSGGroup>
                    </>
                )
            }

            <FSGGroup hfontSize="md" title="Game Details">
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

            <FSGGroup hfontSize="md" title="Game Configuration">
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
                        onChangeByName('maxplayers', parseInt(e))
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
                        onChangeByName('minplayers', parseInt(e))
                    }} />

                <FSGSwitch
                    type="boolean"
                    name="lbscore"
                    id="lbscore"
                    title="Enable Highscore Leaderboard?"
                    min="0"
                    max="1"
                    required={rules['lbscore'].required}
                    checked={props.devgame.lbscore ? true : false}
                    onChange={(e) => {
                        console.log('onChange lbscore:', e.target.checked);
                        onChangeByName('lbscore', e.target.checked ? true : false);
                    }}
                />
                {/* <FSGTextInput
                    type="text"
                    name="teams"
                    id="teams"
                    title="Teams (i.e. Red, Blue)"
                    maxLength="80"
                    required={rules['teams'].required}
                    value={props.devgame.teams || ''}
                    onChange={inputChange} /> */}
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
                {
                    props.devgame.status == 1 && (
                        <DevManageGameDelete devgame={props.devgame} />
                    )
                }
            </Box>


        </VStack >

    )

}

export default withRouter(fs.connect(['devgameerror'])(DevManageGameFields));