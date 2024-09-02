import { Request, Response } from "express";
import saleService from "../services/sale.service";
import { CriarVenda } from "../interfaces/sale.interface";
import { getUserIDbyToken } from "../utils/token";

export async function saleGETALL(_req: Request, res: Response) {
  const result = await saleService.getAll();
  res.status(200).send(result);
}

export async function saleGETBYID(req: Request, res: Response) {
  const { id } = req.params;
  const result = await saleService.getById(id);
  res.status(200).send(result);
}

export async function salePOST(req: Request, res: Response) {
  const data: CriarVenda = req.body;
  const { authorization } = req.headers;
  const { userID } = getUserIDbyToken(authorization);

  const result = await saleService.insert(data, userID);
  res.status(200).send(result);
}
