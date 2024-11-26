package com.IMS_Backend.ims_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.IMS_Backend.ims_backend.model.Company;


public interface CompanyRepository extends JpaRepository<Company, Long> {
}
