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

    if (newBoardState.againstAI && newBoardState.nextPlayer === 1) {
        setTimeout(() => {
            let AIFinished: boolean = true;
            let newBoardState;
            while (AIFinished) {
                newBoardState = container.handleAIMove(payload.roomId);
                if (newBoardState.nextPlayer === 0 || newBoardState.result.finished) {
                    AIFinished = false;
                }
            }
            io.to(payload.roomId).emit("moveResolved", JSON.stringify(newBoardState));
        }, 2000);
    }
}

export function emitGameStartedEvent(roomId: string) {
    io.to(roomId).emit("gameStarted", JSON.stringify("test"));
}

export function emitGameSurrenderedEvent(roomId: string, result: { finished: boolean; player: number }) {
    io.to(roomId).emit("gameSurrendered", JSON.stringify(result));
}
