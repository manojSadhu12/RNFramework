import { NetworkConfig } from '../types';

interface MiddlewareReturnOptional {
    type: 'CONTINUE',
    data?: any
}

interface MiddlewareReturnData {
    type: 'END' | 'ERROR',
    data: any
}

export type MiddlewareReturn = MiddlewareReturnData | MiddlewareReturnOptional

export default abstract class Middleware {
    abstract request(config: NetworkConfig, data: any): MiddlewareReturn;
    abstract response(endPoint: string, data: any, status: number): MiddlewareReturn;


    static evaluateRequestMiddlewares(middlewares: Middleware[], config: NetworkConfig, requestData: any | undefined = undefined): MiddlewareReturn {
        let result: MiddlewareReturn = { type: 'CONTINUE', data: requestData }
        for (const middleware of middlewares) {
            result = middleware.request(config, result.data)
            if (result.type != 'CONTINUE') {
                return result
            }
        }
        return result
    }

    static evaluateResponseMiddlewares(middlewares: Middleware[], endPoint: string, data: any, status: number): MiddlewareReturn {
        let result: MiddlewareReturn = { type: 'CONTINUE', data }
        for (const middleware of middlewares) {
            result = middleware.response(endPoint, result.data, status)
            if (result.type != 'CONTINUE') {
                return result
            }
        }
        return result
    }
}
