import { Request, Response } from "express";
import profileService from "../services/profile.service";
import { Perfil } from "../interfaces/profile.interface";

export async function profileGETALL(req: Request, res: Response) {
  const { populate } = req.query;
  const populateUser = populate ? true : false;
  const result = await profileService.getAll(populateUser);
  res.status(200).send(result);
}

export async function profilePOST(req: Request, res: Response) {
  const data: Perfil = req.body;

  const result = await profileService.insert(data);
  res.status(200).send(result);
}
export async function profilePUT(req: Request, res: Response) {
  const { id } = req.params;
  const data: Perfil = req.body;

  const result = await profileService.edit({
    id: Number(id),
    nome: data.nome,
    permissoes: data.permissoes,
  });
  res.status(200).send(result);
}
