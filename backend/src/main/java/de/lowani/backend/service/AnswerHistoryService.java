package de.lowani.backend.service;

import de.lowani.backend.entities.AnswerHistoryEntity;
import de.lowani.backend.repo.AnswerHistoryRepo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
