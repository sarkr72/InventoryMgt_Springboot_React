import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/companies';

export const listCompanies = () => axios.get(REST_API_BASE_URL);

export const listSuppliersById = (id) => axios.get(REST_API_BASE_URL + "/companySuppliers/" + id);

export const createCompany = (company) => axios.post(REST_API_BASE_URL, company);

export const getCompany = (CompanyId) => axios.get(REST_API_BASE_URL + '/' + CompanyId);

export const updateCompanyWithId = (CompanyId, company) => axios.put(REST_API_BASE_URL + '/' + CompanyId, company);

export const deleteCompany =(CompanyId) => axios.delete(REST_API_BASE_URL + '/' + CompanyId);


