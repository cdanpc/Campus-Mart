package com.appdevg5.technominds.Review;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * REST Controller for managing user reviews and ratings.
 * Base URL: /api/reviews
 */
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // GET /api/reviews/user/{sellerId} - Get all reviews received by a user (seller)
    @GetMapping("/user/{sellerId}")
    public List<ReviewEntity> getReviewsReceived(@PathVariable Integer sellerId) {
        return reviewService.getReviewsBySellerId(sellerId);
    }

    // GET /api/reviews/written/{reviewerId} - Get all reviews written by a user
    @GetMapping("/written/{reviewerId}")
    public List<ReviewEntity> getReviewsWritten(@PathVariable Integer reviewerId) {
        return reviewService.getReviewsByReviewerId(reviewerId);
    }

    // GET /api/reviews/{id} - Get a specific review
    @GetMapping("/{id}")
    public ResponseEntity<ReviewEntity> getReviewById(@PathVariable Integer id) {
        return reviewService.getReviewById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /api/reviews - Create a new review
    @PostMapping
    public ResponseEntity<ReviewEntity> createReview(@Valid @RequestBody ReviewEntity review) {
        ReviewEntity newReview = reviewService.createReview(review);
        return new ResponseEntity<>(newReview, HttpStatus.CREATED);
    }

    // PUT /api/reviews/{id} - Update an existing review (rating or comment)
    @PutMapping("/{id}")
    public ResponseEntity<ReviewEntity> updateReview(@PathVariable Integer id, @Valid @RequestBody ReviewEntity reviewDetails) {
        return reviewService.updateReview(id, reviewDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/reviews/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReview(@PathVariable Integer id) {
        reviewService.deleteReview(id);
        return ResponseEntity.noContent().build();
    }
}