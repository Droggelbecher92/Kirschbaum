package de.lowani.backend.service;

import de.lowani.backend.entities.QuestionEntity;
import de.lowani.backend.repo.QuestionRepo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@Getter
@Setter
public class QuestionService {

    private final QuestionRepo questionRepo;
    private final RandomizerService randomizerService;

    public QuestionService(QuestionRepo questionRepo, RandomizerService randomizerService) {
        this.questionRepo = questionRepo;
        this.randomizerService = randomizerService;
    }

    public List<QuestionEntity> findRandom(int howMany) {
        List<QuestionEntity> all = findAll();
        return randomizerService.getRandomQuestions(howMany, all);
    }

    public List<QuestionEntity> findAll() {
        return questionRepo.findAll();
    }

    public List<QuestionEntity> findByCategory(String whichCategory, int howMany) {
        Optional<List<QuestionEntity>> allOpt = questionRepo.findAllByCategory_Name(whichCategory);
        if (allOpt.isEmpty()){
            throw new EntityNotFoundException("No questions with category "+whichCategory+" found");
        }
        return randomizerService.getRandomQuestions(howMany,allOpt.get());
    }

    public List<QuestionEntity> findByTopic(String whichTopic, int howMany) {
        Optional<List<QuestionEntity>> allOpt = questionRepo.findAllByTopic_Name(whichTopic);
        if (allOpt.isEmpty()){
            throw new EntityNotFoundException("No questions with topic "+whichTopic+" found");
        }
        return randomizerService.getRandomQuestions(howMany,allOpt.get());
    }

    public QuestionEntity save(QuestionEntity newQuestionEnt) {
        return questionRepo.save(newQuestionEnt);
    }
}
