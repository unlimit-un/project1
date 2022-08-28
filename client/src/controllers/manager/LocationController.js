import { api_deleteLocation, api_getLocationById, api_getLocationByManagerId, api_insertLocation, api_updateLocation } from "../../api/manager/location";
import { api_deleteRoom, api_getRoomById, api_getRoomByLocationId, api_insertRoom, api_updateRoom } from "../../api/manager/room";

export const getLocationByManagerId = async () => await api_getLocationByManagerId();
export const getLocationById = async (location_id) => await api_getLocationById(location_id);
export const insertLocation = async (formData) => await api_insertLocation(formData);
export const deleteLocation = async (formData) => await api_deleteLocation(formData);
export const updateLocation = async (formData) => await api_updateLocation(formData);

export const getRoomByLocationId = async (location_id) => await api_getRoomByLocationId(location_id);
export const getRoomById = async (room_id) => await api_getRoomById(room_id);
export const insertRoom = async (formData) => await api_insertRoom(formData);
export const deleteRoom = async (formData) => await api_deleteRoom(formData);
export const updateRoom = async (formData) => await api_updateRoom(formData);