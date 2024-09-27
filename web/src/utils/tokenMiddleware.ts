import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export function getToken() {
  const token: string | null = localStorage.getItem("@deoticaToken");
  // console.log(`Token: ${token}`);
  return token;
}

export function isTokenValid(token: string | null) {
  if (token) {
    const decodedToken: JwtPayload = jwtDecode(token);
    const actualTime: number = Date.now() / 1000;
    return decodedToken.exp && decodedToken.exp >= actualTime;
  }
  return false;
}
