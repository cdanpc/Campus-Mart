package com.appdevg5.technominds.Review;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * Repository interface for ReviewEntity.
 */
@Repository
public interface ReviewRepository extends JpaRepository<ReviewEntity, Integer> {

    /**
     * Finds all reviews received by a specific user (reviewee / seller).
     * Matches ReviewEntity.seller -> profiles.id
     */
    List<ReviewEntity> findBySeller_IdOrderByCreatedAtDesc(Integer sellerId);

    /**
     * Finds all reviews written by a specific user (reviewer).
     * Matches ReviewEntity.reviewer -> profiles.id
     */
    List<ReviewEntity> findByReviewer_IdOrderByCreatedAtDesc(Integer reviewerId);

    /**
     * Finds reviews for a specific product (optional relation).
     */
    List<ReviewEntity> findByProduct_IdOrderByCreatedAtDesc(Integer productId);
}