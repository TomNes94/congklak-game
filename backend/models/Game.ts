import { GameState, PlayerState } from "./GameState";
import Player from "./Player";

export interface Move {
    player: number;
    index: number;
}

export class Game {
    state: GameState;
    players: Player[] = [];
    roomId: string;

    constructor(socketId: string, roomId: string) {
        const player = new Player(socketId);
        this.players.push(player);
        this.roomId = roomId;
        this.state = new GameState();
    }

    public addPlayerToRoom(socketId: string) {
        const additionalPlayer = new Player(socketId);
        this.players.push(additionalPlayer);
    }

    onMoveReceived(move: Move): { playerOne: PlayerState; playerTwo: PlayerState } {
        const newBoardState = this.state.handleMove(move.player, move.index);
        return newBoardState;
    }
}
