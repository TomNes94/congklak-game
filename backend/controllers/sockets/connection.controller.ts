import GameContainer from "../../models/GameContainer";
import { handleNewMove } from "./move.controller";
import { Socket } from "socket.io";

export function handleNewConnection(socket: Socket) {
    const container = GameContainer.getInstance();
    socket.on("move", handleNewMove);
    socket.on("disconnect", reason => handleDisconnect(reason, socket));
    socket.on("register", json => handleRegister(json, socket));
    container.addConnection(socket);
}

export function handleRegister(json: string, socket: Socket) {
    const container = GameContainer.getInstance();
    const payload = JSON.parse(json);
    container.registerConnection(payload.uuid, socket.id);
    const currentGame = container.checkCurrentGame(payload.uuid);
    if (currentGame !== undefined && currentGame !== null) {
        const currentGameState = container.rejoinGame(socket.id);
        socket.emit("game_reconnection", JSON.stringify({ roomId: currentGame.roomId, started: currentGame.started, ...currentGameState }));
    } else {
        null;
    }
}

export function handleDisconnect(reason: string, socket: Socket) {
    const container = GameContainer.getInstance();
    container.removeConnection(socket);
}
