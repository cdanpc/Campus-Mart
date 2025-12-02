package com.appdevg5.technominds.Auth.dto;

import com.appdevg5.technominds.Profile.ProfileEntity;

/**
 * DTO for authentication responses.
 * Contains JWT token and user information.
 */
public class AuthResponse {

    private String token;
    private UserDto user;

    // Constructors
    public AuthResponse() {}

    public AuthResponse(String token, UserDto user) {
        this.token = token;
        this.user = user;
    }

    // Getters and Setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    /**
     * Nested DTO for user information in auth response.
     */
    public static class UserDto {
        private Integer id;
        private String email;
        private ProfileDto profile;

        public UserDto() {}

        public UserDto(Integer id, String email, ProfileDto profile) {
            this.id = id;
            this.email = email;
            this.profile = profile;
        }

        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public ProfileDto getProfile() {
            return profile;
        }

        public void setProfile(ProfileDto profile) {
            this.profile = profile;
        }
    }

    /**
     * Nested DTO for profile information in auth response.
     */
    public static class ProfileDto {
        private Integer id;
        private Integer userId;
        private String firstName;
        private String lastName;
        private String phoneNumber;
        private String instagramHandle;
        private String academicLevel;
        private String bio;
        private Double sellerRating;
        private Integer totalReviews;
        private String createdAt;
        private String updatedAt;

        public ProfileDto() {}

        public static ProfileDto fromEntity(ProfileEntity entity, Integer userId) {
            ProfileDto dto = new ProfileDto();
            dto.setId(entity.getId());
            dto.setUserId(userId);
            dto.setFirstName(entity.getFirstName());
            dto.setLastName(entity.getLastName());
            dto.setPhoneNumber(entity.getPhoneNumber());
            dto.setAcademicLevel(entity.getAcademicLevel());
            dto.setBio(entity.getBio());
            dto.setTotalReviews(entity.getTotalReviews() != null ? entity.getTotalReviews() : 0);
            dto.setSellerRating(0.0); // Default rating
            if (entity.getCreatedAt() != null) {
                dto.setCreatedAt(entity.getCreatedAt().toString());
            }
            if (entity.getUpdatedAt() != null) {
                dto.setUpdatedAt(entity.getUpdatedAt().toString());
            }
            return dto;
        }

        // Getters and Setters
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public Integer getUserId() {
            return userId;
        }

        public void setUserId(Integer userId) {
            this.userId = userId;
        }

        public String getFirstName() {
            return firstName;
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        public String getLastName() {
            return lastName;
        }

        public void setLastName(String lastName) {
            this.lastName = lastName;
        }

        public String getPhoneNumber() {
            return phoneNumber;
        }

        public void setPhoneNumber(String phoneNumber) {
            this.phoneNumber = phoneNumber;
        }

        public String getInstagramHandle() {
            return instagramHandle;
        }

        public void setInstagramHandle(String instagramHandle) {
            this.instagramHandle = instagramHandle;
        }

        public String getAcademicLevel() {
            return academicLevel;
        }

        public void setAcademicLevel(String academicLevel) {
            this.academicLevel = academicLevel;
        }

        public String getBio() {
            return bio;
        }

        public void setBio(String bio) {
            this.bio = bio;
        }

        public Double getSellerRating() {
            return sellerRating;
        }

        public void setSellerRating(Double sellerRating) {
            this.sellerRating = sellerRating;
        }

        public Integer getTotalReviews() {
            return totalReviews;
        }

        public void setTotalReviews(Integer totalReviews) {
            this.totalReviews = totalReviews;
        }

        public String getCreatedAt() {
            return createdAt;
        }

        public void setCreatedAt(String createdAt) {
            this.createdAt = createdAt;
        }

        public String getUpdatedAt() {
            return updatedAt;
        }

        public void setUpdatedAt(String updatedAt) {
            this.updatedAt = updatedAt;
        }
    }
}
