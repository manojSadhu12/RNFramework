import {proxy, snapshot} from "valtio";

export const routeState = proxy({
    currentRoute: 1
})

setInterval(() => {
    ++routeState.currentRoute
}, 1000)