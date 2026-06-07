import { API_CONFIG } from "../../config/api";
import type { Login } from "../../types/Types";
import { apiClient } from "../client";

class AuthService {
  private loginEndpoint = API_CONFIG.endpoint.Auth.login;

  async login(payload: Login): Promise<void> {
    return apiClient.post<void>(this.loginEndpoint, payload);
  }
}

export const authService = new AuthService();
