import { api_getNotifyRepairAndMaterialByNotifyRepairId, api_getNotifyRepairByManagerId, api_updateNotifyRepairToAccept, api_updateNotifyRepairToDeny } from "../../api/notify_repair";

export const updateNotifyRepairToAccept = async(formData) =>await api_updateNotifyRepairToAccept(formData);
export const updateNotifyRepairToDeny = async(formData) =>await api_updateNotifyRepairToDeny(formData);
export const getNotifyRepairByManagerId = async(formData) =>await api_getNotifyRepairByManagerId(formData);
export const getNotifyRepairAndMaterialByNotifyRepairId = async(formData) =>await api_getNotifyRepairAndMaterialByNotifyRepairId(formData);