package com.IMS_Backend.ims_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.IMS_Backend.ims_backend.model.PurchaseOrder;

public interface PurchaseOrderRepository extends JpaRepository<PurchaseOrder, Long> {
	
}
