package de.lowani.backend.repo;

import de.lowani.backend.entitys.UserHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHistoryRepo extends JpaRepository<UserHistoryEntity, Long> {
}
