package com.IMS_Backend.ims_backend.services;

import java.util.List;

import com.IMS_Backend.ims_backend.model.Company;

public interface CompanyService {

    Company createCompany(Company company);

    Company getCompanyById(Long companyId);

    List<Company> getAllCompanys();

    Company updateCompany(Long companyId, Company company);

    void deleteCompanyById(Long companyId);
}
