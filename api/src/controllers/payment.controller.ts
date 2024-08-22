import { Request, Response } from "express";
import paymentService from "../services/payment.service";
import { getUserIDbyToken } from "../utils/token";
import {
  CriarFormaDePagamento,
  EditarFormaDePagamento,
} from "../interfaces/payment.interface";

export async function paymentGETALL(_req: Request, res: Response) {
  const result = await paymentService.getAll();
  res.status(200).send(result);
}

export async function paymentPOST(req: Request, res: Response) {
  const data: CriarFormaDePagamento = req.body;
  const { authorization } = req.headers;
  const { userID } = getUserIDbyToken(authorization);

  const result = await paymentService.insert({ ...data, createdBy: userID });
  res.status(200).send(result);
}

export async function paymentPUT(req: Request, res: Response) {
  const { id } = req.params;
  const data: EditarFormaDePagamento = req.body;

  const result = await paymentService.edit(Number(id), data);
  res.status(200).send(result);
}

export async function paymentDELETE(req: Request, res: Response) {
  const { id } = req.params;

  const result = await paymentService.deletePayment(Number(id));
  res.status(200).send(result);
}
