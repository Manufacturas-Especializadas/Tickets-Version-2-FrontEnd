const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoint: {
    Auth: {
      login: "/api/Auth/login",
    },
    tickets: {
      all: "/api/Tickets/getAll",
      byId: "/api/Tickets/details/",
      create: "/api/Tickets/create",
      update: "7/api/Tickets/",
      downloadReport: "/api/Tickets/DownloadReport",
    },
    classifications: {
      getClassifications: "/api/Classifications/getClassifications",
    },
    status: {
      getStatus: "/api/Status/getStatus",
    },
  },
};
