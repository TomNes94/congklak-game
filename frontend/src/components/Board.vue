<template lang="pug">
.board
    .holes-row
        hole(v-for="hole in boardState[0].nrStonesSmallHole" :isFilled="hole.number > 0" :nrStones="hole.number" :index="hole.index" @move="handleStoneClick(hole, 0)" player=0)
    .large-hole-row
        large-hole(:isFilled="boardState[1].nrStonesLargeHole.number > 0" :nrStones="boardState[1].nrStonesLargeHole.number")
        large-hole(:isFilled="boardState[0].nrStonesLargeHole.number > 0" :nrStones="boardState[0].nrStonesLargeHole.number")
    .holes-row.holes-row-reverse
        hole(v-for="hole in boardState[1].nrStonesSmallHole" :isFilled="hole.number > 0" :nrStones="hole.number" :index="hole.index" @move="handleStoneClick(hole, 1)" player=1)
    message(:active = "showError")
        span {{errorText}}
</template>

<script>
import Hole from "./Hole";
import LargeHole from "./LargeHole";
import Message from "./Message";

import { mapState, mapMutations } from "vuex";

export default {
    components: {
        Hole,
        LargeHole,
        Message
    },

    computed: mapState(["boardState", "vueSocket", "metaData", "nextPlayer"]),
    mounted() {
        this.vueSocket.socket.on("moveResolved", data => {
            this.distributeStones(JSON.parse(data));
        });
    },
    data() {
        return {
            errorText: null,
            showError: false
        };
    },
    methods: {
        handleStoneClick(obj, player) {
            if (player === this.metaData.player && player === this.nextPlayer) {
                this.vueSocket.socket.emit("move", JSON.stringify({ index: obj.index, player, roomId: this.metaData.roomId }));
            } else if (player === this.metaData.player) {
                this.errorText = "It's not your turn yet!";
                this.showError = true;
            } else {
                this.errorText = "This is not your side!";
                this.showError = true;
            }
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
