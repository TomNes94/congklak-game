import { Game, Move } from "./Game";
import { Socket } from "socket.io";
import { emitGameStartedEvent } from "../controllers/sockets/move.controller";
export default class GameContainer {
    private static instance: GameContainer;
    connections: Socket[] = [];
    games: Game[] = [];
    private constructor() {}

    public static getInstance() {
        if (!GameContainer.instance) {
            GameContainer.instance = new GameContainer();
        }

        return GameContainer.instance;
    }

    public createGame(socketId: string, roomId: string) {
        const socket = this.connections.find(socket => socket.id === socketId);
        socket.join(roomId);
        const newGame = new Game(socketId, roomId);
        this.games.push(newGame);
    }

    joinGame(socketId: string, roomId: string): boolean {
        const game = this.games.find(game => game.roomId === roomId);
        const socket = this.connections.find(connection => connection.id === socketId);
        socket.join(roomId);
        if (game) {
            game.addPlayerToRoom(socketId);
            emitGameStartedEvent(roomId);
            return true;
        } else {
            return false;
        }
    }

    addConnection(socket: Socket) {
        if (!this.connections.includes(socket)) {
            this.connections.push(socket);
        }
    }

    handleMove(roomId: string, move: Move) {
        const game = this.games.find(game => game.roomId === roomId);
        const { boardState, nextPlayer, result } = game.onMoveReceived(move);
        return { boardState, nextPlayer, result };
    }
}
