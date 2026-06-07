import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import type { Classification, Status, UpdateTicket } from "../types/Types";
import { ticketsService } from "../api/services/TicketsService";

export const useResolveTicket = () => {
  const [classifications, setClassifications] = useState<Classification[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [isLoadingCatalogs, setIsLoadingCatalogs] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadCatalogs = async () => {
      setIsLoadingCatalogs(true);
      try {
        const [classData, statusData] = await Promise.all([
          ticketsService.getClassification(),
          ticketsService.getStatus(),
        ]);
        setClassifications(classData);
        setStatuses(statusData);
      } catch (error: any) {
        toast.error("Ocurrió un error al cargar los catálogos del sistema.");
        console.error(error);
      } finally {
        setIsLoadingCatalogs(false);
      }
    };

    loadCatalogs();
  }, []);

  const updateTicket = useCallback(
    async (id: number, payload: UpdateTicket) => {
      setIsSubmitting(true);
      try {
        await ticketsService.update(id, payload);
        toast.success("¡El ticket se actualizó correctamente!");
        return true;
      } catch (error: any) {
        toast.error(error.message || "No se pudo actualizar el ticket.");
        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [],
  );

  return {
    classifications,
    statuses,
    isLoadingCatalogs,
    isSubmitting,
    updateTicket,
  };
};
