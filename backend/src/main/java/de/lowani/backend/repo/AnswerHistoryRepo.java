package de.lowani.backend.repo;

import de.lowani.backend.entities.AnswerHistoryEntity;
import de.lowani.backend.entities.QuestionEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnswerHistoryRepo extends JpaRepository<AnswerHistoryEntity, Long> {

    Optional<List<AnswerHistoryEntity>> findAllByQuestion_Topic_Name(String topic);

    Optional<List<AnswerHistoryEntity>> findAllByQuestion_Category_Name(String category);

    Optional<List<AnswerHistoryEntity>> findAllByScoreEquals(long score);

    Optional<List<AnswerHistoryEntity>> findAllByScoreGreaterThan(long score);
}
