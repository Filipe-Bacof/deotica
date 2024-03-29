import express, { Router } from "express";
import "express-async-errors";
import cors from "cors";
import router from "./router";
import { handleError } from "./middlewares/handleError";
// import "./monitor";
import http from "http";
import { initializeWebSocketServer } from "./websocketServer";
import bodyParser from "body-parser";
import monitoring from "./monitor";

const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  "https://app.vidaia.com.br",
  "http://app.vidaia.com.br",
  // "http://front-end-vidaia:3001",
  // "http://vidaia.com.br/api",

  "http://localhost:5173",
];
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cors());
// initializeWebSocketServer(server, allowedOrigins);
app.use(express.json());
app.use(router);
app.use(monitoring);
app.use(handleError);

export default server;
