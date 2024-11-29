import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/supplier";

export const listSupplier = () => axios.get(REST_API_BASE_URL);

export const createSupplier = (supplier) =>
  axios.post(REST_API_BASE_URL, supplier);

export const getSupplier = (supplierId) =>
  axios.get(REST_API_BASE_URL + "/" + supplierId);

export const updateSupplierById = (supplierId, supplier) =>
  axios.put(REST_API_BASE_URL + "/" + supplierId, supplier);

export const deleteSupplier = (supplierId) =>
  axios.delete(REST_API_BASE_URL + "/" + supplierId);
