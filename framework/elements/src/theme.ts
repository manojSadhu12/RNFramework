import {extendTheme} from "native-base";

const defaultTheme = extendTheme({
    colors: {
        screen: "white",
        statusBar: ""
    },
    components: {
        Container: {
            baseStyle: {
                maxW: "full"
            }
        }
    }
})

type SuperlitTheme = typeof defaultTheme;

declare module 'native-base' {
    interface ICustomTheme extends SuperlitTheme {
    }
}

export {defaultTheme};
export type { SuperlitTheme };
