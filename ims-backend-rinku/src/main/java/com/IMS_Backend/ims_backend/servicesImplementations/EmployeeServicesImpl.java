package com.IMS_Backend.ims_backend.servicesImplementations;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.Employee;
import com.IMS_Backend.ims_backend.repository.EmployeeRepository;
import com.IMS_Backend.ims_backend.services.EmployeeService;



@Service
public class EmployeeServicesImpl implements EmployeeService{

	@Autowired
	private EmployeeRepository employeeRepository;
	
    @Override
    public Employee createEmployee(Employee employee) {
    	
        Employee savedEmployee = employeeRepository.save(employee);
        return savedEmployee;
    }

	@Override
	public Employee getEmployeeById(Long employeeId) {
		Employee employee = employeeRepository.findById(employeeId).orElseThrow(()-> new NotFoundException("Employee is not found with id: " + employeeId));
		return employee;
	}

	@Override
	public List<Employee> getAllEmployees() {
	
		return employeeRepository.findAll();
	}

	@Override
	public Employee updateEmployee(Long employeeId, Employee employee) {
		Employee savedEmployee = employeeRepository.findById(employeeId).orElseThrow(()-> new NotFoundException("Employee is not found with id: " + employeeId));
		
		savedEmployee.setFirstName(employee.getFirstName());
		savedEmployee.setLastName(employee.getLastName());
		savedEmployee.setEmail(employee.getEmail());
		savedEmployee.setPassword(employee.getPassword());
		savedEmployee.setPhone(employee.getPhone());
		savedEmployee.setRoles(employee.getRoles());
//		savedEmployee.setCompany(null);
		Employee updatedEmployee = employeeRepository.save(savedEmployee);
		
		return updatedEmployee;
	}

	@Override
	public void deleteEmployeeById(Long employeeId) {
		Employee savedEmployee = employeeRepository.findById(employeeId).orElseThrow(()-> new NotFoundException("Employee is not found with id: " + employeeId));
	employeeRepository.delete(savedEmployee);
		
	}

	@Override
	public Employee findByEmail(String email) {
		Employee employee = employeeRepository.findByEmail(email).orElseThrow(()-> new NotFoundException("User is not found with email: " + email));
		return employee;
	}


    
}
