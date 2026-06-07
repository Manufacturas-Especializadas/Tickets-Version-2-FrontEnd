import { API_CONFIG } from "../../config/api";
import type { AllTickets } from "../../types/Types";
import { apiClient } from "../client";

class TicketsService {
  private getAllEndpoint = API_CONFIG.endpoint.tickets.all;

  async getAll(): Promise<AllTickets[]> {
    return apiClient.get<AllTickets[]>(this.getAllEndpoint);
  }
}

export const ticketsService = new TicketsService();
