import React, { useState, type SyntheticEvent } from "react";
import InputField from "../../components/Inputs/InputField";
import SelectField, { type Option } from "../../components/Inputs/SelectField";
import { TextareaField } from "../../components/Inputs/TextareaField";
import { SendHorizonal } from "lucide-react";
import { DropzoneField } from "../../components/Inputs/DropzoneField";

export const TicketsForm = () => {
  const [formData, setFormData] = useState({
    searchUser: "",
    nombre: "",
    departamento: "",
    asunto: "",
    categoria: "",
    descripcion: "",
  });

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);

  const categorias: Option[] = [
    { value: "", label: "Selecciona una categoría" },
    { value: "tecnico", label: "Técnico" },
    { value: "epicor", label: "Epicor" },
    { value: "soporte", label: "Soporte" },
    { value: "consulta", label: "Consulta" },
    { value: "accesos", label: "Problema de accesos" },
    { value: "otro", label: "Otro" },
  ];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilesChange = (files: File[]) => {
    setAttachedFiles(files);
  };

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Datos del ticket a enviar:", formData);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 flex items-center justify-center 
      p-4 sm:p-6 lg:p-8"
    >
      <div
        className="max-w-3xl w-full bg-white rounded-2xl 
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden"
      >
        <div className="bg-white px-6 py-8 sm:px-10 border-b border-gray-100 text-center">
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Abrir nuevo ticket
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
            Por favor, completa este formulario para reportar un problema o
            realizar una solicitud. Nuestro equipo responderá lo antes posible.
          </p>
        </div>

        <div className="px-6 py-8 sm:px-10 bg-slate-50/50">
          <div className="mb-8 p-5 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="grow w-full">
                <InputField
                  label="Buscar ticket por nombre de usuario"
                  name="searchUser"
                  value={formData.searchUser}
                  onChange={handleChange}
                />
              </div>
              <button
                type="button"
                className="w-full sm:w-auto mt-0 sm:-mt-4 h-12.5 px-8 py-2 
                bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold 
                rounded-lg transition-colors focus:outline-none"
              >
                Buscar
              </button>
            </div>
          </div>

          <hr className="border-slate-200 mb-8" />

          <form onSubmit={handleSubmit} className="space-y-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <InputField
                label="Nombre"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
              />
              <InputField
                label="Departamento"
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <InputField
                label="Asunto del ticket"
                name="asunto"
                required
                value={formData.asunto}
                onChange={handleChange}
              />
              <SelectField
                label="Categoría"
                name="categoria"
                required
                options={categorias}
                value={formData.categoria}
                onChange={handleChange}
              />
            </div>

            <TextareaField
              label="Descripción detallada del problema"
              name="descripcion"
              required
              rows={4}
              value={formData.descripcion}
              onChange={handleChange}
            />

            <DropzoneField
              label="Evidencias o Archivos Adjuntos"
              maxFiles={4}
              onFilesChange={handleFilesChange}
            />

            <div className="pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto sm:float-right flex justify-center 
                items-center gap-2 py-3.5 px-8 border border-transparent rounded-lg 
                shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                transition-all duration-200 hover:cursor-pointer"
              >
                Enviar Ticket
                <SendHorizonal size={18} />
              </button>
              <div className="clear-both"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
