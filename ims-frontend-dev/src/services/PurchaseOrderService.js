import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/api/purchaseOrder";

export const purchaseOrderList = () => axios.get(REST_API_BASE_URL);

export const createPurchaseOrder = (purchaseOrder) => axios.post(REST_API_BASE_URL, purchaseOrder);

export const getPurchaseOrder = (purchaseOrderID) => axios.get(REST_API_BASE_URL + "/" + purchaseOrderID);

export const updatePurchaseOrder = (purchaseOrderID, purchaseOrder) => axios.put(REST_API_BASE_URL + '/' + purchaseOrderID, purchaseOrder);

export const deletePurchaseOrder = (purchaseOrderID) => axios.delete(REST_API_BASE_URL + "/" + purchaseOrderID);
