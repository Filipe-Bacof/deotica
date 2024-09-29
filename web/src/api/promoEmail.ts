import type {
  CriarEmailPromocional,
  DesativarEmailPromocional,
  EmailPromocionalResponse,
  SendSimpleMessage,
  SendSimpleMessageResponse,
  VerificarEmailPromocional,
} from "../interfaces/promoEmail.interface";
import { Api } from "./api";

export async function getAllPromoEmails(): Promise<EmailPromocionalResponse[]> {
  const result = await Api.get("/promoEmail");
  return result.data;
}

export async function registerPromoEmail(data: CriarEmailPromocional) {
  const result = await Api.post("/promoEmail", data);
  return result;
}

export async function verifyIfIsClient(data: VerificarEmailPromocional) {
  const result = await Api.post("/promoEmail/isClient", data);
  return result;
}

export async function disablePromoEmail(data: DesativarEmailPromocional) {
  const result = await Api.patch("/promoEmail", data);
  return result;
}

export async function sendSimpleMessage(
  data: SendSimpleMessage,
): Promise<SendSimpleMessageResponse[]> {
  const result = await Api.post("/promoEmail/sendSimpleMessage", data);
  return result.data;
}
