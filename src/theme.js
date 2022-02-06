// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools';

const styles = {
    global: {
        'html, body': {
            //color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: 'blacks.100',
        }
    }
};

// 2. Add your color mode config
const config = {
    initialColorMode: 'dark',
    useSystemColorMode: false,
}

const fonts = {
    body: "Roboto",
    heading: "Roboto"
    // heading: '"Inter", "Oswald", sans-serif;',
    //body: '"Inter", "Oswald", sans-serif;'
}

const colors = {
    blacks: {
        100: "rgb(10,10,10)",
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
        900: "#63ed56"
    },
    gray: {
        50: 'rgb(245, 245, 245)',
        100: 'rgb(220, 220, 220)',
        200: 'rgb(190, 190, 190)',
        300: 'rgb(160, 160, 160)',
        400: 'rgb(135, 135, 135)',
        500: 'rgb(100, 100, 100)',
        600: 'rgb(50, 50, 50)',
        700: 'rgb(30, 30, 30)',
        800: 'rgb(20, 20, 20)',
        900: 'rgb(10, 10, 10)'
    }
}

// 3. extend the theme
const theme = extendTheme({ config, fonts, colors, styles })

export default theme