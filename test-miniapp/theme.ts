import {defaultTheme, extendSuperlitTheme, SuperlitTheme} from "@superlit/elements"

const theme = extendSuperlitTheme({
    colors: {
        screen: defaultTheme.colors.dark["100"],
        primary: defaultTheme.colors.blue,
    }, sizes: {},
    components: {
        Button: {
            baseStyle: {
                bg: 'emerald.400',
                borderRadius: 20,
            }
        }
    },
    config: {
        initialColorMode: "dark"
    }
})

export default theme