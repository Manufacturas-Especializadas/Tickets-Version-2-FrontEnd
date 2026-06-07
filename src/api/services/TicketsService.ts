import { API_CONFIG } from "../../config/api";
import type {
  AllTickets,
  Classification,
  DetailsTicket,
  Status,
  UpdateTicket,
} from "../../types/Types";
import { apiClient } from "../client";

class TicketsService {
  private getAllEndpoint = API_CONFIG.endpoint.tickets.all;
  private getByEndpoint = API_CONFIG.endpoint.tickets.byId;
  private updateEndpoint = API_CONFIG.endpoint.tickets.update;
  private getClassificationEndpoint =
    API_CONFIG.endpoint.classifications.getClassifications;
  private getStatusEndpoint = API_CONFIG.endpoint.status.getStatus;

  async getAll(): Promise<AllTickets[]> {
    return apiClient.get<AllTickets[]>(this.getAllEndpoint);
  }

  async getClassification(): Promise<Classification[]> {
    return apiClient.get<Classification[]>(this.getClassificationEndpoint);
  }

  async getStatus(): Promise<Status[]> {
    return apiClient.get<Status[]>(this.getStatusEndpoint);
  }

  async getBy(id: number): Promise<DetailsTicket> {
    return apiClient.get<DetailsTicket>(`${this.getByEndpoint}${id}`);
  }

  async update(id: number, payload: UpdateTicket): Promise<void> {
    const url = `${this.updateEndpoint}/${id}/resolve`;

    return apiClient.put<void>(url, payload);
  }
}

export const ticketsService = new TicketsService();
