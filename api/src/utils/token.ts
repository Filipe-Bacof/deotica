import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function decodeToken(tokenController: string) {
  const token = tokenController?.split("Bearer ").join("");
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  let infoToken: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  jwt.verify(token, process.env.JWT_KEY, (err: any, decoded: any) => {
    if (err) throw { status: 400, message: `Invalid token ${token}` };
    // biome-ignore lint/style/noUselessElse: <explanation>
    else infoToken = decoded;
  });

  return infoToken;
}

export function generateToken(userID: string) {
  return jwt.sign({ userID }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
}

type returnUserId = {
  userID: string;
  iat: number;
  exp: number;
};

export function getUserIDbyToken(authorization: string): returnUserId {
  const checkToken = decodeToken(authorization);
  if (!checkToken) {
    throw {
      status: 404,
      message: "token not valid",
    };
  }
  return checkToken;
}
