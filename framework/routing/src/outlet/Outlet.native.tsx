import React, {ComponentType, FC, useContext, useRef} from "react";
import {useRoute} from "@react-navigation/native";
import {useRoutes} from "../RouteContext";
import {ChildRoutesConfig} from "../types";
import {Text, View} from "native-base";

const OutletContext = React.createContext<{ routePath: string, state: any }>(
    {routePath: '', state: {}}
);

const RouteContext = React.createContext<{ isVisible: boolean }>(
    {isVisible: false}
);

export const useVisibility = () => useContext(RouteContext).isVisible

export function useFocus(callback: (isFirstFocus: boolean) => void): void {
    const ref = useRef('')
    const isVisible = useContext(RouteContext).isVisible;

    if (isVisible) {
        if (ref.current != 'visible') {
            callback(ref.current == '')
        }

        ref.current = 'visible';
    } else if (ref.current == 'visible') {
        ref.current = 'inVisible';
    }
}

export function useUnFocus<T extends Function>(callback: T) {
    const ref = useRef('')

    console.log(ref.current);

    const isVisible = useContext(RouteContext).isVisible;
    if (!isVisible) {
        callback()
    }
}

const LazyRoute: FC<{ component: () => Promise<{ default: ComponentType<any> }> }> = React.memo(({component}) => {
    const Component = React.lazy(component);
    return <React.Suspense fallback={<View/>}><Component/></React.Suspense>
}, () => true)

const RouteComponent:
    FC<{
        component: () => Promise<{ default: ComponentType<any> }>,
        isVisible: boolean
    }>
    = React.memo(({component, isVisible}) => {
    const ref = useRef(0)

    return <RouteContext.Provider value={{isVisible}}>
        <Text>RouteComponent::{++ref.current}</Text>

        <View style={{display: isVisible ? 'flex' : 'none'}}>
            <LazyRoute component={component}/>
        </View>
    </RouteContext.Provider>
}, (p, n) => p.isVisible == n.isVisible)


const Outlet: FC = () => {
    const routeInfo = useRoute()

    const registeredRoutes = useRoutes()
    let {routePath, state} = useContext(OutletContext)
    let routes: ChildRoutesConfig

    let showFallback: boolean

    if (!routePath) {
        state = routeInfo.params
    }

    let noRoutes = !(state && state.params && state.params.screen)

    let ref = useRef(0)

    console.log("OutletRef::", ++ref.current)

    if (!noRoutes) {
        try {
            if (routePath) {
                state = state.params

                routes = registeredRoutes

                routePath.split("/").forEach(route => {
                    routes = routes[route].childRoutes!
                    console.log(routes);
                })
                routePath += `/${state.screen}`
            } else {
                // @ts-ignore
                routePath = `${routeInfo.name}/${routeInfo.params.screen}`
                routes = registeredRoutes[routeInfo.name].childRoutes!
            }
            showFallback = false
        } catch (e) {
            showFallback = true
        }
    } else {
        showFallback = true
    }

    return (
        showFallback ? null : <OutletContext.Provider
            value={{routePath, state}}>
            {
                routes! ?
                    <>
                        <Text>Outlet:: {ref.current}</Text>
                        {Object.entries(routes).map((route) =>
                            <RouteComponent
                                component={route[1].component}
                                isVisible={routePath == route[1].routeDepth}
                                key={route[1].routeDepth}
                            />
                        )
                        }
                    </>
                    : null
            }
        </OutletContext.Provider>
    )
}
export default Outlet;