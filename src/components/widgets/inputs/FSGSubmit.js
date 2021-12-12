import { useState } from "react";


function FSGSubmit(props) {

    let [loading, setLoading] = useState(false);

    let title = props.title || 'Save';
    if (loading) {
        title = props.loadingTitle || 'Saving';
    }
    return (
        <div className="form-row">
            <button
                disabled={loading}
                className="submit"
                onClick={async (e) => {
                    setLoading(true);
                    try {
                        await props.onClick(e)
                    }
                    catch (err) {
                        console.error(err);
                    }

                    setLoading(false);
                }}>
                {title}
            </button>
        </div>
    )
}

export default FSGSubmit;