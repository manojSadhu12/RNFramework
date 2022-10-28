import {RouteConfig, RoutesConfig} from "../types";

function _routeGenerator<T extends RoutesConfig>(routes: T, defaultRoute: keyof T, routePrefix: string = "", routeDepth: string = "") {
    for (const routeName in routes) {
        const route = routes[routeName] as RouteConfig;

        route.path = routeName === defaultRoute ? "/" : `/${routeName.toKebabCase()}/`

        if (route.params) {
            route.routeSchema = route.path + route.params.map(it => `:${it}`).join("/")
        } else {
            route.routeSchema = route.path
        }

        route.routeDepth = routeDepth ? `${routeDepth}/${routeName}` : routeName

        route.pathSchema = routePrefix + route.routeSchema

        route.routeSchema = route.routeSchema.replace("//", "/")
        route.pathSchema = route.pathSchema.replace("//", "/")

        if (route.childRoutes) {
            _routeGenerator(route.childRoutes, "", route.pathSchema, route.routeDepth)
        }
    }
    return routes
}

function routeGenerator<T extends RoutesConfig>(routes: T, defaultRoute: keyof T, routePrefix: string = "") {
    return _routeGenerator(routes, defaultRoute, routePrefix)
}

export {routeGenerator}