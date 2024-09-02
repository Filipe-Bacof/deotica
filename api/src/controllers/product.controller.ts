import { Request, Response } from "express";
import productService from "../services/product.service";
import {
  CriarProduto,
  EditarProduto,
  AtualizarQuantidadeProduto,
} from "../interfaces/product.interface";
import { getUserIDbyToken } from "../utils/token";

export async function productGETALL(_req: Request, res: Response) {
  const result = await productService.getAll();
  res.status(200).send(result);
}

export async function productGETBYID(req: Request, res: Response) {
  const { id } = req.params;
  const result = await productService.getById(id);
  res.status(200).send(result);
}

export async function productPOST(req: Request, res: Response) {
  const data: CriarProduto = req.body;
  const { authorization } = req.headers;
  const { userID } = getUserIDbyToken(authorization);

  const result = await productService.insert(data, userID);
  res.status(200).send(result);
}

export async function productPUT(req: Request, res: Response) {
  const { id } = req.params;
  const data: EditarProduto = req.body;

  const result = await productService.edit(id, data);
  res.status(200).send(result);
}

export async function productPATCHMINUS(req: Request, res: Response) {
  const { id } = req.params;
  const data: AtualizarQuantidadeProduto = req.body;
  // Aqui é informado a quantidade para remover do banco!

  const result = await productService.removeQuantityFromStock(
    id,
    data.quantidade
  );
  res.status(200).send(result);
}

export async function productPATCHVALUE(req: Request, res: Response) {
  const { id } = req.params;
  const data: AtualizarQuantidadeProduto = req.body;
  // Aqui é informado a nova quantidade para alterar no banco!

  const result = await productService.updateQuantity(id, data.quantidade);
  res.status(200).send(result);
}

export async function productDELETE(req: Request, res: Response) {
  const { id } = req.params;

  const result = await productService.deleteProduct(id);
  res.status(200).send(result);
}