import * as socketIo from "socket.io";
import { handleNewConnection } from "./connection.controller";
import { handleNewMove } from "./move.controller";

export default function(io: socketIo.Server) {
    io.on("connection", handleNewConnection);
}
