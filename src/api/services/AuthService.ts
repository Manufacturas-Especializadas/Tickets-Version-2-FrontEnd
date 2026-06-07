import { API_CONFIG } from "../../config/api";
import type { AuthResponse, Login } from "../../types/Types";
import { apiClient } from "../client";

class AuthService {
  private loginEndpoint = API_CONFIG.endpoint.Auth.login;

  async login(payload: Login): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>(this.loginEndpoint, payload);
  }
}

export const authService = new AuthService();
