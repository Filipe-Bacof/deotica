import type {
  Forgot,
  LoginResponse,
  NewPass,
  SignIn,
  SignUpConfirmPass,
} from "../interfaces/auth.interface";
import { Api } from "./api";

export async function login(data: SignIn): Promise<LoginResponse> {
  const result = await Api.post("/signin", data);
  return result.data;
}

export async function registerUser(data: SignUpConfirmPass) {
  const result = await Api.post("/signup", data);
  return result;
}

export async function forgotPassword(data: Forgot) {
  const result = await Api.post("/forgot", data);
  return result;
}

export async function generateNewPassword(data: NewPass) {
  const result = await Api.post("/newpass", data);
  return result;
}

export async function getUserById(id: string) {
  const result = await Api.get(`/user/${id}`);
  return result;
}
