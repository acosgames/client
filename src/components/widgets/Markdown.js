import * as React from "react";
import ReactMde from "react-mde";
import ReactMarkdown from "react-markdown";
// import * as Showdown from "showdown";
// import "react-mde/lib/styles/css/react-mde-all.css";
import "./Markdown.scss"
import { updateGameField } from "../../actions/devgame";
import remarkGfm from 'remark-gfm'

export default function Markdown(props) {

    const onChange = (value) => {
        updateGameField(props.name, value);
    }

    const [selectedTab, setSelectedTab] = React.useState("write");
    return (
        <ReactMde
            value={props.value}
            name={props.name}
            id={props.id}
            onChange={onChange}
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
        />
    );
}

