import GameContainer from "../../models/GameContainer";
import { Request, Response } from "express";

export function getRooms(req: Request, res: Response) {
    const container = GameContainer.getInstance();
    const gamesJson = container.games.map(game => ({
        lastActivity: game.lastActivity,
        isPrivate: game.isPrivate,
        roomId: game.roomId
    }));

    res.send(gamesJson);
}
