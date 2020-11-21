import GameContainer from "../../models/GameContainer";
import { io } from "../../server";

export function handleNewMove(json: string) {
    const payload = JSON.parse(json);
    const move = {
        index: payload.index,
        player: payload.player
    };
    const container = GameContainer.getInstance();
    const newBoardState = container.handleMove(payload.roomId, move);
    io.to(payload.roomId).emit("moveResolved", JSON.stringify(newBoardState));
}

export function emitGameStartedEvent(roomId: string) {
    io.to(roomId).emit("gameStarted", JSON.stringify("test"));
}
