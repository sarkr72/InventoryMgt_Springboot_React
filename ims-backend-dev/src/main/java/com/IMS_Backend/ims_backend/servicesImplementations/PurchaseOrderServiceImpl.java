package com.IMS_Backend.ims_backend.servicesImplementations;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.IMS_Backend.ims_backend.exceptions.NotFoundException;
import com.IMS_Backend.ims_backend.model.PurchaseOrder;
import com.IMS_Backend.ims_backend.repository.ProductRepository;
import com.IMS_Backend.ims_backend.repository.PurchaseOrderRepository;
import com.IMS_Backend.ims_backend.services.PurchaseOrderService;

@Service
public class PurchaseOrderServiceImpl implements PurchaseOrderService{
	
	@Autowired
	private PurchaseOrderRepository purchaseOrderRepo;
	
	@Autowired
	private ProductRepository productOrderRepo;

	
	@Override
	public PurchaseOrder createOrder(PurchaseOrder order) {
		return purchaseOrderRepo.save(order);
	}

	@Override
	public PurchaseOrder getOrderById(Long orderId) {
		PurchaseOrder getOrderId = purchaseOrderRepo.findById(orderId).orElseThrow(() -> new NotFoundException("Purchase Order ID does not exist: " + orderId));
		return getOrderId;
	}

	@Override
	public List<PurchaseOrder> getAllOrders() {
		return purchaseOrderRepo.findAll();
	}

	@Override
	public PurchaseOrder updateOrder(Long orderId, PurchaseOrder order) {
		PurchaseOrder updateOrder = purchaseOrderRepo.findById(orderId).orElseThrow(() -> new NotFoundException("Purchase Order ID does not exist: " + orderId));
		updateOrder.setDate(order.getDate());
		updateOrder.setQuantity(order.getQuantity());
		updateOrder.setTotalAmount(order.getTotalAmount());
		updateOrder.setCompany(order.getCompany());
		updateOrder.setSupplier(order.getSupplier());
		updateOrder.setEmployee(order.getEmployee());
		if (order.getProductNames() != null) {
//			updateOrder.getProductNames().addAll(order.getProductNames());
			for(String p : order.getProductNames()) {
				updateOrder.addProduct(p);
			}
		}
		PurchaseOrder savedPO = purchaseOrderRepo.save(updateOrder);
		return savedPO;
	}

	@Override
	public void deleteOrderById(Long orderId) {
		PurchaseOrder deleteOrder = purchaseOrderRepo.findById(orderId).orElseThrow(() -> new NotFoundException("Purchase Order not found" + orderId));
		purchaseOrderRepo.delete(deleteOrder);
		
	}
	
}