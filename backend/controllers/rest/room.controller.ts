import GameContainer from "../../models/GameContainer";
import generateRoomId from "../../utils/generateRoomId";
import { Request, Response } from "express";

export function createRoom(req: Request, res: Response) {
    const container = GameContainer.getInstance();
    const id = generateRoomId();
    container.createGame(req.body.socketId, id);
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
