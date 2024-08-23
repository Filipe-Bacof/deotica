import { CriarEmailPromocional } from "../interfaces/promoEmail.interface";
import promoEmailRepository from "../repositories/promoEmail.repository";

async function getAll() {
  const result = await promoEmailRepository.getAll();
  return result;
}

async function insert(data: CriarEmailPromocional) {
  const isAlreadyInserted = await promoEmailRepository.getOneByEmail(
    data.email
  );
  if (isAlreadyInserted) {
    if (isAlreadyInserted.ativo) {
      throw {
        status: 422,
        message: "Esse usuário já foi inserido.",
      };
    } else {
      const updated = await promoEmailRepository.updateStatus(
        isAlreadyInserted.id,
        true
      );
      return updated;
    }
  } else {
    const result = await promoEmailRepository.insert(data);
    return result;
  }
}

const promoEmailService = { getAll, insert };

export default promoEmailService;
