import { io, Socket } from "socket.io-client";


export default class SocketClient {
    socket: Socket
    constructor(private url: string) {
        this.socket = io(url, {
            reconnection: true,
            autoConnect: false
        });
    }

    connect() {
        this.socket.io.on("error", (err) => {
            console.log(err)
        })
        this.socket.connect()

    }
}

