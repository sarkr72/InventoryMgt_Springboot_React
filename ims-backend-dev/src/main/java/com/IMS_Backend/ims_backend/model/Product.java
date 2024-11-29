package com.IMS_Backend.ims_backend.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Product")
public class Product {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "name")
	private String name;

	@Column(name = "category")
	private String category;

	@Column(name = "Restocklevel")
	private int restockLevel;

	@Column(name = "unitPrice")
	private double unitPrice;

	

//	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE })
//	@JoinTable(name = "product_purchaseOrder", joinColumns = @JoinColumn(name = "product_id"), inverseJoinColumns = @JoinColumn(name = "purchaseOrder_id"))
//	private Set<PurchaseOrder> pos = new HashSet<>();

//	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
//    private Set<ProductLocation> productLocations = new HashSet<>();
	
	public Product() {

	}


public Product(String name, String category, int restockLevel, double unitPrice) {
	super();
	this.name = name;
	this.category = category;
	this.restockLevel = restockLevel;
	this.unitPrice = unitPrice;
}


//	public Set<ProductLocation> getProductLocations() {
//		return productLocations;
//	}
//
//	public void setProductLocations(Set<ProductLocation> productLocations) {
//		this.productLocations = productLocations;
//	}

//	public Set<PurchaseOrder> getPos() {
//		return pos;
//	}
//
//	public void setPos(Set<PurchaseOrder> pos) {
//		this.pos = pos;
//	}


	public Long getId() {
		return id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getRestockLevel() {
		return restockLevel;
	}

	public void setRestockLevel(int restockLevel) {
		this.restockLevel = restockLevel;
	}

	public double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
	}
	
	  @Override
	    public boolean equals(Object o) {
	        if (this == o) return true; 
	        if (o == null || getClass() != o.getClass()) return false; 
	        Product product = (Product) o;
	        return Objects.equals(id, product.id); 
	    }

	    @Override
	    public int hashCode() {
	        return Objects.hash(id); 
	    }
	    
}
