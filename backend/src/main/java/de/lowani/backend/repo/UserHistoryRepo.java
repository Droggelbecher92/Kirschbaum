package de.lowani.backend.repo;

import de.lowani.backend.entities.QuestionHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHistoryRepo extends JpaRepository<QuestionHistoryEntity, Long> {
}
