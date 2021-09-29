package de.lowani.backend.service;

import de.lowani.backend.entities.AnswerHistoryEntity;
import de.lowani.backend.repo.AnswerHistoryRepo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
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
        if (optList.isEmpty()) {
            throw new EntityNotFoundException("No Answers found with topic: " + topic);
        }
        return optList.get();
    }


    public List<AnswerHistoryEntity> findAllByCategory(String category) {
        Optional<List<AnswerHistoryEntity>> optList = answerRepo.findAllByQuestion_Category_Name(category);
        if (optList.isEmpty()) {
            throw new EntityNotFoundException("No Answers found with category: " + category);
        }
        return optList.get();
    }

    public List<AnswerHistoryEntity> findRight() {
        Optional<List<AnswerHistoryEntity>> optList = answerRepo.findAllByScoreGreaterThan(0L);
        if (optList.isEmpty()) {
            throw new EntityNotFoundException("No correct answers");
        }
        return optList.get();
    }

    public List<AnswerHistoryEntity> findWrong() {
        Optional<List<AnswerHistoryEntity>> optList = answerRepo.findAllByScoreEquals(0L);
        if (optList.isEmpty()) {
            throw new EntityNotFoundException("No correct answers");
        }
        return optList.get();
    }

    public List<AnswerHistoryEntity> findBestCategory() {
        List<AnswerHistoryEntity> allAnswers = findAll();
        int best = 0;
        String bestCategory = "";
        int currentCounter = 0;
        int currentRight=0;
        int currentPercent;
        String currentCategory = allAnswers.get(0).getQuestion().getCategory().getName();
        String nextCategory = "";
        ArrayList<String> checkedCategorys = new ArrayList<>();
        boolean done = false;
        while (!done) {
            for (AnswerHistoryEntity answer : allAnswers) {
                if (answer.getQuestion().getCategory().getName().equals(currentCategory)) {
                    currentCounter++;
                    if (answer.getScore()>0L){
                        currentRight++;
                    }
                }
            }
            currentPercent=(currentRight*100)/currentCounter;
            if (currentPercent>best&&currentCounter>5){
                best=currentPercent;
                bestCategory=currentCategory;
            }
            checkedCategorys.add(currentCategory);
            for (AnswerHistoryEntity answer : allAnswers) {
                if (!checkedCategorys.contains(answer.getQuestion().getCategory().getName())){
                    nextCategory=answer.getQuestion().getCategory().getName();
                    currentCounter=0;
                    currentRight=0;
                    break;
                }
            }
            if (nextCategory.equals(currentCategory)){
                done=true;
            }
            currentCategory=nextCategory;
        }
        return findAllByCategory(bestCategory);
    }

    public List<AnswerHistoryEntity> findBestTopic() {
        List<AnswerHistoryEntity> allAnswers = findAll();
        int best = 0;
        String bestTopic = "";
        int currentCounter = 0;
        int currentRight=0;
        int currentPercent;
        String currentTopic = allAnswers.get(0).getQuestion().getTopic().getName();
        String nextTopic = "";
        ArrayList<String> checkedTopics = new ArrayList<>();
        boolean done = false;
        while (!done) {
            for (AnswerHistoryEntity answer : allAnswers) {
                if (answer.getQuestion().getTopic().getName().equals(currentTopic)) {
                    currentCounter++;
                    if (answer.getScore()>0L){
                        currentRight++;
                    }
                }
            }
            currentPercent=(currentRight*100)/currentCounter;
            if (currentPercent>best&&currentCounter>5){
                best=currentPercent;
                bestTopic=currentTopic;
            }
            checkedTopics.add(currentTopic);
            for (AnswerHistoryEntity answer : allAnswers) {
                if (!checkedTopics.contains(answer.getQuestion().getTopic().getName())){
                    nextTopic=answer.getQuestion().getTopic().getName();
                    currentCounter=0;
                    currentRight=0;
                    break;
                }
            }
            if (nextTopic.equals(currentTopic)){
                done=true;
            }
            currentTopic=nextTopic;
        }
        return findAllByTopic(bestTopic);
    }

    public List<AnswerHistoryEntity> findWorstCategory() {
        List<AnswerHistoryEntity> allAnswers = findAll();
        int currentWorst = 0;
        String worstCategory = "";
        int currentCounter = 0;
        int currentWrong=0;
        int currentPercent;
        String currentCategory = allAnswers.get(0).getQuestion().getCategory().getName();
        String nextCategory = "";
        ArrayList<String> checkedCategorys = new ArrayList<>();
        boolean done = false;
        while (!done) {
            for (AnswerHistoryEntity answer : allAnswers) {
                if (answer.getQuestion().getCategory().getName().equals(currentCategory)) {
                    currentCounter++;
                    if (answer.getScore()==0L){
                        currentWrong++;
                    }
                }
            }
            currentPercent=(currentWrong*100)/currentCounter;
            if (currentPercent>currentWorst&&currentCounter>5){
                currentWorst=currentPercent;
                worstCategory=currentCategory;
            }
            checkedCategorys.add(currentCategory);
            for (AnswerHistoryEntity answer : allAnswers) {
                if (!checkedCategorys.contains(answer.getQuestion().getCategory().getName())){
                    nextCategory=answer.getQuestion().getCategory().getName();
                    currentCounter=0;
                    currentWrong=0;
                    break;
                }
            }
            if (nextCategory.equals(currentCategory)){
                done=true;
            }
            currentCategory=nextCategory;
        }
        return findAllByCategory(worstCategory);
    }

    public List<AnswerHistoryEntity> findWorstTopic() {
        List<AnswerHistoryEntity> allAnswers = findAll();
        int currentWorst = 0;
        String worstTopic = "";
        int currentCounter = 0;
        int currentWrong=0;
        int currentPercent;
        String currentTopic = allAnswers.get(0).getQuestion().getTopic().getName();
        String nextTopic = "";
        ArrayList<String> checkedTopics = new ArrayList<>();
        boolean done = false;
        while (!done) {
            for (AnswerHistoryEntity answer : allAnswers) {
                if (answer.getQuestion().getTopic().getName().equals(currentTopic)) {
                    currentCounter++;
                    if (answer.getScore()==0L){
                        currentWrong++;
                    }
                }
            }
            currentPercent=(currentWrong*100)/currentCounter;
            if (currentPercent>currentWorst&&currentCounter>5){
                currentWorst=currentPercent;
                worstTopic=currentTopic;
            }
            checkedTopics.add(currentTopic);
            for (AnswerHistoryEntity answer : allAnswers) {
                if (!checkedTopics.contains(answer.getQuestion().getTopic().getName())){
                    nextTopic=answer.getQuestion().getTopic().getName();
                    currentCounter=0;
                    currentWrong=0;
                    break;
                }
            }
            if (nextTopic.equals(currentTopic)){
                done=true;
            }
            currentTopic=nextTopic;
        }
        return findAllByTopic(worstTopic);
    }
}
