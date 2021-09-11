package de.lowani.backend.repo;

import de.lowani.backend.entities.TopicEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TopicRepo extends JpaRepository<TopicEntity, Long> {
}
