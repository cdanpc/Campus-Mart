package com.appdevg5.technominds.Order;

import com.appdevg5.technominds.Order.OrderEntity;
import com.appdevg5.technominds.Order.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Map;

/**
 * REST Controller for managing finalized orders.
 * Base URL: /api/orders
 */
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    // GET /api/orders
    @GetMapping
    public ResponseEntity<List<OrderEntity>> getAllOrders() {
        List<OrderEntity> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    // GET /api/orders/{id}
    @GetMapping("/{id}")
    public ResponseEntity<OrderEntity> getOrderById(@PathVariable Integer id) {
        return orderService.getOrderById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET /api/orders/buyer/{buyerId}
    @GetMapping("/buyer/{buyerId}")
    public ResponseEntity<List<OrderEntity>> getOrdersByBuyer(@PathVariable Integer buyerId) {
        List<OrderEntity> orders = orderService.getOrdersByBuyer(buyerId);
        return ResponseEntity.ok(orders);
    }

    // GET /api/orders/seller/{sellerId}
    @GetMapping("/seller/{sellerId}")
    public ResponseEntity<List<OrderEntity>> getOrdersBySeller(@PathVariable Integer sellerId) {
        List<OrderEntity> orders = orderService.getOrdersBySeller(sellerId);
        return ResponseEntity.ok(orders);
    }

    // GET /api/orders/product/{productId}
    @GetMapping("/product/{productId}")
    public ResponseEntity<List<OrderEntity>> getOrdersByProduct(@PathVariable Integer productId) {
        List<OrderEntity> orders = orderService.getOrdersByProduct(productId);
        return ResponseEntity.ok(orders);
    }

    // POST /api/orders - Creates a new order (usually after trade offer acceptance)
    @PostMapping
    public ResponseEntity<OrderEntity> createOrder(@Valid @RequestBody OrderEntity order) {
        // Expected payload includes IDs for tradeOffer, buyer, seller, and product.
        OrderEntity newOrder = orderService.createOrder(order);

        // Build Location header: /api/orders/{id}
        URI location = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(newOrder.getId())
                .toUri();

        return ResponseEntity.created(location).body(newOrder);
    }

    // PATCH /api/orders/{id}/status - Update the status of an order
    @PatchMapping("/{id}/status")
    public ResponseEntity<OrderEntity> updateOrderStatus(@PathVariable Integer id, @RequestBody Map<String, String> statusUpdate) {
        String newStatus = statusUpdate.get("status");
        if (newStatus == null) {
            return ResponseEntity.badRequest().build();
        }

        return orderService.updateOrderStatus(id, newStatus)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/orders/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Integer id) {
        return orderService.getOrderById(id)
                .map(existing -> {
                    orderService.deleteOrder(id);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}