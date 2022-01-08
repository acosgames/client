import { Box, Icon, Image, Radio, RadioGroup, Stack, VStack, Wrap } from "@chakra-ui/react";
import { useEffect } from "react";
import { findGameTemplates, updateGameField } from "../../actions/devgame";

import { IoCloseSharp } from '@react-icons';

import fs from 'flatstore';
import config from '../../config'

function GameTemplate(props) {

    return (
        <VStack>

            <Radio value={props.game_slug}>
                <Image w="120px" h="120px" src={config.https.cdn + props.game_slug + '/preview/' + props.preview_images} />
                {props.name}
            </Radio>
        </VStack>
    )
}

function GameNone(props) {
    return (
        <VStack>

            <Radio value='0'>
                <Box w="118px" h="118px" border="1px solid" borderColor="gray.600">
                    <Icon as={IoCloseSharp} w={'118px'} h={'118px'} color='gray.600' />
                </Box>
                No Template
            </Radio>
        </VStack>
    )
}

function DevCreateGameTemplates(props) {

    useEffect(() => {
        findGameTemplates();

    }, [])

    const renderTemplates = (templates) => {
        let elems = [<GameNone key={'template-0'} />];
        for (var template of templates) {
            elems.push(<GameTemplate key={'template-' + template.game_slug} {...template} />)
        }
        return elems;
    }

    const onTemplateChange = (value) => {


        updateGameField('template', value, 'create-game_info', 'devgame', 'devgameerror');
    }

    let templates = props.gametemplates || [];
    return (
        <RadioGroup defaultValue='0' w='100%' onChange={onTemplateChange}>
            <Wrap spacing={16} direction='row'>
                {renderTemplates(templates)}
            </Wrap>
        </RadioGroup>
    )
}

export default fs.connect(['gametemplates'])(DevCreateGameTemplates);
