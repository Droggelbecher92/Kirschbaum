package de.lowani.backend.repo;

import de.lowani.backend.entities.AnswerHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerHistoryRepo extends JpaRepository<AnswerHistoryEntity, Long> {
}
