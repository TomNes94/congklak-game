export interface Hole {
    index: number;
    number: number;
}

export interface PlayerState {
    nrStonesLargeHole: Hole;
    nrStonesSmallHole: Hole[];
}
