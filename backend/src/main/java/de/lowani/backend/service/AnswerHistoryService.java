package de.lowani.backend.service;

import de.lowani.backend.entities.AnswerHistoryEntity;
import de.lowani.backend.repo.AnswerHistoryRepo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@Getter
@Setter
public class AnswerHistoryService {

    private final AnswerHistoryRepo answerRepo;

    @Autowired
    public AnswerHistoryService(AnswerHistoryRepo answerRepo) {
        this.answerRepo = answerRepo;
    }

    public AnswerHistoryEntity save(AnswerHistoryEntity answerToSave) {
        return answerRepo.save(answerToSave);
    }

    public List<AnswerHistoryEntity> findAll() {
        return answerRepo.findAll();
    }

    public List<AnswerHistoryEntity> findAllByTopic(String topic) {
        Optional<List<AnswerHistoryEntity>> optList = answerRepo.findAllByQuestion_Topic_Name(topic);
        if (optList.isEmpty()){
            throw new EntityNotFoundException("No Answers found with topic: "+topic);
        }
        return optList.get();
    }


    public List<AnswerHistoryEntity> findAllByCategory(String category) {
        Optional<List<AnswerHistoryEntity>> optList = answerRepo.findAllByQuestion_Category_Name(category);
        if (optList.isEmpty()){
            throw new EntityNotFoundException("No Answers found with category: "+category);
        }
        return optList.get();
    }

    public List<AnswerHistoryEntity> findRight() {
        Optional<List<AnswerHistoryEntity>> optList = answerRepo.findAllByScoreGreaterThan(0L);
        if (optList.isEmpty()){
            throw new EntityNotFoundException("No correct answers");
        }
        return optList.get();
    }

    public List<AnswerHistoryEntity> findWrong() {
        Optional<List<AnswerHistoryEntity>> optList = answerRepo.findAllByScoreEquals(0L);
        if (optList.isEmpty()){
            throw new EntityNotFoundException("No correct answers");
        }
        return optList.get();
    }
}
