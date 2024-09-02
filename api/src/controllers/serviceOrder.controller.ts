import { Request, Response } from "express";
import serviceOrderService from "../services/serviceOrder.service";

export async function serviceOrderGETALL(_req: Request, res: Response) {
  const result = await serviceOrderService.getAll();
  res.status(200).send(result);
}

export async function serviceOrderGETBYID(req: Request, res: Response) {
  const { id } = req.params;
  const result = await serviceOrderService.getById(Number(id));
  res.status(200).send(result);
}
