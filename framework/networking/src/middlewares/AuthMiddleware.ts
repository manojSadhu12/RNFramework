import { NetworkConfig } from "../types";
import Middleware from "./Middleware";
import { MiddlewareReturn } from './Middleware';

export default class AuthMiddleware extends Middleware {
    request(config: NetworkConfig, data: any): MiddlewareReturn {
        return { type: "CONTINUE", data }
    }
    response(endPoint: string, data: any, status: number): MiddlewareReturn {
        return { type: "CONTINUE", data }
        // return { type: "ERROR", data: "Error in Auth" }
    }
}