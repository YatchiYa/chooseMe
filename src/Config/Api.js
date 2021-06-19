const api_url =
    process.env.NODE_ENV === "development"
        ? "http://localhost:8080/api/v1"
        : "/api/v1";
export default api_url;
