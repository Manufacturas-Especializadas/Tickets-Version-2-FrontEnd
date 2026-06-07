import { useState, useCallback, useEffect } from "react";
import { ticketsService } from "../api/services/TicketsService";
import type { AllTickets, UpdateTicket } from "../types/Types";

export const useTickets = () => {
  const [tickets, setTickets] = useState<AllTickets[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await ticketsService.getAll();
      setTickets(data);
    } catch (err: any) {
      setError(err.message || "Ocurrió un error al cargar los tickets.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resolveTicket = async (id: number, payload: UpdateTicket) => {
    try {
      await ticketsService.update(id, payload);
      await fetchTickets();
    } catch (err: any) {
      throw new Error(err.message || "Error al actualizar el ticket.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return {
    tickets,
    isLoading,
    error,
    fetchTickets,
    resolveTicket,
  };
};
