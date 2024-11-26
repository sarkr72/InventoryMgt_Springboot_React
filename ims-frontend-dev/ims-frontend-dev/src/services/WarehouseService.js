import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/warehouse";

export const listWarehouses = () => axios.get(REST_API_BASE_URL);

export const createWarehouse = (warehouse) =>
  axios.post(REST_API_BASE_URL, warehouse);

export const getWarehouse = (warehouseId) =>
  axios.get(REST_API_BASE_URL + "/" + warehouseId);

export const updateWarehouse = (warehouseId, warehouse) =>
  axios.put(REST_API_BASE_URL + "/" + warehouseId, warehouse);

export const deleteWarehouse = (warehouseId) =>
  axios.delete(REST_API_BASE_URL + "/" + warehouseId);
