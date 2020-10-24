import express from "express";
import * as path from "path";

// Controllers (route handlers)
/* import * as homeController from "./controllers/home";
import * as userController from "./controllers/user";
import * as apiController from "./controllers/api";
import * as contactController from "./controllers/contact";

 */



// Create Express server
const app = express();

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

export default app;