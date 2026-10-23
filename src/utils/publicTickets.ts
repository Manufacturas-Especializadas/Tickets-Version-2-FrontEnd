import type { PublicTicket } from "../types/Types";

export const publicTicketText = (
  value: string | null | undefined,
  fallback: string,
) => value?.trim() || fallback;

export const formatPublicTicketDate = (
  value: string | null,
  fallback = "Sin fecha",
) => {
  if (!value?.trim()) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toLocaleString("es-MX");
};

export interface PublicTicketFilters {
  search: string;
  status: string;
  category: string;
  department: string;
}

export const filterPublicTickets = (
  tickets: PublicTicket[],
  filters: PublicTicketFilters,
) => {
  const query = filters.search.trim().toLocaleLowerCase("es-MX");

  // Array.filter preserves the order supplied by the API.
  return tickets.filter((ticket) => {
    const matchesSearch = [
      ticket.folio,
      ticket.name,
      ticket.affair,
      ticket.department,
    ].some((value) => (value ?? "").toLocaleLowerCase("es-MX").includes(query));

    return (
      matchesSearch &&
      (!filters.status || ticket.status === filters.status) &&
      (!filters.category ||
        publicTicketText(ticket.category, "Sin categoría") === filters.category) &&
      (!filters.department ||
        publicTicketText(ticket.department, "Sin departamento") === filters.department)
    );
  });
};
