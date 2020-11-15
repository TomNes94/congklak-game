import { Request, Response } from "express";

export default function serveApp(req: Request, res: Response) {
    res.sendFile("index.html", { root: "frontend/dist" });
}
