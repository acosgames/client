import * as React from "react";
// import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
import MDEditor, { commands } from '@uiw/react-md-editor';
import rehypeSanitize from "rehype-sanitize";
// import * as Showdown from "showdown";
// import "react-mde/lib/styles/css/react-mde-all.css";
import "./Markdown.scss"
import { updateGameField } from "../../../actions/devgame";
import remarkGfm from 'remark-gfm'
import { FormControl, FormLabel, FormHelperText } from "@chakra-ui/form-control";
import fs from 'flatstore';
import { Box } from "@chakra-ui/react";



function Markdown(props) {

    const onChange = (value) => {
        // updateGameField(props.name, value);
    }

    const [selectedTab, setSelectedTab] = React.useState("write");

    let value = (props.group && props[props.group]) || props.value;

    return (
        <FormControl as='fieldset' mb="0">
            <FormLabel as='legend' fontSize="xs" color="gray.100" fontWeight="bold">{props.title}</FormLabel>
            <Box width="100%" align="left" id="game-info-longdesc">
                <MDEditor
                    name={props.name}
                    id={props.id}
                    height={'60rem'}
                    value={value}
                    preview="edit"
                    // commands={[
                    //     commands.bold, commands.italic, commands.strikethrough, commands.divider, commands.orderedListCommand, commands.unorderedListCommand, comamnds.divider, commands.link, commands.code, commands.codeBlock
                    //     commands.codeEdit,// commands.codePreview
                    // ]}
                    onChange={(e) => {
                        if (props.rules && props.group) {
                            updateGameField(props.name, e, props.rules, props.group, props.error);
                        }
                        props.onChange(e);
                    }}
                    previewOptions={{
                        rehypePlugins: [[rehypeSanitize]],
                    }}
                    style={{ backgroundColor: '#222222', color: 'white', fontSize: '1.6rem' }}
                />

                <ReactMarkdown remarkPlugins={[remarkGfm]}>{value}</ReactMarkdown>
            </Box>
            {/* <MDEditor.Markdown source={value} style={{ fontWeight: 'light', whiteSpace: 'pre-wrap' }} /> */}

            {/* <ReactMde
                minEditorHeight={300}
                maxEditorHeight={600}
                value={value}
                name={props.name}
                id={props.id}
                onChange={(e) => {
                    if (props.rules && props.group) {
                        updateGameField(props.name, e, props.rules, props.group, props.error);
                    }
                    props.onChange(e);
                }}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                toolbarCommands={
                    [
                        ["bold", "italic", "strikethrough"],
                        ["code", "quote"],
                        ["unordered-list", "ordered-list", "checked-list"]
                    ]
                }
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(<ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>)
                }
                childProps={{
                    writeButton: {
                        tabIndex: -1
                    }
                }}

                style={{ height: '100%' }}
            /> */}

            <FormHelperText>{props.helpText}</FormHelperText>


        </FormControl>


    );
}





let onCustomWatched = ownProps => {
    if (ownProps.group)
        return [ownProps.group];
    return [];
};
let onCustomProps = (key, value, store, ownProps) => {
    // if (key == (ownProps.group + '>' + ownProps.name))
    //     return { [key]: value }
    return { [ownProps.id]: value };
};

export default fs.connect([], onCustomWatched, onCustomProps)(Markdown);
