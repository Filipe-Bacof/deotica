import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./router";
import { handleError } from "./middlewares/handleError";
import http from "http";
import bodyParser from "body-parser";

const app = express();
const server = http.createServer(app);
const allowedOrigins = ["http://localhost:5173"];
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cors());
app.use(express.json());
app.use(router);
app.use(handleError);

export default server;
