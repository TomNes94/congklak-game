import GameContainer from "../../models/GameContainer";
import { Move } from "../../models/Game";
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
