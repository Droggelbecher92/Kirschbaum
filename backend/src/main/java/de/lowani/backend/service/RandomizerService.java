package de.lowani.backend.service;


import de.lowani.backend.entities.QuestionEntity;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Getter
@Setter
public class RandomizerService {
    public List<QuestionEntity> getRandomQuestions(int howMany, List<QuestionEntity> all) {
        if (howMany>all.size()){
            throw new IllegalArgumentException("Not enough questions available");
        }
        List<QuestionEntity> randomQuestions = new ArrayList<>();
        while(randomQuestions.size()<howMany){
            int numberOfQuestions = all.size();
            int index = (int) (Math.random()* numberOfQuestions);
            randomQuestions.add(all.get(index));
            all.remove(index);
        }
        return randomQuestions;
    }
}
