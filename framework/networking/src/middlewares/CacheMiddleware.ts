import { NetworkConfig } from "../types";
import Middleware from "./Middleware";
import { MiddlewareReturn } from './Middleware';

const cachedResponses: Record<string, { cachedAt: number, data: any }> = {}

export default class CacheMiddleware extends Middleware {
    constructor(private cacheConfig: Record<string, number>) {
        super();
    }

    request(config: NetworkConfig, data: any): MiddlewareReturn {
        const cachedResponse = cachedResponses[config.url]
        if (this.cacheConfig[config.url] && cachedResponse) {
            if (Date.now() - cachedResponse.cachedAt <= this.cacheConfig[config.url]) {
                return { type: 'END', data: cachedResponse.data }
            }
        }
        return { type: "CONTINUE", data }
    }
    response(endPoint: string, data: any, status: number): MiddlewareReturn {
        if (this.cacheConfig[endPoint]) {
            cachedResponses[endPoint] = { cachedAt: Date.now(), data }
        }
        return { type: "CONTINUE", data }
    }
}