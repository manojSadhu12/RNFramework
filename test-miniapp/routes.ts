import Router, {RoutesConfig} from '@superlit/routing';
import {ExtractPaths, ModifyToValidParams, Split} from '@superlit/typings'

const routes = Router.routeGenerator({
    Home: {component: () => import('./src/Home'), params: [], optionalParams: ['fromHome', 'abc']},


    Profile: {
        component: () => import(/* webpackChunkName: "profile" */ './src/Profile'),
        params: ['userId1', 'userName1'],
        optionalParams: ['fromHome', 'abc'],
        options: {fullScreen: true},
        childRoutes: {
            ChildPage: {
                component: () => import(/* webpackChunkName: "profile" */ './src/ChildPage'),
                params: ['userId2', 'userName2'],
                optionalParams: ['ss'],
                childRoutes: {
                    nChildPage1: {
                        params: ['userId3', 'userName3'],
                        optionalParams: ['fromHome', 'abc', 'abc2'],
                        component: () => import('./src/ChildPage'),
                    }
                }
            },
            ChildPage2: {
                component: () => import(/* webpackChunkName: "profile" */ './src/ChildPage2'),
                params: ['userId2', 'userName2'],
                optionalParams: ['ss'],
                childRoutes: {
                    nChildPage1: {
                        params: ['userId3', 'userName3'],
                        optionalParams: ['fromHome', 'abc', 'abc2'],
                        component: () => import('./src/ChildPage'),
                    }
                }
            },
            /*ChildPage2: {
                component: ChildPage,
                params: {userId2: "", userName2: ""},
                childRoutes: {
                    nChildPage2: {
                        params: {userId3: "", userName3: ""},
                        component: ChildPage,
                    }
                }
            }*/
        }
    },
}, "Home")

type AllRoutes = Exclude<ExtractPaths<typeof routes, 'childRoutes'>, `${string}/`>
const a: AllRoutes = "Profile/ChildPage/nChildPage1"

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

type AllParams<T extends RoutesConfig, PR extends string> = {
    // @ts-ignore
    [K in Exclude<ExtractPaths<typeof routes, 'childRoutes'>, `${string}/`> & string]:
    K extends RoutePath ? ModifyToValidParams<ConcatParams<Split<K, '/'>, T, PR>[number]>
        : ModifyToValidParams<T[K][PR][number]>
}

type AllValuess = AllParams<typeof routes, 'params'>

/*const aaaa: AllValuess = {
    Home: {
        userName1: "Profile",
    },
    Profile: {
        userName1: "Profile",
        userId1: "12345",
    },
    "Profile/ChildPage": {
        userName1: "Profile/ChildPage",
        userId1: "12345",
        userName2: "Profile/ChildPage",
        userId2: "12345",
    },
    "Profile/ChildPage/nChildPage1": {
        userId1: "sfg",
        userName1: "Profile/ChildPage/nChildPage1",
        userName2: "Profile/ChildPage/nChildPage1",
        userId2: "sfg",
        userId3: "12345",
        userName3: "Profile/ChildPage/nChildPage1",
    }
}*/

export const useRoutes = () => Router.useRoutes<typeof routes>();

export const navigator = new Router.Navigator(routes)

/*navigator.useNavigate("Profile/ChildPage", {
    userName2: "Jane Doe",
    userId1: "123456789",
    userId2: "123456789", userName1: "gdr",
}, {
    fromHome: true,
    abc: "abc",
})*/

export default routes;