<template lang="pug">
.board-container
    h2.player-current {{currentPlayer}}
    board(v-if="loaded")
    button.button-white(@click="surrenderGame") Surrender
    spinner-modal(:active="!metaData.started" :roomId="metaData.roomId")
</template>

<script>
import Board from "../components/Board";
import { mapState, mapMutations } from "vuex";
import SpinnerModal from "../components/SpinnerModal";
import axios from "axios";
export default {
    name: "Home",
    components: { Board, SpinnerModal },
    computed: {
        currentPlayer() {
            return this.nextPlayer === this.metaData.player ? "It's your turn" : "Wait for other turn";
        },
        ...mapState(["boardState", "vueSocket", "metaData", "nextPlayer"])
    },
    data() {
        return {
            loaded: false
        };
    },
    created() {
        if (this.metaData.roomId === null) {
            this.$router.push({ name: "Room" });
        } else {
            this.loaded = true;
        }
    },
    methods: {
        async surrenderGame() {
            await axios.post("/api/room/surrender", { roomId: this.metaData.roomId, uuid: localStorage.getItem("uuid") });
        },
        ...mapMutations(["setGameMetadata"])
    }
};
</script>

<style lang="scss" scoped>
.player-current {
    margin: 1% 0 1% 0;
    font-size: 32px;
    color: white;
}
.board-container {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: 480px) {
        font-size: 1rem;
    }
}

.button-white {
    background-color: rgb(213, 213, 213);
    padding: 25px;
    color: black;
    font-size: 1.75rem;
    border-radius: 10%;
    @media (max-width: 480px) {
        padding: 20px 50px;
        border-radius: 10px;
        font-size: 1rem;
    }
    cursor: pointer;
    border: none;
    &:hover {
        background-color: rgb(197, 197, 197);
    }
}
</style>
