export interface AuthResponse {
  userId: number;
  name: string;
  role: string;
  token: string;
}

export interface Login {
  payRollNumber: number;
  password: string;
}

export interface AllTickets {
  id: string;
  nombre: string;
  categoria: string;
  estatus: string;
}

export interface DetailsTicket {
  id: number;
  name: string;
  department: string;
  affair: string;
  problemDescription: string;
  solution: any;
  category: string;
  status: string;
  classification: any;
  registrationDate: string;
  resolutionDate: any;
  attachments: any[];
}

export interface UpdateTicket {
  statusId: number;
  classificationId: number;
  solution: string;
}

export interface Classification {
  id: number;
  name: string;
}
