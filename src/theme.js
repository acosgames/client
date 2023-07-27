// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools';

const styles = {
    global: {
        'html': {
            'fontSize': '62.5%',
            'WebkitTextSizeAdjust': '100%',
            'MozTextSizeAdjust': '100%',
            'textSizeAdjust': '100%',
            'fontFeatureSettings': '"kern","lig"'

        },
        'html, body': {
            //color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: 'gray.900',
            color: 'gray.0',
            fontWeight: 500
        },
        'body': { 'fontSize': '160%', },

        '::selection': {
            background: 'gray.400' /* WebKit/Blink Browsers */
        },
        '::-moz-selection': {
            background: 'gray.400' /* Gecko Browsers */
        }

    }
};

// 2. Add your color mode config
const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const fonts = {
    // body: "proxima-nova, sans-serif;",
    // heading: "proxima-nova, sans-serif;"
    body: `'Inter', sans-serif`,
    heading: `'Chakra Petch', sans-serif`
    // heading: '"Inter", "Oswald", sans-serif;',
    //body: '"Inter", "Oswald", sans-serif;'
}

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
    brand: {
        50: '#e7fef7',
        75: '#9cf9dd',
        100: "#73f6cf",
        200: '#37f3bb',
        300: "#0ef0ad",
        400: '#0aa879',
        500: "#09926a",
        600: "#52c548",
        700: "#63ed56",
        900: "#63ed56",
        1000: "#31752b"
    },
    blues: {
        50: '#e9ebfd',
        75: '#a6abf8',
        100: '#8188f5',
        200: '#4b55f0',
        300: '#2632ed',
        400: '#1b23a6',
        500: '#171f91',
    },
    //experimental blue
    gray: {
        0: '#ffffff',
        10: '#fafafb',
        20: '#f6f6f6',
        30: '#ecedee',
        40: '#e1e1e3',
        50: '#c5c5ca',
        60: '#b7b7bd',
        70: '#abacb2',
        80: '#9d9ea5',
        90: '#8f9098',
        100: '#81828b',
        125: 'rgb(213,217,224)',
        150: 'rgb(189, 193, 199)',
        175: 'rgb(165, 168, 173)',
        200: '#73747f',
        300: '#656772',
        400: '#5a5b67',
        500: '#4c4d5a',
        600: '#404250',
        700: '#303141',
        750: '#252525',
        800: '#222434',
        850: '#1e1e1e',
        900: '#161829',
        950: '#101224',
        975: '#040618',
        1000: '#060606',
        1100: '#030303',
        1200: '#000'
    },
    pl: {
        50: '#e6eeeb',
        75: '#99b8af',
        100: '#6e9a8d',
        200: '#306f5c',
        300: '#05513b',
        400: '#043929',
        500: '#033124',
    },
    sl: {
        50: '#e7e8f8',
        75: '#9da1e4',
        100: '#747ad9',
        200: '#3841c8',
        300: '#0f1abd',
        400: '#0b1284',
        500: '#091073',
    },
    //originals
    /*
     gray: {
        50: 'rgb(254,254,255)',
        100: 'rgb(237,241,250)',
        125: 'rgb(213,217,224)',
        150: 'rgb(189, 193, 199)',
        175: 'rgb(165, 168, 173)',
        200: 'rgb(137,156,199)',
        300: 'rgb(120,136,173)',
        400: 'rgb(102,116,148)',
        500: 'rgb(84,96,122)',
        600: 'rgb(67,76,97)',
        700: 'rgb(49,56,71)',
        750: 'rgb(40,46,59)',
        800: 'rgb(32,36,46)',
        850: 'rgb(23,26,33)',
        900: 'rgb(14,16,20)',
        1000: 'rgb(3,6,12)'
    },
    */
    acos: {
        100: '#111',
        200: '#222',
        300: '#333'
    },

    // root: {
    //     "bs-blue": '#0d6efd',
    //     "bs-indigo": '#6610f2',
    //     "bs-purple": '#6f42c1',
    //     "bs-pink": '#d63384',
    //     "bs-red": '#dc3545',
    //     "bs-orange": '#fd7e14',
    //     "bs-yellow": '#ffc107',
    //     "bs-green": '#198754',
    //     "bs-teal": '#20c997',
    //     "bs-cyan": '#0dcaf0',
    //     "bs-black": '#000',
    //     "bs-white": '#fff',
    //     "bs-gray": '#6c757d',
    //     "bs-gray-dark": '#343a40',
    //     "bs-gray-100": '#f8f9fa',
    //     "bs-gray-200": '#e9ecef',
    //     "bs-gray-300": '#dee2e6',
    //     "bs-gray-400": '#ced4da',
    //     "bs-gray-500": '#adb5bd',
    //     "bs-gray-600": '#6c757d',
    //     "bs-gray-700": '#495057',
    //     "bs-gray-800": '#343a40',
    //     "bs-gray-900": '#212529',
    //     "bs-primary": '#0d6efd',
    //     "bs-secondary": '#6c757d',
    //     "bs-success": '#198754',
    //     "bs-info": '#0dcaf0',
    //     "bs-warning": '#ffc107',
    //     "bs-danger": '#dc3545',
    //     "bs-light": '#f8f9fa',
    //     "bs-dark": '#212529',
    //     "bs-primary-rgb": '13, 110, 253',
    //     "bs-secondary-rgb": '108, 117, 125',
    //     "bs-success-rgb": '25, 135, 84',
    //     "bs-info-rgb": '13, 202, 240',
    //     "bs-warning-rgb": '255, 193, 7',
    //     "bs-danger-rgb": '220, 53, 69',
    //     "bs-light-rgb": '248, 249, 250',
    //     "bs-dark-rgb": '33, 37, 41',
    //     "bs-white-rgb": '255, 255, 255',
    //     "bs-black-rgb": '0, 0, 0',
    //     "bs-body-color-rgb": '33, 37, 41',
    //     "bs-body-bg-rgb": '255, 255, 255',
    //     "bs-font-sans-serif": 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans", "Liberation Sans", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
    //     "bs-font-monospace": 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    //     "bs-gradient": 'linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))',
    //     "bs-body-font-family": 'var("bs-font-sans-serif)',
    //     "bs-body-font-size": '1rem',
    //     "bs-body-font-weight": '400',
    //     "bs-body-line-height": '1.5',
    //     "bs-body-color": '#212529',
    //     "bs-body-bg": '#fff',
    //     "bs-border-width": '1px',
    //     "bs-border-style": 'solid',
    //     "bs-border-color": '#dee2e6',
    //     "bs-border-color-translucent": 'rgba(0, 0, 0, 0.175)',
    //     "bs-border-radius": '0.375rem',
    //     "bs-border-radius-sm": '0.25rem',
    //     "bs-border-radius-lg": '0.5rem',
    //     "bs-border-radius-xl": '1rem',
    //     "bs-border-radius-2xl": '2rem',
    //     "bs-border-radius-pill": '50rem',
    //     "bs-link-color": '#0d6efd',
    //     "bs-link-hover-color": '#0a58ca',
    //     "bs-code-color": '#d63384',
    //     "bs-highlight-bg": '#fff3cd'
    // }
}

const fontSizes = {
    '3xs': "0.8rem",
    '2xs': "1rem",
    xxs: "1.2rem",
    xs: "1.4rem",
    sm: "1.6rem",
    md: "1.8rem",
    lg: "2rem",
    xl: "2.2rem",
    '2xl': "2.4rem",
    '3xl': "2.8rem",
    '4xl': "3.2rem"
}

const components = {
    Tooltip: {
        baseStyle: {
            bgColor: 'gray.700',
            color: 'gray.100',
            top: '1rem',
            p: "1rem"
        },
        defaultProps: {
            variant: 'base'
        }
    },
    Button: {
        baseStyle: {
            bgColor: 'transparent',
            outline: 'none',
            bgGradient: 'none',
            _active: { outline: 'none', boxShadow: 'none', bgGradient: 'none' },
            _hover: { outline: 'none', boxShadow: 'none', bgGradient: 'none' },
            _focus: { outline: 'none', boxShadow: 'none', bgGradient: 'none' }
        },
        variants: {
            base: {
                bgColor: 'transparent',
                outline: 'none',
                _active: { outline: 'none' },
                _hover: { outline: 'none' },
                _focus: { outline: 'none' }
            }
        },
        defaultProps: {
            variant: 'base'
        }
    },
    Progress: {
        baseStyle: {
            filledTrack: {
                bg: 'brand.300'
            }
        }
    }
}

const breakpoints = {
    sm: '600px', // 480px
    md: '768px', // 768px
    lg: '992px', // 992px
    xl: '1280px', // 1280px
    '2xl': '1536px', // 1536px
}

// 3. extend the theme
const theme = extendTheme({ config, fonts, colors, styles, fontSizes, components, breakpoints })

export default theme