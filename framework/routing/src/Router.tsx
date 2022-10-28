import {
    BrowserRouter,
    NavigateFunction,
    Route,
    Routes,
    useLocation as useLocationDOM,
    useNavigate as useNavigateDOM,
} from 'react-router-dom';
import React, {ComponentType, FC, ReactNode} from 'react';
import {RoutesConfig} from './types';
import {AppBar, SuperlitTheme} from '@superlit/elements';
import {View} from "native-base";
import RouteContext, {useRoutes} from "./RouteContext";
import parsePath from "./utils/parsePath";

export const RouteComponent:
    FC<{ component: () => Promise<{ default: ComponentType<any> }>, fallback: ReactNode }>
    = ({component, fallback}) => {
    const Component = React.lazy(component);
    return <React.Suspense fallback={fallback}>
        <Component/>
    </React.Suspense>
}

const routeElementsGenerator = (routes: RoutesConfig, isChild: boolean = false) => (
    <>
        {Object.keys(routes).map((routeName) => {
            const component = routes[routeName].component
            const childRoutes = routes[routeName].childRoutes

            return (
                <Route
                    key={routeName}
                    path={routes[routeName].pathSchema}
                    element={
                        isChild ? <RouteComponent component={component} fallback={<View/>}/> :
                            <>
                                <AppBar title={routeName}/>
                                <RouteComponent component={component} fallback={<View/>}/>
                            </>
                    }
                >
                    {childRoutes && routeElementsGenerator(childRoutes, true)}
                </Route>
            )
        })}
    </>
)

const Container: FC<{ routes: RoutesConfig; theme: SuperlitTheme }> =
    ({
         routes, theme
     }) => (
        <View h={"full"} bg={theme.colors.screen}>
            <RouteContext.Provider value={routes}>
                <BrowserRouter>
                    <Routes>
                        {routeElementsGenerator(routes)}
                    </Routes>
                </BrowserRouter>
            </RouteContext.Provider>
        </View>
    );

interface NavigateFun extends NavigateFunction {
    goBack: () => void;
}

const useRouter = () => {
    const navigate = useNavigateDOM() as NavigateFun
    navigate.goBack = () => navigate(-1)
    return navigate;
}

const useLocation = useLocationDOM

const useRouteData = () => {
    // const location = useLocation()
    return parsePath(location.pathname, location.search, useRoutes());
}

export {Container, useRouter, useRouteData, useLocation};
