// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

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
    brand: {
        100: "#d1ffd2",
        300: "#94ff97",
        500: "#63ed56",
        600: "#52c548",
        700: "#63ed56",
        900: "#63ed56"
    }
}

// 3. extend the theme
const theme = extendTheme({ config, fonts, colors })

export default theme