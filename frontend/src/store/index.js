import { createStore } from "vuex";
import { VueSocket } from "../services/socket";

const vueSocket = new VueSocket();
export default createStore({
    state: {
        vueSocket,

        boardState: [
            {
                nrStonesLargeHole: {
                    index: 7,
                    number: 0
                },
                nrStonesSmallHole: [
                    {
                        index: 0,
                        number: 7
                    },
                    {
                        index: 1,
                        number: 7
                    },
                    {
                        index: 2,
                        number: 7
                    },
                    {
                        index: 3,
                        number: 7
                    },
                    {
                        index: 4,
                        number: 7
                    },
                    {
                        index: 5,
                        number: 7
                    },
                    {
                        index: 6,
                        number: 7
                    }
                ]
            },
            {
                nrStonesLargeHole: {
                    index: 15,
                    number: 0
                },
                nrStonesSmallHole: [
                    {
                        index: 8,
                        number: 7
                    },
                    {
                        index: 9,
                        number: 7
                    },
                    {
                        index: 10,
                        number: 7
                    },
                    {
                        index: 11,
                        number: 7
                    },
                    {
                        index: 12,
                        number: 7
                    },
                    {
                        index: 13,
                        number: 7
                    },
                    {
                        index: 14,
                        number: 7
                    }
                ]
            }
        ],
        nextPlayer: 0,
        winner: null,
        isFinished: false,
        metaData: {
            roomId: null,
            player: null,
            started: false
        }
    },
    mutations: {
        setGameMetadata(state, payload) {
            state.metaData.roomId = payload.roomId;
            state.metaData.player = payload.player;
            state.metaData.started = payload.started;
        },
        updateGameMetadata(state, payload) {
            state.metaData.started = payload.started;
        },
        distributeStones(state, payload) {
            state.boardState = payload.boardState;
            state.nextPlayer = payload.nextPlayer;
            state.isFinished = payload.result.finished;
            state.winner = payload.result.player;
        }
    },
    actions: {},
    modules: {}
});
