import {
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import { Table, type Column } from "../../components/Table/Table";
import { Modal } from "../../components/Modal/Modal";
import { useTickets } from "../../hooks/useTickets";
import type { AllTickets } from "../../types/Types";
import { TicketDetailView } from "../../components/TicketDetailView/TicketDetailView";
import { ResolveTicketForm } from "../../components/ResolveTicketForm/ResolveTicketForm";

export const AdminTickets = () => {
  const {
    tickets,
    isLoading,
    error,
    ticketDetail,
    isDetailLoading,
    detailError,
    fetchTicketById,
    clearTicketDetail,
    isDownloading,
    downloadReport,
  } = useTickets();

  const [filter, setFilter] = useState("Todos");
  const [modalType, setModalType] = useState<
    "detalles" | "editar" | "eliminar" | null
  >(null);
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const openModal = (type: "detalles" | "editar" | "eliminar", id: string) => {
    setSelectedTicket(id);
    setModalType(type);

    if (type === "detalles" || type === "editar") {
      fetchTicketById(Number(id));
    }
  };

  const closeModal = () => {
    setModalType(null);
    setTimeout(() => {
      setSelectedTicket(null);
      clearTicketDetail();
    }, 200);
  };

  const filteredTickets = tickets.filter((ticket) =>
    filter === "Todos" ? true : ticket.estatus === filter,
  );

  const columns: Column<AllTickets>[] = [
    {
      header: "Nombre",
      accessor: "nombre",
      className: "font-medium text-slate-900",
    },
    {
      header: "Categoría",
      accessor: "categoria",
    },
    {
      header: "Estatus",
      accessor: (row) => {
        const statusColors: Record<string, string> = {
          Abierto: "bg-blue-100 text-blue-700 border-blue-200",
          Pendiente: "bg-amber-100 text-amber-700 border-amber-200",
          Cerrado: "bg-slate-100 text-slate-600 border-slate-200",
        };

        const colorClass =
          statusColors[row.estatus] ||
          "bg-slate-100 text-slate-600 border-slate-200";

        return (
          <span
            className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${colorClass}`}
          >
            {row.estatus}
          </span>
        );
      },
    },
    {
      header: "Acciones",
      className: "text-right",
      accessor: (row) => (
        <div className="flex items-center justify-end gap-1">
          <button
            title="Detalles"
            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 
            rounded-lg transition-colors hover:cursor-pointer"
            onClick={() => openModal("detalles", row.id)}
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            title="Editar"
            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 
            rounded-lg transition-colors hover:cursor-pointer"
            onClick={() => openModal("editar", row.id)}
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            title="Eliminar"
            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg 
            transition-colors hover:cursor-pointer"
            onClick={() => openModal("eliminar", row.id)}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1
            className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight 
            uppercase"
          >
            Administra los tickets registrados
          </h1>
          <button
            onClick={downloadReport}
            className="flex items-center justify-center gap-2 px-5 py-2.5 
            bg-[#0099ff] hover:bg-[#0088e6] text-white text-sm font-semibold 
            rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-[#0099ff] hover:cursor-pointer"
          >
            {isDownloading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isDownloading ? "Descargando..." : "Descargar información"}
          </button>
        </div>

        <div
          className="bg-white p-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
          border border-slate-100"
        >
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between 
            mb-6 gap-4"
          >
            <h2 className="text-lg font-semibold text-slate-800">
              Lista de Tickets
            </h2>

            <div className="flex items-center gap-3">
              <label
                htmlFor="filterStatus"
                className="text-sm font-medium text-slate-600 flex items-center gap-1.5"
              >
                <Filter className="w-4 h-4 text-slate-400" />
                Filtrar por estatus
              </label>
              <div className="relative">
                <select
                  id="filterStatus"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 bg-slate-50 border 
                  border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none 
                  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="Todos">Todos</option>
                  <option value="Abierto">Abierto</option>
                  <option value="Pendiente">Pendiente</option>
                  <option value="Cerrado">Cerrado</option>
                </select>
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 
                  pointer-events-none text-slate-400"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-16 text-blue-600">
              <Loader2 className="w-10 h-10 animate-spin mb-4" />
              <p className="text-slate-500 font-medium text-sm">
                Cargando tickets...
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-16 text-red-500">
              <AlertCircle className="w-10 h-10 mb-4" />
              <p className="font-medium text-center">{error}</p>
            </div>
          ) : (
            <Table
              data={filteredTickets}
              columns={columns}
              keyExtractor={(item) => item.id}
              emptyMessage="No se encontraron tickets con este estatus."
            />
          )}
        </div>
      </div>
      <Modal
        isOpen={modalType !== null}
        onClose={closeModal}
        title={
          modalType === "detalles"
            ? "Detalles del Ticket"
            : modalType === "editar"
              ? "Editar Ticket"
              : modalType === "eliminar"
                ? "Confirmar Eliminación"
                : ""
        }
        maxWidth={modalType === "eliminar" ? "sm" : "lg"}
      >
        {modalType === "detalles" && (
          <TicketDetailView
            ticket={ticketDetail}
            isLoading={isDetailLoading}
            error={detailError}
          />
        )}

        {modalType === "editar" && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-blue-800 font-medium">
                Actualizando el Ticket <strong>#{selectedTicket}</strong>. Al
                cambiar el estatus a "Cerrado", este ticket te será asignado
                automáticamente.
              </p>
            </div>

            <ResolveTicketForm
              ticketId={Number(selectedTicket)}
              onCancel={closeModal}
              onSuccess={() => {
                closeModal();
              }}
            />
          </div>
        )}

        {modalType === "eliminar" && (
          <div className="text-center space-y-4">
            <div
              className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex 
              items-center justify-center mx-auto mb-4"
            >
              <Trash2 className="w-6 h-6" />
            </div>
            <p className="text-slate-600">
              ¿Estás seguro de que deseas eliminar este ticket? Esta acción no
              se puede deshacer.
            </p>
            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 
                rounded-lg hover:bg-slate-200"
              >
                Cancelar
              </button>
              <button
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 
                rounded-lg hover:bg-red-700"
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
