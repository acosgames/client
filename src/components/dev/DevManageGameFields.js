import { Component, Fragment } from "react";

import {
    withRouter,
} from "react-router-dom";
import DevImageUpload from "./DevImageUpload";
import { updateGameField, updateGame, uploadGameImages } from '../../actions/devgame';
import fs from 'flatstore';


import errorMessage from 'fsg-shared/model/errorcodes';
import Markdown from "../widgets/inputs/Markdown";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import FSGTextInput from '../widgets/inputs/FSGTextInput'
import FSGNumberInput from '../widgets/inputs/FSGNumberInput'
import { Heading, VStack, Center } from "@chakra-ui/layout";
import FSGGroup from "../widgets/inputs/FSGGroup";
import FSGSubmit from "../widgets/inputs/FSGSubmit";
import { useToast } from "@chakra-ui/react";

function DevManageGameFields(props) {

    const toast = useToast();
    const onSubmit = async (e) => {
        //console.log(e);
        try {
            let game = await updateGame();
            if (!game) {


                toast({
                    title: "Fix errors to continue",
                    status: 'error',
                    isClosable: true
                })

                return;
            }

            this.props.history.replace('/dev/game/' + props.devgame.gameid);
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

    const onMarkdownChange = (value) => {
        updateGameField('longdesc', value, 'update-game_info', 'devgame', 'devgameerror');
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
            errorElems.push((<li key={id}>{errorMessage(error)}</li>))
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
        <VStack align='stretch'>
            <FSGGroup title="Featured Image">
                <Center>
                    <DevImageUpload
                        imgstore='devgameimages'
                        uploadFunc={uploadGameImages} />
                </Center>
            </FSGGroup>

            {hasError && (
                <FSGGroup title="Errors">{displayError()}</FSGGroup>
            )}

            <FSGGroup title="Game Details">
                <FSGTextInput
                    name="name"
                    id="name"
                    title="Game Name"
                    maxLength="60"
                    value={props.devgame.name || ''}
                    onChange={inputChange}
                />

                <FSGTextInput
                    type="text"
                    name="game_slug"
                    id="game_slug"
                    title="Slug Name (lower a-z and - only)"
                    maxLength="32"
                    value={props.devgame.game_slug || ''}
                    helpText="Slug will appear in the URL "
                    onChange={inputChange}
                />
                <FSGNumberInput
                    type="text"
                    disabled
                    name="version"
                    id="version"
                    title="Published Version"
                    maxLength="12"
                    value={props.devgame.version || '0'}
                    onChange={inputChange} />

                <FSGNumberInput
                    type="text"
                    disabled
                    name="version"
                    id="version"
                    title="Beta Version"
                    maxLength="12"
                    value={props.devgame.latest_version || '0'}
                    onChange={inputChange}
                />

                <FSGTextInput
                    type="text"
                    name="shortdesc"
                    id="shortdesc"
                    title="Short Description"
                    maxLength="80"
                    value={props.devgame.shortdesc || ''}
                    onChange={inputChange}
                />

                <Markdown
                    type="text"
                    name="longdesc"
                    id="longdesc"
                    title="Long Description"
                    maxLength="5000"
                    value={props.devgame.longdesc || ''}
                    onChange={onMarkdownChange}
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
                    value={props.devgame.maxplayers || '2'}
                    onChange={inputChange} />
                <FSGNumberInput
                    type="number"
                    name="minplayers"
                    id="minplayers"
                    title="Min Players"
                    min="1"
                    max="100"
                    value={props.devgame.minplayers || '2'}
                    onChange={inputChange} />
                <FSGTextInput
                    type="text"
                    name="teams"
                    id="teams"
                    title="i.e. Red, Blue"
                    maxLength="80"
                    value={props.devgame.teams || ''}
                    onChange={inputChange} />

            </FSGGroup>

            <FSGGroup title="Game Support">
                <FSGTextInput
                    type="text"
                    name="git"
                    id="git"
                    title="Github Repo for Issues"
                    placeholder="https://github.com/myname/myrepo"
                    maxLength="255"
                    value={props.devgame.git || ''}
                    onChange={inputChange} />
            </FSGGroup>


            <FSGSubmit onClick={onSubmit}></FSGSubmit>

        </VStack>

    )

}

export default withRouter(fs.connect(['devgame', 'devgameerror', 'devgameimages'])(DevManageGameFields));