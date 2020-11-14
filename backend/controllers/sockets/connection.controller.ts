import GameContainer from "../../models/GameContainer";
import { handleNewMove } from "./move.controller";
import { Socket } from "socket.io";
export function handleNewConnection(socket: Socket) {
    const container = GameContainer.getInstance();
    socket.on("move", handleNewMove);
    container.addConnection(socket);
}
