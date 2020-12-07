<template lang="pug">
.modal
    .dialog
        .row
            button.button-white(@click="createRoom") Create Private Room
        hr
        .row
            button.button-white(@click="findPublicGame") Play with Random
        hr
        .row
            button.button-white(@click="findAIGame") Play against Computer            
        hr        
        .row
            input(v-model="roomInput")           
            button.button-white(@click="joinRoom") Join Room
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
export default {
    methods: {
        async createRoom() {
            const result = await axios.post("/api/room", { socketId: this.vueSocket.socketId, isPrivate: true, againstAI: false });

            this.setGameMetadata({ roomId: result.data.roomId, player: 0, started: false });
            this.$router.push({
                name: "BoardContainer",
                params: { roomId: this.metaData.roomId, isRandom: true }
            });
        },
        async joinRoom() {
            if (this.roomInput !== null) {
                try {
                    const result = await axios.get(`/api/room/${this.roomInput}`, { params: { id: this.vueSocket.socketId } });
                    this.setGameMetadata({ roomId: result.data.roomId, player: 1, started: true });
                    this.$router.push({
                        name: "BoardContainer",
                        params: { roomId: this.metaData.roomId, player: 1 }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async findPublicGame() {
            try {
                const result = await axios.get(`/api/room/random`, { params: { id: this.vueSocket.socketId } });
                this.setGameMetadata({ roomId: result.data.roomId, player: result.data.player, started: result.data.player === 1 });
                this.$router.push({
                    name: "BoardContainer",
                    params: { roomId: result.data.roomId, player: result.data.player, isRandom: true }
                });
            } catch (error) {
                console.log(error);
            }
        },
        async findAIGame() {
            const result = await axios.post("/api/room", { socketId: this.vueSocket.socketId, isPrivate: true, againstAI: true });

            this.setGameMetadata({ roomId: result.data.roomId, player: 0, started: false });
            this.$router.push({
                name: "BoardContainer",
                params: { roomId: this.metaData.roomId, isRandom: true }
            });
        },
        ...mapMutations(["setGameMetadata"])
    },
    data() {
        return {
            roomInput: null
        };
    },
    computed: {
        ...mapState({
            vueSocket: state => state.vueSocket,
            metaData: state => state.metaData
        })
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
    left: 30%;
    width: 40%;
    @media (max-width: 480px) {
        left: 10%;
        width: 80%;
    }
}

.row {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding: 8% 5%;
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

input {
    text-align: center;
    font-size: 1.75rem;
    @media (max-width: 480px) {
        font-size: 0.7rem;
    }
}

hr {
    width: 100%;
}

p {
    color: white;
    font-size: 1.75rem;
    @media (max-width: 480px) {
        font-size: 0.7rem;
    }
}
</style>
