import { api_getEngineerByDeptId } from "../../api/manager/engineer";
import { api_getNotifyRepairAndMaterialByNotifyRepairId, api_getNotifyRepairById, api_getNotifyRepairByManagerId, api_updateNotifyRepair, api_updateNotifyRepairToAccept, api_updateNotifyRepairToDeny } from "../../api/manager/notify_repair";
import { api_deleteNotifyRepairMaterial, api_getNotifyRepairMaterialByRepairId, api_insertNotifyRepairMaterial } from "../../api/manager/notify_repair_material";

export const updateNotifyRepairToAccept = async(formData) =>await api_updateNotifyRepairToAccept(formData);
export const updateNotifyRepairToDeny = async(formData) =>await api_updateNotifyRepairToDeny(formData);
export const getNotifyRepairByManagerId = async(formData) =>await api_getNotifyRepairByManagerId(formData);
export const getNotifyRepairById = async(formData) =>await api_getNotifyRepairById(formData);
export const updateNotifyRepair = async(formData) =>await api_updateNotifyRepair(formData);
export const getNotifyRepairAndMaterialByNotifyRepairId = async(formData) =>await api_getNotifyRepairAndMaterialByNotifyRepairId(formData);
export const getEngineerByDeptId = async(formData) =>await api_getEngineerByDeptId(formData);
export const getNotifyRepairMaterialByRepairId = async(formData) =>await api_getNotifyRepairMaterialByRepairId(formData);
export const deleteNotifyRepairMaterial = async(formData) =>await api_deleteNotifyRepairMaterial(formData);
export const insertNotifyRepairMaterial = async(formData) =>await api_insertNotifyRepairMaterial(formData);
