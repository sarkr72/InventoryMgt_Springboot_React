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

import com.IMS_Backend.ims_backend.model.Company;
import com.IMS_Backend.ims_backend.services.CompanyService;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/companies")
public class CompanyController {

	@Autowired
	private CompanyService companyService;
	
	
	@PostMapping
    public ResponseEntity<Company> createcompany(@RequestBody Company company){
        Company savedcompany = companyService.createCompany(company);
        return new ResponseEntity<>(savedcompany, HttpStatus.CREATED);
    }
	
	@GetMapping("/{id}")
	public ResponseEntity<Company> getcompany(@PathVariable("id") Long id){
		Company company = companyService.getCompanyById(id);
		
		return new ResponseEntity<>(company, HttpStatus.CREATED);
	}
	
	
	@GetMapping
	public ResponseEntity<List<Company>> getAllcompanys(){
		List<Company> companys = companyService.getAllCompanys();
		
		return ResponseEntity.ok(companys);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Company> updatecompany(@PathVariable("id") Long id, @RequestBody Company company){
		Company updatedcompany = companyService.updateCompany(id, company);
		
		return new ResponseEntity<>(updatedcompany, HttpStatus.CREATED);
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deletecompany(@PathVariable("id") Long id){
		companyService.deleteCompanyById(id);
		
		return ResponseEntity.ok("company deleted successfully");
	}
	
	
}
