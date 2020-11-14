import { createStore } from "vuex";
import { VueSocket } from "../services/socket";

const vueSocket = new VueSocket();
export default createStore({
    state: {
        vueSocket,
        playerOne: {
            nrStonesLargeHole: {
                index: 7,
                number: 7
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
        playerTwo: {
            nrStonesLargeHole: {
                index: 15,
                number: 7
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
        },
        metaData: {
            roomId: null
        }
    },
    mutations: {
        setRoomId(state, payload) {
            state.metaData.roomId = payload.roomId;
        },

        distributeStones(state, payload) {
            state.playerOne = payload.playerOne;
            state.playerTwo = payload.playerTwo;
        }
    },
    actions: {},
    modules: {}
});
