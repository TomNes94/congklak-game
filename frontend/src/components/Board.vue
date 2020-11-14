<template lang="pug">
.board
    .holes-row
        hole(v-for="hole in playerOne.nrStonesSmallHole" :isFilled="hole.number > 0" :nrStones="hole.number" :index="hole.index" @move="handleStoneClick(hole, 1)" player=1)
    .large-hole-row
        large-hole(:isFilled="playerTwo.nrStonesLargeHole.number > 0" :nrStones="playerTwo.nrStonesLargeHole.number")
        large-hole(:isFilled="playerOne.nrStonesLargeHole.number > 0" :nrStones="playerOne.nrStonesLargeHole.number")
    .holes-row.holes-row-reverse
        hole(v-for="hole in playerTwo.nrStonesSmallHole" :isFilled="hole.number > 0" :nrStones="hole.number" :index="hole.index" @move="handleStoneClick(hole, 2)" player=2)
    
</template>

<script>
import Hole from "./Hole";
import LargeHole from "./LargeHole";

import { mapState, mapMutations } from "vuex";

export default {
    components: {
        Hole,
        LargeHole
    },
    computed: mapState(["playerOne", "playerTwo", "vueSocket", "metaData"]),
    mounted() {
        this.vueSocket.socket.on("moveResolved", data => {
            this.distributeStones(JSON.parse(data));
        });
    },
    methods: {
        handleStoneClick(obj, player) {
            this.vueSocket.socket.emit("move", JSON.stringify({ index: obj.index, player, roomId: this.metaData.roomId }));
        },
        ...mapMutations(["distributeStones", "emptyHole"])
    }
};
</script>

<style lang="scss" scoped>
.board {
    width: 70%;
    background-color: rgb(145, 106, 64);
    border-radius: 175px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2% 3%;
}
.holes-row {
    display: flex;
    width: 90%;
    justify-content: space-around;
    margin: 2%;
}

.holes-row-reverse {
    flex-direction: row-reverse;
}
.large-hole-row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin: 2%;
}
</style>
