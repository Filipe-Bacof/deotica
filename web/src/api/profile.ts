import type {
  CriarPerfil,
  EditarPerfil,
} from "../interfaces/profile.interface";
import { Api } from "./api";

export async function getAllProfiles() {
  const result = await Api.get("/profile");
  return result;
}

export async function createProfile(data: CriarPerfil) {
  const result = await Api.post("/profile", data);
  return result;
}

export async function editProfile(id: number, data: EditarPerfil) {
  const result = await Api.post(`/profile/${id}`, data);
  return result;
}
