import '@superlit/typings'
import {Container} from "./src/Router";
import {
    ChildRouteConfig,
    ChildRoutesConfig,
    ExtractParamsType,
    ExtractQueryParamsType,
    RouteConfig,
    RoutesConfig
} from "./src/types"
import {routeGenerator} from "./src/utils/routeGenerator";
import {useRoutes} from "./src/RouteContext";
import Outlet, {useFocus, useUnFocus} from "./src/outlet/Outlet";
import Navigator from "./src/Navigator";

const Router = {
    Container,
    useRoutes,
    routeGenerator,
    Outlet,
    Navigator,
    useFocus,
    useUnFocus
};

export default Router;
export type {RoutesConfig, ChildRoutesConfig, RouteConfig, ChildRouteConfig, ExtractParamsType, ExtractQueryParamsType};
