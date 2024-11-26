package com.IMS_Backend.ims_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.IMS_Backend.ims_backend.model.ProductLocation;
import com.IMS_Backend.ims_backend.services.ProductLocationService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/productLocations")
public class ProductLocationController {

		@Autowired
		private ProductLocationService plService;
		
		
		@PostMapping
	    public ResponseEntity<ProductLocation> createcompany(@RequestBody ProductLocation company){
			ProductLocation savedcompany = plService.createProductLocaiton(company);
	        return new ResponseEntity<>(savedcompany, HttpStatus.CREATED);
	    }
		
		@GetMapping("/{id}")
		public ResponseEntity<ProductLocation> getcompany(@PathVariable("id") Long id){
			ProductLocation company = plService.getProductLocationById(id);
			
			return new ResponseEntity<>(company, HttpStatus.CREATED);
		}
		
		
		@GetMapping
		public ResponseEntity<List<ProductLocation>> getAllcompanys(){
			List<ProductLocation> companys = plService.getAllProductLocations();
			
			return ResponseEntity.ok(companys);
		}
		
		@PutMapping("/{id}")
		public ResponseEntity<ProductLocation> updatecompany(@PathVariable("id") Long id, @RequestBody ProductLocation company){
			ProductLocation updatedcompany = plService.updateProductLocation(id, company);
			
			return new ResponseEntity<>(updatedcompany, HttpStatus.CREATED);
		}
		
		
		@DeleteMapping("/{id}")
		public ResponseEntity<String> deletecompany(@PathVariable("id") Long id){
			plService.deleteProductLocationById(id);
			
			return ResponseEntity.ok("company deleted successfully");
		}
		
		
	}

