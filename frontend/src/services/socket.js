import io from "socket.io-client";

export class VueSocket {
    constructor() {
        this.socket = io({
            forceNew: false
        });

        this.socket.on("connect", () => {
            this.socketId = this.socket.id;
        });
    }
}
