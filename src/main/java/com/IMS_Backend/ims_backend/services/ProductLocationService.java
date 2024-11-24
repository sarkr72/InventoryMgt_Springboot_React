package com.IMS_Backend.ims_backend.services;

import java.util.List;

import com.IMS_Backend.ims_backend.model.ProductLocation;

public interface ProductLocationService {
	ProductLocation createProductLocaiton(ProductLocation productLocation);

	ProductLocation getProductLocationById(Long id);

	List<ProductLocation> getAllProductLocations();

	ProductLocation updateProductLocation(Long productId, ProductLocation productLocation);

	void deleteProductLocationById(Long id);
}
