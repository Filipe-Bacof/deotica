import type { Request, Response } from "express";
import promoEmailService from "../services/promoEmail.service";
import type {
  CriarEmailPromocional,
  DesativarEmailPromocional,
  SendSimpleMessage,
  VerificarEmailPromocional,
} from "../interfaces/promoEmail.interface";

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
  const data: DesativarEmailPromocional = req.body;

  const result = await promoEmailService.desactivate(data.email);
  res.status(200).send(result);
}

export async function promoEmailIsClient(req: Request, res: Response) {
  const data: VerificarEmailPromocional = req.body;

  const result = await promoEmailService.isClient(data.email);
  res.status(200).send(result);
}

export async function promoEmailSendSimpleMessage(req: Request, res: Response) {
  const data: SendSimpleMessage = req.body;

  const result = await promoEmailService.sendSimpleMessageToEmailList(data);
  res.status(200).send(result);
}
