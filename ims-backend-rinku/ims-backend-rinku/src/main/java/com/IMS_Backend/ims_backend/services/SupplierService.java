package com.IMS_Backend.ims_backend.services;

import java.util.List;

import com.IMS_Backend.ims_backend.model.Supplier;

public interface SupplierService {
	
	Supplier createSupplier(Supplier supplier);
	
	Supplier getSupplierById(Long supplierId);
	
 	List<Supplier> getAllSuppliers();

    Supplier updateSupplier(Long supplierId, Supplier supplier);

    void deleteSupplierById(Long supplierId);
}