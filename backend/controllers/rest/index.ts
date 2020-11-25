import express from "express";
const router = express.Router();
import { createRoom, joinRoom, joinRandomRoom, surrender } from "./room.controller";
import { getRooms } from "./analytics.controller";
router.post("/room", createRoom);
router.get("/room/random", joinRandomRoom);
router.get("/room/:roomId", joinRoom);
router.post("/room/surrender", surrender);
router.get("/analytics/rooms", getRooms);

export default router;
