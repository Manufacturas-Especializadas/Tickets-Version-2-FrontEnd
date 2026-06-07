import { API_CONFIG } from "../../config/api";
import type { AllTickets, UpdateTicket } from "../../types/Types";
import { apiClient } from "../client";

class TicketsService {
  private getAllEndpoint = API_CONFIG.endpoint.tickets.all;
  private updateEndpoint = API_CONFIG.endpoint.tickets.update;

  async getAll(): Promise<AllTickets[]> {
    return apiClient.get<AllTickets[]>(this.getAllEndpoint);
  }

  async update(id: number, payload: UpdateTicket): Promise<void> {
    const url = `${this.updateEndpoint}/${id}/resolve`;

    return apiClient.put<void>(url, payload);
  }
}

export const ticketsService = new TicketsService();
