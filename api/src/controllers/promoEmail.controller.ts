import { Request, Response } from "express";
import promoEmailService from "../services/promoEmail.service";
import { CriarEmailPromocional } from "../interfaces/promoEmail.interface";

export async function promoEmailGETALL(_req: Request, res: Response) {
  const result = await promoEmailService.getAll();
  res.status(200).send(result);
}

export async function promoEmailPOST(req: Request, res: Response) {
  const data: CriarEmailPromocional = req.body;

  const result = await promoEmailService.insert(data);
  res.status(200).send(result);
}

export async function promoEmailPATCH(req: Request, res: Response) {
  const data: { email: string } = req.body;

  const result = await promoEmailService.desactivate(data.email);
  res.status(200).send(result);
}
