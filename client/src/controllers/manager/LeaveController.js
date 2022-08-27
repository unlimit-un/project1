import { api_deleteLeave, api_getLeaveById, api_getLeaveByManagerIdStatusConsidered, api_getLeaveByManagerIdStatusWaiting, api_updateLeave, api_updateLeaveToConsidered } from "../../api/manager/leave";
import { api_deleteLeaveType, api_getLeaveTypeById, api_getLeaveTypeByManagerId, api_insertLeaveType, api_updateLeaveType } from "../../api/manager/leave_type";

//TODO: leave_type
export const getLeaveTypeByManagerId = async () => await api_getLeaveTypeByManagerId();
export const getLeaveTypeById = async (leave_type_id) => await api_getLeaveTypeById(leave_type_id);
export const deleteLeaveType = async (formData) => await api_deleteLeaveType(formData);
export const insertLeaveType = async (formData) => await api_insertLeaveType(formData);
export const updateLeaveType = async (formData) => await api_updateLeaveType(formData);

//TODO: leave
export const getLeaveByManagerIdStatusWaiting = async () => await api_getLeaveByManagerIdStatusWaiting();
export const getLeaveByManagerIdStatusConsidered = async () => await api_getLeaveByManagerIdStatusConsidered();
export const updateLeaveToConsidered = async (formData) => await api_updateLeaveToConsidered(formData);
export const updateLeave = async (formData) => await api_updateLeave(formData);
export const getLeaveById = async (formData) => await api_getLeaveById(formData);
export const deleteLeave = async (formData) => await api_deleteLeave(formData);