<template lang="pug">
.board
    .holes-row
        hole(v-for="hole in boardState[metaData.player === 1 ? 0 : 1].nrStonesSmallHole" :isFilled="hole.number > 0" :nrStones="hole.number" :index="hole.index" @move="handleStoneClick(hole, metaData.player === 1 ? 0 : 1)" :player="metaData.player === 1 ? 0 : 1" :ref="`hole_${hole.index}`")
    .large-hole-row
        large-hole(:isFilled="boardState[metaData.player].nrStonesLargeHole.number > 0" :nrStones="boardState[metaData.player].nrStonesLargeHole.number")
        large-hole(:isFilled="boardState[metaData.player === 1 ? 0 : 1].nrStonesLargeHole.number > 0" :nrStones="boardState[metaData.player === 1 ? 0 : 1].nrStonesLargeHole.number")
    .holes-row.holes-row-reverse
        hole(v-for="hole in boardState[metaData.player].nrStonesSmallHole" :isFilled="hole.number > 0" :nrStones="hole.number" :index="hole.index" @move="handleStoneClick(hole, metaData.player)" :player="metaData.player" :active="nextPlayer === metaData.player && hole.number !==0 ")
    message(:active = "showError")
        span {{errorText}}
    victory-modal(:active="isFinished" :isWinner="winner === metaData.player")
</template>

<script>
import Hole from "./Hole";
import LargeHole from "./LargeHole";
import Message from "./Message";
import VictoryModal from "./VictoryModal";

import { mapState, mapMutations } from "vuex";

export default {
    components: {
        Hole,
        LargeHole,
        Message,
        VictoryModal
    },

    computed: {
        currentPlayer() {
            return this.nextPlayer === this.metaData.player ? "It's your turn" : "Wait for other turn";
        },
        ...mapState(["boardState", "vueSocket", "metaData", "nextPlayer", "isFinished", "winner"])
    },
    mounted() {
        this.vueSocket.socket.on("moveResolved", data => {
            console.log(this.$refs.hole_8.$el.getBoundingClientRect());
            this.distributeStones(JSON.parse(data));
        });
        this.vueSocket.socket.on("gameStarted", () => {
            this.updateGameMetadata({ started: true });
        });
        this.vueSocket.socket.on("gameSurrendered", json => {
            this.onSurrender(JSON.parse(json));
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
        animateStonesMoving(elements) {
            Object.keys(elements).forEach(element => {
                const index = parseInt(element.replace("hole_", ""));
                const el = elements[element];
                const coords = el.getBoundingClientRect();
                const img = document.createElement("img");
                img.setAttribute("src", "/img/shell.e4fabc44.png");
                img.style.left = coords.left + "px";
                img.style.top = coords.top + "px";
            });
        },

        ...mapMutations(["distributeStones", "emptyHole", "updateGameMetadata", "onSurrender", "resetBoardState"])
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
    margin-bottom: 50px;
    box-shadow: inset 3px 1px 55px 1px rgba(0, 0, 0, 0.45);
    border: 15px rgb(121, 89, 55) solid;

    @media (max-width: 480px) {
        width: 85%;
        padding: 6px 4px 16px 4px;
        border-radius: 75px;
    }
}
.holes-row {
    display: flex;
    width: 90%;
    justify-content: space-around;
    margin: 2%;
    @media (max-width: 480px) {
        margin: 9% 2%;
    }
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
