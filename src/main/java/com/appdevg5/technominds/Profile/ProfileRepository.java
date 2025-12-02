package com.appdevg5.technominds.Profile;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface ProfileRepository extends JpaRepository<ProfileEntity, Integer> {

    Optional<ProfileEntity> findByAuthUserId(UUID authUserId);

    Optional<ProfileEntity> findByEmail(String email);
}