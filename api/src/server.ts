import dotenv from "dotenv";
import server from "./app";
dotenv.config();

server.listen(process.env.API_PORT || 3001, () => {
  console.log(`🚀 Backend up on PORT: ${process.env.API_PORT}`);
});
