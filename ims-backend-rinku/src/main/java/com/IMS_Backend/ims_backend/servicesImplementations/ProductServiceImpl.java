package com.IMS_Backend.ims_backend.servicesImplementations;


import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Product;
import com.IMS_Backend.ims_backend.model.PurchaseOrder;
import com.IMS_Backend.ims_backend.repository.ProductRepository;
import com.IMS_Backend.ims_backend.repository.PurchaseOrderRepository;
import com.IMS_Backend.ims_backend.services.ProductService;



@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	private ProductRepository productRepository;
	
	
	@Override
	public Product createProduct(Product product) {
		Product createdProduct = productRepository.save(product);
        return createdProduct;
	}

	@Override
	public Product getProductById(Long productId) {
		Product product = productRepository.findById(productId).orElseThrow(()-> new NotFoundException("Product not found through ID: " + productId));
		return product;
	}

	@Override
	public List<Product> getAllProducts() {
		return productRepository.findAll();
	}

	@Override
	public Product updateProduct(Long productId, Product product) {
		Product searchedProduct = productRepository.findById(productId).orElseThrow(() -> new NotFoundException("Product not found through ID: " + productId));
		searchedProduct.setName(product.getName());
		searchedProduct.setCategory(product.getCategory());
		searchedProduct.setRestockLevel(product.getRestockLevel());
		searchedProduct.setUnitPrice(product.getUnitPrice());
		Product updatedProduct = productRepository.save(searchedProduct);
		
		return updatedProduct;
	}

	@Override
	public void deleteProductById(Long productId) {
		Product deleteProduct = productRepository.findById(productId).orElseThrow(()-> new NotFoundException("Product not found through ID: " + productId));
		productRepository.delete(deleteProduct);
		
	}
	
	@Override
	public List<Product> getProductsByCompanyId(Long companyId) {
        return productRepository.findByCompanyId(companyId);
    }

    
}
