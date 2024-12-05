import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/location";

export const listLocations = () => axios.get(REST_API_BASE_URL);

export const createLocation = (location) =>
  axios.post(REST_API_BASE_URL, location);

export const getLocation = (locationId) =>
  axios.get(REST_API_BASE_URL + "/" + locationId);

export const updateLocation = (locationId, location) =>
  axios.put(REST_API_BASE_URL + "/" + locationId, location);

export const deleteLocation = (locationId) =>
  axios.delete(REST_API_BASE_URL + "/" + locationId);
