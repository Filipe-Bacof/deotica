import express from "express";
import "express-async-errors";
import cors from "cors";
import router from "./router";
import { handleError } from "./middlewares/handleError";
import http from "node:http";
import bodyParser from "body-parser";

const frontend = process.env.FRONTEND_HOST;
const landing_page = process.env.LANDING_PAGE_HOST;

const app = express();
const server = http.createServer(app);
const allowedOrigins = ["http://localhost:5173", frontend, landing_page];
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(express.json());
app.use(router);
app.use(handleError);

export default server;
