

function FSGSubmit(props) {

    return (
        <div className="form-row">
            <button className="submit" onClick={props.onClick}>{props.title || 'Save'}</button>
        </div>
    )
}

export default FSGSubmit;