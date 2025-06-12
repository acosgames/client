// theme.js

// 1. import `extendTheme` function
import { extendTheme, textDecoration } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const styles = {
    global: {
        html: {
            fontSize: "62.5%",
            WebkitTextSizeAdjust: "100%",
            MozTextSizeAdjust: "100%",
            textSizeAdjust: "100%",
            fontFeatureSettings: '"kern","lig"',
        },
        "html, body": {
            //color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: "gray.925",
            color: "gray.10",
            fontWeight: 500,
        },
        body: { fontSize: "1.4rem", color: "gray.20" },

        "::selection": {
            background: "gray.400" /* WebKit/Blink Browsers */,
        },
        "::-moz-selection": {
            background: "gray.400" /* Gecko Browsers */,
        },
    },
};

// 2. Add your color mode config
const config = {
    initialColorMode: "dark",
    useSystemColorMode: false,
};

const fonts = {
    // body: "proxima-nova, sans-serif;",
    // heading: "proxima-nova, sans-serif;"
    body: `'Poppins', sans-serif`,
    heading: `'Barlow', sans-serif`,
    // heading: '"Inter", "Oswald", sans-serif;',
    //body: '"Inter", "Oswald", sans-serif;'
};

const colors = {
    blacks: {
        100: "#181818",
        150: "rgb(15,15,15)",
        200: "rgb(20,20,20)",
        300: "rgb(30,30,30)",
        400: "rgb(40,40,40)",
        500: "rgb(50,50,50)",
        600: "rgb(60,60,60)",
        700: "rgb(70,70,70)",
        800: "rgb(80,80,80)",
        900: "rgb(90,90,90)",
    },
    alt: {
        50: "#8affb9",
        75: "#71ffa3",
        100: "#68fb9a",
        200: "#51ff8a",
        300: "#45f882",
        400: "#22e46f",
        500: "#00c755",
        600: "#ffbe18",
        700: "#ffc827",
        900: "#f1ed62",
        1000: "#ffe449",
        1100: "#ffd639",
    },
    brand: {
        50: "#def2ff",
        75: "#b6e3ff",
        100: "#8fd4fe",
        200: "#59a7d8",
        300: "#4ca2d8",
        400: "#409ed8",
        500: "#2d96d8",
        600: "#2c96d8",
        700: "#2192d8",
        900: "#178ed8",
        1000: "#0d8ad8",
        1100: "#0085d8",
    },
    blues: {
        50: "#e9ebfd",
        75: "#a6abf8",
        100: "#8188f5",
        200: "#4b55f0",
        300: "#2632ed",
        400: "#1b23a6",
        500: "#171f91",
    },
    //experimental blue 0F161B
    gray: {
        0: "#f7ffff",
        10: "#ecf5fd",
        20: "#e0e9f2",
        30: "#d5dee6",
        40: "#cad3db",
        50: "#bfc8d0",
        60: "#b9c2ca",
        70: "#b4bdc4",
        80: "#afb7bf",
        90: "#a9b2b9",
        100: "#adb0bc",
        125: "#a4acb4",
        150: "#8a9299",
        175: "#70787f",
        200: "#5f676e",
        300: "#555d64",
        400: "#4c545a",
        500: "#434a51",
        600: "#394147",
        650: "#333740",
        700: "#31383e",
        750: "#282f35",
        775: "#222529",
        800: "#201f2a",
        825: "#1b242e",
        850: "#181e24",
        875: "#182029",
        900: "#0f161b",
        925: "#0b0e13",
        950: "#090D10",
        975: "#050506",
        1000: "#040608",
        1050: "#000c17",
        1100: "#000912",
        1200: "#00060f",
    },
    pl: {
        50: "#e6eeeb",
        75: "#99b8af",
        100: "#6e9a8d",
        200: "#306f5c",
        300: "#05513b",
        400: "#043929",
        500: "#033124",
    },
    sl: {
        50: "#e7e8f8",
        75: "#9da1e4",
        100: "#747ad9",
        200: "#3841c8",
        300: "#0f1abd",
        400: "#0b1284",
        500: "#091073",
    },

    acos: {
        100: "#111",
        200: "#222",
        300: "#333",
    },
};

const fontSizes = {
    "3xs": "0.8rem",
    "2xs": "1rem",
    xxs: "1.2rem",
    xs: "1.4rem",
    sm: "1.6rem",
    md: "1.8rem",
    lg: "2rem",
    xl: "2.2rem",
    "2xl": "2.4rem",
    "3xl": "2.8rem",
    "4xl": "3.2rem",
};

const components = {
    Alert: {
        baseStyle: {
            container: {
                padding: "2rem",
                bgColor: "transparent",
                color: "gray.0",
                borderRadius: "8px",
                filter: " drop-shadow(0 .375rem .375rem rgba(0,0,0,.35))",
                position: "relative",
                overflow: "visible",
                zIndex: 2,
                _before: {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",

                    clipPath:
                        "polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)",
                    bgColor: "gray.775",
                    borderRadius: "8px",
                    zIndex: -1,
                },
            },
            title: {
                pt: "0.25rem",
                fontSize: "1.6rem",
                fontWeight: "500",
                color: "gray.0",
            },
            description: {
                pt: "1rem",
                color: "gray.0",
            },
            icon: {
                color: "gray.0",
                width: "2rem",
                height: "2rem",
                mr: "1.5rem",
            },
            spinner: {},
        },
        variants: {
            success: {
                container: {
                    padding: "2rem",
                },
                title: {},
                description: {},
                icon: {},
                spinner: {},
            },
            error: {
                container: {
                    padding: "2rem",
                },
                title: {},
                description: {},
                icon: {},
                spinner: {},
            },
            warning: {
                container: {
                    padding: "2rem",
                },
                title: {},
                description: {},
                icon: {},
                spinner: {},
            },
        },
    },
    Breadcrumb: {
        baseStyle: {
            item: {
                color: "gray.100",
            },
            link: {
                color: "gray.20",
                fontSize: "1.2rem",
            },
            currentpage: {
                color: "gray.50",
            },
        },
    },
    // Card: {
    //     baseStyle: {
    //         container: {
    //             clipPath:
    //                 "polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)",
    //             bgColor: "gray.900",
    //             borderRadius: "8px",
    //             w: "100%",
    //             // border: "1px solid",
    //             // borderColor: "var(--chakra-colors-gray-800)",
    //         },
    //     },
    // },
    Card: {
        baseStyle: {
            container: {
                my: "2rem",
                w: ["100%", "100%", "100%", "100%", "1000px"],
                // w: "calc(100% - 2rem)",
                // border: "1px solid",
                // borderColor: "var(--chakra-colors-gray-800)",
                filter: " drop-shadow(0 .375rem .375rem rgba(0,0,0,.45))",
                bgColor: "transparent",
                position: "relative",
                overflow: "visible",
                zIndex: 2,
                _before: {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",

                    clipPath:
                        "polygon(100% 0, 100% calc(100% - 25px), calc(100% - 25px) 100%, 0 100%, 0 0)",
                    bgColor: "gray.775",
                    borderRadius: "8px",
                    zIndex: -1,
                },
            },
            body: {
                p: "2rem",
            },
        },
        variants: {
            brand: {
                body: {
                    p: 0,
                },
            },
        },
    },
    Checkbox: {
        baseStyle: {
            control: {
                _checked: {
                    _disabled: {
                        color: "gray.50",
                    },
                },
            },
            label: {
                color: "gray.0",
                _checked: {
                    _disabled: {
                        color: "gray.50",
                    },
                },
                _disabled: {
                    color: "gray.20",
                },
            },
        },
    },
    Tooltip: {
        baseStyle: {
            bgColor: "gray.700",
            color: "gray.0",
            fontSize: "1.4rem",
            top: "1rem",
            p: "1rem",
        },
        defaultProps: {
            variant: "base",
        },
    },
    Heading: {
        baseStyle: {
            color: "gray.10",
            fontWeight: "600",
        },
        variants: {
            h1: {
                as: "h1",
                w: "100%",
                color: "gray.10",
                fontSize: "3rem",
                mb: "2rem",
            },
        },
    },
    Button: {
        baseStyle: {
            bgColor: "transparent",
            outline: "none",
            bgGradient: "none",
            _active: { outline: "none", boxShadow: "none", bgGradient: "none" },
            _hover: { outline: "none", boxShadow: "none", bgGradient: "none" },
            _focus: { outline: "none", boxShadow: "none", bgGradient: "none" },
        },
        variants: {
            base: {
                bgColor: "transparent",
                outline: "none",
                _active: { outline: "none" },
                _hover: { outline: "none" },
                _focus: { outline: "none" },
            },
            primary: {
                bgColor: "brand.500",
                color: "gray.0",
                borderRadius: "2rem",
                fontWeight: "500",
                p: "2rem",
                fontSize: "1.4rem",
                outline: "none",
                _active: { outline: "none" },
                _hover: { outline: "none", bgColor: "brand.400" },
                _focus: { outline: "none" },
            },
        },
        defaultProps: {
            variant: "base",
        },
    },
    Tabs: {
        baseStyle: {
            tab: {
                transition: "all 0.3s ease",
                outline: "none",
                _selected: {
                    outline: "none",
                    border: "0",
                },
            },
        },
        variants: {
            dev: {
                root: {
                    w: "100%",
                },

                tablist: {
                    width: "100%",
                    bgColor: "gray.1000",
                },
                tab: {
                    color: "gray.40",
                    px: "3rem",
                    py: "2rem",
                    height: "6.4rem",
                    transition: "all 0.3s ease",
                    fontWeight: "500",
                    fontSize: ["1.4rem", "1.4rem", "1.4rem", "1.6rem"],
                    fontFamily: "'Poppins', sans-serif",
                    borderTopRadius: "lg",
                    position: "relative",
                    borderBottom: "2px solid",
                    borderBottomColor: "gray.1200",
                    whiteSpace: "nowrap",
                    _hover: {
                        color: "gray.10",
                        borderBottom: "2px solid",
                        borderBottomColor: "gray.0",
                    },
                    _selected: {
                        color: "brand.300 !important",
                        borderColor: "brand.300 !important",
                        borderBottom: "2px solid",
                        zIndex: "2",
                    },
                },
                tabpanels: {
                    width: "100%",
                },
                tabpanel: {
                    mt: "0rem",
                    mb: "8rem",
                    px: "1rem",

                    padding: 0,
                },
            },
            subtabs: {
                root: {
                    w: "100%",
                },
                tabpanel: {
                    padding: "0",
                    px: ["1rem", "1rem", "1rem", "2rem"],
                },
                tab: {
                    color: "gray.200",
                    cursor: "pointer",
                    _selected: {
                        cursor: "auto",
                        color: "brand.100",
                    },
                    as: "span",
                    letterSpacing: "0px",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    fontSize: ["1.2rem", "1.2rem", "1.4rem"],
                },
                tablist: {
                    pt: "2rem",
                },
            },
            brand: {
                root: {
                    // bgColor: "gray.650",
                },
                tabs: {
                    // width: '100%',
                    // overflow: 'auto',
                    // mx: '2rem',
                    // bgColor: "gray.650",
                },
                tab: {
                    color: "gray.50",
                    // py: '1rem',
                    // border: '2px solid',
                    // borderColor: 'transparent',
                    // use colorScheme to change background color with dark and light mode options
                    // bg: ,

                    px: "1.5rem",

                    py: "2rem",
                    height: "6.4rem",
                    transition: "all 0.3s ease",
                    fontWeight: "500",
                    fontSize: ["1.4rem", "1.4rem", "1.4rem", "1.6rem"],
                    fontFamily: "'Poppins', sans-serif",
                    borderTopRadius: "lg",
                    position: "relative",
                    borderBottom: "2px solid",
                    borderBottomColor: "transparent",
                    whiteSpace: "nowrap",
                    // mb: '-2px',
                    _hover: {
                        color: "gray.10",
                        borderBottom: "2px solid",
                        borderBottomColor: "gray.10",
                    },
                    _selected: {
                        // bg: mode('#fff', 'gray.800')(props),
                        color: "gray.0 !important",
                        borderBottom: "2px solid",
                        borderColor: "brand.300 !important",
                        zIndex: "2",
                        // mb: '-2px',
                        // _after: {
                        //     content: "''",
                        //     position: 'absolute',
                        //     bottom: 0,
                        //     left: 0,
                        //     width: '100%',
                        //     height: '2px',
                        //     background: 'brand.300',
                        //     zIndex: '2',
                        // }
                    },
                },
                tablist: {
                    // width: 'max-content',
                    // overflow: 'scroll',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // overflow: 'hidden',
                    // marginBottom: '-1.6rem',
                    paddingBottom: 0,
                    marginBottom: 0,
                    bgColor: "gray.1000",
                    // borderBottom: '2px solid',
                    // borderColor: 'gray.850',
                    // position: 'relative',
                    // pt: "4rem",
                    height: "6.4rem",
                    padding: 0,

                    // _after: {
                    //     content: "''",
                    //     position: 'absolute',
                    //     bottom: 0,
                    //     left: '3rem',
                    //     width: '100%',
                    //     height: '2px',
                    //     background: 'linear-gradient(to right, var(--chakra-colors-gray-700), rgba(0,0,0,0))',
                    // }
                },
                tabpanels: {
                    padding: "0",
                },
                tabpanel: {
                    display: "flex",
                    w: "100%",
                    spacing: "0",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    px: "1rem",
                    padding: "0",
                    paddingTop: "0rem",
                    transition: "all 0.3s ease",
                    minH: "20rem",
                    bgColor: "gray.925",
                    // border: '2px solid',
                    // borderColor: 'inherit',
                    // borderBottomRadius: 'lg',
                    // borderTopRightRadius: 'lg',
                },
            },
        },
    },
    Progress: {
        baseStyle: {
            filledTrack: {
                bg: "brand.300",
                transition: "all 1s ease",
            },
        },
        variants: {
            green: {
                filledTrack: {
                    bg: "brand.50",
                },
            },
            yellow: {
                filledTrack: {
                    bg: "brand.600",
                },
            },
        },
    },
    Switch: {
        baseStyle: {
            container: {
                // width: "50px",
            },
            thumb: {
                // width: "20px", height: "20px",
                // _checked: { right: 0 },
            },
            track: {
                //  width: "50px", height: "20px"
                _checked: {
                    bgColor: "brand.50",
                },
            },
        },
    },
};

const breakpoints = {
    sm: "500px", // 480px
    md: "800px", // 768px
    lg: "992px", // 992px
    xl: "1280px", // 1280px
    "2xl": "1536px", // 1536px
};

// 3. extend the theme
const theme = extendTheme({
    config,
    fonts,
    colors,
    styles,
    fontSizes,
    components,
    breakpoints,
});

export default theme;
