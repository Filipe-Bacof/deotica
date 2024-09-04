import { CriarEmailPromocional } from "../interfaces/promoEmail.interface";
import promoEmailRepository from "../repositories/promoEmail.repository";

async function getAll() {
  const result = await promoEmailRepository.getAllActive();
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
        message: "Esse e-mail já foi inserido.",
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

async function desactivate(email: string) {
  const result = await promoEmailRepository.getOneByEmail(email);

  if (!result) {
    throw {
      status: 404,
      message: "Esse e-mail não foi encontrado.",
    };
  }

  const updated = await promoEmailRepository.updateStatus(result.id, false);

  return updated;
}

const promoEmailService = { getAll, insert, desactivate };

export default promoEmailService;
