import { PlayerState } from "./GameState";

export default class AI {
    depth: number = 1;

    constructor(depth: number) {
        this.depth = depth;
    }

    getMove(boardState: PlayerState[], player: number) {
        const copiedBoardState = JSON.parse(JSON.stringify(boardState));

        const move = this.maxMinMove(copiedBoardState, player, this.depth, player);
        return move[0];
    }

    maxMinMove(boardState: PlayerState[], player: number, depth: number, maxForPlayer: number) {
        if (depth === -1 || this.checkWinCondition(boardState).finished) {
            return [null, this.getScore(boardState, maxForPlayer)];
        }

        const moves = this.getPossibleMoves(boardState, player);
        const maximise = maxForPlayer === player;
        const worstScore = maximise ? -Infinity : Infinity;
        let bestMove = [moves[0].index, worstScore];

        for (let move of moves) {
            const nextState = this.handleMove(boardState, player, move.index);

            // Get the next min/max score for the board created by this move.
            const [_, score] = this.maxMinMove(nextState.boardState, nextState.nextPlayer, depth - 1, maxForPlayer);

            // If we're maximising, set the new max; if minimising likewise.
            const setNewMax = maximise && score >= bestMove[1];
            const setNewMin = !maximise && score <= bestMove[1];
            if (setNewMax || setNewMin) {
                bestMove = [move.index, score];
            }
        }

        return bestMove;
    }

    getPossibleMoves(board: PlayerState[], player: number) {
        const moves = board[player].nrStonesSmallHole.filter(hole => hole.number !== 0);
        return moves;
    }

    copyBoard(boardState: PlayerState[]) {
        return [...boardState];
    }

    emptyHole(currentBoardState: PlayerState[], index: number) {
        const boardState = this.copyBoard(currentBoardState);
        if (index <= 6) {
            const numberOfStones = boardState[0].nrStonesSmallHole.splice(index, 1, { index, number: 0 });
            return { boardState, numberOfStones };
        } else if (index > 7 && index <= 14) {
            const numberOfStones = boardState[1].nrStonesSmallHole.splice(index - 8, 1, { index, number: 0 });
            return { boardState, numberOfStones };
        }
    }

    handleMove(boardState: PlayerState[], player: number, index: number): { boardState: PlayerState[]; nextPlayer: number; result: { finished: boolean; player: number } } {
        let nextPlayer = player === 1 ? 0 : 1;
        let intermittentState = this.emptyHole(boardState, index);
        boardState = intermittentState.boardState;

        const newBoardState = this.updateBoard(intermittentState.numberOfStones[0].number, index, boardState, player);
        if (newBoardState.extraTurn) nextPlayer = player;
        if (boardState[nextPlayer].nrStonesSmallHole.every(hole => hole.number === 0)) {
            nextPlayer = nextPlayer === 1 ? 0 : 1;
        }
        const result = this.checkWinCondition(boardState);
        return { boardState, nextPlayer, result };
    }

    updateBoard(numberOfStones: number, index: number, currentBoard: PlayerState[], player: number) {
        let extraTurn = false;
        const boardState = this.copyBoard(currentBoard);
        for (let i = 1; i < numberOfStones + 1; i++) {
            let currentIndex = (index + i) % 16;

            if (currentIndex <= 6) {
                const currentValue = boardState[0].nrStonesSmallHole[currentIndex].number;
                boardState[0].nrStonesSmallHole.splice(currentIndex, 1, { index: currentIndex, number: currentValue + 1 });
            } else if (currentIndex === 7) {
                if (player === 1) {
                    numberOfStones++;
                } else {
                    boardState[0].nrStonesLargeHole.number++;
                    if (numberOfStones === i) {
                        extraTurn = true;
                    }
                }
            } else if (currentIndex <= 14) {
                const currentValue = boardState[1].nrStonesSmallHole[currentIndex - 8].number;
                boardState[1].nrStonesSmallHole.splice(currentIndex - 8, 1, { index: currentIndex, number: currentValue + 1 });
            } else if (player === 0) {
                numberOfStones++;
            } else {
                boardState[1].nrStonesLargeHole.number++;
                if (numberOfStones === i) {
                    extraTurn = true;
                }
            }
        }
        return { boardState, extraTurn };
    }

    checkWinCondition(currentBoardState: PlayerState[]) {
        let boardState = this.copyBoard(currentBoardState);
        const result = {
            finished: false,
            player: 0
        };
        const anyStonesLeft = boardState[0].nrStonesSmallHole.some(hole => hole.number !== 0) || boardState[1].nrStonesSmallHole.some(hole => hole.number !== 0);
        if (!anyStonesLeft) {
            if (boardState[0].nrStonesLargeHole.number > boardState[1].nrStonesLargeHole.number) {
                result.finished = true;
                result.player = 0;
            } else {
                result.finished = true;
                result.player = 1;
            }
        } else {
            result.finished = false;
        }
        return result;
    }

    getScore(boardState: PlayerState[], player: number) {
        return boardState[player].nrStonesLargeHole.number - boardState[player === 1 ? 0 : 1].nrStonesLargeHole.number;
    }
}
