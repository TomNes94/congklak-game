import * as socketIo from "socket.io";
import { handleNewConnection } from "./connection.controller";

export default function(io: socketIo.Server) {
    io.on("connection", handleNewConnection);
}
