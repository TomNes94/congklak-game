<template lang="pug">
.modal(v-if="active")
    .dialog
        p {{showCompletionText}}
        button.button-white(@click="onPlayAgain") Play again?
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: ["active", "isWinner"],
    computed: {
        showCompletionText() {
            if (this.isWinner) {
                return "You Won!";
            } else {
                return "You Lost!";
            }
        }
    },
    methods: {
        onPlayAgain() {
            this.onSurrender({ finished: false, player: 0 });
            this.$router.push({
                name: "Room"
            });
        },
        ...mapMutations(["onSurrender"])
    }
};
</script>

<style lang="scss" scoped>
.modal {
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    background-color: rgba(44, 44, 44, 0.7);
    z-index: 100;
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
}
.dialog {
    background-color: rgb(86, 89, 100);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 101;
    position: absolute;
    border-radius: 20px;
    top: 30%;
    left: 30%;
    width: 40%;
    height: 40%;
    @media (max-width: 480px) {
        left: 10%;
        width: 80%;
        top: 40%;
        height: 20%;
    }
}

p {
    color: white;
    font-size: 1.75rem;
    @media (max-width: 480px) {
        font-size: 0.7rem;
    }
}

.button-white {
    background-color: rgb(213, 213, 213);
    padding: 20px 40px;
    color: black;
    font-size: 1.75rem;
    @media (max-width: 480px) {
        padding: 10px 20px;
        font-size: 0.7rem;
    }
    border-radius: 20px;
    cursor: pointer;
    border: none;
    &:hover {
        background-color: rgb(197, 197, 197);
    }
}
</style>
