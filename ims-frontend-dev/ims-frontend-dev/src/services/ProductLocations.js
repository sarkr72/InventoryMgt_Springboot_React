import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/productLocations";

export const listProductLocations = () => axios.get(REST_API_BASE_URL);

export const createProductLocation = (pl) =>
  axios.post(REST_API_BASE_URL, pl);

export const getProductLocation = (id) =>
  axios.get(REST_API_BASE_URL + "/" + id);

export const updateProductLocation = (id, pl) =>
  axios.put(REST_API_BASE_URL + "/" + id, pl);

export const deleteProductLocation = (id) =>
  axios.delete(REST_API_BASE_URL + "/" + id);