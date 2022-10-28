import React, {ComponentType} from 'react';
import {EmptyPrimitive, ValidParams, ValidVariable, ValuesOf} from '@superlit/typings'

type RouteData = {
    params: ValidParams | null | undefined,
    optionalParams: Partial<ValidParams> | null | undefined,
}

interface ChildRouteConfig<P, Q> extends Record<string, any> {
    // path: string,
    // pathSchema?: string,
    // routeSchema?: string,
    params: ValidVariable[],
    optionalParams: ValidVariable[],
    // component: React.ComponentType<any>,
    component: () => Promise<{ default: ComponentType<any> }>
    childRoutes?: ChildRoutesConfig
}

interface RouteConfig extends ChildRouteConfig<Record<string, EmptyPrimitive>, Record<string, EmptyPrimitive>> {
    options?: {
        appbar?: boolean,
        fullScreen?: boolean,
        alwaysOn?: boolean,
        orientation?: 'portrait' | 'landscape'
    }
}

type RoutesConfig = Record<string, RouteConfig>
type ChildRoutesConfig = Record<string, ChildRouteConfig<Record<string, any>, Record<string, any>>>

type ExtractParamsType<R> = R extends ChildRouteConfig<infer P, any> ? P : never
type ExtractQueryParamsType<R> = R extends ChildRouteConfig<any, infer Q> ? Q : never

type AllPaths<T extends RoutesConfig> = ValuesOf<{
    [K in keyof T & string]:
    T[K]['childRoutes'] extends RoutesConfig
        // @ts-ignore
        ? (K | `${K}/${AllPaths<Extract<T[K]['childRoutes'], RoutesConfig>>}`)
        : K
}>

export type {
    RoutesConfig,
    ChildRoutesConfig,
    RouteConfig,
    ChildRouteConfig,
    ExtractParamsType,
    ExtractQueryParamsType,
    RouteData,
    AllPaths
}