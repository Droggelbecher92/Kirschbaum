package de.lowani.backend.repo;

import de.lowani.backend.entities.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepo extends JpaRepository<QuestionEntity, Long> {

    Optional<List<QuestionEntity>> findAllByCategory_Name(String categoryName);

    Optional<List<QuestionEntity>> findAllByTopic_Name(String topicName);

    Optional<QuestionEntity> findByQuestion(String question);

}
