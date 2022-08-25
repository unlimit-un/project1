import { api_getLeaveByManagerId, api_getTotalLeaveByManagerId, api_getTotalLeaveByManagerIdGroupByType } from "../../api/manager/leave";
import { api_getTotalNotifyRepairByManagerId, api_getTotalNotifyRepairByManagerIdGroupByType } from "../../api/manager/notify_repair";
import { api_getOrderMaterialByManagerId, api_getTotalOrderMaterialByManagerId, api_getTotalOrderMaterialByManagerIdGroupByType } from "../../api/manager/order_material";

export const getOrderMaterialByManagerId = async () => await api_getOrderMaterialByManagerId();
export const getLeaveByManagerId = async () => await api_getLeaveByManagerId();
export const getTotalNotifyRepairByManagerId = async () => await api_getTotalNotifyRepairByManagerId();
export const getTotalLeaveByManagerId = async () => await api_getTotalLeaveByManagerId();
export const getTotalOrderMaterialByManagerId = async () => await api_getTotalOrderMaterialByManagerId();
export const getTotalNotifyRepairByManagerIdGroupByType = async () => await api_getTotalNotifyRepairByManagerIdGroupByType();
export const getTotalLeaveByManagerIdGroupByType = async () => await api_getTotalLeaveByManagerIdGroupByType();
export const getTotalOrderMaterialByManagerIdGroupByType = async () => await api_getTotalOrderMaterialByManagerIdGroupByType();
