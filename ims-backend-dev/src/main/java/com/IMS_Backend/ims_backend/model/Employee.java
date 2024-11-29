
package com.IMS_Backend.ims_backend.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "employees")
public class Employee {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name = "first_name")
	private String firstName;
	
	@Column(name = "last_name")
	private String lastName;
	
	@Column(name = "email", nullable = false, unique = true)
	private String email;
	
	@Column(name = "password", nullable = false)
	private String password;
	
	@Column(name = "phone")
	private String phone;
	
	@Column(name = "role")
	private String role;
	
	
	@ManyToOne
    @JoinColumn(name = "company_id", nullable=false)
	@JsonIgnoreProperties({"employees", "address", "contact", "employees", "warehouses", "suppliers", "companyId"})
	private Company company;
    
//	@OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true)
//	@JsonManagedReference 
//	private List<PurchaseOrder> pos= new ArrayList<>();
//	
	public Employee() {
		
	}
	public Employee(String firstName, String lastName, String email, String password, String phone, String role,
			Company company) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.phone = phone;
		this.role = role;
		this.company = company;
	}

//	public List<PurchaseOrder> getPos() {
//		return pos;
//	}
//	public void setPos(List<PurchaseOrder> pos) {
//		this.pos = pos;
//	}
	public Long getId() {
		return id;
	}
	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getRole() {
		return role;
	}

	@JsonProperty("companyId")
	public Long getCompanyId() {
		return company != null ? company.getId() : null;
	}
	
	public void setRole(String role) {
		this.role = role;
	}

	public Company getCompany() {
		return company;
	}

	public void setCompany(Company company) {
		this.company = company;
	}

	public String getFullName() {
        return firstName + " " + lastName;
    }
	
	@Override
	public String toString() {
		return "Employee [ id=" + id + "firstName=" + firstName + ", lastName=" + lastName + ", email=" + email + ", password="
				+ password + ", phone=" + phone + ", role=" + role + ", company=" + company + "]";
	}
	
	
	
	
}
