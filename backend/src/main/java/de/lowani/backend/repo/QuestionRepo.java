package de.lowani.backend.repo;

import de.lowani.backend.entitys.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepo extends JpaRepository<QuestionEntity, Long> {
}
