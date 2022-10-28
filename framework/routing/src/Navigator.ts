import {RoutesConfig} from "./types";
import {ExtractPaths, FilterObjectByKeys, ModifyToValidParams, Split, UnionToIntersection} from "@superlit/typings"
import {useRouteData, useRouter} from "./Router";
import {routeCache} from "./utils/parsePath";
import {Platform} from "react-native";

type RoutePath = `${string}/${string}`


type ConcatParams<D extends string[], T extends RoutesConfig, PR extends string> = {
    [P in keyof D]:
    P extends "0" ? T[D[P]][PR][number] :
        // @ts-ignore
        P extends "1" ? T[D[0]]["childRoutes"][D[P]][PR][number] :
            // @ts-ignore
            P extends "2" ? T[D[0]]["childRoutes"][D[1]]["childRoutes"][D[P]][PR][number] :
                // @ts-ignore
                P extends "3" ? T[D[0]]["childRoutes"][D[1]]["childRoutes"][D[2]]["childRoutes"][D[P]][PR][number] :
                    // @ts-ignore
                    P extends "4" ? T[D[0]]["childRoutes"][D[1]]["childRoutes"][D[2]]["childRoutes"][D[3]]["childRoutes"][D[P]][PR][number] :
                        // @ts-ignore
                        P extends "5" ? T[D[0]]["childRoutes"][D[1]]["childRoutes"][D[2]]["childRoutes"][D[3]]["childRoutes"][D[4]]["childRoutes"][D[P]][PR][number] :
                            // @ts-ignore
                            P extends "6" ? T[D[0]]["childRoutes"][D[1]]["childRoutes"][D[2]]["childRoutes"][D[3]]["childRoutes"][D[4]]["childRoutes"][D[5]]["childRoutes"][D[P]][PR][number] : undefined
}

type AllParams<PATHS extends (string), T extends RoutesConfig, PR extends string> = {
    [K in PATHS & string]: Params<K, T, PR>
}

type Params<PATH extends (string), T extends RoutesConfig, PR extends string> =
    PATH extends RoutePath ? ModifyToValidParams<ConcatParams<Split<PATH, '/'>, T, PR>[number]>
        : ModifyToValidParams<T[PATH][PR][number]>


export default class Navigator<RC extends RoutesConfig,
    PATHS extends Exclude<ExtractPaths<RC, 'childRoutes'>, `${string}/`>,
    PARAMS extends AllParams<PATHS, RC, 'params'>,
    OPTIONAL_PARAMS extends AllParams<PATHS, RC, 'optionalParams'>,
    > {
    constructor(private routes: RC) {
    }

    private currentPath = ''

    public getRouteData<_PATHS extends PATHS[]>(...paths: _PATHS): {
        params: UnionToIntersection<FilterObjectByKeys<PARAMS, _PATHS>[number]>,
        optionalParams: UnionToIntersection<FilterObjectByKeys<OPTIONAL_PARAMS, _PATHS>[number]>
    } {
        return useRouteData() as any
    }

    private constructPath<PATH extends PATHS>(
        path: PATH,
        params: PARAMS[PATH],
        optionalParams: Partial<OPTIONAL_PARAMS[PATH]>
    ) {
        let constructedPath = "/"

        let currentRoute: RoutesConfig = this.routes

        path.split('/')
            .forEach((pathSegment) => {
                constructedPath += pathSegment.toKebabCase() + '/'
                if (params) {
                    for (const param of currentRoute[pathSegment].params) {
                        // @ts-ignore
                        constructedPath += params![param]! + '/'
                    }
                }
                currentRoute = currentRoute[pathSegment].childRoutes!
            })

        constructedPath += '?' + new URLSearchParams(optionalParams as any)
        routeCache[constructedPath] = {params, optionalParams: optionalParams as any}
        this.currentPath = constructedPath

        return constructedPath
    }

    useNavigate(replace: boolean = false) {
        const router = useRouter()

        return <PATH extends PATHS>(
            path: PATH,
            params: PARAMS[PATH],
            optionalParams: Partial<OPTIONAL_PARAMS[PATH]>,
        ) => {
            let constructedPath = this.constructPath(path, params, optionalParams)

            if (typeof router === 'function') {
                router(constructedPath, {replace,})
            } else {
                // @ts-ignore
                router.link(constructedPath)
            }
        }
    }

    useSwitch() {
        const router = useRouter()
        const {params, optionalParams} = useRouteData()

        return <PATH extends PATHS>(
            path: PATH
        ) => {
            // @ts-ignore
            let constructedPath = this.constructPath(path, params || {}, optionalParams || {}, router)

            if (typeof router === 'function') {
                router(constructedPath, {replace: true})
            } else {
                // @ts-ignore
                router.link(constructedPath)
            }
        }
    }

    useBack() {
        if (Platform.OS === 'web') {
            return () => history.back()
        } else {
            const router = useRouter()
            return router.goBack
        }
    }
}