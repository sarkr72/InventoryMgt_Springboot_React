package com.IMS_Backend.ims_backend.services;

import java.util.List;

import com.IMS_Backend.ims_backend.model.Product;

public interface ProductService {

    Product createProduct(Product product);

    Product getProductById(Long ProductId);

    List<Product> getAllProducts();

    Product updateProduct(Long productId, Product product);

    void deleteProductById(Long productId);
}
