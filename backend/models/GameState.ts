export interface Hole {
    index: number;
    number: number;
}

export interface PlayerState {
    nrStonesLargeHole: Hole;
    nrStonesSmallHole: Hole[];
}

export class GameState {
    boardState = [
        {
            nrStonesLargeHole: {
                index: 7,
                number: 7
            },
            nrStonesSmallHole: [
                {
                    index: 0,
                    number: 7
                },
                {
                    index: 1,
                    number: 7
                },
                {
                    index: 2,
                    number: 7
                },
                {
                    index: 3,
                    number: 7
                },
                {
                    index: 4,
                    number: 7
                },
                {
                    index: 5,
                    number: 7
                },
                {
                    index: 6,
                    number: 7
                }
            ]
        },
        {
            nrStonesLargeHole: {
                index: 15,
                number: 7
            },
            nrStonesSmallHole: [
                {
                    index: 8,
                    number: 7
                },
                {
                    index: 9,
                    number: 7
                },
                {
                    index: 10,
                    number: 7
                },
                {
                    index: 11,
                    number: 7
                },
                {
                    index: 12,
                    number: 7
                },
                {
                    index: 13,
                    number: 7
                },
                {
                    index: 14,
                    number: 7
                }
            ]
        }
    ];

    handleMove(player: number, index: number): { boardState: PlayerState[]; nextPlayer: number; result: { finished: boolean; player: number } } {
        let nextPlayer = player === 1 ? 0 : 1;
        const extraTurn = this.distributeStones(index, player);
        if (extraTurn) nextPlayer = player;
        this.emptyHole(index);
        const result = this.checkWinCondition();
        return { boardState: this.boardState, nextPlayer, result };
    }

    checkWinCondition() {
        const result = {
            finished: false,
            player: 0
        };
        const anyStonesLeft =
            this.boardState[0].nrStonesSmallHole.some(hole => hole.number !== 0) || this.boardState[1].nrStonesSmallHole.some(hole => hole.number !== 0);
        if (!anyStonesLeft) {
            if (this.boardState[0].nrStonesLargeHole.number > this.boardState[0].nrStonesLargeHole.number) {
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

    emptyHole(index: number) {
        if (index <= 6) {
            this.boardState[0].nrStonesSmallHole.splice(index, 1, { index, number: 0 });
        } else if (index > 7 && index <= 14) {
            this.boardState[1].nrStonesSmallHole.splice(index - 8, 1, { index, number: 0 });
        }
    }

    distributeStones(index: number, player: number): boolean {
        let extraTurn = false;
        let numberOfStones = player === 0 ? this.boardState[0].nrStonesSmallHole[index].number : this.boardState[1].nrStonesSmallHole[index - 8].number;
        // For each stone, find the appropriate action. This maybe possible in a simpler way
        for (let i = 1; i < numberOfStones + 1; i++) {
            let currentIndex = (index + i) % 16;
            if (currentIndex <= 6) {
                const currentValue = this.boardState[0].nrStonesSmallHole[currentIndex].number;
                this.boardState[0].nrStonesSmallHole.splice(currentIndex, 1, { index: currentIndex, number: currentValue + 1 });
            } else if (currentIndex === 7) {
                if (player === 1) {
                    numberOfStones++;
                    break;
                } else {
                    this.boardState[0].nrStonesLargeHole.number++;
                    if (numberOfStones === i) {
                        extraTurn = true;
                    }
                }
            } else if (currentIndex <= 14) {
                const currentValue = this.boardState[1].nrStonesSmallHole[currentIndex - 8].number;
                this.boardState[1].nrStonesSmallHole.splice(currentIndex - 8, 1, { index: currentIndex, number: currentValue + 1 });
            } else if (player === 0) {
                numberOfStones++;
                break;
            } else {
                this.boardState[1].nrStonesLargeHole.number++;
                if (numberOfStones === i) {
                    extraTurn = true;
                }
            }
        }
        return extraTurn;
    }
}
