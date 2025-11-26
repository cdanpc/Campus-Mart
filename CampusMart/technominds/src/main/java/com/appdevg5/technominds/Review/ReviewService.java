package com.appdevg5.technominds.Review;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * Service layer for managing Review-related business logic.
 */
@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    // Note: In a real app, you'd inject OrderService here to validate the order status is COMPLETED.

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // READ
    public Optional<ReviewEntity> getReviewById(Integer id) {
        return reviewRepository.findById(id);
    }

    // Reviews received by a seller (previously called reviewee)
    public List<ReviewEntity> getReviewsBySellerId(Integer sellerId) {
        return reviewRepository.findBySeller_IdOrderByCreatedAtDesc(sellerId);
    }

    // Reviews written by a specific reviewer
    public List<ReviewEntity> getReviewsByReviewerId(Integer reviewerId) {
        return reviewRepository.findByReviewer_IdOrderByCreatedAtDesc(reviewerId);
    }

    // Reviews for a specific product (optional relation)
    public List<ReviewEntity> getReviewsByProductId(Integer productId) {
        return reviewRepository.findByProduct_IdOrderByCreatedAtDesc(productId);
    }

    // CREATE
    @Transactional
    public ReviewEntity createReview(ReviewEntity review) {
        // *** IMPORTANT BUSINESS LOGIC NOTE ***
        // 1. Verify that the Order linked (if any) is in a 'COMPLETED' state.
        // 2. Verify reviewer and seller relationship against the order.
        // 3. The DB unique constraint should prevent duplicate reviews for the same order.
        return reviewRepository.save(review);
    }

    // UPDATE
    @Transactional
    public Optional<ReviewEntity> updateReview(Integer id, ReviewEntity reviewDetails) {
        return reviewRepository.findById(id).map(existingReview -> {
            // Only allow updating comment and rating
            existingReview.setRating(reviewDetails.getRating());
            existingReview.setComment(reviewDetails.getComment());
            return reviewRepository.save(existingReview);
        });
    }

    // DELETE
    @Transactional
    public void deleteReview(Integer id) {
        reviewRepository.deleteById(id);
    }
}