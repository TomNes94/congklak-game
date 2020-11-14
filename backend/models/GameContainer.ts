import { Game, Move } from "./Game";
import { Socket } from "socket.io";

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
        if (game) {
            game.addPlayerToRoom(socketId);
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
        const newBoardState = game.onMoveReceived(move);
        return newBoardState;
    }
}
