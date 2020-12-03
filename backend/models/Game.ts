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
    lastActivity: number;
    isPrivate: boolean;
    started: boolean;

    constructor(uuid: string, roomId: string, isPrivate: boolean) {
        const player = new Player(uuid, 0);
        this.players.push(player);
        this.roomId = roomId;
        this.state = new GameState();
        this.lastActivity = Date.now();
        this.isPrivate = isPrivate;
        this.started = false;
    }

    public addPlayerToRoom(uuid: string) {
        const additionalPlayer = new Player(uuid, 1);
        this.players.push(additionalPlayer);
    }

    onMoveReceived(move: Move): { boardState: PlayerState[]; nextPlayer: number; result: { finished: boolean; player: number } } {
        const { boardState, nextPlayer, result } = this.state.handleMove(move.player, move.index);
        this.lastActivity = Date.now();
        return { boardState, nextPlayer, result };
    }

    getState() {
        return this.state.boardState;
    }

    getNextPlayer() {
        return this.state.nextPlayer;
    }
}
