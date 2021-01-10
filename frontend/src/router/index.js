import { createRouter, createWebHistory } from "vue-router";
import BoardContainer from "../views/BoardContainer.vue";
import Room from "../views/Room.vue";
import HowTo from "../views/HowTo.vue";

const routes = [
    {
        path: "/",
        name: "Room",
        component: Room
    },
    {
        path: "/board/:roomId",
        name: "BoardContainer",
        component: BoardContainer
    },
    {
        path: "/how-to",
        name: "HowTo",
        component: HowTo
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
