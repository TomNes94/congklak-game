import express from "express";
import * as http from "http";
import * as socketIo from "socket.io";
import cors from "cors";
import setControllers from "./controllers/sockets";
import router from "./controllers/rest";
import serveApp from "./controllers/rest/serveApp";
import path from "path";
export class App {
    public readonly PORT: number = 8000;
    private _app: express.Application;
    private server: http.Server;
    public io: socketIo.Server;

    constructor() {
        this.createApp();
        this.createServer();
        this.initSocket();
        this.listen();
    }

    private initSocket(): void {
        this.io = new socketIo.Server(this.server);
    }

    private createApp(): void {
        this._app = express();
        this._app.use(cors());
        this._app.use(express.json());
        this._app.use("/api", router);
        this._app.use(express.static("frontend/dist"));
        this._app.get("/", serveApp);
    }

    private createServer(): void {
        this.server = new http.Server(this._app);
    }

    private listen(): void {
        this.server.listen(this.PORT, () => {
            console.log("Running server on port %s", process.env.PORT || this.PORT);
        });

        setControllers(this.io);
    }

    public get(): express.Application {
        return this._app;
    }

    public getIo() {
        return this.io;
    }
}
