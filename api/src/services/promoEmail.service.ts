import type {
  CriarEmailPromocional,
  SendSimpleMessage,
} from "../interfaces/promoEmail.interface";
import transporter from "../modules/mailer";
import clientRepository from "../repositories/client.repository";
import promoEmailRepository from "../repositories/promoEmail.repository";

async function getAll() {
  const result = await promoEmailRepository.getAllActive();
  return result;
}

async function getOneByEmail(email: string) {
  const result = await promoEmailRepository.getOneByEmail(email);

  if (!result) {
    throw {
      status: 404,
      message: "Esse e-mail não foi encontrado.",
    };
  }

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
      // biome-ignore lint/style/noUselessElse: <explanation>
    } else {
      const updated = await promoEmailRepository.updateStatus(
        isAlreadyInserted.id,
        true
      );
      return updated;
    }
    // biome-ignore lint/style/noUselessElse: <explanation>
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
  const [isClient, isOnPromotionalEmails] = await Promise.all([
    clientRepository.getOneByEmail(email),
    promoEmailRepository.getOneByEmail(email),
  ]);

  const getMessage = () => {
    if (isClient && isOnPromotionalEmails) {
      return isOnPromotionalEmails.ativo
        ? "Esse e-mail está cadastrado como cliente e também para receber e-mails promocionais."
        : "Esse e-mail está cadastrado como cliente, mas não deve receber e-mails promocionais, pois está com status inativo.";
    }

    if (isClient) {
      return "Esse e-mail está cadastrado como cliente, mas não está cadastrado para receber e-mails promocionais.";
    }

    if (isOnPromotionalEmails) {
      return isOnPromotionalEmails.ativo
        ? "Esse e-mail não está cadastrado como cliente, mas está cadastrado para receber e-mails promocionais."
        : "Esse e-mail não está cadastrado como cliente e não deve receber e-mails promocionais, pois está com status inativo.";
    }

    return "Esse e-mail não está cadastrado como cliente e também não está cadastrado para receber e-mails promocionais.";
  };

  return {
    message: getMessage(),
    ...(isClient && { cliente: isClient }),
    ...(isOnPromotionalEmails && { emailsPromocionais: isOnPromotionalEmails }),
    tables: {
      clientTable: !!isClient,
      promoEmailTable: !!isOnPromotionalEmails,
    },
  };
}

async function sendSimpleMessageToEmailList(data: SendSimpleMessage) {
  const results = await Promise.all(
    data.emails.map(async (email) => {
      try {
        await transporter.sendMail({
          from: process.env.MAIL_USERNAME,
          to: email,
          subject: "Mensagem de Deotica",
          text: data.message,
        });
        return { email, status: true };
      } catch (error) {
        console.error(`Erro ao enviar para ${email}:`, error);
        return { email, status: false };
      }
    })
  );

  return results;
}

const promoEmailService = {
  getAll,
  getOneByEmail,
  insert,
  desactivate,
  isClient,
  sendSimpleMessageToEmailList,
};

export default promoEmailService;
