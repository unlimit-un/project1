import { api_deleteMaterial, api_getMaterialByManagerId, api_insertMaterial, api_updateMaterial } from "../../api/material";

export const getMaterialByManagerId = async () =>await api_getMaterialByManagerId();
export const insertMaterial = async (formData) =>await api_insertMaterial(formData);
export const deleteMaterial = async (formData) =>await api_deleteMaterial(formData);
export const updateMaterial = async (formData) =>await api_updateMaterial(formData);