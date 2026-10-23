import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Eye, Inbox, Loader2, Plus } from "lucide-react";
import { ticketsService } from "../../api/services/TicketsService";
import InputField from "../../components/Inputs/InputField";
import SelectField from "../../components/Inputs/SelectField";
import { Modal } from "../../components/Modal/Modal";
import { PublicTicketDetailView } from "../../components/PublicTicketDetailView/PublicTicketDetailView";
import { TicketStatusBadge } from "../../components/TicketStatusBadge/TicketStatusBadge";
import type { PublicTicket } from "../../types/Types";
import {
  filterPublicTickets,
  formatPublicTicketDate,
  publicTicketText,
} from "../../utils/publicTickets";

export const TicketTracking = () => {
  const [tickets, setTickets] = useState<PublicTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [department, setDepartment] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);

  useEffect(() => {
    let active = true;

    ticketsService.getPublicTickets()
      .then((data) => {
        if (active) setTickets(data);
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
  }, [loadAttempt]);

  const categories = [...new Set(tickets.map((ticket) =>
    publicTicketText(ticket.category, "Sin categoría"),
  ))];
  const departments = [...new Set(tickets.map((ticket) =>
    publicTicketText(ticket.department, "Sin departamento"),
  ))];
  const filteredTickets = filterPublicTickets(tickets, { search, status, category, department });

  return (
    <div className="min-h-screen bg-slate-50 p-4 font-sans sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl min-w-0 space-y-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Seguimiento de tickets
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Consulta el estado actual de los tickets y los comentarios de Sistemas.
            </p>
          </div>
          <Link
            to="/"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Abrir nuevo ticket
          </Link>
        </div>

        <div className="min-w-0 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2 lg:grid-cols-4">
            <InputField
              id="public-ticket-search"
              type="search"
              label="Buscar tickets"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-describedby="public-ticket-search-help"
            />
            <SelectField
              id="public-ticket-status"
              label="Estado"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              options={[
                { value: "", label: "Todos" },
                ...["Abierto", "Pendiente", "Cerrado"].map((value) => ({ value, label: value })),
              ]}
            />
            <SelectField
              id="public-ticket-category"
              label="Categoría"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              options={[
                { value: "", label: "Todas" },
                ...categories.map((value) => ({ value, label: value })),
              ]}
            />
            <SelectField
              id="public-ticket-department"
              label="Departamento"
              value={department}
              onChange={(event) => setDepartment(event.target.value)}
              options={[
                { value: "", label: "Todos" },
                ...departments.map((value) => ({ value, label: value })),
              ]}
            />
          </div>
          <p id="public-ticket-search-help" className="mb-6 text-xs text-slate-500">
            Busca por folio, solicitante, asunto o departamento.
          </p>

          {isLoading ? (
            <div role="status" className="flex flex-col items-center gap-3 py-16 text-slate-500">
              <Loader2 className="h-10 w-10 animate-spin text-blue-600" aria-hidden="true" />
              <p>Cargando tickets...</p>
            </div>
          ) : error ? (
            <div role="alert" className="flex flex-col items-center gap-3 py-12 text-center text-red-600">
              <AlertCircle className="h-10 w-10" aria-hidden="true" />
              <p>No se pudieron cargar los tickets. Intenta nuevamente.</p>
              <button
                type="button"
                onClick={() => {
                  setError(false);
                  setIsLoading(true);
                  setLoadAttempt((attempt) => attempt + 1);
                }}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Reintentar
              </button>
            </div>
          ) : (
            <>
              <p role="status" className="mb-3 text-sm text-slate-500">
                {filteredTickets.length} de {tickets.length} tickets
              </p>
              <div
                className="max-w-full overflow-x-auto rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                role="region"
                aria-label="Tickets registrados; desplázate horizontalmente para ver todas las columnas"
                tabIndex={0}
              >
                <table className="w-full min-w-[1100px] table-fixed border-collapse text-left">
                  <caption className="sr-only">Seguimiento público de tickets registrados</caption>
                  <thead className="border-b border-slate-200 bg-slate-50">
                    <tr>
                      {["Folio", "Solicitante", "Departamento", "Asunto", "Categoría", "Estatus", "Comentario de Sistemas", "Fecha", "Acción"].map((header) => (
                        <th key={header} scope="col" className={`px-4 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 ${header === "Comentario de Sistemas" ? "w-56" : header === "Acción" ? "w-24" : ""}`}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
                    {filteredTickets.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-12 text-center text-slate-500">
                          <Inbox className="mx-auto mb-3 h-10 w-10 text-slate-300" aria-hidden="true" />
                          {tickets.length === 0
                            ? "Aún no hay tickets registrados."
                            : "No se encontraron tickets con la búsqueda y los filtros seleccionados."}
                        </td>
                      </tr>
                    ) : filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="align-top transition-colors hover:bg-slate-50/80">
                        <td className="px-4 py-4 font-semibold text-slate-900 wrap-anywhere">{publicTicketText(ticket.folio, "Sin folio")}</td>
                        <td className="px-4 py-4 wrap-anywhere">{publicTicketText(ticket.name, "Sin solicitante")}</td>
                        <td className="px-4 py-4 wrap-anywhere">{publicTicketText(ticket.department, "Sin departamento")}</td>
                        <td className="px-4 py-4 wrap-anywhere">{publicTicketText(ticket.affair, "Sin asunto")}</td>
                        <td className="px-4 py-4 wrap-anywhere">{publicTicketText(ticket.category, "Sin categoría")}</td>
                        <td className="px-4 py-4"><TicketStatusBadge status={ticket.status} /></td>
                        <td className="px-4 py-4 text-blue-800">
                          <p className="line-clamp-3 whitespace-pre-wrap wrap-anywhere">{publicTicketText(ticket.publicComment, "Sin comentario")}</p>
                        </td>
                        <td className="px-4 py-4">{formatPublicTicketDate(ticket.registrationDate)}</td>
                        <td className="px-4 py-4">
                          <button
                            type="button"
                            onClick={() => setSelectedTicket(ticket.id)}
                            aria-label={`Ver ticket ${publicTicketText(ticket.folio, String(ticket.id))}`}
                            className="inline-flex items-center gap-1.5 rounded-lg p-2 font-medium text-blue-600 transition-colors hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <Eye className="h-4 w-4" aria-hidden="true" />
                            Ver
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      <Modal
        isOpen={selectedTicket !== null}
        onClose={() => setSelectedTicket(null)}
        title="Detalle del ticket"
        maxWidth="2xl"
      >
        {selectedTicket !== null && (
          <PublicTicketDetailView key={selectedTicket} ticketId={selectedTicket} />
        )}
      </Modal>
    </div>
  );
};
