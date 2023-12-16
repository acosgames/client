import { Box, VStack } from "@chakra-ui/react";
import GamePanel from "../../components/games/GameDisplay/GamePanel";
import { getGamePanel } from "../../actions/room";
import fs from "flatstore";
import { useRef } from "react";
import { calculateGameSize } from "../../util/helper";

export default function GameScreen({ layoutRef }) {
  let [primaryId] = fs.useWatch("primaryGamePanel");
  let [hideDrawer] = fs.useWatch("hideDrawer");
  let [isMobile] = fs.useWatch("isMobile");
  let [screenResized] = fs.useWatch("screenResized");
  let primary = getGamePanel(primaryId);
  let ref = useRef();
  if (!primary) return <></>;

  var computedStyle = getComputedStyle(layoutRef.current || window);

  let elementHeight = layoutRef.current.clientHeight; // height with padding
  let elementWidth = layoutRef.current.clientWidth; // width with padding

  elementHeight -=
    parseFloat(computedStyle.paddingTop) +
    parseFloat(computedStyle.paddingBottom);
  elementWidth -=
    parseFloat(computedStyle.paddingLeft) +
    parseFloat(computedStyle.paddingRight);

  let h = layoutRef.current ? elementHeight : window.innerHeight;
  let w = layoutRef.current
    ? elementWidth
    : window.innerWidth - (hideDrawer || (!hideDrawer && isMobile) ? 0 : 300);
  //   if (window.innerWidth < 500) w -= 50;
  //   else if (window.innerWidth < 800) w -= 150;
  // else if (window.innerWidth < 900)
  // w -= w * 0.6;
  //   else w -= w * 0.6;
  let { bgWidth, bgHeight } = calculateGameSize(
    w,
    h,
    primary.room.resow,
    primary.room.resoh,
    1
  );

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      //   width="100%"
      //   height="100%"
      zIndex="100"
      width={[`100vw`]}
      pr={hideDrawer || (!hideDrawer && isMobile) ? "0" : "30rem"}
      h={[`100vh`]}
      bgColor="black"
      scrollSnapStop={"start"}
      display="flex"
      flexDir="row"
      justifyContent={"center"}
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
        scrollSnapStop={"start"}
      >
        <GamePanel id={primaryId} canvasRef={ref} />
      </Box>
      {/* <svg xmlns="http://www.w3.org/2000/svg" style={{
                        position: 'absolute', left: '10px', bottom: '-15px', fill: 'var(--chakra-colors-gray-1200)'
                    }}
                        width="30"
                        height="15"
                        viewBox="0 0 65 1">
                        <path d="M968,5630h65l-4,5H972Z" transform="translate(-968 -5630)"></path>
                    </svg> */}
    </Box>
  );
}
