package com.IMS_Backend.ims_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.IMS_Backend.ims_backend.model.Product;


public interface ProductRepository extends JpaRepository<Product, Long> {
}
