import {createContext, useContext} from "react";
import {RoutesConfig} from "./types";

const RouteContext = createContext<any>({})

export function useRoutes<T extends RoutesConfig>() {
    return useContext<T>(RouteContext)
}

export default RouteContext;