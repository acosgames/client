import { Box, HStack, Text, VStack } from "@chakra-ui/react";

export default function DevImageUploadBox({
  index,
  image,
  onImageUpload,
  dragProps,
  isDragging,
  onImageUpdate,
  onImageRemove,
}) {
  const onImageError = (image) => {
    image.onerror = null;
    setTimeout(function () {
      let src = image.target.src;
      src = src.split("?")[0];
      image.target.src = src; // + '?' + Date.now();
    }, 1000);
  };

  let src = (image && image["data_url"]) || null;
  let draggingClass = isDragging ? "imagebox-dragging" : "";

  return (
    <div
      key={"image-" + index}
      className={"imagebox " + draggingClass}
      {...dragProps}
    >
      <div
        className="imagesrc"
        onClick={(e) => {
          //   onImageRemove(index);
          //   onImageUpload(e);
        }}
      >
        {src && <img src={src} alt="" onError={onImageError} />}
      </div>

      <HStack
        w="100%"
        position="absolute"
        // w="100%"
        alignItems={"flex-end"}
        h="100%"
        bottom="0"
        left="0"
      >
        {!image && (
          <VStack
            w="100%"
            h="100%"
            bgColor="rgba(0,0,0,0.5)"
            border="4px dashed var(--chakra-colors-gray-1200)"
            alignItems={"center"}
            justifyContent={"center"}
            _hover={{
              bgColor: "gray.1200",
            }}
            onClick={(e) => {
              onImageUpdate(index);
            }}
          >
            <Text
              textAlign={"center"}
              as="span"
              cursor={"pointer"}
              //   w="100%"
              p="2rem"
              borderRadius={"2rem"}

              // className="imageupload"
            >
              Upload
            </Text>
          </VStack>
        )}
        {image && (
          <Text
            textAlign={"center"}
            as="span"
            width="100%"
            bgColor="rgba(0,0,0,0.5)"
            cursor={"pointer"}
            _hover={{
              bgColor: "gray.1200",
            }}
            // className="imageremove"
            onClick={(e) => {
              onImageRemove(index);
            }}
          >
            Remove
          </Text>
        )}
      </HStack>
    </div>
  );
}
