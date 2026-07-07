import api from "./api";

export const getJobs = async (params) => {
  const response = await api.get("/jobs", {
    params,
  });

  return response.data;
};

export const getJobById = async (id) => {
  const { data } = await api.get(`/jobs/${id}`);

  return data.data;
};

export const getCompanies = async () => {
  const response = await api.get("/jobs/companies");

  return response.data;
};

export const getLocations = async () => {
  const response = await api.get("/jobs/locations");

  return response.data;
};

export const getDuplicates = async () => {
  const response = await api.get("/jobs/duplicates");

  return response.data;
};