import type {
  AtualizarStatusOS,
  EditarOS,
  InserirOS,
} from "../interfaces/serviceOrder.interface";
import serviceOrderRepository from "../repositories/serviceOrder.repository";

async function insert(data: InserirOS) {
  const result = await serviceOrderRepository.insert(data);
  return result;
}

async function getAll() {
  const result = await serviceOrderRepository.getAll();
  return result;
}

async function getInfo() {
  const finalizado = await serviceOrderRepository.countByStatus(
    "finalizado",
    true
  );
  const pendente = await serviceOrderRepository.countByStatus("pendente");
  const retirada = await serviceOrderRepository.countByStatus("retirada");
  return {
    finalizado,
    pendente,
    retirada,
  };
}

async function getById(id: number) {
  const result = await serviceOrderRepository.getById(id);
  return result;
}

async function getBySaleId(vendaId: string) {
  const result = await serviceOrderRepository.getBySaleId(vendaId);
  return result;
}

async function updateStatus(id: number, data: AtualizarStatusOS) {
  const result = await serviceOrderRepository.updateStatus(id, data);
  return result;
}

async function updateDataOS(id: number, data: EditarOS) {
  const result = await serviceOrderRepository.updateDataOS(id, data);
  return result;
}

const serviceOrderService = {
  insert,
  getAll,
  getInfo,
  getById,
  getBySaleId,
  updateStatus,
  updateDataOS,
};

export default serviceOrderService;
