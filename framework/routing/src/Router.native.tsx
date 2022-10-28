import React, {ComponentType, FC, ReactNode} from 'react';
import {NavigationContainer, useLinkTo, useNavigation, useRoute} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RoutesConfig} from './types';
import {SuperlitTheme} from '@superlit/elements';
import RouteContext, {useRoutes} from "./RouteContext";
import parsePath from "./utils/parsePath";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {View} from "native-base";

const Stack = createNativeStackNavigator();

const screenConfigGenerator = (routes: RoutesConfig) => {
    const screenConfig: Record<string, any> = {};
    for (const routeName in routes) {
        screenConfig[routeName] = {
            path: routes[routeName].routeSchema as string
        }
        if (routes[routeName].childRoutes) {
            screenConfig[routeName].screens = screenConfigGenerator(routes[routeName].childRoutes!)
        }
    }
    return screenConfig
}

export function RouteComponent<component extends () => Promise<{ default: ComponentType<any> }>,
    fallback extends ReactNode>
(component: component, fallback: fallback) {
    const Component = React.lazy(component);

    return React.forwardRef(() => {
            return <React.Suspense fallback={fallback}>
                <Component/>
            </React.Suspense>;
        }
    )
}

const Container: FC<{ routes: RoutesConfig; theme: SuperlitTheme }> =
    function ({
                  routes,
                  theme,
              }) {
        const screenConfig = screenConfigGenerator(routes);

        return (
            <SafeAreaProvider>
                <RouteContext.Provider value={routes}>
                    <NavigationContainer
                        independent={true}
                        theme={{
                            dark: theme.config.initialColorMode == "dark",
                            colors: {
                                primary: theme.colors.primary["500"],
                                background: theme.colors.screen,
                                card: theme.colors.primary["500"],
                                text: theme.config.initialColorMode == "dark" ? "white" : "black",
                                border: theme.config.initialColorMode == "dark" ? 'rgb(39, 39, 41)' : 'rgb(216, 216, 216)',
                                notification: theme.config.initialColorMode == "dark" ? 'rgb(255, 69, 58)' : 'rgb(255, 59, 48)',
                            },
                        }}
                        linking={{
                            prefixes: [],
                            config: {
                                screens: screenConfig,
                            },
                        }}
                    >
                        <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
                            {Object.keys(routes).map((routeName) => {
                                return (
                                    <Stack.Screen
                                        key={routeName}
                                        name={routeName}
                                        component={RouteComponent(routes[routeName].component, <View/>)}
                                    />
                                );
                            })}
                        </Stack.Navigator>
                    </NavigationContainer>
                </RouteContext.Provider>
            </SafeAreaProvider>

        );
    };


const useRouter = () => {
    const navigate = useNavigation()

    return ({
        link: useLinkTo(),
        navigate,
        goBack: navigate.goBack
    });
}

function getPath(routeInfo: any): string {
    if (routeInfo.path) {
        return routeInfo.path;
    } else {
        return getPath(routeInfo.params);
    }
}

function useLocation() {
    const routeInfo = useRoute()
    const [pathname, search] = getPath(routeInfo).split("?")

    return {
        pathname,
        search,
    };
}

const useRouteData = () => {
    const {pathname, search} = useLocation()
    return parsePath(pathname, search, useRoutes());
}


export {Container, useRouter, useRouteData, useLocation};
