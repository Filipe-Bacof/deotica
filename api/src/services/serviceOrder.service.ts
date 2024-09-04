import {
  AtualizarStatusOS,
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

async function getById(id: number) {
  const result = await serviceOrderRepository.getById(id);
  return result;
}

async function updateStatus(id: number, data: AtualizarStatusOS) {
  const result = await serviceOrderRepository.updateStatus(id, data);
  return result;
}

const serviceOrderService = {
  insert,
  getAll,
  getById,
  updateStatus,
};

export default serviceOrderService;
