import React, { Component, Fragment } from 'react';
import ImageUploading from 'react-images-uploading';
import fs from 'flatstore';

import { addImages } from '../actions/devgame';


class ImageUpload extends Component {
    constructor(props) {
        super(props);
        //this.state = { images: [] };

        this.maxNumber = 4;
    }

    onChange(imageList, addUpdateIndex) {
        // data for submit
        console.log(imageList, addUpdateIndex);
        //this.setState({ images: imageList });

        addImages(imageList);
    };

    drawImageBoxes(imageList, isDragging, dragProps, onImageUpload, onImageUpdate, onImageRemove) {
        let imageboxes = [];
        for (let index = 0; index < Math.min(imageList.length + 1, this.maxNumber); index++) {
            let image = imageList[index];
            let src = (image && image['data_url']) || null;
            let draggingClass = isDragging ? "imagebox-dragging" : "";

            let imagebox = (
                <div key={"image-" + index} className={"imagebox " + draggingClass} {...dragProps} >
                    <div className="imagesrc" onClick={onImageUpload}>
                        {src && <img src={src} alt="" />}
                    </div>
                    {image && (
                        <Fragment>
                            <div className="imageupload" onClick={(e) => {
                                onImageUpdate(index);
                            }}>
                                Update
                            </div>
                            <div className="imageremove" onClick={(e) => {
                                onImageRemove(index);
                            }}>
                                Remove
                            </div>
                        </Fragment>
                    )}
                </div>
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
                    value={this.props.images}
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
                        // write your building UI
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
                            {/* <button
                                style={isDragging ? { color: 'red' } : undefined}
                                onClick={onImageUpload}
                                {...dragProps}
                            >
                                Click or Drop here
                            </button>
                            &nbsp;
                            <button onClick={onImageRemoveAll}>Remove all images</button>
                            {imageList.map((image, index) => (
                                <div key={index} className="image-item">
                                    <img src={image['data_url']} alt="" width="100" />
                                    <div className="image-item__btn-wrapper">
                                        <button onClick={() => onImageUpdate(index)}>Update</button>
                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                    </div>
                                </div>
                            ))} */}
                        </div>
                    )}
                </ImageUploading>
            </div>
        );
    }
}

export default fs.connect(['devgameimages'])(ImageUpload);