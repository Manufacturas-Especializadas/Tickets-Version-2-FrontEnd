import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useResolveTicket } from "../../hooks/useResolveTicket";

interface Props {
  ticket: any;
  onSuccess: () => void;
  onCancel: () => void;
}
export const ResolveTicketForm = ({ ticket, onSuccess, onCancel }: Props) => {
  const {
    classifications,
    statuses,
    isLoadingCatalogs,
    isSubmitting,
    updateTicket,
  } = useResolveTicket();

  const [statusId, setStatusId] = useState<number | "">("");
  const [classificationId, setClassificationId] = useState<number | "">("");
  const [solution, setSolution] = useState<string>("");

  useEffect(() => {
    if (ticket) {
      setStatusId(ticket.statusId || "");

      setClassificationId(ticket.classificationId || "");
      setSolution(ticket.solution || "");
    }
  }, [ticket]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!statusId) return;

    const payload = {
      statusId: Number(statusId),
      classificationId:
        classificationId !== "" ? Number(classificationId) : null,
      solution: solution.trim() !== "" ? solution : null,
    };

    const isSuccess = await updateTicket(ticket.id, payload);

    if (isSuccess) {
      onSuccess();
    }
  };

  if (isLoadingCatalogs) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin mb-4" />
        <p className="text-slate-500 font-medium text-sm">
          Cargando opciones...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label
            htmlFor="status"
            className="block text-sm font-semibold text-slate-700"
          >
            Cambiar Estatus <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            required
            value={statusId}
            onChange={(e) =>
              setStatusId(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg 
            text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:border-blue-500 transition-colors"
          >
            <option value="" disabled>
              Seleccione un estatus...
            </option>
            {statuses.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label
            htmlFor="classification"
            className="block text-sm font-semibold text-slate-700"
          >
            Clasificación Técnica
          </label>
          <select
            id="classification"
            value={classificationId}
            onChange={(e) =>
              setClassificationId(e.target.value ? Number(e.target.value) : "")
            }
            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg 
            text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
            focus:border-blue-500 transition-colors"
          >
            <option value="">Sin clasificación / N/A</option>
            {classifications.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-1">
        <label
          htmlFor="solution"
          className="block text-sm font-semibold text-slate-700"
        >
          Solución Implementada
        </label>
        <p className="text-xs text-slate-500 mb-2">
          Describe brevemente los pasos que realizaste para solucionar el
          problema.
        </p>
        <textarea
          id="solution"
          rows={4}
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg 
          text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 
          focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
          placeholder="Ej: Se reemplazó el cable VGA y se reconfiguraron los monitores..."
        />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg 
          hover:bg-slate-200 transition-colors disabled:opacity-50 hover:cursor-pointer"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting || statusId === ""}
          className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white 
          bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-sm 
          disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <CheckCircle2 className="w-4 h-4" />
          )}
          {isSubmitting ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
};
