import { Game, Move } from "./Game";
import { PlayerState } from "./GameState";
import { Socket } from "socket.io";
import { emitGameStartedEvent } from "../controllers/sockets/move.controller";
export default class GameContainer {
    private static instance: GameContainer;

    // One array that contains all actual socket connections
    sockets: Socket[] = [];

    // One array that matches actual people (represented by uuid) with the sockets. On reconnection, one gets a new socket and thus a new socketId
    connections: { uuid: string; socketId: string }[] = [];
    games: Game[] = [];
    private constructor() {}

    // Singleton pattern
    public static getInstance() {
        if (!GameContainer.instance) {
            GameContainer.instance = new GameContainer();
        }

        return GameContainer.instance;
    }

    public createGame(socketId: string, roomId: string) {
        const { socket, uuid } = this.findSocketAndUuid(socketId);
        socket.join(roomId);
        const newGame = new Game(uuid, roomId);
        this.games.push(newGame);
    }

    // If the game with Room id x exists, join it and emit to players that it has started
    joinGame(socketId: string, roomId: string): boolean {
        const game = this.games.find(game => game.roomId === roomId);
        const { socket, uuid } = this.findSocketAndUuid(socketId);
        socket.join(roomId);
        if (game) {
            game.addPlayerToRoom(uuid);
            emitGameStartedEvent(roomId);
            return true;
        } else {
            return false;
        }
    }

    checkCurrentGame(uuid: string): Game {
        const game = this.games.find(game => {
            const idx = game.players.findIndex(player => player.uuid === uuid);
            if (idx === -1) {
                return false;
            } else {
                return true;
            }
        });
        return game || null;
    }

    rejoinGame(socketId: string): { state: PlayerState[]; playerNumber: number; nextPlayer: number } {
        const { socket, uuid } = this.findSocketAndUuid(socketId);
        const game = this.games.find(game => {
            const idx = game.players.findIndex(player => player.uuid === uuid);
            if (idx === -1) {
                return false;
            } else {
                return true;
            }
        });
        socket.join(game.roomId);
        const playerNumber = game.players.find(player => player.uuid === uuid).playerNumber;
        const gameState = game.getState();
        const nextPlayer = game.getNextPlayer();
        return { state: gameState, playerNumber, nextPlayer };
    }

    // Add the socket to the list
    addConnection(socket: Socket) {
        if (!this.sockets.includes(socket)) {
            this.sockets.push(socket);
        }
    }

    // Handle a request for a connection, update if exists, add otherwise
    registerConnection(uuid: string, socketId: string) {
        const idx = this.connections.findIndex(connection => connection.uuid === uuid);
        if (idx === -1) {
            this.connections.push({ uuid, socketId });
        } else {
            const oldSocketId = this.connections[idx].socketId;
            this.connections[idx].socketId = socketId;
        }
    }

    removeConnection(socket: Socket) {
        const idx = this.sockets.findIndex(s => s.id === socket.id);
        this.sockets.splice(idx, 1);
    }

    handleMove(roomId: string, move: Move) {
        const game = this.games.find(game => game.roomId === roomId);
        const { boardState, nextPlayer, result } = game.onMoveReceived(move);
        return { boardState, nextPlayer, result };
    }

    findSocketAndUuid(socketId: string): { socket: Socket; uuid: string } {
        const socket = this.sockets.find(connection => connection.id === socketId);
        const connection = this.connections.find(connection => connection.socketId === socketId);

        return { socket, uuid: connection.uuid };
    }
}
