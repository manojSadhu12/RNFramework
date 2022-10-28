import {RouteData, RoutesConfig} from "../types";
import {ValidParams} from "@superlit/typings"

export const routeCache: Record<string, RouteData> = {}

function parseRouteData(routesData: any, pathSegments: string[], routes: RoutesConfig) {
    // const routeData: any = {};

    if (pathSegments.length) {
        const pathSegment = pathSegments.shift();
        const [routeName, route] = Object.entries(routes).find(route => {
            return route[1].path === `/${pathSegment}/`;
        })!

        if (route) {
            if (route.params) {
                route.params.forEach(key => {
                    const value = pathSegments.shift()!
                    return routesData[key] = isNaN(value as any) ?
                        value === "true" ? true : value === "false" ? false : value
                        : +value;
                })
            }
        }
        if (route.childRoutes && pathSegments.length) {
            parseRouteData(routesData, pathSegments, route.childRoutes)
        }
    }
}

export default function (url: string, optionalParams: string, routes: RoutesConfig)
    : RouteData {
    const path = decodeURI(url)
    const search = decodeURI(optionalParams)

    const routeCached = routeCache[path + search]
    if (routeCached) {
        return routeCached
    }

    const pathSegments = path.split("/").filter(segment => segment != '');
    const paramsData: ValidParams = {}

    parseRouteData(paramsData, pathSegments, routes)

    const queryParamsData: ValidParams = (search.startsWith('?') ? search.slice(1) : search)
        .split('&')
        .map(p => p.split('='))
        .reduce((obj: any, pair) => {
            const [key, value] = pair.map(decodeURIComponent);
            obj[key] = isNaN(value as any) ?
                value === "true" ? true : value === "false" ? false : value
                : +value;
            return obj;
        }, {})

    const routeData = {
        params: paramsData,
        optionalParams: queryParamsData,
    };

    routeCache[path + search] = routeData
    return routeData
}