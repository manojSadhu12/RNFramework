import '@superlit/typings'
import axios from "axios"
import RestClient from "./src/clients/RestClient"
import AuthMiddleware from './src/middlewares/AuthMiddleware';
import CacheMiddleware from "./src/middlewares/CacheMiddleware";
import SocketClient from './src/clients/SocketClient';


const init = () => {
    const myRestClient = new RestClient({
        url: 'https://reqres.in/api/',
        headers: {
            Accept: 'application/json',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    }, [new AuthMiddleware(), new CacheMiddleware({ users: 5000 })]);

    myRestClient.get('users').then(data => {
        console.log(data)
    }).catch(e => console.log(e))


    // const socketClient = new SocketClient('http://13.127.219.110:7500/')
    // socketClient.connect()

}

export { axios, RestClient, init }
