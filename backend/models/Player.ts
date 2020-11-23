export default class Player {
    uuid;
    playerNumber;
    constructor(uuid: string, playerNumber: number) {
        this.uuid = uuid;
        this.playerNumber = playerNumber;
    }
}
