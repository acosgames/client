import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { Box, HStack, VStack, chakra, useDisclosure } from "@chakra-ui/react";
import RightBar from "./RightBar.jsx";
import SimpleBar from "simplebar-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import ActivateUserProfile from "../components/widgets/ActivateUserProfile.jsx";
import VersionControl from "../components/widgets/VersionControl.jsx";

import ChoosePortrait from "../components/user/ChoosePortrait.jsx";
import GameInfoCreateDisplayName from "../components/user/GameInfoCreateDisplayName.jsx";
import Connection from "../components/widgets/Connection.jsx";
import { ToastMessage } from "../components/ToastMessage.jsx";

import GameScreen from "../pages/GameScreen/GameScreen.jsx";
import { getGamePanel } from "../actions/room.js";
import GameBar from "./GameBar.jsx";
import { useBucket } from "../actions/bucket.js";
import {
    btHideDrawer,
    btIsMobile,
    btPrimaryGamePanel,
    btScreenRect,
    btScreenResized,
} from "../actions/buckets.js";
import ChooseAchievementIcon from "../components/user/ChooseAchievementIcon.jsx";
import { EditAchievement } from "../pages/Developer/DevGamePage/ModalEditAchievement.jsx";
import ActivateUserProfile from "../components/user/ActivateUserProfile.jsx";

function Layout({ children }) {
    const disclosure = useDisclosure();
    let isMobile = useBucket(btIsMobile);
    const gameResizer = useRef();

    const myObserver = new ResizeObserver((entries) => {
        onResize();
    });

    const onResize = (e) => {
        var width =
            window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

        const currentIsMoble = btIsMobile.get();

        btScreenResized.set(true);

        if (width < 800) {
            if (!currentIsMoble) {
                btIsMobile.set(true);
                btHideDrawer.set(true);
            }
        } else {
            if (currentIsMoble) {
                btIsMobile.set(false);
                btHideDrawer.set(false);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("resize", onResize);
        if (gameResizer?.current) myObserver.observe(gameResizer.current);

        onResize();

        return () => {
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <VStack id="root-container" w={["100%"]} h={["100%"]} position="relative" spacing="0">
            <ActivateUserProfile />
            <VersionControl />
            <EditAchievement />
            <ChoosePortrait />
            <GameInfoCreateDisplayName {...disclosure} />
            <Connection />
            {/* <GamePanelSpawner primaryCanvasRef={primaryCanvasRef} /> */}

            <ToastMessage />

            <Box
                className="layout"
                w={"100%"}
                h={["100%", "100%"]}
                overflow={["visible", "hidden"]}
                ref={gameResizer}
            >
                <LayoutChooser isMobile={isMobile} gameResizer={gameResizer}>
                    {children}
                </LayoutChooser>
            </Box>
        </VStack>
    );
}

function LayoutChooser({ children, isMobile, gameResizer }) {
    return <DesktopLayout gameResizer={gameResizer}>{children}</DesktopLayout>;
}

function ScrollToTop({ scrollRef }) {
    let location = useLocation();

    useEffect(() => {
        if (scrollRef?.current) {
            scrollRef.current.scrollTo(0, 0);
        }
    });

    return <></>;
}

function DesktopLayout({ children }) {
    const ChakraSimpleBar = chakra(SimpleBar);

    let scrollRef = useRef();
    let layoutRef = useRef();

    const myObserver = new ResizeObserver((entries) => {
        onResize();
    });

    const onResize = (e) => {
        if (layoutRef.current)
            btScreenRect.set([layoutRef.current.clientWidth, layoutRef.current.clientHeight]);
        btScreenResized.set(true);
    };

    useEffect(() => {
        if (layoutRef?.current) myObserver.observe(layoutRef.current);
        onResize();
    }, []);

    // if (checkingUserLogin) return <></>;
    return (
        <Box w={"100%"} h={"100%"} transition={"all 0.3s ease"}>
            <HStack
                w={["100%"]}
                overflow="hidden"
                display="relative"
                height="100%"
                spacing="0"
                // pr={["0", "0", "30rem", "30rem"]}
                transition="all 0.3s ease"
            >
                <Header />
                <Box
                    w={["100%"]}
                    overflow="hidden"
                    position="relative"
                    height="100%"
                    display="inline-block"
                    spacing="0"
                    // pr={["0", "0", "30rem", "30rem"]}
                    transition="all 0.3s ease"
                    ref={layoutRef}
                >
                    <GameScreen layoutRef={layoutRef} />
                    <ChakraSimpleBar
                        key="layout-content"
                        boxSizing="border-box"
                        autoHide={true}
                        forceVisible={false}
                        // pt={["4rem", "4rem", "7rem"]}
                        style={{
                            width: "100%",
                            height: "100%",
                            flex: "1",
                            overflow: "hidden scroll",
                            boxSizing: "border-box",
                            zIndex: "99",
                        }}
                        scrollableNodeProps={{ ref: scrollRef }}
                    >
                        <ScrollToTop scrollRef={scrollRef} />

                        {/* <HStack
              spacing="0"
              w="100%"
              h="100%"
              position={"relative"}
              alignItems={"flex-start"}
            > */}
                        <Box key="content" w="100%" h="100%" possition="relative">
                            {children}
                        </Box>
                        {/* <RightBar /> */}
                        {/* </HStack> */}

                        <Footer />
                    </ChakraSimpleBar>
                </Box>
                <RightBar layoutRef={layoutRef} />
            </HStack>
        </Box>
    );
}

function BarChooser({ layoutRef }) {
    let primaryId = useBucket(btPrimaryGamePanel);
    let primary = getGamePanel(primaryId);
    if (primary) {
        return <GameBar layoutRef={layoutRef} />;
    }
    return <RightBar layoutRef={layoutRef} />;
}

export default Layout;
