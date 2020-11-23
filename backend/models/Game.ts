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

    constructor(uuid: string, roomId: string) {
        const player = new Player(uuid, 0);
        this.players.push(player);

        this.roomId = roomId;
        this.state = new GameState();
    }

    public addPlayerToRoom(uuid: string) {
        const additionalPlayer = new Player(uuid, 1);
        this.players.push(additionalPlayer);
    }

    onMoveReceived(move: Move): { boardState: PlayerState[]; nextPlayer: number; result: { finished: boolean; player: number } } {
        const { boardState, nextPlayer, result } = this.state.handleMove(move.player, move.index);
        return { boardState, nextPlayer, result };
    }

    getState() {
        return this.state.boardState;
    }

    getNextPlayer() {
        return this.state.nextPlayer;
    }
}
