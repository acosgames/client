import { Box, VStack } from "@chakra-ui/react";
import GamePanel from "./GamePanel";
import { getGamePanel } from "../../actions/room";
import fs from "flatstore";
import { memo, useRef } from "react";
import { calculateGameSize } from "../../util/helper";
import OverlayEvents from "./OverlayScreens/OverlayEvents.jsx";
import { AnimatePresence, motion } from "framer-motion";

const MotionBox = motion(Box);

export default function GameScreen({ layoutRef }) {
  let [primaryId] = fs.useWatch("primaryGamePanel");
  let [hideDrawer] = fs.useWatch("hideDrawer");
  let [isMobile] = fs.useWatch("isMobile");
  let [screenResized] = fs.useWatch("screenResized");
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

  let ref = useRef();

  if (!primary) return <></>;

  let elementHeight = layoutRef.current.clientHeight; // height with padding
  let elementWidth = layoutRef.current.clientWidth; // width with padding
  let h = layoutRef.current ? elementHeight : window.innerHeight;
  let w = layoutRef.current
    ? elementWidth
    : window.innerWidth - (hideDrawer || isMobile)
    ? 0
    : 300;
  let { bgWidth, bgHeight } = calculateGameSize(
    w,
    h,
    primary.room.resow,
    primary.room.resoh,
    1
  );

  return (
    <>
      <OverlayEvents gamepanelid={primaryId} layoutRef={layoutRef} />

      <Box
        position="fixed"
        top="0"
        left="0"
        //   width="100%"
        //   height="100%"
        zIndex="100"
        width={
          hideDrawer || (!hideDrawer && isMobile)
            ? "100%"
            : "calc(100% - 30rem)"
        }
        // pr={hideDrawer || (!hideDrawer && isMobile) ? "0" : "30rem"}
        h={[`100vh`]}
        // bgColor="black"
        scrollSnapStop={"start"}
        display="flex"
        flexDir="row"
        justifyContent={"center"}
        transition="all 0.3s ease"
        // initial={{ opacity: 0 }}
        // animate={{ opacity: 1 }}
        // exit={{ opacity: 0 }}
        // transition={{ duration: 0.1 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 2 }}
          style={{ backgroundColor: "black" }}
        >
          <Box
            width={[`${bgWidth}px`]}
            h={[`${bgHeight}px`]}
            // borderRadius={'12px'}
            overflow="hidden"
            // border="3px solid"
            // borderColor="gray.1200"
            borderRadius="4px"
            ref={ref}
            className={"canvasRef"}
            scrollSnapStop={"start"}
          >
            <GamePanel id={primaryId} canvasRef={ref} hideDrawer={hideDrawer} />
          </Box>
          {/* <svg xmlns="http://www.w3.org/2000/svg" style={{
        position: 'absolute', left: '10px', bottom: '-15px', fill: 'var(--chakra-colors-gray-1200)'
      }}
      width="30"
      height="15"
      viewBox="0 0 65 1">
      <path d="M968,5630h65l-4,5H972Z" transform="translate(-968 -5630)"></path>
    </svg> */}
        </motion.div>
      </Box>
    </>

    // <AnimatePresence>
    // <MotionMemo
    //   hideDrawer={hideDrawer}
    //   isMobile={isMobile}
    //   primaryId={primaryId}
    //   layoutRef={layoutRef}
    //   primary={primary}
    // />
    // </AnimatePresence>
  );
}

// const MotionMemo = memo(
//   ({ hideDrawer, isMobile, primaryId, layoutRef, primary }) => {

//     );
//   },
//   (prev, next) =>
//     prev.layoutRef == next.layoutRef &&
//     prev.primary.gamestate.room.updated ==
//       next.primary.gamestate.room.updated &&
//     prev.primaryId == next.primaryId
// );
