package com.IMS_Backend.ims_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.IMS_Backend.ims_backend.model.Warehouse;

@Repository
public interface WarehouseRepository extends JpaRepository<Warehouse,Long>{
	
}
