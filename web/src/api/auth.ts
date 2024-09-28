import type { Login, LoginResponse } from "../interfaces/auth.interface";
import { Api } from "./api";

export async function login(data: Login): Promise<LoginResponse> {
  const result = await Api.post("/signin", data);

  return result.data;
}
