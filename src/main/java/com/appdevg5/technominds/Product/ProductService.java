package com.appdevg5.technominds.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service layer for managing Product business logic.
 */
@Service
public class ProductService {

    private final ProductRepository productRepository;
    // Note: In a real app, you might inject ProfileService here to ensure the sellerId is valid.

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // READ
    public Optional<ProductEntity> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    public List<ProductEntity> getAllProducts() {
        // Return only available products matching the ERD column is_available
        return productRepository.findAll().stream()
                .filter(p -> Boolean.TRUE.equals(p.getIsAvailable()))
                .collect(Collectors.toList());
    }

    public List<ProductEntity> getProductsBySeller(Integer sellerId) {
        return productRepository.findAll().stream()
                .filter(p -> p.getSeller() != null && sellerId != null && sellerId.equals(p.getSeller().getId()))
                .collect(Collectors.toList());
    }

    public List<ProductEntity> searchProducts(String searchTerm) {
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllProducts();
        }
        String q = searchTerm.toLowerCase();
        return productRepository.findAll().stream()
                .filter(p -> (p.getTitle() != null && p.getTitle().toLowerCase().contains(q))
                        || (p.getDescription() != null && p.getDescription().toLowerCase().contains(q)))
                .collect(Collectors.toList());
    }

    // CREATE (Listing a new product)
    @Transactional
    public ProductEntity createProduct(ProductEntity product) {
        // Ensure it starts as available and counters initialized
        product.setIsAvailable(Boolean.TRUE);
        if (product.getViewCount() == null) product.setViewCount(0);
        if (product.getLikeCount() == null) product.setLikeCount(0);
        return productRepository.save(product);
    }

    // UPDATE
    @Transactional
    public Optional<ProductEntity> updateProduct(Integer id, ProductEntity productDetails) {
        return productRepository.findById(id).map(existingProduct -> {
            // Allow updates to fields that match the ERD and entity:
            existingProduct.setTitle(productDetails.getTitle());
            existingProduct.setDescription(productDetails.getDescription());
            existingProduct.setCategory(productDetails.getCategory());
            existingProduct.setPrice(productDetails.getPrice());
            existingProduct.setBrandType(productDetails.getBrandType());
            existingProduct.setContactInfo(productDetails.getContactInfo());
            // Toggle availability if provided
            if (productDetails.getIsAvailable() != null) {
                existingProduct.setIsAvailable(productDetails.getIsAvailable());
            }
            // If clients submit view/like counts (usually updated elsewhere), accept them if non-null
            if (productDetails.getViewCount() != null) existingProduct.setViewCount(productDetails.getViewCount());
            if (productDetails.getLikeCount() != null) existingProduct.setLikeCount(productDetails.getLikeCount());

            return productRepository.save(existingProduct);
        });
    }

    // DELETE (Delisting / hard delete)
    @Transactional
    public void deleteProduct(Integer id) {
        productRepository.deleteById(id);
    }
}