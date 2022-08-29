import { api_getOrderMaterialByManagerIdStatusConsidered, api_getOrderMaterialByManagerIdStatusWaiting, api_updateOrderMaterialToConsidered } from "../../api/manager/order_material";

export const getOrderMaterialByManagerIdStatusWaiting = async () => api_getOrderMaterialByManagerIdStatusWaiting();
export const getOrderMaterialByManagerIdStatusConsidered = async () => api_getOrderMaterialByManagerIdStatusConsidered();
export const updateOrderMaterialToConsidered = async (formData) => api_updateOrderMaterialToConsidered(formData);