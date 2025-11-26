package com.appdevg5.technominds.Order;

import com.appdevg5.technominds.TradeOffer.TradeOfferEntity; // REQUIRED: Import TradeOfferEntity
import com.appdevg5.technominds.Profile.ProfileEntity; // REQUIRED: Import ProfileEntity

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entity for the 'orders' table adjusted to match ERD column names:
 * orders: id, buyer_id, seller_id, total_amount, status, created_at, updated_at
 */
@Entity
@Table(name = "orders")
@NoArgsConstructor
public class OrderEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    // Optional link back to the trade negotiation that resulted in this order
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trade_offer_id")
    private TradeOfferEntity tradeOffer;

    // The buyer in the transaction
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id", nullable = false)
    private ProfileEntity buyer;

    // The seller in the transaction
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id", nullable = false)
    private ProfileEntity seller;

    // Total amount for the order (matches ERD name 'total_amount')
    @DecimalMin(value = "0.00", inclusive = true)
    @Column(name = "total_amount", precision = 10, scale = 2)
    private BigDecimal totalAmount = BigDecimal.ZERO;

    // Status can be PENDING, PENDING_DELIVERY, COMPLETED, CANCELLED
    @NotNull
    @Column(name = "status", length = 50, nullable = false)
    private String status = "PENDING";

    @Column(name = "delivery_notes", columnDefinition = "TEXT")
    private String deliveryNotes;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Getters and Setters

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public TradeOfferEntity getTradeOffer() {
        return tradeOffer;
    }

    public void setTradeOffer(TradeOfferEntity tradeOffer) {
        this.tradeOffer = tradeOffer;
    }

    public ProfileEntity getBuyer() {
        return buyer;
    }

    public void setBuyer(ProfileEntity buyer) {
        this.buyer = buyer;
    }

    public ProfileEntity getSeller() {
        return seller;
    }

    public void setSeller(ProfileEntity seller) {
        this.seller = seller;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDeliveryNotes() {
        return deliveryNotes;
    }

    public void setDeliveryNotes(String deliveryNotes) {
        this.deliveryNotes = deliveryNotes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}