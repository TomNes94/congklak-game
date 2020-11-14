import { createRouter, createWebHistory } from "vue-router";
import BoardContainer from "../views/BoardContainer.vue";
import Room from "../views/Room.vue";

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
        path: "/about",
        name: "About",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
