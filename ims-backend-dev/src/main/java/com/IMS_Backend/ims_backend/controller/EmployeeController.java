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

import com.IMS_Backend.ims_backend.model.Employee;
import com.IMS_Backend.ims_backend.services.EmployeeService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

	@Autowired
	private EmployeeService employeeService;
	
	
	@PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee){
        Employee savedEmployee = employeeService.createEmployee(employee);
        return new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }
	
//	@GetMapping("/{id}")
//	public ResponseEntity<Employee> getEmployee(@PathVariable("id") Long id){
//		Employee employee = employeeService.getEmployeeById(id);
//		
//		return new ResponseEntity<>(employee, HttpStatus.CREATED);
//	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Employee> getEmployee(@PathVariable("id") String email){
		Employee employee = employeeService.findByEmail(email);
		
		return new ResponseEntity<>(employee, HttpStatus.CREATED);
	}
	
	@GetMapping
	public ResponseEntity<List<Employee>> getAllEmployees(){
		List<Employee> employees = employeeService.getAllEmployees();
		
		return ResponseEntity.ok(employees);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable("id") Long id, @RequestBody Employee employee){
		Employee updatedEmployee = employeeService.updateEmployee(id, employee);
		
		return new ResponseEntity<>(updatedEmployee, HttpStatus.CREATED);
	}
	
	
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Long id){
		employeeService.deleteEmployeeById(id);
		
		return ResponseEntity.ok("Employee deleted successfully");
	}
	
	
}
