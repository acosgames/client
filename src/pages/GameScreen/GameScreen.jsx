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

  if (!primary) return <></>;

  return (
    <>
      <OverlayEvents gamepanelid={primaryId} layoutRef={layoutRef} />

      <Box
        position="fixed"
        top="0"
        left="0"
        zIndex="100"
        width={
          hideDrawer || (!hideDrawer && isMobile)
            ? "100%"
            : "calc(100% - 30rem)"
        }
        h={[`100%`]}
        scrollSnapStop={"start"}
        display="flex"
        flexDir="row"
        justifyContent={"center"}
        transition="all 0.3s ease"
      >
        <motion.div
          className="test"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 1 }}
          style={{ backgroundColor: "gray.925" }}
        >
          <DisplayGamePanel
            layoutRef={layoutRef}
            hideDrawer={hideDrawer}
            isMobile={isMobile}
            primary={primary}
            primaryId={primaryId}
          />
        </motion.div>
      </Box>
    </>
  );
}

function DisplayGamePanel({
  layoutRef,
  hideDrawer,
  isMobile,
  primary,
  // primaryId,
}) {
  let [primaryId] = fs.useWatch("primaryGamePanel");
  let [gamestatus] = fs.useWatch("gamestatus/" + primaryId);

  let ref = useRef();

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
    <Box
      // w="100%"
      // h="100%"
      width={[`${bgWidth}px`]}
      h={[`${bgHeight}px`]}
      overflow="hidden"
      borderRadius="4px"
      ref={ref}
      className={"canvasRef"}
      scrollSnapStop={"start"}
      filter={primary.forfeit || !primary.active ? "blur(3px)" : ""}
      // transition="filter 0.3s ease-out"
    >
      <GamePanel id={primaryId} canvasRef={ref} hideDrawer={hideDrawer} />
    </Box>
  );
}
