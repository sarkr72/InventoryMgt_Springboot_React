package com.IMS_Backend.ims_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.IMS_Backend.ims_backend.model.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {
	List<Product> findByCompanyId(Long companyId);
}
