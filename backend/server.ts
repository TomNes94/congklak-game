import { App } from "./app";
const application = new App();
const app = application.get();
const io = application.getIo();
export { app, io };
