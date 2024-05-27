import {
    useNavigate
} from "react-router-dom";


var SLink = (props) => {
    const history = useNavigate();

    let to = props.to;
    return (
        <a onClick={() => {
            history(to);
        }} {...props}>{props.children}</a>
    )
}

export default SLink;