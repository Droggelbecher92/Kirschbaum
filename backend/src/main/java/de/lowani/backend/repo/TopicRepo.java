package de.lowani.backend.repo;

import de.lowani.backend.entities.TopicEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TopicRepo extends JpaRepository<TopicEntity, Long> {

    Optional<TopicEntity> findByName(String name);
}
