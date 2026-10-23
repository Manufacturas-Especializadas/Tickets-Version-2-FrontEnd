import { useEffect, useState } from "react";
import { AlertCircle, Loader2, MessageSquare } from "lucide-react";
import { ticketsService } from "../../api/services/TicketsService";
import type { PublicTicketDetail } from "../../types/Types";
import { formatPublicTicketDate, publicTicketText } from "../../utils/publicTickets";
import { TicketStatusBadge } from "../TicketStatusBadge/TicketStatusBadge";

export const PublicTicketDetailView = ({ ticketId }: { ticketId: number }) => {
  const [ticket, setTicket] = useState<PublicTicketDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    ticketsService.getPublicTicketById(ticketId)
      .then((data) => {
        if (active) setTicket(data);
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    return () => {
      active = false;
    };
  }, [ticketId]);

  if (isLoading) {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-12 text-slate-500">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" aria-hidden="true" />
        <p className="text-sm">Cargando detalles...</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div role="alert" className="flex flex-col items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-6 text-center text-red-600">
        <AlertCircle className="h-8 w-8" aria-hidden="true" />
        <p>No se pudo cargar el detalle. Cierra esta ventana y vuelve a intentarlo.</p>
      </div>
    );
  }

  const fields = [
    ["Folio", publicTicketText(ticket.folio, "Sin folio")],
    ["Solicitante", publicTicketText(ticket.name, "Sin solicitante")],
    ["Departamento", publicTicketText(ticket.department, "Sin departamento")],
    ["Categoría", publicTicketText(ticket.category, "Sin categoría")],
    ["Fecha de registro", formatPublicTicketDate(ticket.registrationDate)],
    ["Fecha de resolución", formatPublicTicketDate(ticket.resolutionDate, "Sin fecha de resolución")],
  ];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <span className="text-sm font-semibold text-slate-700">Estatus</span>
        <TicketStatusBadge status={ticket.status} />
      </div>

      <dl className="grid grid-cols-1 gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-4 sm:grid-cols-2">
        {fields.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</dt>
            <dd className="mt-1 text-sm font-medium text-slate-800 wrap-anywhere">{value}</dd>
          </div>
        ))}
      </dl>

      <div>
        <h4 className="mb-2 text-sm font-bold text-slate-800">Asunto</h4>
        <p className="rounded-lg border border-slate-200 p-3 text-sm text-slate-600 whitespace-pre-wrap wrap-anywhere">
          {publicTicketText(ticket.affair, "Sin asunto")}
        </p>
      </div>
      <div>
        <h4 className="mb-2 text-sm font-bold text-slate-800">Descripción del problema</h4>
        <p className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-600 whitespace-pre-wrap wrap-anywhere">
          {publicTicketText(ticket.problemDescription, "Sin descripción del problema")}
        </p>
      </div>
      <section className="rounded-xl border border-blue-200 bg-blue-50 p-4" aria-labelledby="public-comment-title">
        <h4 id="public-comment-title" className="mb-2 flex items-center gap-2 text-sm font-bold text-blue-800">
          <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
          Comentario de Sistemas
        </h4>
        <p className="text-sm leading-relaxed text-blue-900 whitespace-pre-wrap wrap-anywhere">
          {publicTicketText(ticket.publicComment, "Aún no hay comentarios de Sistemas.")}
        </p>
      </section>
    </div>
  );
};
