import React, {FC, PropsWithChildren} from 'react';
import {SuperlitTheme} from '@superlit/elements';
import {NativeBaseProvider, StatusBar} from "native-base";

export const SuperlitApp: FC<PropsWithChildren<{ theme: SuperlitTheme }>> =
    ({
         theme,
         children,
     }) => {
        return (
            <NativeBaseProvider theme={theme}>
                <StatusBar
                    backgroundColor={theme.colors.statusBar || theme.colors.primary["700"]}/>
                {children}
            </NativeBaseProvider>
        );
    };
