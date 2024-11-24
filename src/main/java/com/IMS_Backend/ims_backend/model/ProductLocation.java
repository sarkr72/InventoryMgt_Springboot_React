package com.IMS_Backend.ims_backend.model;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_locations")
public class ProductLocation {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;

	@ManyToOne(optional = false)
	@JoinColumn(name = "location_id", nullable = false)
	@JsonIgnoreProperties({"maxCapacity", "address", "companyId", "companyAddress", "warehouseId"})
	private Location location;

	@ManyToOne(optional = false)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@ManyToOne(optional = false)
	@JoinColumn(name = "purchaseOrder_id", nullable = false)
	@JsonIgnoreProperties({ "date", "quantity", "totalAmount", "unitPrice", "employee", "company", "productNames", "supplier", "supplierId", })
	private PurchaseOrder po;

	@ManyToOne(optional = false)
	@JoinColumn(name = "supplier_id", nullable = false)
	@JsonIgnoreProperties({ "address", "contact", "companies"})
	private Supplier supplier;

	@Column(name = "unitPrice")
	private double unitPrice;

	@Column(name = "totalPrice")
	private double totalprice;

	@Column(name = "batch_number")
	private String batchNumber;

	@Column(name = "received_date")
	private String receivedDate;

	@Column(name = "mfg_date")
	private String mfgDate;

	@Column(name = "exp_date")
	private String expDate;

	@Column(name = "quantity")
	private int quantity;

	public ProductLocation() {
	}

	public ProductLocation(Location location, Product product, PurchaseOrder po, Supplier supplier, double unitPrice,
			double totalprice, String batchNumber, String receivedDate, String mfgDate, String expDate, int quantity) {
		super();
		this.location = location;
		this.product = product;
		this.po = po;
		this.supplier = supplier;
		this.unitPrice = unitPrice;
		this.totalprice = totalprice;
		this.batchNumber = batchNumber;
		this.receivedDate = receivedDate;
		this.mfgDate = mfgDate;
		this.expDate = expDate;
		this.quantity = quantity;
	}

//	@JsonProperty("productId")
//	public Long getProductId() {
//		return product != null ? product.getId() : null;
//	}
//
//	@JsonProperty("locationId")
//	public Long getLocationId() {
//		return location != null ? location.getId() : null;
//	}

	public Location getLocation() {
		return location;
	}

	public void setLocation(Location location) {
		this.location = location;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public PurchaseOrder getPo() {
		return po;
	}

	public void setPo(PurchaseOrder po) {
		this.po = po;
	}

	public Supplier getSupplier() {
		return supplier;
	}

	public void setSupplier(Supplier supplier) {
		this.supplier = supplier;
	}

	public double getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(double unitPrice) {
		this.unitPrice = unitPrice;
	}

	public double getTotalprice() {
		return totalprice;
	}

	public void setTotalprice(double totalprice) {
		this.totalprice = totalprice;
	}

	public String getBatchNumber() {
		return batchNumber;
	}

	public void setBatchNumber(String batchNumber) {
		this.batchNumber = batchNumber;
	}

	public String getReceivedDate() {
		return receivedDate;
	}

	public void setReceivedDate(String receivedDate) {
		this.receivedDate = receivedDate;
	}

	public String getMfgDate() {
		return mfgDate;
	}

	public void setMfgDate(String mfgDate) {
		this.mfgDate = mfgDate;
	}

	public String getExpDate() {
		return expDate;
	}

	public void setExpDate(String expDate) {
		this.expDate = expDate;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Long getId() {
		return id;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ProductLocation that = (ProductLocation) o;
		return Objects.equals(location, that.location) && Objects.equals(product, that.product);
	}

	@Override
	public int hashCode() {
		return Objects.hash(location, product);
	}
}
