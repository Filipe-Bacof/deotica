import { CriarEmailPromocional } from "../interfaces/promoEmail.interface";
import clientRepository from "../repositories/client.repository";
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

async function isClient(email: string) {
  const isOnPromotionalEmails = await promoEmailRepository.getOneByEmail(email);
  const isClient = await clientRepository.getOneByEmail(email);

  if (!isClient && !isOnPromotionalEmails) {
    throw {
      status: 404,
      message:
        "Esse e-mail não está cadastrado para receber e-mails promocionais e também não está cadastrado como cliente.",
    };
  }

  let message = "";

  if (isClient && isOnPromotionalEmails) {
    if (isOnPromotionalEmails.ativo) {
      message =
        "Esse e-mail está cadastrado como cliente e também para receber e-mails promocionais.";
    } else {
      message =
        "Esse e-mail está cadastrado como cliente, mas não deve receber e-mails promocionais, pois está com status inativo.";
    }
  } else if (isClient) {
    message =
      "Esse e-mail está cadastrado como cliente, mas não está cadastrado para receber e-mails promocionais.";
  } else if (isOnPromotionalEmails) {
    if (isOnPromotionalEmails.ativo) {
      message =
        "Esse e-mail não está cadastrado como cliente, mas está cadastrado para receber e-mails promocionais.";
    } else {
      message =
        "Esse e-mail não está cadastrado como cliente e não deve receber e-mails promocionais, pois está com status inativo.";
    }
  }

  return {
    message,
    ...(isClient && { cliente: isClient }),
    ...(isOnPromotionalEmails && { emailsPromocionais: isOnPromotionalEmails }),
  };
}

const promoEmailService = { getAll, insert, desactivate, isClient };

export default promoEmailService;
