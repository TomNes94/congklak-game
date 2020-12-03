import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import store from "../store";
import router from "../router";
export class VueSocket {
    constructor() {
        this.socket = io({
            forceNew: false
        });

        this.socket.on("connect", () => {
            this.socketId = this.socket.id;
            this.registerUser();
        });

        this.socket.on("game_reconnection", data => {
            const parsedData = JSON.parse(data);
            console.log(parsedData);
            store.commit("setGameMetadata", { roomId: parsedData.roomId, player: parsedData.playerNumber, started: parsedData.started });
            store.commit("distributeStones", { boardState: parsedData.state, nextPlayer: parsedData.nextPlayer, result: { finished: false, player: 0 } });
            router.push({
                name: "BoardContainer",
                params: { roomId: parsedData.roomId, player: parsedData.nextPlayer, isRandom: true }
            });
        });
    }

    registerUser() {
        if (localStorage.getItem("uuid") === null) {
            const uuid = uuidv4();
            localStorage.setItem("uuid", uuid);
            this.socket.emit("register", JSON.stringify({ uuid }));
        } else {
            this.socket.emit("register", JSON.stringify({ uuid: localStorage.getItem("uuid") }));
        }
    }
}
