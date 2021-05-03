import React, { Component, Fragment } from 'react';
import ImageUploading from 'react-images-uploading';
import fs from 'flatstore';
import { addImages } from '../../actions/devgame';

import DevImageUploadBox from './DevImageUploadBox';

class DevImageUpload extends Component {
    constructor(props) {
        super(props);
        this.maxNumber = 1;

        fs.set(props.imgstore, []);
    }

    onChange(imageList, addUpdateIndex) {
        console.log(imageList, addUpdateIndex);
        if (this.props.uploadFunc)
            addImages(this.props.imgstore, imageList, this.props.uploadFunc);
    };

    drawImageBoxes(imageList, isDragging, dragProps, onImageUpload, onImageUpdate, onImageRemove) {
        let imageboxes = [];
        for (let index = 0; index < Math.min(imageList.length + 1, this.maxNumber); index++) {
            let imagebox = (
                <DevImageUploadBox
                    key={'imageuploadbox-' + index}
                    index={index}
                    image={imageList[index]}
                    isDragging={isDragging}
                    dragProps={dragProps}
                    onImageUpload={onImageUpload}
                    onImageUpdate={onImageUpdate}
                    onImageRemove={onImageRemove}
                />
            );
            imageboxes.push(imagebox)
        }
        return imageboxes;
    }


    render() {
        return (
            <div className="App">
                <ImageUploading
                    multiple
                    value={this.props[this.props.imgstore]}
                    onChange={this.onChange.bind(this)}
                    maxNumber={this.maxNumber}
                    dataURLKey="data_url"
                >
                    {({
                        imageList,
                        onImageUpload,
                        onImageRemoveAll,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                        errors,
                    }) => (
                        <div className="upload__image-wrapper">
                            {
                                errors && <div>
                                    {errors.maxNumber && <span>Number of selected images exceed maxNumber</span>}
                                    {errors.acceptType && <span>Your selected file type is not allow</span>}
                                    {errors.maxFileSize && <span>Selected file size exceed maxFileSize</span>}
                                    {errors.resolution && <span>Selected file is not match your desired resolution</span>}
                                </div>
                            }
                            {this.drawImageBoxes(imageList, isDragging, dragProps, onImageUpload, onImageUpdate, onImageRemove)}
                        </div>
                    )}
                </ImageUploading>
            </div>
        );
    }
}

let onCustomWatched = ownProps => {
    return [ownProps.imgstore];
};

export default fs.connect([], onCustomWatched)(DevImageUpload);

// export default fs.connect(['devgameimages'])(DevImageUpload);