import React, { Component, Fragment, useState } from "react";
import ImageUploading from "react-images-uploading";
import fs from "flatstore";
import { addImages } from "../../actions/devgame";

import DevImageUploadBox from "./DevImageUploadBox.jsx";
import { useBucket } from "../../actions/bucket";
import { btDevGameImages } from "../../actions/buckets";
import { Box, Center, Text } from "@chakra-ui/react";

export default function DevImageUpload({ uploadFunc }) {
  let devgameimages = useBucket(btDevGameImages);
  let [maxNumber, setMaxNumber] = useState(1);

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    if (uploadFunc) addImages(devgameimages, imageList, uploadFunc);
  };

  const drawImageBoxes = (
    imageList,
    isDragging,
    dragProps,
    onImageUpload,
    onImageUpdate,
    onImageRemove
  ) => {
    let imageboxes = [];
    for (
      let index = 0;
      index < Math.min(imageList.length + 1, maxNumber);
      index++
    ) {
      let imagebox = (
        <DevImageUploadBox
          key={"imageuploadbox-" + index}
          index={index}
          image={imageList[index]}
          isDragging={isDragging}
          dragProps={dragProps}
          onImageUpload={onImageUpload}
          onImageUpdate={onImageUpdate}
          onImageRemove={onImageRemove}
        />
      );
      imageboxes.push(imagebox);
    }
    return imageboxes;
  };

  return (
    <div className="App">
      <ImageUploading
        value={devgameimages}
        multiple={false}
        onChange={onChange}
        maxNumber={1}
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
          <>
            {errors && (
              <Text
                color="red.300"
                fontSize="1.2rem"
                textAlign={"center"}
                lineHeight={"1.2rem"}
                my="1rem"
              >
                {errors.maxNumber && (
                  <span>Number of selected images exceed maxNumber</span>
                )}
                {errors.acceptType && (
                  <span>Your selected file type is not allow</span>
                )}
                {errors.maxFileSize && (
                  <span>Selected file size exceed maxFileSize</span>
                )}
                {errors.resolution && (
                  <span>
                    Selected file is not match your desired resolution
                  </span>
                )}
              </Text>
            )}
            <Center w="100%">
              {drawImageBoxes(
                imageList,
                isDragging,
                dragProps,
                onImageUpload,
                onImageUpdate,
                onImageRemove
              )}
            </Center>
          </>
        )}
      </ImageUploading>
    </div>
  );
}

// let onCustomWatched = ownProps => {
//     return [ownProps.imgstore];
// };

// export default fs.connect(['devgameimages'])(DevImageUpload);

// export default fs.connect(['devgameimages'])(DevImageUpload);
