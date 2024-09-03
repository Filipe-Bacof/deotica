import { Request, Response } from "express";
import clientService from "../services/client.service";
import { CriarCliente, EditarCliente } from "../interfaces/client.interface";
import { getUserIDbyToken } from "../utils/token";

export async function clientGETALL(_req: Request, res: Response) {
  const result = await clientService.getAll();
  res.status(200).send(result);
}

export async function clientGETBYCPF(req: Request, res: Response) {
  const { cpf } = req.params;
  const result = await clientService.getByCpf(cpf);
  res.status(200).send(result);
}

export async function clientGETBYID(req: Request, res: Response) {
  const { id } = req.params;
  const result = await clientService.getById(id);
  res.status(200).send(result);
}

export async function clientPOST(req: Request, res: Response) {
  const data: CriarCliente = req.body;
  const { authorization } = req.headers;
  const { userID } = getUserIDbyToken(authorization);

  const result = await clientService.insert(data, userID);
  res.status(200).send(result);
}

export async function clientPUT(req: Request, res: Response) {
  const { id } = req.params;
  const data: EditarCliente = req.body;

  const result = await clientService.edit(id, data);
  res.status(200).send(result);
}
