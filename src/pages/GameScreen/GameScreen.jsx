import { Box, VStack } from "@chakra-ui/react";
import GamePanel from "./GamePanel";
import { getGamePanel } from "../../actions/room";
import { memo, useEffect, useRef } from "react";
import { calculateGameSize } from "../../util/helper";
import OverlayEvents from "./OverlayScreens/OverlayEvents.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { ModalGameOver } from "./OverlayScreens/ModalGameOver";
import { useBucket, useBucketSelector } from "../../actions/bucket";
import {
    btGamePanels,
    btGameScreenSize,
    btHideDrawer,
    btIsMobile,
    btPrimaryGamePanel,
    btScreenResized,
} from "../../actions/buckets";

const MotionBox = motion(Box);

export default function GameScreen({ layoutRef }) {
    let primaryId = useBucket(btPrimaryGamePanel);
    let hideDrawer = useBucket(btHideDrawer);
    let isMobile = useBucket(btIsMobile);
    let screenResized = useBucket(btScreenResized);

    // console.log("GameScreen primaryId:", primaryId);

    let primary = getGamePanel(primaryId);
    // let ref = useRef();

    // var computedStyle = getComputedStyle(layoutRef.current || window);

    //   elementHeight -=
    //     parseFloat(computedStyle.paddingTop) +
    //     parseFloat(computedStyle.paddingBottom);
    //   elementWidth -=
    //     parseFloat(computedStyle.paddingLeft) +
    //     parseFloat(computedStyle.paddingRight);

    //   if (window.innerWidth < 500) w -= 50;
    //   else if (window.innerWidth < 800) w -= 150;
    // else if (window.innerWidth < 900)
    // w -= w * 0.6;
    //   else w -= w * 0.6;

    // let elems = [];

    if (typeof primaryId === "undefined" || !primary) return <AnimatePresence></AnimatePresence>;

    // elems.push(

    // );

    return (
        <>
            <OverlayEvents
                key="overlayevents-wrapper"
                gamepanelid={primaryId}
                layoutRef={layoutRef}
            />
            <ModalGameOver key="modalgameover" gamepanelid={primaryId} />
            <AnimatePresence>
                <motion.div
                    key={"game-screen-anim"}
                    className="test"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    style={{
                        backgroundColor: "var(--chakra-colors-gray-925)",
                        width:
                            hideDrawer || (!hideDrawer && isMobile) ? "100%" : "calc(100% - 30rem)",
                        height: "100%",
                        display: "flex",
                        position: "fixed",
                        top: 0,
                        left: 0,
                        zIndex: 110,
                        // opacity: 1,
                        // alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        // position="fixed"
                        key={"game-screen-wrapper"}
                        // top="0"
                        // left="0"
                        // zIndex="110"
                        width={"100%"}
                        // h={[`100%`]}
                        scrollSnapStop={"start"}
                        display="flex"
                        flexDir="row"
                        justifyContent={"center"}
                        transition="all 0.6s ease"
                        // bgColor="pink"
                    >
                        <DisplayGamePanel
                            key={"primary-gamepanel-" + primaryId}
                            layoutRef={layoutRef}
                            hideDrawer={hideDrawer}
                            isMobile={isMobile}
                            primary={primary}
                            primaryId={primaryId}
                        />
                    </Box>
                </motion.div>
            </AnimatePresence>
        </>
    );
}

function DisplayGamePanel({ layoutRef, hideDrawer, isMobile, primary, primaryId }) {
    let showGameover = useBucketSelector(
        btGamePanels,
        (gamepanels) => gamepanels[primaryId]?.showGameover
    );
    let ref = useRef();

    let elementHeight = layoutRef.current.clientHeight; // height with padding
    let elementWidth = layoutRef.current.clientWidth; // width with padding
    let h = layoutRef.current ? elementHeight : window.innerHeight;
    let w = layoutRef.current
        ? elementWidth
        : window.innerWidth - (hideDrawer || isMobile)
        ? 0
        : 300;
    let { bgWidth, bgHeight } = calculateGameSize(w, h, primary.room.resow, primary.room.resoh, 1);

    useEffect(() => {
        btGameScreenSize.set([bgWidth, bgHeight]);
    });
    return (
        <Box
            // w="100%"
            // h="100%"
            width={[`${bgWidth}px`]}
            h={[`${bgHeight}px`]}
            overflow="hidden"
            borderRadius="4px"
            ref={ref}
            className={"canvasRef"}
            // scrollSnapStop={"start"}
            transition="filter 0.3s linear"
            filter={showGameover ? "blur(3px)" : "blur(0)"}
            // transition="filter 0.3s ease-out"
        >
            <GamePanel id={primary.id} canvasRef={ref} hideDrawer={hideDrawer} />
        </Box>
    );
}
