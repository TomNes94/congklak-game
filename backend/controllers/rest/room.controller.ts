import GameContainer from "../../models/GameContainer";
import generateRoomId from "../../utils/generateRoomId";
import { Request, Response } from "express";

export function createRoom(req: Request, res: Response) {
    const container = GameContainer.getInstance();
    const id = generateRoomId();
    container.createGame(req.body.socketId, id, req.body.isPrivate);
    res.send({
        roomId: id
    });
}

export function joinRoom(req: Request, res: Response) {
    const container = GameContainer.getInstance();
    const socketId = req.query.id as string;
    const isJoinSuccesful = container.joinGame(socketId, req.params.roomId);
    if (isJoinSuccesful) {
        res.send({ roomId: req.params.roomId });
    } else {
        res.status(404).send("Room not found");
    }
}

export function joinRandomRoom(req: Request, res: Response) {
    const container = GameContainer.getInstance();
    const socketId = req.query.id as string;
    const freeGame = container.games.find(game => game.players.length === 1 && game.isPrivate === false);
    if (freeGame !== undefined) {
        const isJoinSuccesful = container.joinGame(socketId, freeGame.roomId);

        if (isJoinSuccesful) {
            res.send({ roomId: freeGame.roomId, player: 1 });
        } else {
            res.status(404).send("Room not found");
        }
    } else {
        const id = generateRoomId();
        container.createGame(socketId, id, false);
        res.send({
            roomId: id,
            player: 0
        });
    }
}
