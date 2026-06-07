export interface AllTickets {
  id: string;
  nombre: string;
  categoria: string;
  estatus: string;
}

export interface UpdateTicket {
  statusId: number;
  classificationId: number;
  solution: string;
}
