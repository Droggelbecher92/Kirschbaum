package de.lowani.backend.service;

import de.lowani.backend.entities.TopicEntity;
import de.lowani.backend.repo.TopicRepo;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Getter
@Setter
public class TopicService {

    private final TopicRepo topicRepo;

    public TopicService(TopicRepo topicRepo) {
        this.topicRepo = topicRepo;
    }

    public List<TopicEntity> findAll() {
        return topicRepo.findAll();
    }

    public Optional<TopicEntity> findByName(String topic) {
        return topicRepo.findByName(topic);
    }

    public TopicEntity save(TopicEntity topicEntity) {
        return topicRepo.save(topicEntity);
    }
}
