package de.lowani.backend.repo;

import de.lowani.backend.entitys.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserEntity, Long> {
}
