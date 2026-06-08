import { useState, useCallback, useEffect } from "react";
import { ticketsService } from "../api/services/TicketsService";
import type { AllTickets, DetailsTicket, UpdateTicket } from "../types/Types";
import { toast } from "sonner";

export const useTickets = () => {
  const [tickets, setTickets] = useState<AllTickets[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const [ticketDetail, setTicketDetail] = useState<DetailsTicket | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  const [isDownloading, setIsDownloading] = useState<boolean>(false);

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

  const fetchTicketById = useCallback(async (id: number) => {
    setIsDetailLoading(true);
    setDetailError(null);
    try {
      const data = await ticketsService.getBy(id);
      setTicketDetail(data);
    } catch (err: any) {
      setDetailError(err.message || "Error al cargar los detalles del ticket.");
    } finally {
      setIsDetailLoading(false);
    }
  }, []);

  const downloadReport = async () => {
    setIsDownloading(true);
    const toastId = toast.loading("Generando reporte de Excel");

    try {
      await ticketsService.downloadReport();
      toast.success("¡Reporte descargado exitosamente!", { id: toastId });
    } catch (err: any) {
      toast.error("Ocurrio un error al descargar el reporte", { id: toastId });
      console.error(err);
    } finally {
      setIsDownloading(false);
    }
  };

  const clearTicketDetail = useCallback(() => {
    setTicketDetail(null);
    setDetailError(null);
  }, []);

  const resolveTicket = async (id: number, payload: UpdateTicket) => {
    try {
      await ticketsService.update(id, payload);
      await fetchTickets();
    } catch (err: any) {
      throw new Error(err.message || "Error al actualizar el ticket.");
    }
  };

  const deleteTicket = async (id: number) => {
    setIsDeleting(true);
    const toastId = toast.loading("Eliminando ticket...");

    try {
      await ticketsService.delete(id);
      toast.success("El ticket fue eliminado permanentemente.", {
        id: toastId,
      });
      await fetchTickets();
      return true;
    } catch (err: any) {
      toast.error(err.message || "No se pudo eliminar el ticket.", {
        id: toastId,
      });
      return false;
    } finally {
      setIsDeleting(false);
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
    ticketDetail,
    isDetailLoading,
    detailError,
    fetchTicketById,
    clearTicketDetail,
    isDownloading,
    downloadReport,
    isDeleting,
    deleteTicket,
  };
};
