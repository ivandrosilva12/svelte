import axios from "axios";

const API_URL = "https://api.bisno.pro"; // Adjust this URL to your backend

// Function to fetch all provincias
export const fetchAllProvincias = async (page, limit) => {
  const response = await axios.get(`${API_URL}/api/provincias`, {
    params: { page, limit },
  });
  return response.data;
};

// Function to create a provincia
export const createProvincia = async (provincia) => {
  const response = await axios.post(`${API_URL}/api/provincias`, provincia);
  return response.data;
};

// Function to update a provincia
export const updateProvincia = async (id, provincia) => {
  const response = await axios.put(
    `${API_URL}/api/provincias/${id}`,
    provincia
  );
  return response.data;
};

// Function to delete a provincia
export const deleteProvincia = async (id) => {
  const response = await axios.delete(`${API_URL}/api/provincias/${id}`);
  return response.status === 204;
};

// Function to fetch all municipios
export const fetchAllMunicipios = async (page, limit) => {
  const response = await axios.get(`${API_URL}/api/municipios`, {
    params: { page, limit },
  });
  return response.data;
};

// Function to create a municipio
export const createMunicipio = async (nome, provincia_id) => {
  const response = await axios.post(`${API_URL}/api/municipios`, {
    nome,
    provincia_id,
  });
  return response.data;
};

// Function to update a municipio
export const updateMunicipio = async (id, municipio) => {
  const response = await axios.put(
    `${API_URL}/api/municipios/${id}`,
    municipio
  );
  return response.data;
};

// Function to delete a municipio
export const deleteMunicipio = async (id) => {
  const response = await axios.delete(`${API_URL}/api/municipios/${id}`);
  return response.status === 204;
};
