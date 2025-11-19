import api from "./axios";

export const updateWellness = (data) =>
  api.post("/patient/wellness/update", data);

export const getTodayWellness = () =>
  api.get("/patient/wellness/today");

export const getWellnessHistory = () =>
    api.get("/patient/wellness/history");
  