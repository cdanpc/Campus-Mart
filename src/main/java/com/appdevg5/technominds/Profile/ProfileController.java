// ...existing code...
package com.appdevg5.technominds.Profile;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

/**
 * REST Controller for managing user profiles.
 * Base URL: /api/profiles
 */
@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    private final ProfileService profileService;

    @Autowired
    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    // GET /api/profiles
    @GetMapping
    public List<ProfileEntity> getAllProfiles() {
        return profileService.getAllProfiles();
    }

    // GET /api/profiles/{id}
    @GetMapping("/{id}")
    public ResponseEntity<ProfileEntity> getProfileById(@PathVariable Integer id) {
        return profileService.getProfileById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // GET /api/profiles/auth/{authUserId}
    @GetMapping("/auth/{authUserId}")
    public ResponseEntity<ProfileEntity> getProfileByAuthId(@PathVariable UUID authUserId) {
        return profileService.getProfileByAuthId(authUserId)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /api/profiles - Create a new profile (Initial registration)
    @PostMapping
    public ResponseEntity<ProfileEntity> createProfile(@Valid @RequestBody ProfileEntity profile) {
        ProfileEntity newProfile = profileService.createProfile(profile);
        return new ResponseEntity<>(newProfile, HttpStatus.CREATED);
    }

    // PUT /api/profiles/{id} - Update profile details
    @PutMapping("/{id}")
    public ResponseEntity<ProfileEntity> updateProfile(@PathVariable Integer id, @Valid @RequestBody ProfileEntity profileDetails) {
        return profileService.updateProfile(id, profileDetails)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/profiles/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Integer id) {
        profileService.deleteProfile(id);
        return ResponseEntity.noContent().build();
    }
}
// ...existing code...