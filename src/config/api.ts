const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("API base URL is not defined in environment variables");
}

export const API_CONFIG = {
  baseUrl: API_BASE_URL,
  endpoint: {
    tickets: {
      all: "/api/Tickets/getAll",
      byId: "/api/Tickets/details/",
      update: "7/api/Tickets/",
    },
    classifications: {
      getClassifications: "/api/Classifications/getClassifications",
    },
  },
};
