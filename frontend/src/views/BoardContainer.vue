<template lang="pug">
.board-container
    h2.player-current {{currentPlayer}}
    board
    spinner-modal(:active="!metaData.started" :roomId="metaData.roomId")
</template>

<script>
import Board from "../components/Board";
import { mapState, mapMutations } from "vuex";
import SpinnerModal from "../components/SpinnerModal";
export default {
    name: "Home",
    components: { Board, SpinnerModal },
    computed: {
        currentPlayer() {
            return this.nextPlayer === this.metaData.player ? "It's your turn" : "Wait for other turn";
        },
        ...mapState(["boardState", "vueSocket", "metaData", "nextPlayer"])
    }
};
</script>

<style lang="scss" scoped>
.player-current {
    margin: 5% 0 5% 0;
    font-size: 32px;
    color: white;
}
.board-container {
    background-color: black;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 480px) {
        font-size: 1rem;
    }
}
</style>
