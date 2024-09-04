import { Request, Response } from "express";
import serviceOrderService from "../services/serviceOrder.service";
import {
  AtualizarStatusOS,
  EditarOS,
} from "../interfaces/serviceOrder.interface";

export async function serviceOrderGETALL(_req: Request, res: Response) {
  const result = await serviceOrderService.getAll();
  res.status(200).send(result);
}

export async function serviceOrderGETBYID(req: Request, res: Response) {
  const { id } = req.params;
  const result = await serviceOrderService.getById(Number(id));
  res.status(200).send(result);
}

export async function serviceOrderPATCHSTATUS(req: Request, res: Response) {
  const { id } = req.params;
  const data: AtualizarStatusOS = req.body;
  const result = await serviceOrderService.updateStatus(Number(id), data);
  res.status(200).send(result);
}

export async function serviceOrderPUT(req: Request, res: Response) {
  const { id } = req.params;
  const data: EditarOS = req.body;
  const result = await serviceOrderService.updateDataOS(Number(id), data);
  res.status(200).send(result);
}
