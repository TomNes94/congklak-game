export interface Hole {
    index: number;
    number: number;
}

export interface PlayerState {
    nrStonesLargeHole: Hole;
    nrStonesSmallHole: Hole[];
}

export class GameState {
    playerOne: PlayerState = {
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
    };
    playerTwo: PlayerState = {
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
    };

    handleMove(player: number, index: number): { playerOne: PlayerState; playerTwo: PlayerState } {
        this.distributeStones(index, player);
        this.emptyHole(index);

        console.log(this.playerOne.nrStonesSmallHole);
        return { playerOne: this.playerOne, playerTwo: this.playerTwo };
    }

    emptyHole(index: number) {
        if (index <= 6) {
            this.playerOne.nrStonesSmallHole.splice(index, 1, { index, number: 0 });
        } else if (index > 7 && index <= 14) {
            this.playerTwo.nrStonesSmallHole.splice(index - 8, 1, { index, number: 0 });
        }
    }

    distributeStones(index: number, player: number) {
        let numberOfStones = player === 1 ? this.playerOne.nrStonesSmallHole[index].number : this.playerTwo.nrStonesSmallHole[index - 8].number;
        // For each stone, find the appropriate action. This maybe possible in a simpler way
        for (let i = 1; i < numberOfStones + 1; i++) {
            let currentIndex = (index + i) % 16;
            if (currentIndex <= 6) {
                const currentValue = this.playerOne.nrStonesSmallHole[currentIndex].number;
                this.playerOne.nrStonesSmallHole.splice(currentIndex, 1, { index: currentIndex, number: currentValue + 1 });
            } else if (currentIndex === 7) {
                if (player === 2) {
                    numberOfStones++;
                    break;
                } else {
                    this.playerOne.nrStonesLargeHole.number++;
                }
            } else if (currentIndex <= 14) {
                const currentValue = this.playerTwo.nrStonesSmallHole[currentIndex - 8].number;
                this.playerTwo.nrStonesSmallHole.splice(currentIndex - 8, 1, { index: currentIndex, number: currentValue + 1 });
            } else if (player === 1) {
                numberOfStones++;
                break;
            } else {
                this.playerTwo.nrStonesLargeHole.number++;
            }
        }
    }
}
