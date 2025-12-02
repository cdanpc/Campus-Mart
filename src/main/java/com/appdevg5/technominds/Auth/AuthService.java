package com.appdevg5.technominds.Auth;

import com.appdevg5.technominds.Auth.dto.AuthResponse;
import com.appdevg5.technominds.Auth.dto.LoginRequest;
import com.appdevg5.technominds.Auth.dto.RegisterRequest;
import com.appdevg5.technominds.Profile.ProfileEntity;
import com.appdevg5.technominds.Profile.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;

/**
 * Service for authentication operations.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Autowired
    public AuthService(UserRepository userRepository, 
                       ProfileRepository profileRepository,
                       PasswordEncoder passwordEncoder, 
                       JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Authenticate user and return JWT token.
     */
    public AuthResponse login(LoginRequest request) {
        // Find user by email
        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email not found"));

        // Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        // Get user profile
        ProfileEntity profile = profileRepository.findByEmail(request.getEmail())
                .orElse(null);

        // Generate token
        String token = jwtUtil.generateToken(user);

        // Build response
        return buildAuthResponse(token, user, profile);
    }

    /**
     * Register new user and return JWT token.
     */
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // Create user
        UserEntity user = new UserEntity();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user = userRepository.save(user);

        // Create profile
        ProfileEntity profile = new ProfileEntity();
        profile.setAuthUserId(UUID.randomUUID()); // Generate a UUID for auth
        profile.setEmail(request.getEmail());
        profile.setFirstName(request.getFirstName());
        profile.setLastName(request.getLastName());
        profile.setPhoneNumber(request.getPhoneNumber());
        profile.setAcademicLevel(request.getAcademicLevel());
        profile.setBio("");
        profile.setTotalReviews(0);
        profile = profileRepository.save(profile);

        // Generate token
        String token = jwtUtil.generateToken(user);

        // Build response
        return buildAuthResponse(token, user, profile);
    }

    /**
     * Get current user from token.
     */
    public AuthResponse getCurrentUser(String token) {
        if (token == null || !jwtUtil.validateToken(token)) {
            throw new RuntimeException("Invalid or expired token");
        }

        String email = jwtUtil.extractUsername(token);
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ProfileEntity profile = profileRepository.findByEmail(email)
                .orElse(null);

        return buildAuthResponse(null, user, profile);
    }

    /**
     * Get user by ID.
     */
    public Optional<UserEntity> getUserById(Integer id) {
        return userRepository.findById(id);
    }

    /**
     * Get user by email.
     */
    public Optional<UserEntity> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    private AuthResponse buildAuthResponse(String token, UserEntity user, ProfileEntity profile) {
        AuthResponse.ProfileDto profileDto = null;
        if (profile != null) {
            profileDto = AuthResponse.ProfileDto.fromEntity(profile, user.getId());
        }

        AuthResponse.UserDto userDto = new AuthResponse.UserDto(
                user.getId(),
                user.getEmail(),
                profileDto
        );

        return new AuthResponse(token, userDto);
    }
}
