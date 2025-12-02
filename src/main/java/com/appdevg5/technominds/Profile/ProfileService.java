// ...existing code...
package com.appdevg5.technominds.Profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**
 * Service layer for managing user Profile business logic.
 * Handles registration, profile updates, and fetching user data.
 */
@Service
public class ProfileService {

    private final ProfileRepository profileRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository) {
        this.profileRepository = profileRepository;
    }

    // READ
    public Optional<ProfileEntity> getProfileById(Integer id) {
        return profileRepository.findById(id);
    }

    public List<ProfileEntity> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Optional<ProfileEntity> getProfileByAuthId(UUID authUserId) {
        return profileRepository.findByAuthUserId(authUserId);
    }

    // CREATE (Registration)
    @Transactional
    public ProfileEntity createProfile(ProfileEntity profile) {
        // DB constraints should enforce uniqueness for authUserId/email
        return profileRepository.save(profile);
    }

    @Transactional
    public Optional<ProfileEntity> updateProfile(Integer id, ProfileEntity profileDetails) {
        return profileRepository.findById(id).map(existingProfile -> {
            existingProfile.setFirstName(profileDetails.getFirstName());
            existingProfile.setLastName(profileDetails.getLastName());
            existingProfile.setPhoneNumber(profileDetails.getPhoneNumber());
            existingProfile.setAcademicLevel(profileDetails.getAcademicLevel());
            existingProfile.setAvatarUrl(profileDetails.getAvatarUrl());
            existingProfile.setBio(profileDetails.getBio());
            // Email and authUserId are typically immutable
            return profileRepository.save(existingProfile);
        });
    }

    // DELETE (Soft delete would be preferable in a real application)
    @Transactional
    public void deleteProfile(Integer id) {
        profileRepository.deleteById(id);
    }
    
    // UTILITY: Updates the profile's total review count
    @Transactional
    public void updateTotalReviews(Integer profileId, int newTotalReviews) {
        profileRepository.findById(profileId).ifPresent(profile -> {
            profile.setTotalReviews(newTotalReviews);
            profileRepository.save(profile);
        });
    }
}
// ...existing code...