import express from "express";
const router = express.Router();
import { createRoom, joinRoom } from "./room.controller";

router.post("/room", createRoom);
router.get("/room/:roomId", joinRoom);

export default router;
