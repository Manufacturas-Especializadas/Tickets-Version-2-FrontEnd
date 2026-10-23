const statusColors: Record<string, string> = {
  Abierto: "bg-blue-100 text-blue-700 border-blue-200",
  Pendiente: "bg-amber-100 text-amber-700 border-amber-200",
  Cerrado: "bg-slate-100 text-slate-600 border-slate-200",
};

export const TicketStatusBadge = ({ status }: { status: string }) => (
  <span
    className={`inline-block whitespace-nowrap px-2.5 py-1 text-xs font-semibold rounded-full border ${
      statusColors[status] || "bg-slate-100 text-slate-600 border-slate-200"
    }`}
  >
    {status?.trim() || "Sin estatus"}
  </span>
);
