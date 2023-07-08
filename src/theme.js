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
            bg: 'gray.1000',
            color: 'rgb(223, 225, 245)',
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
    body: "Open Sans, sans-serif;",
    heading: "Open Sans, sans-serif;"
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
        100: "#d1ffd2",
        300: "#94ff97",
        500: "#63ed56",
        600: "#52c548",
        700: "#63ed56",
        900: "#63ed56",
        1000: "#31752b"
    },
    //experimental blue
    gray: {
        50: '#f8fcff',
        100: '#f1f9ff',
        125: 'rgb(213,217,224)',
        150: 'rgb(189, 193, 199)',
        175: 'rgb(165, 168, 173)',
        200: '#999',
        300: '#8e8e8e',
        400: '#888',
        500: '#353535',
        600: '#333',
        700: '#2e2e2e',
        750: '#252525',
        800: '#222',
        850: '#111',
        900: '#0E0E10',
        1000: '#060606',
        1100: '#030303',
        1200: '#000'
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
    }
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
    }
}

// 3. extend the theme
const theme = extendTheme({ config, fonts, colors, styles, fontSizes, components })

export default theme