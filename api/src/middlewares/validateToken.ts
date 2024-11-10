import type { NextFunction, Request, Response } from "express";
import type { ObjectSchema } from "joi";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function validateToken(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return (
        res
          .status(422)
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          .send(error.details.map((detail: any) => detail.message))
      );
    }
    next();
  };
}

export function validateHeaderToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  const token = authHeader?.split(" ")[1];

  if (!token) return res.status(401).send("Acesso negado!");

  try {
    const { JWT_KEY } = process.env;

    jwt.verify(token, JWT_KEY);

    next();
  } catch (err) {
    res.status(400).json({ message: "Este token é inválido!" });
  }
}
