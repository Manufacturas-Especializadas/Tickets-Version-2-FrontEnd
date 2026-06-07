import {
  Loader2,
  AlertCircle,
  Tag,
  User,
  Building2,
  Clock,
  CalendarCheck,
  FileText,
  CheckCircle2,
  Paperclip,
} from "lucide-react";
import type { DetailsTicket } from "../../types/Types";

interface Props {
  ticket: DetailsTicket | null;
  isLoading: boolean;
  error: string | null;
}
export const TicketDetailView = ({ ticket, isLoading, error }: Props) => {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-blue-600">
        <Loader2 className="w-10 h-10 animate-spin mb-4" />
        <p className="text-slate-500 font-medium text-sm">
          Cargando detalles...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex flex-col items-center justify-center py-12 text-red-500 
        bg-red-50 rounded-xl border border-red-100"
      >
        <AlertCircle className="w-10 h-10 mb-3" />
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (!ticket) return null;

  const statusColors: Record<string, string> = {
    Abierto: "bg-blue-100 text-blue-700",
    Pendiente: "bg-amber-100 text-amber-700",
    Cerrado: "bg-slate-100 text-slate-700",
    Resuelto: "bg-green-100 text-green-700",
  };
  const badgeColor =
    statusColors[ticket.status] || "bg-slate-100 text-slate-600";

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
        <span
          className="px-3 py-1 text-xs font-bold uppercase tracking-wider 
          bg-slate-800 text-white rounded-md"
        >
          Ticket #{ticket.id}
        </span>
        <span
          className={`px-3 py-1 text-xs font-bold rounded-md ${badgeColor}`}
        >
          {ticket.status}
        </span>
        <span
          className="px-3 py-1 text-xs font-semibold bg-indigo-50 
          text-indigo-700 border border-indigo-100 rounded-md flex items-center gap-1.5"
        >
          <Tag className="w-3.5 h-3.5" />
          {ticket.category}
        </span>
        {ticket.classification && (
          <span
            className="px-3 py-1 text-xs font-semibold bg-purple-50 
            text-purple-700 border border-purple-100 rounded-md"
          >
            {ticket.classification}
          </span>
        )}
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/50 p-4 
        rounded-xl border border-slate-100"
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <User className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Solicitante
              </p>
              <p className="text-sm font-semibold text-slate-800">
                {ticket.name}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Departamento
              </p>
              <p className="text-sm font-medium text-slate-700">
                {ticket.department || "No especificado"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                Fecha de Registro
              </p>
              <p className="text-sm font-medium text-slate-700">
                {new Date(ticket.registrationDate).toLocaleString()}
              </p>
            </div>
          </div>
          {ticket.resolutionDate && (
            <div className="flex items-start gap-3">
              <CalendarCheck className="w-5 h-5 text-green-500 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-green-600 uppercase tracking-wide">
                  Fecha de Resolución
                </p>
                <p className="text-sm font-medium text-slate-700">
                  {new Date(ticket.resolutionDate).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-bold text-slate-800 mb-1">Asunto</h4>
          <p
            className="text-sm text-slate-600 bg-white border border-slate-200 p-3 
            rounded-lg"
          >
            {ticket.affair}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
            <FileText className="w-4 h-4 text-slate-400" />
            Descripción del Problema
          </h4>
          <div
            className="text-sm text-slate-600 bg-slate-50 border border-slate-200 
            p-4 rounded-lg whitespace-pre-wrap leading-relaxed"
          >
            {ticket.problemDescription}
          </div>
        </div>
      </div>

      {ticket.solution && (
        <div>
          <h4 className="text-sm font-bold text-green-700 mb-1 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Solución Implementada
          </h4>
          <div
            className="text-sm text-green-800 bg-green-50 border border-green-200 
            p-4 rounded-lg whitespace-pre-wrap leading-relaxed"
          >
            {ticket.solution}
          </div>
        </div>
      )}

      {ticket.attachments && ticket.attachments.length > 0 && (
        <div>
          <h4 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
            <Paperclip className="w-4 h-4 text-slate-400" />
            Evidencias Adjuntas ({ticket.attachments.length})
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ticket.attachments.map((file: any) => {
              const isImage =
                file.fileUrl.match(/\.(jpeg|jpg|gif|png|webp)$/i) != null;

              return (
                <a
                  key={file.id}
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block relative overflow-hidden rounded-xl border 
                  border-slate-200 hover:border-blue-400 hover:shadow-md transition-all 
                  bg-white"
                >
                  {isImage ? (
                    <div className="aspect-video w-full bg-slate-100 overflow-hidden">
                      <img
                        src={file.fileUrl}
                        alt="Evidencia"
                        className="w-full h-full object-cover group-hover:scale-105 
                        transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div
                      className="aspect-video w-full bg-slate-50 flex flex-col 
                      items-center justify-center p-2"
                    >
                      <FileText
                        className="w-8 h-8 text-slate-400 
                        group-hover:text-blue-500 transition-colors mb-2"
                      />
                      <span
                        className="text-[10px] text-slate-500 text-center truncate 
                        w-full px-2"
                      >
                        {file.fileName || "Documento adjunto"}
                      </span>
                    </div>
                  )}
                  <div
                    className="absolute inset-0 bg-blue-900/0 
                    group-hover:bg-blue-900/10 transition-colors flex items-center 
                    justify-center"
                  >
                    <span
                      className="opacity-0 group-hover:opacity-100 bg-white 
                      text-blue-600 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm 
                      transform translate-y-2 group-hover:translate-y-0 transition-all"
                    >
                      Abrir archivo
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
