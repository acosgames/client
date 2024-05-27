import {
    Text,
    Box,
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    VStack,
    Link as ChLink,
    HStack,
    Wrap,
    Divider,
    Grid,
    Image,
    GridItem,
    chakra,
} from "@chakra-ui/react";

import { useCallback, useEffect, useRef, useState } from "react";
import config from "../../config";
// import { wsJoinQueues } from '../../actions/connection';
// import { getJoinQueues } from "../../actions/queue";

let achievementIcons = [];
for (let i = 1; i <= 100; i++) {
    achievementIcons.push(i);
}

// achievementIcons.sort(() => 0.5 - Math.random());

if (!localStorage.getItem("achivementIconId")) {
    localStorage.setItem("achivementIconId", achievementIcons[0]);
}

import SimpleBar from "simplebar-react";
import {
    btAchievementIconBottomRef,
    btIsChooseAchievementIcon,
    btIsCreateDisplayName,
    // btPortraitBottomRef,
    btAchievementIconId,
    btAchievementObserver,
    btAchievementRange,
    btAchievementSort,
    btScreenResized,
    btUser,
} from "../../actions/buckets";
import { useBucket } from "../../actions/bucket";

btAchievementIconId.set(localStorage.getItem("achivementIconId"));
btAchievementSort.set(achievementIcons);
btAchievementObserver.set(false);

// function RandomizePortrait({}) {
//     let user = useBucket(btUser);

//     useEffect(() => {
//         if (!user) {
//             achievementIcons.sort(() => 0.5 - Math.random());
//             btAchievementSort.set(achievementIcons);
//             btAchievementRange([1, 100]);
//         }
//     });
// }

function ChooseAchievementIcon(props) {
    let isChooseAchievementIcon = useBucket(btIsChooseAchievementIcon);
    let achievementIconBottomRef = useBucket(btAchievementIconBottomRef);

    let [range, setRange] = useState([1, 100]);
    let scrollRef = useRef();
    let bottomBoundaryRef = useRef();

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                console.log("ENTER");
                let achievementIconRange = btAchievementRange.get() || [1, 100];
                let min = 1;
                let max = Math.min(100, achievementIconRange[1] + 100);
                btAchievementRange.set([min, max]);
                return;
            }
            console.log("LEAVE");
        },
        {
            root: null,
            threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
        }
    );

    useEffect(() => {
        // btAchievementObserver.set(true);
        // setTimeout(() => {
        //     if (bottomBoundaryRef.current)
        //         observer.observe(bottomBoundaryRef.current);
        // });
        // return () => {
        //     observer.disconnect();
        // };
    });

    const onSubmit = async () => {};

    const onClose = (e) => {
        // achievementIcons.sort(() => 0.5 - Math.random());
        btAchievementSort.set(achievementIcons);
        btAchievementRange.set([1, 100]);
    };

    const onSelect = (achivementIconId) => {
        localStorage.setItem("achivementIconId", achivementIconId);
        btAchievementIconId.set(achivementIconId);
        btIsChooseAchievementIcon.set(false);
        // btIsCreateDisplayName.set(true);

        // achievementIcons.sort(() => 0.5 - Math.random());
        btAchievementSort.set(achievementIcons);
        btAchievementRange.set([1, 100]);
        onClose();
    };

    let ChakraSimpleBar = chakra(SimpleBar);
    return (
        <Box>
            <Modal
                borderRadius="8px"
                zIndex={20}
                size={"2xl"}
                isOpen={isChooseAchievementIcon}
                onClose={(e) => {
                    btIsChooseAchievementIcon.set(false);
                    onClose(e);
                }}
            >
                <ModalOverlay zIndex={19} />
                <ModalContent
                    bg="linear-gradient(to right, var(--chakra-colors-gray-600), var(--chakra-colors-gray-800))"
                    borderRadius="8px"
                    bgColor="gray.800"
                >
                    <ModalHeader
                        color="gray.0"
                        fontWeight={"600"}
                        textAlign={"center"}
                        fontSize="1.6rem"
                        pb="0"
                        py="1rem"
                    >
                        Choose Icon
                    </ModalHeader>
                    <ModalCloseButton top="1rem" right="1rem" />
                    <ModalBody
                        overflow="hidden"
                        position="relative"
                        w="100%"
                        h="100%"
                    >
                        <VStack
                            w="100%"
                            h="70vh"
                            spacing="0"
                            position="relative"
                            overflow="hidden"
                            flex="1"
                            // mb="0.5rem"
                            // pt="0.5rem"
                            px="0.5rem"
                            mb="1rem"

                            // filter="drop-shadow(1px 1px 2px var(--chakra-colors-gray-1000)) "
                        >
                            <VStack
                                width="100%"
                                height={"100%"}
                                transition={"all 0.3s ease"}
                                spacing="0rem"
                                position="relative"
                                // overflow="hidden"
                                flex="1"
                                mb="0"
                                pb="0"
                                borderRadius={"8px"}
                                zIndex="2"
                            >
                                <ChakraSimpleBar
                                    boxSizing="border-box"
                                    flex="1"
                                    // borderTop={["2px solid var(--chakra-colors-gray-800)"]}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                        flex: "1",
                                        overflow: "hidden scroll",
                                        boxSizing: "border-box",
                                    }}
                                    // scrollableNodeProps={{ ref: scrollRef }}
                                >
                                    <VStack w="100%" pb="1rem" pt="0.5rem">
                                        <Grid
                                            w="100%"
                                            // maxHeight="80vh"
                                            position="relative"
                                            // mt="2rem"
                                            px="1rem"
                                            pb="2rem"
                                            spacing={"0"} //["2rem", "1.5rem"]}
                                            // flexDir={["column", "column", "row"]}
                                            // justify={["flex-start", "flex-start"]}
                                            templateColumns={[
                                                "repeat(2, 1fr)",
                                                "repeat(3, 1fr)",
                                                "repeat(5, 1fr)",
                                                "repeat(6, 1fr)",
                                            ]}
                                            gap="0.5rem"
                                        >
                                            <RenderAchievementIcons
                                                onSelect={onSelect}
                                            />
                                            <Box
                                                height="1rem"
                                                width="1rem"
                                                bgColor="transparent"
                                                id="page-bottom-boundary"
                                                ref={bottomBoundaryRef}
                                            ></Box>
                                        </Grid>
                                    </VStack>
                                </ChakraSimpleBar>
                            </VStack>
                        </VStack>
                    </ModalBody>

                    <ModalFooter></ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

function RenderAchievementIcons({ min, max, onSelect }) {
    let achievementIconRange = useBucket(btAchievementRange);

    achievementIconRange = achievementIconRange || [1, 100];
    let achievementIconElems = [];

    let achievementIconSort = btAchievementSort.get();

    for (let i = 0; i < 100; i++) {
        let achivementIconId = achievementIconSort[i];
        achievementIconElems.push(
            <RenderAchievementIcon
                key={"choose-achievementicon-" + i}
                achivementIconId={achivementIconId}
                onSelect={onSelect}
            />
        );
    }

    return achievementIconElems;
}

function RenderAchievementIcon({ achivementIconId, onSelect }) {
    let screenResized = useBucket(btScreenResized);

    // `${config.https.cdn}icons/achievements/${achivementIconId}-white-medium.webp`

    let filenameMany = `${config.https.cdn}icons/achievements/${achivementIconId}-white-thumbnail.webp`;
    let filenameFew = `${config.https.cdn}icons/achievements/${achivementIconId}-white-medium.webp`;

    let filename = filenameMany;
    if (window.innerWidth < 992) {
        filename = filenameFew;
    }
    return (
        <GridItem p="0">
            <Button
                height="100%"
                onClick={() => {
                    onSelect(achivementIconId);
                }}
                p="0"
            >
                <Image
                    display="inline-block"
                    src={filename}
                    loading="lazy"
                    borderRadius={"8px"}
                    width={["10rem"]}
                    transition="all 0.2s ease"
                    border="2px solid"
                    borderColor="transparent"
                    _hover={{
                        transform: "scale(1.1)",
                        zIndex: "1",
                        border: "2px solid",
                        borderColor: "brand.300",
                    }}
                />
            </Button>
        </GridItem>
    );
}

export default ChooseAchievementIcon;
