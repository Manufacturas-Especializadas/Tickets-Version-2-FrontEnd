import { API_CONFIG } from "../../config/api";
import type {
  AllTickets,
  Category,
  Classification,
  CreateTicketPayload,
  DetailsTicket,
  Status,
  UpdateTicket,
} from "../../types/Types";
import { apiClient } from "../client";

class TicketsService {
  private getAllEndpoint = API_CONFIG.endpoint.tickets.all;
  private getByEndpoint = API_CONFIG.endpoint.tickets.byId;
  private getCategoryEndpoint = API_CONFIG.endpoint.tickets.getCategory;
  private downloadReportEndpoint = API_CONFIG.endpoint.tickets.downloadReport;
  private createEndpoint = API_CONFIG.endpoint.tickets.create;
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

  async getCategory(): Promise<Category[]> {
    return apiClient.get<Category[]>(this.getCategoryEndpoint);
  }

  async getBy(id: number): Promise<DetailsTicket> {
    return apiClient.get<DetailsTicket>(`${this.getByEndpoint}${id}`);
  }

  async downloadReport(): Promise<void> {
    const dateStr = new Date().toLocaleDateString("es-MX").replace(/\//g, "");
    const filename = `ReporteDeTickets_${dateStr}.xlsx`;

    await apiClient.downloadFile(this.downloadReportEndpoint, filename);
  }

  async create(payload: CreateTicketPayload): Promise<void> {
    const formData = new FormData();

    formData.append("Name", payload.name);
    formData.append("Affair", payload.affair);
    formData.append("ProblemDescription", payload.problemDescription);
    formData.append("CategoryId", payload.categoryId.toString());

    if (payload.department) {
      formData.append("Department", payload.department);
    }

    if (payload.userId) {
      formData.append("UserId", payload.userId.toString());
    }

    if (payload.files && payload.files.length > 0) {
      payload.files.forEach((file) => {
        formData.append("Files", file);
      });
    }

    return apiClient.post<void>(this.createEndpoint, formData);
  }

  async update(id: number, payload: UpdateTicket): Promise<void> {
    const url = `${this.updateEndpoint}/${id}/resolve`;

    return apiClient.put<void>(url, payload);
  }
}

export const ticketsService = new TicketsService();
