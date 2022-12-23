import { Component, Fragment } from "react";


class DevImageUploadBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    onImageError(image) {
        image.onerror = null;
        setTimeout(function () {
            let src = image.target.src;
            src = src.split('?')[0];
            image.target.src = src;// + '?' + Date.now();
        }, 1000);
    }

    render() {
        let index = this.props.index;
        let image = this.props.image;
        let src = (image && image['data_url']) || null;
        let draggingClass = this.props.isDragging ? "imagebox-dragging" : "";

        return (
            <div key={"image-" + index} className={"imagebox " + draggingClass} {...this.props.dragProps} >
                <div className="imagesrc" onClick={this.props.onImageUpload}>
                    {src && <img src={src} alt="" onError={this.onImageError.bind(this)} />}
                </div>
                {image && (
                    <Fragment>
                        <div className="imageupload" onClick={(e) => {
                            this.props.onImageUpdate(index);
                        }}>
                            Update
                        </div>
                        <div className="imageremove" onClick={(e) => {
                            this.props.onImageRemove(index);
                        }}>
                            Remove
                        </div>
                    </Fragment>
                )}
            </div>
        )
    }
}

export default (DevImageUploadBox);

