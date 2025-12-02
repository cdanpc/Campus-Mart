package com.appdevg5.technominds.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service layer for managing Order-related business logic.
 * Orders are typically created after a TradeOffer is accepted.
 */
@Service
public class OrderService {

    private final OrderRepository orderRepository;
    // We would need TradeOfferService here to ensure the Order creation is linked to an ACCEPTED offer

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    // READ
    public List<OrderEntity> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<OrderEntity> getOrderById(Integer id) {
        return orderRepository.findById(id);
    }

    public List<OrderEntity> getOrdersByBuyer(Integer buyerId) {
        // Use repository method that matches nested property path: buyer.id
        return orderRepository.findByBuyer_Id(buyerId);
    }

    public List<OrderEntity> getOrdersBySeller(Integer sellerId) {
        // Use repository method that matches nested property path: seller.id
        return orderRepository.findBySeller_Id(sellerId);
    }

    /**
     * Convenience read: find orders by associated product id via the linked tradeOffer.
     */
    public List<OrderEntity> getOrdersByProduct(Integer productId) {
        return orderRepository.findByTradeOffer_Product_Id(productId);
    }

    // CREATE (Should only be called internally or after TradeOffer acceptance)
    @Transactional
    public OrderEntity createOrder(OrderEntity order) {
        // Business Rule: A check must be performed here to ensure the linked tradeOffer is ACCEPTED
        // and that an order for that tradeOffer doesn't already exist (due to the @OneToOne unique constraint).
        // TODO: Inject TradeOfferService and validate tradeOffer status and uniqueness before saving.
        order.setStatus("PENDING_DELIVERY");
        return orderRepository.save(order);
    }

    // UPDATE (Primarily for status changes: e.g., to COMPLETED)
    @Transactional
    public Optional<OrderEntity> updateOrderStatus(Integer id, String newStatus) {
        return orderRepository.findById(id).map(existingOrder -> {
            // Business Rule: Validate the transition logic (e.g., PENDING -> PENDING_DELIVERY -> COMPLETED)
            existingOrder.setStatus(newStatus == null ? null : newStatus.toUpperCase());
            return orderRepository.save(existingOrder);
        });
    }

    // DELETE
    @Transactional
    public void deleteOrder(Integer id) {
        orderRepository.deleteById(id);
    }
}