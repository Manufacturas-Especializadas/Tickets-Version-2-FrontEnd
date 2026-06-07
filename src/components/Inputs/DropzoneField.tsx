import { useState, useRef } from "react";

interface Attachment {
  id: string;
  file: File;
  previewUrl?: string;
}

interface DropzoneFieldProps {
  label: string;
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
}
export const DropzoneField = ({
  label,
  onFilesChange,
  maxFiles = 3,
}: DropzoneFieldProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (fileList: FileList) => {
    const validFiles: Attachment[] = [];

    const availableSlots = maxFiles - attachments.length;
    const filesToProcess = Array.from(fileList).slice(0, availableSlots);

    filesToProcess.forEach((file) => {
      const isImage = file.type.startsWith("image/");
      validFiles.push({
        id: crypto.randomUUID(),
        file,
        previewUrl: isImage ? URL.createObjectURL(file) : undefined,
      });
    });

    if (validFiles.length === 0) return;

    const updatedAttachments = [...attachments, ...validFiles];
    setAttachments(updatedAttachments);

    if (onFilesChange) {
      onFilesChange(updatedAttachments.map((att) => att.file));
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const removeFile = (id: string, previewUrl?: string) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);

    const updated = attachments.filter((att) => att.id !== id);
    setAttachments(updated);

    if (onFilesChange) {
      onFilesChange(updated.map((att) => att.file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
  };

  return (
    <div className="mb-6 font-sans">
      <label
        className="block text-xs font-bold uppercase tracking-wide 
        text-gray-500 mb-2"
      >
        {label}{" "}
        {attachments.length > 0 && `(${attachments.length}/${maxFiles})`}
      </label>

      {attachments.length < maxFiles && (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={triggerFileInput}
          className={`
            relative group w-full border-2 border-dashed rounded-xl p-6 
            flex flex-col items-center justify-center cursor-pointer
            transition-all duration-200 ease-in-out
            ${
              isDragActive
                ? "border-blue-500 bg-blue-50/60 scale-[0.99]"
                : "border-gray-300 bg-white hover:border-blue-400 hover:bg-slate-50/50"
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleInputChange}
            accept="image/*,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          />

          <div
            className={`p-3 rounded-full mb-3 transition-colors duration-200 ${isDragActive ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
              />
            </svg>
          </div>

          <p className="text-sm font-medium text-gray-700 text-center">
            <span className="text-blue-600 font-semibold group-hover:underline">
              Haz clic para cargar
            </span>{" "}
            o arrastra tus archivos aquí
          </p>
          <p className="text-xs text-gray-400 mt-1 text-center">
            Capturas de pantalla, Logs, PDFs o Excel (Máx. {maxFiles} archivos)
          </p>
        </div>
      )}

      {attachments.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="flex items-center gap-3 p-3 bg-white border border-gray-200 
              rounded-xl shadow-sm group/item hover:border-gray-300 transition-colors"
            >
              {att.previewUrl ? (
                <img
                  src={att.previewUrl}
                  alt={att.file.name}
                  className="w-12 h-12 object-cover rounded-lg border border-gray-100 shrink-0"
                />
              ) : (
                <div
                  className="w-12 h-12 bg-amber-50 border border-amber-100 text-amber-600
                  rounded-lg flex items-center justify-center shrink-0"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                    />
                  </svg>
                </div>
              )}

              <div className="grow min-w-0">
                <p
                  className="text-sm font-medium text-gray-800 truncate"
                  title={att.file.name}
                >
                  {att.file.name}
                </p>
                <p className="text-xs text-gray-400">
                  {formatFileSize(att.file.size)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => removeFile(att.id, att.previewUrl)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 
                rounded-lg transition-colors shrink-0"
                title="Quitar archivo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
