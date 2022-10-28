import axios, { AxiosInstance, Method } from "axios"
import Middleware from '../middlewares/Middleware';
import { NetworkConfig } from '../types';
import { MiddlewareReturn } from '../middlewares/Middleware';


export default class RestClient {
  axiosInstance: AxiosInstance;

  constructor(private baseConfig: NetworkConfig, private middlewares: Middleware[] = []) {
    this.axiosInstance = axios.create({
      baseURL: baseConfig.url,
      headers: baseConfig.headers,
    })
  }

  async request<T = any>(endPoint: string, method: Method, requestData: any | undefined = undefined): Promise<T | null> {
    const config: NetworkConfig = { url: endPoint, headers: {} }

    // Evaluating request middlewares
    const requestResult = Middleware.evaluateRequestMiddlewares(this.middlewares, config, requestData)
    if (requestResult.type == 'END') return requestResult.data;
    else if (requestResult.type == 'ERROR') throw new Error(requestResult.data);


    // Api call
    const { data, status } = await this.axiosInstance.request<T>({ method, data: requestResult.data, ...config })


    // Evaluating response middlewares
    const responseResult = Middleware.evaluateResponseMiddlewares(this.middlewares, endPoint, data, status)
    if (responseResult.type == 'END') return responseResult.data;
    else if (responseResult.type == 'ERROR') throw new Error(responseResult.data);

    return responseResult.data
  }

  async get<T = any>(endPoint: string): Promise<T | null> {
    return this.request<T>(endPoint, "GET")
  }

  async post<T = any>(endPoint: string, requestData: any | undefined = undefined): Promise<T | null> {
    return this.request<T>(endPoint, "POST", requestData)
  }

  async put<T = any>(endPoint: string, requestData: any | undefined = undefined): Promise<T | null> {
    return this.request<T>(endPoint, "PUT", requestData)
  }

  async delete<T = any>(endPoint: string, requestData: any | undefined = undefined): Promise<T | null> {
    return this.request<T>(endPoint, "DELETE", requestData)
  }
}
