<template lang="pug">
.view-container
    button.button-white(@click="onCreateRoom") Play
    v-modal(v-if="showCreateRoomModal")
        
</template>

<script>
import VModal from "../components/VModal";

export default {
    data() {
        return {
            showCreateRoomModal: false
        };
    },
    components: { VModal },
    methods: {
        onCreateRoom() {
            this.showCreateRoomModal = true;
        }
    }
};
</script>

<style lang="scss" scoped>
.view-container {
    background-color: black;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 480px) {
        font-size: 1rem;
    }
}
.button-white {
    background-color: rgb(213, 213, 213);
    padding: 50px;
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
